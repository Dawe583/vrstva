import { IconArrowUpRight } from "@tabler/icons-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Img from "./Img";
import { JOURNAL } from "../content";

/** Journal / blog — náhledy článků se zoom-obrázky. */
export default function Journal() {
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
            <a
              href="#journal"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 text-sm text-muteb transition-colors hover:text-paper"
            >
              Všechny články
              <IconArrowUpRight
                size={16}
                stroke={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {JOURNAL.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <a href="#journal" data-cursor="view" className="group block">
                <div className="overflow-hidden rounded-xl">
                  <Img
                    pic={a.pic}
                    className="aspect-[16/10] w-full"
                    imgClassName="grayscale-[0.3] transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
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
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
