import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDownRight } from "@phosphor-icons/react";
import MagneticButton from "./MagneticButton";
import { scrollToId } from "../lenis";

const LINE_EASE = [0.16, 1, 0.3, 1] as const;

function Line({ text, delay, ready }: { text: string; delay: number; ready: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={ready ? { y: 0 } : undefined}
        transition={{ duration: 1, delay, ease: LINE_EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <section id="uvod" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pt-24 md:grid-cols-12 md:px-10 md:pt-24">
        <div className="md:col-span-12">
          <h1 className="font-display text-[13vw] font-medium leading-[0.95] tracking-tighter md:text-[7.5vw]">
            <Line text="Weby, které si" delay={0.1} ready={ready} />
            <Line text="lidé pamatují." delay={0.22} ready={ready} />
          </h1>
        </div>

        <motion.div
          className="order-2 md:order-1 md:col-span-5 md:self-end md:pb-16"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.5, ease: LINE_EASE }}
        >
          <p className="max-w-[42ch] text-base leading-relaxed text-mute md:text-lg">
            Prémiové studio pro značky, které chtějí víc než šablonu.
            Strategie, design a vývoj pod jednou střechou.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => scrollToId("#kontakt")}
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper"
            >
              Nezávazná konzultace
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToId("#prace")}
              className="flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm text-paper transition-colors hover:border-paper/40"
            >
              Prohlédnout práce
              <ArrowDownRight size={16} weight="bold" />
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="order-1 overflow-hidden md:order-2 md:col-span-6 md:col-start-7"
          initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={ready ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 1.1, delay: 0.45, ease: LINE_EASE }}
        >
          <motion.img
            src="https://picsum.photos/seed/vrstva-studio-hero/1400/1000"
            alt="Ukázka práce studia Vrstva"
            style={{ y: imgY }}
            className="aspect-[14/10] w-full scale-110 object-cover grayscale-[0.3]"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
