import { useEffect } from "react";
import { motion } from "motion/react";
import { IconX, IconArrowUpRight } from "@tabler/icons-react";
import MeshTile from "./MeshTile";
import { lockScroll } from "../lenis";
import { EASE } from "../motion";
import type { Article as ArticleT } from "../content";

/** Detail článku journalu jako celoobrazovkový overlay. */
export default function Article({ article, onClose }: { article: ArticleT; onClose: () => void }) {
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
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink/80 px-6 py-4 backdrop-blur md:px-10">
        <span className="text-sm uppercase tracking-[0.16em] text-accent">Journal</span>
        <button
          onClick={onClose}
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-paper/40"
        >
          Zavřít <IconX size={16} stroke={2} />
        </button>
      </div>

      <article className="mx-auto max-w-[760px] px-6 py-14 md:py-20">
        <div className="flex items-center gap-3 text-xs text-mute">
          <span className="rounded-full border border-line px-2.5 py-1 text-accent">{article.cat}</span>
          <span>{article.date}</span>
          <span>· {article.read} čtení</span>
        </div>
        <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tighter md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muteb">{article.lead}</p>

        <div className="mt-10 overflow-hidden rounded-2xl">
          <MeshTile seed={article.seed} motif={article.motif} className="aspect-[16/9] w-full" />
        </div>

        <div className="mt-10 flex flex-col gap-6 text-lg leading-relaxed text-paper/90">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <a
          href="#kontakt"
          onClick={onClose}
          data-cursor="hover"
          className="mt-14 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-paper"
        >
          Chci web, který takhle žije <IconArrowUpRight size={16} stroke={2} />
        </a>
      </article>
    </motion.div>
  );
}
