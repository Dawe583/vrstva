import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tag = "div" | "span" | "li" | "section";

/**
 * Základní vstupní animace — obsah nastoupí zdola s fade při scrollu do
 * viewportu. `once` drží blok trvale viditelný, takže tu nikdy nezůstane
 * „prázdný" stav jako v předchozím buildu.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
