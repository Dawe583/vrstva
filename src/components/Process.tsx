import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    name: "Analýza",
    text: "Poznáme vaši značku, zákazníky a konkurenci. Definujeme, co má web vydělat.",
  },
  {
    n: "02",
    name: "Design",
    text: "Navrhneme vizuální směr a prototyp. Ladíme, dokud nesedí každý detail.",
  },
  {
    n: "03",
    name: "Vývoj",
    text: "Postavíme rychlý a přístupný web s animacemi, které mu dají život.",
  },
  {
    n: "04",
    name: "Spuštění",
    text: "Nasadíme, změříme a dál optimalizujeme. Web spuštěním nekončí, začíná.",
  },
];

export default function Process() {
  return (
    <section id="proces" className="py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl font-medium tracking-tighter md:text-6xl">
            Jak pracujeme
          </h2>
        </Reveal>
        <div className="mt-16">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="grid grid-cols-12 items-baseline gap-4 border-t border-line py-8 md:py-10">
                <span className="col-span-2 font-display text-xl text-accent md:text-2xl">
                  {s.n}
                </span>
                <h3 className="col-span-10 font-display text-3xl font-medium tracking-tight md:col-span-4 md:text-4xl">
                  {s.name}
                </h3>
                <p className="col-span-10 col-start-3 max-w-[52ch] leading-relaxed text-mute md:col-span-6 md:col-start-7">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
