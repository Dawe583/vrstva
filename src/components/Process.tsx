import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROCESS } from "../site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "center center"],
  });

  // Overlay panel odjede doprava a odkryje obsah pod ním.
  const overlayX = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);
  const lineScale = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 md:py-32">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-line bg-ink p-7 md:p-14"
      >
        {/* horní meta řádek */}
        <div className="flex items-center justify-between text-[13px] text-mute">
          <span className="lowercase">the name of our process</span>
          <span className="lowercase">progress &amp; timeline</span>
        </div>

        {/* progress linka se 3 uzly */}
        <div className="relative mt-16 md:mt-20">
          <div className="absolute left-0 top-[6px] h-px w-full bg-line" />
          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-0 top-[6px] h-px w-full origin-left bg-accent"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="relative pt-8"
              >
                <span className="absolute left-0 top-0 h-[13px] w-[13px] rounded-full border border-accent bg-ink" />
                <div className="font-display text-[13px] text-mute2">
                  0{i + 1}
                </div>
                <h3 className="mt-2 font-display text-2xl normal-case tracking-normal text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-mute">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* patka panelu */}
        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[48ch] text-[15px] leading-relaxed text-paper">
            A structured, flexible process built for fast-moving startups and
            modern brands.
          </p>
          <span className="font-display text-[64px] leading-none text-line">
            /03
          </span>
        </div>

        {/* odkrývací overlay */}
        <motion.div
          style={{ x: overlayX }}
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[#0a0a0a]"
        />
      </div>
    </section>
  );
}
