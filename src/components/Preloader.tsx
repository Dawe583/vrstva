import { useEffect, useState } from "react";
import { motion, animate } from "motion/react";
import { EASE, EASE_INOUT } from "../motion";

const COLS = 5;
const WORD = "Vrstva".split("");

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 300),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex"
      initial="show"
      animate="show"
      exit="hide"
    >
      {/* sloupcová clona (wipe zdola nahoru se staggerem) */}
      {Array.from({ length: COLS }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1 bg-ink"
          variants={{
            show: { y: 0 },
            hide: {
              y: "-100%",
              transition: { duration: 0.7, ease: EASE_INOUT, delay: 0.35 + i * 0.06 },
            },
          }}
        />
      ))}

      {/* obsah nad clonou */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between px-6 py-6 md:px-10 md:py-8"
        variants={{ show: { opacity: 1 }, hide: { opacity: 0, transition: { duration: 0.3 } } }}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-medium tracking-tight">
            {WORD.map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: EASE }}
              >
                {c}
              </motion.span>
            ))}
            <span className="text-accent">.</span>
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs uppercase tracking-[0.2em] text-mute"
          >
            Načítáme zážitek
          </motion.span>
        </div>

        <div className="flex items-end justify-between">
          <span className="max-w-[24ch] text-sm text-mute">
            Designové studio pro značky, které to myslí vážně.
          </span>
          <span className="font-display text-7xl font-medium leading-none tracking-tighter tabular-nums md:text-[12rem]">
            {n}
          </span>
        </div>

        {/* progress linka */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent" style={{ width: `${n}%` }} />
      </motion.div>
    </motion.div>
  );
}
