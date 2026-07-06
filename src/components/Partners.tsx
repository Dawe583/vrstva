import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import Reveal from "./Reveal";
import { PARTNERS } from "../site";

/** Číslo, které se dopočítá při scrollu do viewportu. */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-[32px] tabular-nums text-paper">
      {n}
      {suffix}
    </span>
  );
}

export default function Partners() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 md:py-32">
      <Reveal>
        <h2 className="max-w-[18ch] font-display text-[clamp(30px,4vw,54px)] leading-[1.05] text-paper">
          Partnering with startups and tech teams shaping the future.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PARTNERS.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.08}
            className="rounded-2xl border border-line bg-ink p-7"
          >
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              width={p.logoW}
              height={p.logoH}
              className="h-6 w-auto object-contain opacity-90"
              loading="lazy"
            />
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[p.left, p.right].map((stat, j) => (
                <div key={j}>
                  <CountUp to={stat.value} suffix={stat.suffix} />
                  <div className="mt-1.5 text-[13px] text-mute">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
