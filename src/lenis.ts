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
    // Plynulý scroll běží ZÁMĚRNĚ i při systémovém „omezit pohyb" a i na
    // Plynulý scroll kolečkem na desktopu; na dotyku ZÁMĚRNĚ necháváme
    // nativní scroll (syncTouch vypnutý) — je plynulejší než hijack a
    // scroll-driven efekty fungují i tak, protože čtou pozici scrollu.
    lenis = new Lenis({
      lerp: 0.12, // svižná, responzivní odezva (méně „líný" glide než duration)
      smoothWheel: true,
      syncTouch: false,
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
