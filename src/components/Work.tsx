import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowUpRight } from "@tabler/icons-react";
import Img from "./Img";
import CaseStudy from "./CaseStudy";
import { EASE } from "../motion";
import { PROJECTS, type Project } from "../content";

gsap.registerPlugin(ScrollTrigger);

/** Horizontal scroll-hijack (desktop), vertikální stack na mobilu.
    Klik na projekt otevře hloubkový case study. */
export default function Work() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="prace" ref={wrap} className="relative overflow-hidden py-24 md:py-0">
      <div
        ref={track}
        className="flex flex-col gap-16 px-6 md:h-[100dvh] md:w-max md:flex-row md:items-center md:gap-[8vw] md:px-10"
      >
        <div className="md:w-[36vw] md:shrink-0">
          <span className="text-sm uppercase tracking-[0.16em] text-accent">Portfolio</span>
          <h2 className="mt-4 font-display text-5xl font-medium tracking-tighter md:text-7xl">
            Vybrané projekty
          </h2>
          <p className="mt-5 max-w-[36ch] text-muteb">
            Každý projekt začíná otázkou, co má web značce vydělat. Klikni pro celý příběh.
          </p>
        </div>

        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="group md:w-[52vw] md:shrink-0"
          >
            <button
              onClick={() => setActive(p)}
              data-cursor="view"
              className="block w-full text-left"
              aria-label={`Otevřít case study ${p.name}`}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Img
                  pic={p.cover}
                  className="aspect-[15/10] w-full"
                  imgClassName="grayscale-[0.35] transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <span className="pointer-events-none absolute left-5 top-5 font-display text-sm text-paper/70">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
                <h3 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
                  {p.name}
                  <IconArrowUpRight
                    size={22}
                    stroke={1.8}
                    className="text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </h3>
                <span className="text-sm text-mute">
                  {p.meta}, {p.year}
                </span>
              </div>
            </button>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
