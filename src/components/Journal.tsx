import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import MeshTile from "./MeshTile";
import Article from "./Article";
import { JOURNAL, type Article as ArticleT } from "../content";

/** Journal / blog — náhledy článků s generovanými animovanými vizuály.
    Klik otevře detail článku v overlay. */
export default function Journal() {
  const [active, setActive] = useState<ArticleT | null>(null);

  return (
    <section id="journal" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm uppercase tracking-[0.16em] text-accent">Journal</span>
            <SplitText
              text="Co nás zrovna baví."
              className="mt-4 font-display text-4xl font-medium tracking-tighter md:text-6xl"
            />
          </div>
          <Reveal>
            <button
              onClick={() => setActive(JOURNAL[0])}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 text-sm text-muteb transition-colors hover:text-paper"
            >
              Všechny články
              <IconArrowUpRight
                size={16}
                stroke={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {JOURNAL.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <button
                onClick={() => setActive(a)}
                data-cursor="view"
                className="group block w-full text-left"
              >
                <div className="overflow-hidden rounded-xl">
                  <MeshTile
                    seed={a.seed}
                    motif={a.motif}
                    className="aspect-[16/10] w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs text-mute">
                  <span className="rounded-full border border-line px-2.5 py-1 text-accent">{a.cat}</span>
                  <span>{a.date}</span>
                  <span>· {a.read} čtení</span>
                </div>
                <h3 className="mt-3 max-w-[24ch] font-display text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                  {a.title}
                </h3>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <Article article={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
