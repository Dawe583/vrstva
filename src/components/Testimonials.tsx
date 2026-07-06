import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../site";
import { local } from "../media";

const EASE = [0.16, 1, 0.3, 1] as const;

function ArrowBtn({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="grid h-12 w-12 place-items-center rounded-full border border-mute2/60 text-mute transition-colors hover:border-paper hover:text-paper"
    >
      <svg
        viewBox="0 0 16 16"
        className={`h-4 w-4 ${dir === "right" ? "rotate-180" : ""}`}
        fill="none"
      >
        <path
          d="M10 3 5 8l5 5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (d: number) =>
    setI((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* soustředné kruhy na pozadí */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[60, 42, 26].map((v) => (
          <div
            key={v}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line2"
            style={{ width: `${v}vw`, height: `${v}vw` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink">
            <div className="grid md:min-h-[440px] md:grid-cols-[0.85fr_1.15fr]">
              <div className="relative aspect-[4/5] md:aspect-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={t.img}
                    src={local(t.img)}
                    alt=""
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-between gap-8 p-7 md:gap-10 md:p-11">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={t.quote}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="font-sans text-[clamp(17px,1.9vw,25px)] font-medium leading-[1.45] text-paper"
                  >
                    „{t.quote}"
                  </motion.blockquote>
                </AnimatePresence>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-lg text-paper">{t.name}</div>
                    <div className="mt-1 text-[13px] text-mute">{t.role}</div>
                  </div>
                  <div className="flex gap-3">
                    <ArrowBtn dir="left" onClick={() => go(-1)} />
                    <ArrowBtn dir="right" onClick={() => go(1)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
