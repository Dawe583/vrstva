import { scrollToId } from "../lenis";

const LINKS = [
  { label: "Studio", id: "#studio" },
  { label: "Služby", id: "#sluzby" },
  { label: "Práce", id: "#prace" },
  { label: "Kontakt", id: "#kontakt" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[90] bg-gradient-to-b from-ink/90 to-transparent">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-[72px] md:px-10">
        <button
          onClick={() => scrollToId("#uvod")}
          className="font-display text-lg font-medium tracking-tight"
        >
          Vrstva<span className="text-accent">.</span>
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollToId("#kontakt")}
          className="rounded-full border border-line px-4 py-2 text-sm text-paper transition-colors hover:border-paper/40 md:hidden"
        >
          Kontakt
        </button>
      </nav>
    </header>
  );
}
