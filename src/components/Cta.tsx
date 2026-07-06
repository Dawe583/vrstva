import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MEDIA } from "../site";
import { local } from "../media";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);

  return (
    <section id="cta" ref={ref} className="px-5 py-28 md:py-40">
      <motion.div
        style={{ scale, opacity }}
        className="relative mx-auto flex max-w-[1200px] flex-col items-center"
      >
        {/* diagonální akcentové linky */}
        {[
          { rot: 0, w: "62%", delay: 0 },
          { rot: -18, w: "70%", delay: 0.12 },
          { rot: 17, w: "70%", delay: 0.24 },
        ].map((l, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: l.delay, ease: EASE }}
            className="cta-line"
            style={{
              width: l.w,
              transform: `translate(-50%,-50%) rotate(${l.rot}deg)`,
            }}
          />
        ))}

        <h2 className="relative font-display text-[clamp(56px,13vw,180px)] leading-[0.9] text-paper">
          Pojďme
        </h2>

        <div className="relative my-6 flex flex-col items-center gap-6 md:my-8 md:flex-row">
          {/* Video se na hover roztáhne do výšky — stejně jako v předloze */}
          <div className="h-[22vh] w-[min(300px,70vw)] overflow-hidden rounded-lg border border-line transition-[height] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:h-[36vh]">
            <video
              src={local(MEDIA.ctaVideo)}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
          <a
            href="mailto:ahoj@vrstva.studio"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Kontakt
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
              <path
                d="M11.25.63v8.12a.63.63 0 0 1-1.25 0V2.13L1.07 11.07A.63.63 0 0 1 .18 10.18L9.12 1.25H2.5a.63.63 0 0 1 0-1.25h8.13c.34 0 .62.28.62.63Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        <h2 className="relative font-display text-[clamp(56px,13vw,180px)] leading-[0.9] text-paper">
          spolupracovat
        </h2>
      </motion.div>
    </section>
  );
}
