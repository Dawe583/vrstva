import { useEffect, useRef } from "react";

/**
 * Globální vlastní kurzor (podpis awwwards webů).
 * - tečka sleduje přesně, prstenec doháněný pružinou (rAF lerp)
 * - roste nad odkazy/tlačítky (html.cur-hover)
 * - nad médii ukáže popisek "Zobrazit" (html.cur-view přes [data-cursor="view"])
 * Aktivuje se jen na myši (pointer: fine) — dotyk zůstává nativní.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      // reakce na typ prvku pod kurzorem
      const t = e.target as HTMLElement | null;
      const media = t?.closest("[data-cursor='view']");
      const inter = t?.closest("a, button, [data-cursor='hover'], input, textarea");
      root.classList.toggle("cur-view", !!media);
      root.classList.toggle("cur-hover", !!inter && !media);
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const leave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const enter = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    raf = requestAnimationFrame(loop);

    return () => {
      root.classList.remove("has-cursor", "cur-hover", "cur-view");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span className="cur-label">Zobrazit</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
