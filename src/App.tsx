import { useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { useLenis } from "./lenis";
import LiveBackground from "./components/LiveBackground";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Work from "./components/Work";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* Z-index škála: preloader 100, nav 90, grain 80, obsah 0, živé pozadí -10 */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  return (
    <MotionConfig reducedMotion="never">
      <LiveBackground />
      <CustomCursor />

      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* filmové zrno, fixní vrstva bez repaintů */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] opacity-[0.05]"
        style={{ backgroundImage: GRAIN }}
      />

      <Nav />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Services />
        <Stats />
        <Work />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
