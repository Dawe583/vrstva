import { useEffect, useState } from "react";
import { motion, animate, useReducedMotion } from "motion/react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    });
    return () => controls.stop();
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-between bg-ink px-6 pb-6 md:px-10 md:pb-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <span className="font-display text-lg font-medium tracking-tight">
        Vrstva<span className="text-accent">.</span>
      </span>
      <span className="font-display text-7xl font-medium leading-none tracking-tighter md:text-9xl">
        {n}
      </span>
    </motion.div>
  );
}
