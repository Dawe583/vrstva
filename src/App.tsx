import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useLenis } from "./lenis";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* Z-index škála: preloader 100, nav 90, grain 80, obsah default */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export default function App() {
  // při reduced-motion preloader vůbec nemontujeme (okamžitý obsah, žádná exit animace)
  const [loading, setLoading] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useLenis();

  return (
    <>
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
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
