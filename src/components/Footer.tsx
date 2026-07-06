import { useEffect, useRef, useState } from "react";
import {
  IconBrandInstagram,
  IconBrandBehance,
  IconBrandDribbble,
  IconBrandLinkedin,
  IconArrowUp,
} from "@tabler/icons-react";
import MagneticButton from "./MagneticButton";
import { scrollToId } from "../lenis";

const WORD = "VRSTVA".split("");
const SOCIAL = [
  { icon: IconBrandInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: IconBrandBehance, label: "Behance", href: "https://behance.net" },
  { icon: IconBrandDribbble, label: "Dribbble", href: "https://dribbble.com" },
  { icon: IconBrandLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

/** Živý pražský čas HH:MM. */
function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Prague",
      }).format(new Date());
    setT(fmt());
    const i = setInterval(() => setT(fmt()), 1000 * 20);
    return () => clearInterval(i);
  }, []);
  return t;
}

export default function Footer() {
  const wordRef = useRef<HTMLDivElement>(null);
  const time = useClock();

  // kinetický wordmark: písmena se naklánějí podle blízkosti kurzoru
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !wordRef.current) return;
    const letters = wordRef.current.querySelectorAll<HTMLElement>("span");
    letters.forEach((l) => {
      const r = l.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 1 - dist * 2.2);
      l.style.transform = `translateY(${-pull * 18}px)`;
      l.style.color = pull > 0.55 ? "var(--color-accent)" : "";
    });
  };
  const reset = () => {
    wordRef.current?.querySelectorAll<HTMLElement>("span").forEach((l) => {
      l.style.transform = "";
      l.style.color = "";
    });
  };

  return (
    <footer className="relative border-t border-line pt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 pb-16 md:flex-row md:items-end">
          <div>
            <a
              href="mailto:hello@vrstva.studio"
              data-cursor="hover"
              className="font-display text-2xl font-medium tracking-tight transition-colors hover:text-accent md:text-4xl"
            >
              hello@vrstva.studio
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-mute">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Praha · {time || "--:--"} · Přijímáme projekty na Q4 2026
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor="hover"
                className="rounded-full border border-line p-2.5 text-paper/60 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <s.icon size={20} stroke={1.6} />
              </a>
            ))}
            <MagneticButton
              onClick={() => scrollToId("#uvod")}
              className="flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2.5 text-sm transition-colors hover:bg-accent hover:text-ink"
            >
              Nahoru <IconArrowUp size={16} stroke={2} />
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-5 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Vrstva studio · Weby, které si lidé pamatují</span>
          <span className="flex gap-5">
            <a href="mailto:hello@vrstva.studio?subject=Zásady%20soukromí" className="transition-colors hover:text-paper" data-cursor="hover">Zásady soukromí</a>
            <a href="mailto:hello@vrstva.studio?subject=Cookies" className="transition-colors hover:text-paper" data-cursor="hover">Cookies</a>
          </span>
        </div>

        {/* kinetický wordmark */}
        <div
          ref={wordRef}
          onPointerMove={onMove}
          onPointerLeave={reset}
          aria-hidden
          className="kinetic-word flex select-none justify-between pb-2 pt-4 font-display text-[19vw] font-medium leading-[0.8] tracking-tighter text-paper/[0.08]"
        >
          {WORD.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
