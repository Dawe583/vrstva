import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";

/**
 * Živé pozadí celého webu: pomalu plující aurora blobs (accent + neutrál),
 * jemně reagují na scroll. Fixní vrstva, jen transform/opacity => levné na GPU,
 * plyne i na slabších telefonech. Drží tmavé téma a jeden akcent.
 */
export default function LiveBackground() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  const y1 = useTransform(p, [0, 1], ["-8%", "22%"]);
  const y2 = useTransform(p, [0, 1], ["12%", "-18%"]);
  const hue = useTransform(p, [0, 1], [0, 26]);

  // jemná reakce na pohyb kurzoru (desktop)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const cx = useTransform(smx, [0, 1], ["-6%", "6%"]);
  const cy = useTransform(smy, [0, 1], ["-6%", "6%"]);

  const ref = useRef<HTMLDivElement>(null);
  useMotionValueEvent(hue, "change", () => {});

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
      }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      <motion.div
        style={{ y: y1, x: cx }}
        className="absolute -left-[10%] top-[-15%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.16] blur-[100px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_60%)]" />
      </motion.div>
      <motion.div
        style={{ y: y2, x: cy }}
        className="absolute right-[-15%] top-[35%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.10] blur-[110px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#3a4d6b,transparent_60%)]" />
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[-20%] left-[30%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.08] blur-[120px]"
      >
        <div className="aurora-drift h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_65%)]" />
      </motion.div>
    </div>
  );
}
