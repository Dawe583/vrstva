import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/**
 * Plynulý scroll (Lenis) s vlastní rAF smyčkou. Lenis hýbe reálným scrollem
 * okna, takže nativní scroll eventy fungují a motion `useScroll` je s ním
 * synchronizovaný bez dalšího lepidla.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.3, offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
}
