import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { ArrowDownRight } from "@phosphor-icons/react";
import MagneticButton from "./MagneticButton";
import { scrollToId } from "../lenis";
import { EASE, amp } from "../motion";

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

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", `${amp(18)}%`]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // cursor glow nad heroem
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const sgx = useSpring(gx, { stiffness: 80, damping: 20 });
  const sgy = useSpring(gy, { stiffness: 80, damping: 20 });
  const glow = useTransform(
    [sgx, sgy],
    ([x, y]) => `radial-gradient(500px circle at ${x}% ${y}%, rgb(232 86 42 / 0.10), transparent 70%)`
  );

  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, [ready]);

  return (
    <section
      id="uvod"
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        gx.set((e.clientX / window.innerWidth) * 100);
        gy.set((e.clientY / window.innerHeight) * 100);
      }}
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0" />

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pt-24 md:grid-cols-12 md:px-10"
      >
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
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={ready ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
        >
          <motion.img
            src="https://picsum.photos/seed/vrstva-studio-hero/1400/1000"
            alt="Ukázka práce studia Vrstva"
            style={{ y: imgY }}
            className="aspect-[14/10] w-full scale-110 object-cover grayscale-[0.3]"
            loading="eager"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
