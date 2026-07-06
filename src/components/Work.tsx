import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "../motion";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { name: "Bystrá", meta: "Fintech aplikace, 2026", seed: "vrstva-bystra" },
  { name: "Atelier Hana Marek", meta: "Architektura, 2025", seed: "vrstva-atelier" },
  { name: "Roubal a syn", meta: "E-shop vinařství, 2025", seed: "vrstva-vino" },
  { name: "Mezanin", meta: "Hotel a rezervace, 2024", seed: "vrstva-hotel" },
];

/** Horizontal scroll-hijack (desktop), vertikální stack s reveal na mobilu. */
export default function Work() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

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
          <h2 className="font-display text-5xl font-medium tracking-tighter md:text-7xl">
            Vybrané projekty
          </h2>
          <p className="mt-5 max-w-[36ch] text-mute">
            Každý projekt začíná otázkou, co má web značce vydělat.
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
            <div className="overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${p.seed}/1300/860`}
                alt={`Projekt ${p.name}`}
                loading="lazy"
                className="aspect-[15/10] w-full object-cover grayscale-[0.35] transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
              <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                {p.name}
              </h3>
              <span className="text-sm text-mute">{p.meta}</span>
            </div>
            <span className="sr-only">Projekt {i + 1}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
