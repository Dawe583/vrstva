import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Odkrytí obrázku „po pruzích" — čtyři svislé stínové rámy se při scrollu
 * do viewportu postupně stáhnou (stejný efekt jako First–Fourth Frame
 * v referenci). Animuje se jen transform => běží plynule i na mobilu.
 */
export default function FrameReveal() {
  return (
    <div className="pointer-events-none absolute inset-0 flex" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.07 * i, ease: EASE }}
          style={{ transformOrigin: "top" }}
          className="h-full flex-1 bg-ink"
        />
      ))}
    </div>
  );
}
