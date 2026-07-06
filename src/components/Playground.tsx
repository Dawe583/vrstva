import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import SplitText from "./SplitText";

/**
 * Podpisový interaktivní moment: generativní WebGL pole, které reaguje
 * na pohyb a tažení kurzoru/prstu — kolem ukazatele se rozvlní barevné
 * vrstvy. Čistě generativní (bez textur => žádné CORS starosti).
 */
const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uPointer;   // 0..1
uniform float uActive;   // 0..1 síla interakce
uniform float uVel;      // rychlost pohybu

float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){ float v=0.,a=0.5; for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=0.5;} return v; }

void main(){
  vec2 uv=gl_FragCoord.xy/uRes.xy;
  float agri=uRes.x/uRes.y;
  vec2 p=vec2(uv.x*agri,uv.y);
  vec2 ptr=vec2(uPointer.x*agri,uPointer.y);

  float t=uTime*0.06;
  float d=distance(p,ptr);

  // rozvlnění kolem ukazatele
  float ripple=sin(d*18.0 - uTime*3.0) * exp(-d*4.0) * (0.35+uActive*0.9);
  vec2 warp=normalize(p-ptr+1e-4)*ripple*0.25;

  vec2 q=vec2(fbm(p+t+warp), fbm(p+vec2(4.1,2.7)-t+warp));
  float f=fbm(p*1.4 + q*1.8 + warp*2.0 + t*0.4);
  f+=ripple*0.6;

  vec3 ink =vec3(0.055,0.055,0.06);
  vec3 acc =vec3(0.910,0.337,0.165);
  vec3 soft=vec3(0.941,0.455,0.306);
  vec3 cool=vec3(0.227,0.302,0.420);

  vec3 col=ink;
  col=mix(col,cool,smoothstep(0.2,0.8,f)*0.45);
  col=mix(col,acc, smoothstep(0.5,1.0,f)*0.65);
  col=mix(col,soft,smoothstep(0.7,1.05,f+abs(ripple))*0.5);

  // svit kolem ukazatele
  col+=acc*exp(-d*5.0)*(0.15+uActive*0.5);

  float vig=smoothstep(1.3,0.35,length(uv-0.5));
  col*=mix(0.6,1.1,vig);
  col+=(hash(uv*uTime)-0.5)*0.015;

  gl_FragColor=vec4(col,1.0);
}
`;
const VERT = `attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;

export default function Playground() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio, 1.25) });
    } catch {
      return;
    }
    const gl = renderer.gl;
    gl.clearColor(0.055, 0.055, 0.06, 1);
    el.appendChild(gl.canvas);
    Object.assign(gl.canvas.style, { width: "100%", height: "100%", display: "block" });

    const pointer = new Vec2(0.5, 0.5);
    const smooth = new Vec2(0.5, 0.5);
    let active = 0;
    let vel = 0;
    let last = new Vec2(0.5, 0.5);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new Vec2(1, 1) },
        uPointer: { value: new Vec2(0.5, 0.5) },
        uActive: { value: 0 },
        uVel: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      program.uniforms.uRes.value.set(gl.canvas.width, gl.canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const setFromEvent = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      vel = Math.min(1, vel + pointer.distance(last) * 6);
      last.copy(pointer);
      active = Math.min(1, active + 0.15);
    };
    const onMove = (e: PointerEvent) => setFromEvent(e);
    const onDown = (e: PointerEvent) => {
      active = 1;
      setFromEvent(e);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    let running = true;
    const update = (t: number) => {
      if (!running) return;
      raf = requestAnimationFrame(update);
      smooth.x += (pointer.x - smooth.x) * 0.08;
      smooth.y += (pointer.y - smooth.y) * 0.08;
      active *= 0.94;
      vel *= 0.9;
      program.uniforms.uPointer.value.set(smooth.x, smooth.y);
      program.uniforms.uActive.value = active;
      program.uniforms.uVel.value = vel;
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

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
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <section id="hriste" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm uppercase tracking-[0.16em] text-accent">Hřiště</span>
            <SplitText
              text="Sáhni si na to."
              className="mt-4 font-display text-4xl font-medium tracking-tighter md:text-6xl"
            />
          </div>
          <p className="max-w-[38ch] text-muteb">
            Přesně tuhle živost dáváme do webů. Pohni kurzorem nebo táhni prstem po ploše — reaguje na tebe v reálném čase.
          </p>
        </div>

        <div
          data-cursor="hover"
          className="relative aspect-[16/10] w-full touch-none overflow-hidden rounded-2xl border border-line md:aspect-[21/9]"
        >
          <div
            ref={host}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 50%, rgba(232,86,42,0.15), transparent 60%), #0e0e10",
            }}
          />
          <span className="pointer-events-none absolute bottom-4 left-5 text-xs uppercase tracking-[0.16em] text-paper/50">
            Interaktivní · WebGL
          </span>
        </div>
      </div>
    </section>
  );
}
