import { IconCheck, IconArrowUpRight } from "@tabler/icons-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import { scrollToId } from "../lenis";
import { PRICING } from "../content";

/** Ceník / balíčky jako bento karty se zvýrazněnou nabídkou. */
export default function Pricing() {
  return (
    <section id="cenik" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm uppercase tracking-[0.16em] text-accent">Ceník</span>
            <SplitText
              text="Jasná cena, žádná překvapení."
              className="mt-4 max-w-[18ch] font-display text-4xl font-medium tracking-tighter md:text-6xl"
            />
          </div>
          <Reveal>
            <p className="max-w-[36ch] text-muteb">
              Orientační ceny níže. Přesnou pevnou nabídku dostanete po úvodní konzultaci — vždy předem.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 transition-transform duration-500 hover:-translate-y-1 md:p-9 ${
                  p.featured
                    ? "border-accent/50 bg-gradient-to-b from-accent/[0.12] to-transparent"
                    : "border-line bg-ink2/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-medium tracking-tight">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-ink">
                      Nejoblíbenější
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muteb">{p.tagline}</p>
                <div className="mt-6 font-display text-3xl font-medium tracking-tighter text-accent md:text-4xl">
                  {p.price}
                </div>

                <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muteb">
                      <IconCheck size={18} stroke={2} className="mt-0.5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  onClick={() => scrollToId("#kontakt")}
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
                    p.featured
                      ? "bg-accent text-ink hover:bg-paper"
                      : "border border-line text-paper hover:border-paper/40"
                  }`}
                >
                  Chci nezávaznou nabídku
                  <IconArrowUpRight size={16} stroke={2} />
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
