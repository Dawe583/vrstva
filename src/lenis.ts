import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Lenis smooth scroll synchronizovaný s GSAP ScrollTriggerem.
 * Běží na VŠECH zařízeních včetně dotyku (vědomé přání uživatele).
 */
export function useLenis() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToId(id: string) {
  if (lenis) lenis.scrollTo(id, { duration: 1.4 });
  else document.querySelector(id)?.scrollIntoView();
}
