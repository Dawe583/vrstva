import Reveal from "./Reveal";

const QUOTES = [
  {
    text: "„Nový web nám během tří měsíců zdvojnásobil počet poptávek. Spolupráce byla přesná a rychlá.“",
    name: "Tereza Vlachová",
    role: "marketingová ředitelka, Bystrá",
  },
  {
    text: "„Konečně web, který vypadá jako my. Vrstva pochopila naši značku dřív než my sami.“",
    name: "Ondřej Roubal",
    role: "majitel, Roubal a syn",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-2">
        {QUOTES.map((q, i) => (
          <Reveal
            key={q.name}
            delay={i * 0.08}
            className={`px-6 py-16 md:px-14 md:py-24 ${i === 1 ? "border-t border-line md:border-l md:border-t-0" : ""}`}
          >
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              {q.text}
            </blockquote>
            <footer className="mt-8 text-sm text-mute">
              <span className="text-paper">{q.name}</span>
              <br />
              {q.role}
            </footer>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
