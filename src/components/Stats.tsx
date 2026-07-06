import { useEffect, useRef, useState } from "react";

const STATS = [
  { to: 48, suffix: "+", label: "dokončených projektů" },
  { to: 12, suffix: " let", label: "zkušeností v oboru" },
  { to: 98, suffix: " %", label: "spokojených klientů" },
  { to: 2.4, suffix: "×", label: "průměrný růst konverzí", dec: 1 },
];

/** Odpočet nahoru přes IntersectionObserver + rAF. Nativní, běží na všech zařízeních. */
function Counter({ to, suffix, dec = 0 }: { to: number; suffix: string; dec?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setVal(to * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val.toFixed(dec)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section aria-label="Čísla" className="border-y border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-14 px-6 md:grid-cols-4 md:px-10">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-display text-5xl font-medium tracking-tighter text-accent md:text-7xl">
              <Counter to={s.to} suffix={s.suffix} dec={s.dec} />
            </div>
            <p className="mt-3 max-w-[22ch] text-sm leading-snug text-mute md:text-base">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
