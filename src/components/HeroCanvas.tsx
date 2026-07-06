import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

/**
 * Živé WebGL pozadí heru: domain-warped fbm noise v barvách značky
 * (ink → accent → cool). Reaguje na kurzor a scroll. Jen fullscreen
 * triangle + fragment shader => velmi levné. Fallback: statický gradient
 * (reduced motion nebo bez WebGL) řeší rodičovská sekce.
 */
const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;

// hash + value noise + fbm
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes.xy;
  vec2 p=uv;
  p.x*=uRes.x/uRes.y;

  float t=uTime*0.05;
  vec2 m=(uMouse-0.5);

  // domain warp
  vec2 q=vec2(fbm(p+t), fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+q*1.6+m*0.6+vec2(1.7,9.2)), fbm(p+q*1.6-m*0.6+vec2(8.3,2.8)));
  float f=fbm(p+r*1.4+t*0.5);

  // paleta značky
  vec3 ink =vec3(0.051,0.051,0.055);
  vec3 acc =vec3(0.910,0.337,0.165);
  vec3 cool=vec3(0.227,0.302,0.420);

  vec3 col=ink;
  col=mix(col, cool, smoothstep(0.15,0.75,f)*0.5);
  col=mix(col, acc,  smoothstep(0.45,0.95,f+r.x*0.3)*0.55);
  // ztmavení k okrajům + dolů (aby text nahoře dýchal)
  float vig=smoothstep(1.25,0.25,length(uv-vec2(0.5,0.35)));
  col*=mix(0.55,1.15,vig);
  col*=mix(1.0,0.7,uScroll);

  // jemné zrno
  col+=(hash(uv*uTime)-0.5)*0.015;

  gl_FragColor=vec4(col,1.0);
}
`;

const VERT = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main(){ vUv=uv; gl_Position=vec4(position,0.,1.); }
`;

export default function HeroCanvas() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.5) });
    } catch {
      return; // bez WebGL zůstane CSS fallback rodiče
    }
    const gl = renderer.gl;
    gl.clearColor(0.051, 0.051, 0.055, 1);
    el.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const mouse = new Vec2(0.5, 0.5);
    const smooth = new Vec2(0.5, 0.5);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uScroll: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uRes.value.set(gl.canvas.width, gl.canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const onMove = (e: PointerEvent) => {
      mouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onScroll = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight || 1));
      program.uniforms.uScroll.value = p;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let running = true;
    const update = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(update);
      smooth.x += (mouse.x - smooth.x) * 0.05;
      smooth.y += (mouse.y - smooth.y) * 0.05;
      program.uniforms.uMouse.value.set(smooth.x, smooth.y);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    // pauza mimo viewport (šetří baterii)
    const vis = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running) raf = requestAnimationFrame(update);
      },
      { threshold: 0 }
    );
    vis.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      gl.canvas.remove();
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{
        // CSS fallback, než/pokud WebGL nenaběhne
        background:
          "radial-gradient(120% 90% at 70% 30%, rgba(232,86,42,0.16), transparent 55%), radial-gradient(100% 80% at 20% 80%, rgba(58,77,107,0.14), transparent 60%), #0d0d0e",
      }}
    />
  );
}
