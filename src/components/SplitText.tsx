import { type ElementType } from "react";
import { motion } from "motion/react";
import { EASE } from "../motion";

/**
 * Nadpis s reveal animací slovo po slově (maska + posun zdola).
 * Běží na všech zařízeních (whileInView). Jeden konzistentní pohyb pro celý web.
 */
export default function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span className="inline-block" variants={word}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
