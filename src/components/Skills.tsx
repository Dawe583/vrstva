import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import { SKILLS, type Skill } from "../site";
import { local, fallback } from "../media";

/** Jeden řádek dovednosti — slova se scrollem sjíždějí ke středu a mezi ně
 *  „vyroste" obrázek. Scrub v obou směrech, vrchol přesně uprostřed obrazovky. */
function Row({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [64, 0, 64]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [-64, 0, -64]);
  const wordOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.45, 1, 0.45]);
  const imgScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-4 border-b border-line py-6 md:gap-8 md:py-8"
    >
      <motion.h3
        style={{ x: leftX, opacity: wordOpacity }}
        className="flex-1 text-right font-display text-[clamp(28px,6.5vw,84px)] text-paper"
      >
        {skill.left}
      </motion.h3>

      <motion.div
        style={{ scale: imgScale, opacity: imgOpacity }}
        className="h-[64px] w-[48px] shrink-0 overflow-hidden rounded-md md:h-[132px] md:w-[100px]"
      >
        <img
          src={local(skill.img)}
          onError={fallback(skill.img)}
          alt=""
          className="h-full w-full object-cover"
          decoding="async"
        />
      </motion.div>

      <motion.h3
        style={{ x: rightX, opacity: wordOpacity }}
        className="flex-1 text-left font-display text-[clamp(28px,6.5vw,84px)] text-paper"
      >
        {skill.right}
      </motion.h3>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1320px] px-5 py-24 md:py-32">
      <Reveal>
        <h2 className="text-center font-display text-[clamp(40px,8vw,110px)] text-paper">
          co umíme
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 flex max-w-[900px] flex-col gap-6 text-[15px] leading-relaxed text-paper md:flex-row md:justify-between">
          <p className="max-w-[34ch]">
            Kreativní a digitální řešení navržená pro moderní značky a
            technologické startupy.
          </p>
          <p className="max-w-[42ch] text-mute">
            Poskytujeme kreativní služby, které značkám pomáhají komunikovat,
            zrychlit a odlišit se — práci, jež podporuje růst, konzistenci a
            dlouhodobou hodnotu značky.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 border-t border-line">
        {SKILLS.map((s) => (
          <Row key={`${s.left}-${s.right}`} skill={s} />
        ))}
      </div>
    </section>
  );
}
