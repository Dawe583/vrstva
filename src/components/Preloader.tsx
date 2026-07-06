import { useEffect, useState } from "react";
import { motion, animate } from "motion/react";
import { EASE, EASE_INOUT } from "../motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 md:px-10 md:py-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE_INOUT }}
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-display text-lg font-medium tracking-tight"
      >
        Vrstva<span className="text-accent">.</span>
      </motion.span>

      <div className="flex items-end justify-between">
        <span className="max-w-[24ch] text-sm text-mute">
          Designové studio pro značky, které to myslí vážně.
        </span>
        <span className="font-display text-7xl font-medium leading-none tracking-tighter md:text-[12rem]">
          {n}
        </span>
      </div>

      {/* progress linka */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
        style={{ width: `${n}%` }}
      />
    </motion.div>
  );
}
