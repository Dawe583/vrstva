import Reveal from "./Reveal";
import FrameReveal from "./FrameReveal";
import { PROJECTS, type Project } from "../site";

/** Nadpis „featured / works" — dvě řádky velkých verzálek. */
function Heading() {
  return (
    <div className="mb-14 md:mb-20">
      {["vybrané", "práce"].map((w, i) => (
        <Reveal key={w} delay={i * 0.08}>
          <h2 className="font-display text-[clamp(56px,13vw,180px)] leading-[0.9] text-paper">
            {w}
          </h2>
        </Reveal>
      ))}
    </div>
  );
}

/** Text s reveal písmen na hover (dvě zrcadlené kopie ve svislé masce). */
function LetterReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="cw-mask h-[1.1em] leading-[1.1em]" aria-hidden>
          <span
            className="cw-col flex flex-col"
            style={{ transitionDelay: `${i * 16}ms` }}
          >
            <span>{ch === " " ? " " : ch}</span>
            <span>{ch === " " ? " " : ch}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

function Arrow() {
  return (
    <span className="relative block h-5 w-5 overflow-hidden">
      <svg
        viewBox="0 0 21 21"
        className="absolute inset-0 h-5 w-5 translate-x-0 translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:translate-x-full"
        fill="none"
      >
        <path
          d="M20.98 1.17v15.16a1.17 1.17 0 0 1-2.33 0V3.98L1.97 20.66a1.17 1.17 0 1 1-1.65-1.65L17 2.33H4.65a1.17 1.17 0 0 1 0-2.33h15.16c.64 0 1.17.52 1.17 1.17Z"
          fill="#ff531a"
        />
      </svg>
      <svg
        viewBox="0 0 21 21"
        className="absolute inset-0 h-5 w-5 -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
        fill="none"
      >
        <path
          d="M20.98 1.17v15.16a1.17 1.17 0 0 1-2.33 0V3.98L1.97 20.66a1.17 1.17 0 1 1-1.65-1.65L17 2.33H4.65a1.17 1.17 0 0 1 0-2.33h15.16c.64 0 1.17.52 1.17 1.17Z"
          fill="#ff531a"
        />
      </svg>
    </span>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <a
      href={`#work`}
      className="group block"
      onClick={(e) => e.preventDefault()}
    >
      <div className="mb-4 flex items-center justify-between text-[13px] text-mute">
        <span className="lowercase">{p.category}</span>
        <span>{p.year}</span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line">
        <img
          src={p.img}
          alt={p.title}
          width={1200}
          height={750}
          className="h-full w-full transform-gpu object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          decoding="async"
        />
        <FrameReveal />
      </div>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <LetterReveal
            text={p.brand}
            className="flex text-[13px] lowercase text-mute2"
          />
          <LetterReveal
            text={p.title}
            className="mt-1 flex font-display text-[22px] text-paper"
          />
        </div>
        <Arrow />
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1320px] px-5 py-24 md:py-32">
      <Heading />
      <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Reveal key={p.slug} amount={0.2}>
            <Card p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
