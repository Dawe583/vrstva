import { useEffect } from "react";
import { motion } from "motion/react";
import { IconX, IconArrowUpRight } from "@tabler/icons-react";
import Img from "./Img";
import { lockScroll } from "../lenis";
import { EASE } from "../motion";
import type { Project } from "../content";

/** Hloubkový detail projektu jako celoobrazovkový overlay. */
export default function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] overflow-y-auto bg-ink"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* zavírací lišta */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/80 px-6 py-4 backdrop-blur md:px-10">
        <span className="font-display text-lg font-medium tracking-tight">
          {project.name}
          <span className="text-accent">.</span>
        </span>
        <button
          onClick={onClose}
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-paper/40"
        >
          Zavřít <IconX size={16} stroke={2} />
        </button>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 md:py-20">
        <span className="text-sm uppercase tracking-[0.16em] text-accent">
          {project.meta} · {project.year}
        </span>
        <h2 className="mt-5 max-w-[18ch] font-display text-4xl font-medium tracking-tighter md:text-7xl">
          {project.name}
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muteb">{project.intro}</p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muteb">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl">
          <Img pic={project.cover} eager className="aspect-[16/9] w-full" imgClassName="grayscale-[0.2]" />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.16em] text-mute">Výzva</h3>
            <p className="mt-4 leading-relaxed text-paper/90">{project.challenge}</p>
          </div>
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.16em] text-mute">Přístup</h3>
            <p className="mt-4 leading-relaxed text-paper/90">{project.approach}</p>
          </div>
        </div>

        {/* výsledky */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-y border-line py-12 sm:grid-cols-3">
          {project.results.map((r) => (
            <div key={r.v}>
              <div className="font-display text-4xl font-medium tracking-tighter text-accent md:text-6xl">
                {r.k}
              </div>
              <p className="mt-3 max-w-[22ch] text-sm text-mute">{r.v}</p>
            </div>
          ))}
        </div>

        {/* galerie */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {project.shots.map((s, i) => (
            <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2" : ""}`}>
              <Img pic={s} className="aspect-[16/10] w-full" imgClassName="grayscale-[0.25]" />
            </div>
          ))}
        </div>

        <a
          href="#kontakt"
          onClick={onClose}
          data-cursor="hover"
          className="mt-16 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-paper"
        >
          Chci podobný projekt <IconArrowUpRight size={16} stroke={2} />
        </a>
      </div>
    </motion.div>
  );
}
