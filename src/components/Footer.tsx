import { scrollToId } from "../lenis";
import { NAV_LINKS } from "../site";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-line px-5 pb-10 pt-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-[36ch]">
            <button
              onClick={() => scrollToId("#top")}
              className="font-display text-2xl tracking-tight text-paper"
            >
              vrstva<span className="text-accent">.</span>
            </button>
            <p className="mt-4 text-[14px] leading-relaxed text-mute">
              Kreativní studio pro technologické značky. Strategie, design a
              vývoj pod jednou střechou.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="mb-4 text-[12px] uppercase tracking-[0.16em] text-mute2">
                Menu
              </div>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollToId(l.id)}
                      className="text-[14px] text-mute transition-colors hover:text-paper"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[12px] uppercase tracking-[0.16em] text-mute2">
                Contact
              </div>
              <ul className="space-y-2.5 text-[14px] text-mute">
                <li>
                  <a
                    href="mailto:ahoj@vrstva.studio"
                    className="transition-colors hover:text-paper"
                  >
                    ahoj@vrstva.studio
                  </a>
                </li>
                <li>Praha, CZ</li>
                <li>
                  <button
                    onClick={() => scrollToId("#cta")}
                    className="transition-colors hover:text-paper"
                  >
                    Start a project
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* velký wordmark */}
        <div className="mt-16 border-t border-line pt-8">
          <div className="font-display text-[clamp(60px,18vw,240px)] leading-[0.85] text-line">
            vrstva
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-[12px] text-mute2 md:flex-row md:items-center md:justify-between">
          <span>© {year} Vrstva. All rights reserved.</span>
          <span>Made in Prague</span>
        </div>
      </div>
    </footer>
  );
}
