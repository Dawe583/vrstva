import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "motion/react";
import { scrollToId } from "../lenis";

const LINKS = [
  { label: "Studio", id: "#studio" },
  { label: "Služby", id: "#sluzby" },
  { label: "Práce", id: "#prace" },
  { label: "Ceník", id: "#cenik" },
  { label: "Kontakt", id: "#kontakt" },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[90] bg-gradient-to-b from-ink/90 to-transparent backdrop-blur-[2px]"
    >
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
              className="group relative text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
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
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-accent/80"
      />
    </motion.header>
  );
}
