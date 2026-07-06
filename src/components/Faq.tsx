import { useState } from "react";
import Reveal from "./Reveal";
import { FAQ } from "../site";

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-line last:border-b">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="font-display text-[clamp(18px,2vw,24px)] normal-case tracking-normal text-paper">
          {q}
        </span>
        <span className="relative grid h-6 w-6 shrink-0 place-items-center">
          <span className="absolute h-[1.5px] w-4 bg-paper" />
          <span
            className={`absolute h-4 w-[1.5px] bg-paper transition-transform duration-500 ${
              open ? "rotate-90" : ""
            }`}
          />
        </span>
      </button>
      <div className={`acc-panel ${open ? "open" : ""}`}>
        <div className="acc-inner">
          <p className="max-w-[70ch] pb-7 text-[15px] leading-relaxed text-mute">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-[1000px] px-5 py-24 md:py-32">
      <div className="mb-14 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(40px,7vw,104px)] leading-[1.05] text-paper">
            Časté dotazy
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-[15px] text-mute">Jasné odpovědi. Žádné dohady.</p>
        </Reveal>
      </div>

      <Reveal>
        <div>
          {FAQ.map((f, i) => (
            <Item
              key={f.q}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
