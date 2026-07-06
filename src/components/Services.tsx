import {
  IconPencil,
  IconCode,
  IconPalette,
  IconChartArcs,
  IconSearch,
  IconBolt,
  IconDeviceMobile,
  IconAccessible,
  IconShoppingCart,
  IconWand,
} from "@tabler/icons-react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import TiltCard from "./TiltCard";
import Img from "./Img";
import { IMAGES } from "../images";

const CAPS = [
  { icon: IconBolt, label: "Rychlost & Core Web Vitals" },
  { icon: IconDeviceMobile, label: "Mobile-first přístup" },
  { icon: IconAccessible, label: "Přístupnost (a11y)" },
  { icon: IconShoppingCart, label: "E-commerce" },
  { icon: IconWand, label: "Mikrointerakce" },
  { icon: IconSearch, label: "Technické SEO" },
];

/* Bento: asymetrická mřížka služeb + pás schopností. Karty žijí:
   tilt + spotlight, hover zoom, reveal na scroll. */
export default function Services() {
  return (
    <section id="sluzby" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <span className="text-sm uppercase tracking-[0.16em] text-accent">Co děláme</span>
        <SplitText
          text="Od první skici po spuštění."
          className="mt-4 max-w-[16ch] font-display text-4xl font-medium tracking-tighter md:text-6xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Web design – velká fotka */}
          <Reveal className="md:col-span-7">
            <TiltCard className="h-full">
              <article
                data-cursor="view"
                className="group relative h-full min-h-[320px] overflow-hidden rounded-2xl md:min-h-[440px]"
              >
                <Img
                  pic={IMAGES.services.webdesign}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="grayscale-[0.4] transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="relative flex h-full min-h-[320px] flex-col justify-end p-7 md:min-h-[440px] md:p-9">
                  <IconPencil size={30} stroke={1.4} className="mb-4 text-accent" />
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">Web design</h3>
                  <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-paper/70 md:text-base">
                    Návrh, který odliší značku od konkurence a vede návštěvníka k akci.
                  </p>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {/* Vývoj – akcentní */}
          <Reveal delay={0.08} className="md:col-span-5">
            <TiltCard className="h-full">
              <article className="flex h-full min-h-[320px] flex-col justify-end rounded-2xl bg-gradient-to-br from-accent to-[#b03a17] p-7 md:min-h-[440px] md:p-9">
                <IconCode size={30} stroke={1.4} className="mb-4 text-ink" />
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">Vývoj</h3>
                <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-ink/80 md:text-base">
                  Rychlý a přístupný kód. React, headless CMS i e-shopy na míru.
                </p>
              </article>
            </TiltCard>
          </Reveal>

          {/* Branding */}
          <Reveal className="md:col-span-4">
            <TiltCard className="h-full">
              <article className="flex h-full min-h-[240px] flex-col justify-end rounded-2xl border border-line bg-ink2 p-7 md:p-9">
                <IconPalette size={30} stroke={1.4} className="mb-4 text-accent" />
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">Branding</h3>
                <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-paper/70 md:text-base">
                  Vizuální identita od loga po tón komunikace. Vše drží pohromadě.
                </p>
              </article>
            </TiltCard>
          </Reveal>

          {/* Stat buňka */}
          <Reveal delay={0.06} className="md:col-span-3">
            <div className="flex h-full min-h-[240px] flex-col justify-between rounded-2xl border border-line bg-ink3/60 p-7 md:p-9">
              <span className="text-sm text-mute">Průměrný dopad</span>
              <div>
                <div className="font-display text-5xl font-medium tracking-tighter text-accent md:text-6xl">
                  2,4×
                </div>
                <p className="mt-2 text-sm text-muteb">rychlejší růst konverzí po redesignu</p>
              </div>
            </div>
          </Reveal>

          {/* SEO – fotka */}
          <Reveal delay={0.1} className="md:col-span-5">
            <TiltCard className="h-full">
              <article
                data-cursor="view"
                className="group relative h-full min-h-[240px] overflow-hidden rounded-2xl"
              >
                <Img
                  pic={IMAGES.services.analytics}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="grayscale transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
                <div className="relative flex h-full min-h-[240px] flex-col justify-end p-7 md:p-9">
                  <IconChartArcs size={30} stroke={1.4} className="mb-4 text-accent" />
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">SEO a výkon</h3>
                  <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-paper/70 md:text-base">
                    Technické SEO, rychlost načítání a měření, které dává smysl.
                  </p>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {/* Pás schopností s Tabler ikonami */}
          <Reveal className="md:col-span-12">
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-ink2/50 p-5 sm:grid-cols-3 md:grid-cols-6 md:p-6">
              {CAPS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex flex-col gap-3 rounded-xl border border-line2 bg-ink/40 p-4 transition-colors hover:border-accent/40"
                >
                  <Icon
                    size={24}
                    stroke={1.5}
                    className="text-muteb transition-colors group-hover:text-accent"
                  />
                  <span className="text-sm leading-snug text-muteb">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
