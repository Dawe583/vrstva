import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import SplitText from "./SplitText";
import Reveal from "./Reveal";

const ITEMS = [
  {
    q: "Kolik stojí nový web?",
    a: "Cena vychází z rozsahu. Jednoduchá prezentace startuje kolem 60 tisíc, komplexní web s vlastním designem a napojením na systémy se pohybuje výš. Vždy dostanete pevnou nabídku předem, žádná překvapení.",
  },
  {
    q: "Jak dlouho tvorba trvá?",
    a: "Prezentační web bývá hotový za 4 až 6 týdnů, rozsáhlejší projekty za 8 až 12 týdnů. Termín potvrdíme hned po úvodní analýze.",
  },
  {
    q: "Postaráte se i o texty a fotky?",
    a: "Ano. Umíme dodat copywriting, art direction i produkci fotografií. Nebo navážeme na podklady, které už máte.",
  },
  {
    q: "Co web po spuštění?",
    a: "Nabízíme správu, měření výkonu a průběžnou optimalizaci. Web není hotový spuštěním, tam teprve začíná vydělávat.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-7 text-left md:py-8"
      >
        <span className="font-display text-xl font-medium tracking-tight md:text-2xl">{q}</span>
        <Plus
          size={26}
          weight="light"
          className={`shrink-0 text-accent transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      {/* grid 0fr->1fr: plynulé rozbalení bez měření výšky, běží všude */}
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pb-8 leading-relaxed text-mute">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <SplitText
            text="Časté dotazy"
            className="font-display text-4xl font-medium tracking-tighter md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[34ch] text-mute">
              Nenašli jste odpověď? Napište nám, rádi vše probereme.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          {ITEMS.map((it) => (
            <Item key={it.q} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
