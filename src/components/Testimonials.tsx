import { IconStarFilled, IconQuote } from "@tabler/icons-react";
import SplitText from "./SplitText";
import Avatar from "./Avatar";

const QUOTES = [
  {
    text: "Nový web nám během tří měsíců zdvojnásobil počet poptávek. Spolupráce byla přesná a rychlá.",
    name: "Tereza Vlachová",
    role: "Marketingová ředitelka, Bystrá",
    seed: 1,
  },
  {
    text: "Konečně web, který vypadá jako my. Vrstva pochopila naši značku dřív než my sami.",
    name: "Ondřej Roubal",
    role: "Majitel, Roubal a syn",
    seed: 0,
  },
  {
    text: "Rezervace nám vzlétly. A hlavně — hosté píšou, že web je zážitek sám o sobě.",
    name: "Petra Malá",
    role: "Provozní, hotel Mezanin",
    seed: 3,
  },
  {
    text: "Rychlost, detail a nula výmluv. Přesně tým, se kterým chcete stavět značku.",
    name: "Jan Kotek",
    role: "Zakladatel, Atelier HM",
    seed: 2,
  },
];

function Card({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <figure className="mx-3 flex w-[85vw] shrink-0 flex-col justify-between rounded-2xl border border-line bg-ink2/50 p-7 sm:w-[440px] md:p-8">
      <div>
        <IconQuote size={30} stroke={1.4} className="mb-4 text-accent" />
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStarFilled key={i} size={15} className="text-accent" />
          ))}
        </div>
        <blockquote className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
          „{q.text}"
        </blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3">
        <Avatar name={q.name} seed={q.seed} className="h-11 w-11 text-sm" />
        <div className="text-sm">
          <div className="text-paper">{q.name}</div>
          <div className="text-mute">{q.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

/** Reference jako živý pás karet (auto-scroll, pauza na hover). */
export default function Testimonials() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section aria-label="Reference" className="overflow-hidden border-y border-line py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-[1400px] px-6 md:px-10">
        <span className="text-sm uppercase tracking-[0.16em] text-accent">Reference</span>
        <SplitText
          text="Co říkají klienti."
          className="mt-4 font-display text-4xl font-medium tracking-tighter md:text-6xl"
        />
      </div>
      <div className="group flex overflow-hidden">
        <div className="marquee-track flex w-max [animation-duration:40s] group-hover:[animation-play-state:paused]">
          {row.map((q, i) => (
            <Card key={i} q={q} />
          ))}
        </div>
      </div>
    </section>
  );
}
