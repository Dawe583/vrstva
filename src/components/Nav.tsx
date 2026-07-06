import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { scrollToId } from "../lenis";
import { NAV_LINKS } from "../site";

/**
 * Horní lišta — logo Vrstva vlevo, sekce uprostřed, „Contact" pill vpravo.
 * Skryje se při scrollu dolů a jemně přisedne pozadím po odjetí z hera.
 */
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setSolid(y > 40);
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
        solid ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 md:px-8">
        <button
          onClick={() => scrollToId("#top")}
          className="font-display text-[19px] tracking-tight text-paper"
        >
          vrstva<span className="text-accent">.</span>
        </button>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="group relative text-[13px] text-mute transition-colors hover:text-paper"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToId("#cta")}
          className="rounded-full border border-line bg-ink/40 px-5 py-2 text-[13px] text-paper transition-colors hover:border-paper/40 hover:bg-paper hover:text-ink"
        >
          Contact
        </button>
      </nav>
    </motion.header>
  );
}
