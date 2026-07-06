import { PenNib, Code, Palette, ChartLineUp } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import TiltCard from "./TiltCard";

/* Bento: 4 služby, 4 buňky, asymetrická mřížka s vizuální variací.
   Karty žijí: tilt + spotlight na kurzor, hover zoom, reveal na scroll. */
export default function Services() {
  return (
    <section id="sluzby" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SplitText
          text="Od první skici po spuštění."
          className="max-w-[16ch] font-display text-4xl font-medium tracking-tighter md:text-6xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <TiltCard className="h-full">
              <article className="group relative h-full min-h-[320px] overflow-hidden md:min-h-[420px]">
                <img
                  src="https://picsum.photos/seed/vrstva-webdesign/1200/800"
                  alt="Ukázka web designu"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[0.4] transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="relative flex h-full min-h-[320px] flex-col justify-end p-7 md:min-h-[420px] md:p-9">
                  <PenNib size={30} weight="light" className="mb-4 text-accent" />
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                    Web design
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-paper/70 md:text-base">
                    Návrh, který odliší značku od konkurence a vede návštěvníka k akci.
                  </p>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-5">
            <TiltCard className="h-full">
              <article className="flex h-full min-h-[320px] flex-col justify-end bg-gradient-to-br from-accent to-[#b03a17] p-7 md:min-h-[420px] md:p-9">
                <Code size={30} weight="light" className="mb-4 text-ink" />
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                  Vývoj
                </h3>
                <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-ink/80 md:text-base">
                  Rychlý a přístupný kód. React, headless CMS i e-shopy na míru.
                </p>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal className="md:col-span-5">
            <TiltCard className="h-full">
              <article className="flex h-full min-h-[280px] flex-col justify-end border border-line bg-ink2 p-7 md:p-9">
                <Palette size={30} weight="light" className="mb-4 text-accent" />
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                  Branding
                </h3>
                <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-paper/70 md:text-base">
                  Vizuální identita od loga po tón komunikace. Vše drží pohromadě.
                </p>
              </article>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-7">
            <TiltCard className="h-full">
              <article className="group relative h-full min-h-[280px] overflow-hidden">
                <img
                  src="https://picsum.photos/seed/vrstva-analytics/1200/600"
                  alt="Měření výkonu webu"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-7 md:p-9">
                  <ChartLineUp size={30} weight="light" className="mb-4 text-accent" />
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                    SEO a výkon
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-paper/70 md:text-base">
                    Technické SEO, rychlost načítání a měření, které dává smysl.
                  </p>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
