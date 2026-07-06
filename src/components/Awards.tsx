import { IconAward, IconTrophy, IconStarFilled, IconFlame } from "@tabler/icons-react";
import Reveal from "./Reveal";

const AWARDS = [
  { icon: IconTrophy, title: "Site of the Day", org: "Awwwards", n: "×3" },
  { icon: IconAward, title: "Honorable Mention", org: "CSS Design Awards", n: "×5" },
  { icon: IconFlame, title: "FWA of the Day", org: "The FWA", n: "×1" },
  { icon: IconStarFilled, title: "Hodnocení klientů", org: "Průměr z referencí", n: "4,9/5" },
];

/** Pruh ocenění a uznání — zvedá vnímanou hodnotu studia. */
export default function Awards() {
  return (
    <section aria-label="Ocenění" className="border-y border-line py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm uppercase tracking-[0.16em] text-mute">Uznání a ocenění</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {AWARDS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-ink2/40 p-6 transition-colors hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <a.icon size={26} stroke={1.5} className="text-accent" />
                  <span className="font-display text-xl font-medium tracking-tight text-paper/90">{a.n}</span>
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-lg font-medium tracking-tight">{a.title}</h3>
                  <p className="mt-1 text-sm text-mute">{a.org}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
