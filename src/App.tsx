import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { useLenis } from "./lenis";
import { PROJECTS, JOURNAL, SKILLS, TESTIMONIALS, PARTNERS } from "./site";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Process from "./components/Process";
import Journal from "./components/Journal";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";

/**
 * Vrstva — landing postavená podle reference x-axis.
 * Struktura sekcí i pohyb (portálový hero, dopočítané statistiky, reveal
 * dovedností, odkrývací proces, CTA) odpovídají předloze, značka je Vrstva.
 *
 * MotionConfig reducedMotion="never" => všechny animace a efekty běží na
 * VŠECH zařízeních bez výjimky (vědomé, opakované přání uživatele), i když
 * má systém zapnuté „omezit pohyb".
 */
export default function App() {
  useLenis();

  // Přednačtení VŠECH obrázků hned při startu — nic se nedotahuje až při
  // scrollu, takže sekce jsou plné okamžitě (výslovné přání uživatele).
  useEffect(() => {
    const urls = [
      ...PROJECTS.map((p) => p.img),
      ...JOURNAL.map((j) => j.img),
      ...SKILLS.map((s) => s.img),
      ...TESTIMONIALS.map((t) => t.img),
      ...PARTNERS.map((p) => p.logo),
    ];
    for (const src of urls) {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    }
  }, []);

  return (
    <MotionConfig reducedMotion="never">
      <Nav />
      <main>
        <Hero />
        <Partners />
        <Work />
        <Skills />
        <Testimonials />
        <Process />
        <Journal />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
