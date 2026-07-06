import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "motion/react";

const ITEMS = ["Web design", "E-shopy", "Branding", "Vývoj", "Animace", "SEO a výkon"];

export default function Marquee() {
  // skew podle rychlosti scrollu (Awwwards efekt), běží na všech zařízeních
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 300, damping: 50 });
  const skew = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: true });

  const row = ITEMS.map((t) => (
    <span key={t} className="flex items-center gap-8 pr-8 md:gap-14 md:pr-14">
      <span className="font-display text-4xl font-medium tracking-tight text-paper/90 md:text-6xl">
        {t}
      </span>
      <span aria-hidden className="text-accent">
        ✦
      </span>
    </span>
  ));

  return (
    <section aria-label="Naše služby" className="overflow-hidden border-y border-line py-8 md:py-10">
      <motion.div style={{ skewX: skew }} className="flex">
        <div className="marquee-track flex w-max shrink-0">
          <div className="flex">{row}</div>
          <div className="flex" aria-hidden>
            {row}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
