import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { IconArrowDownRight } from "@tabler/icons-react";
import MagneticButton from "./MagneticButton";
import HeroCanvas from "./HeroCanvas";
import Img from "./Img";
import { scrollToId } from "../lenis";
import { EASE, amp } from "../motion";
import { IMAGES } from "../images";

const ROTATING = ["pamatují.", "vydělávají.", "odliší.", "posunou dál."];

function Line({ text, delay, ready }: { text: string; delay: number; ready: boolean }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={ready ? { y: 0 } : undefined}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/** Živé pražské hodiny (HH:MM:SS). */
function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Prague",
      }).format(new Date());
    setT(fmt());
    const i = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="tabular-nums">
      {t} <span className="text-mute">Praha</span>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", `${amp(18)}%`]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, [ready]);

  return (
    <section id="uvod" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      {/* živé WebGL pozadí */}
      <motion.div style={{ y: canvasY, opacity: fade }} className="absolute inset-0">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pt-28 md:grid-cols-12 md:px-10 md:pt-32"
      >
        {/* horní meta lišta */}
        <div className="md:col-span-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-8 flex flex-wrap items-center justify-between gap-4 text-[13px] text-paper/80"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/30 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Přijímáme projekty na Q4 2026
            </span>
            <span className="hidden md:inline">
              <Clock />
            </span>
          </motion.div>
        </div>

        <div className="md:col-span-12">
          <h1 className="font-display text-[13vw] font-medium leading-[0.95] tracking-tighter md:text-[7.5vw]">
            <Line text="Weby, které si" delay={0.1} ready={ready} />
            <span className="block overflow-hidden pb-1">
              <span className="inline-flex flex-wrap items-baseline gap-x-[0.3em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={ready ? { y: 0 } : undefined}
                  transition={{ duration: 1, delay: 0.22, ease: EASE }}
                >
                  lidé
                </motion.span>
                <span className="relative inline-block overflow-hidden text-accent">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={idx}
                      className="inline-block"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-110%" }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      {ROTATING[idx]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </span>
          </h1>
        </div>

        <motion.div
          className="order-2 md:order-1 md:col-span-5 md:self-end md:pb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          <p className="max-w-[42ch] text-base leading-relaxed text-muteb md:text-lg">
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
              <IconArrowDownRight size={16} stroke={2} />
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="order-1 md:order-2 md:col-span-6 md:col-start-7"
          data-cursor="view"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={ready ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
        >
          <motion.div style={{ y: imgY }} className="overflow-hidden">
            <Img
              pic={IMAGES.hero}
              eager
              className="aspect-[14/10] w-full"
              imgClassName="grayscale-[0.25] scale-105"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll indikátor */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-mute md:flex"
      >
        Scrolluj
        <span className="h-9 w-px origin-top animate-[sd_1.8s_ease-in-out_infinite] bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
