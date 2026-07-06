import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { useLenis } from "./lenis";
import { TESTIMONIALS } from "./site";
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

  // Všechny <img> na stránce jsou eager => stahují se okamžitě samy.
  // Ručně přednačítáme jen fotky referencí 2 a 3 — do DOM se dostanou
  // až přepnutím slideru, takže by jinak naskočily s prodlevou.
  useEffect(() => {
    for (const t of TESTIMONIALS.slice(1)) {
      const img = new Image();
      img.decoding = "async";
      img.src = t.img;
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
