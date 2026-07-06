import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SplitText from "./SplitText";
import { EASE } from "../motion";

const STEPS = [
  {
    n: "01",
    name: "Analýza",
    text: "Poznáme vaši značku, zákazníky a konkurenci. Definujeme, co má web vydělat.",
  },
  {
    n: "02",
    name: "Design",
    text: "Navrhneme vizuální směr a prototyp. Ladíme, dokud nesedí každý detail.",
  },
  {
    n: "03",
    name: "Vývoj",
    text: "Postavíme rychlý a přístupný web s animacemi, které mu dají život.",
  },
  {
    n: "04",
    name: "Spuštění",
    text: "Nasadíme, změříme a dál optimalizujeme. Web spuštěním nekončí, začíná.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  // svislá linka se "kreslí" podle scrollu
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="proces" className="py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SplitText
          text="Jak pracujeme"
          className="font-display text-4xl font-medium tracking-tighter md:text-6xl"
        />
        <div ref={ref} className="relative mt-16 pl-6 md:pl-0">
          {/* animovaná linka (mobil vlevo, desktop schovaná do gridu) */}
          <div className="absolute left-0 top-0 h-full w-px bg-line md:left-[8.33%]">
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
              className="grid grid-cols-12 items-baseline gap-4 border-t border-line py-8 md:py-10"
            >
              <span className="col-span-2 font-display text-xl text-accent md:text-2xl">
                {s.n}
              </span>
              <h3 className="col-span-10 font-display text-3xl font-medium tracking-tight md:col-span-4 md:text-4xl">
                {s.name}
              </h3>
              <p className="col-span-10 col-start-3 max-w-[52ch] leading-relaxed text-mute md:col-span-6 md:col-start-7">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
