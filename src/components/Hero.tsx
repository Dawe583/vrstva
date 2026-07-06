import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MEDIA, STATS } from "../site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Perspektivní „silnice" na pozadí — dvě zrcadlené křivky, střední linka
 *  a soustředné kruhy dole, přesně v duchu reference. */
function RoadBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* střední vertikální linka */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line to-transparent" />

      {/* zakřivené „curby" — konvergují k hornímu středu */}
      <svg
        className="absolute left-1/2 top-[8%] h-[92%] w-[min(1200px,96vw)] -translate-x-1/2"
        viewBox="0 0 1000 700"
        fill="none"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <path
          d="M470 0 C 250 230 250 470 120 700"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
        <path
          d="M530 0 C 750 230 750 470 880 700"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
      </svg>

      {/* soustředné kruhy u paty hera */}
      <div className="absolute bottom-[-46vw] left-1/2 -translate-x-1/2">
        {[92, 68, 44].map((v) => (
          <div
            key={v}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line2"
            style={{ width: `${v}vw`, height: `${v}vw` }}
          />
        ))}
      </div>

      {/* jemné ztmavení k okrajům */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,transparent_40%,#0d0d0d_100%)]" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // „Portálový" zoom videa při scrollu — malé v centru, roste přes celý obraz.
  const vScale = useTransform(scrollYProgress, [0, 1], [1, 2.7]);
  const vY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const vRadius = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const headFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-30%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[150vh] overflow-hidden pt-[128px]"
    >
      <RoadBackground />

      {/* Nadpisová vrstva — sticky, aby pod ní video „projelo" */}
      <motion.div
        style={{ opacity: headFade, y: headY }}
        className="sticky top-[128px] z-[2] mx-auto flex max-w-[1320px] flex-col items-center px-5 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-5 inline-block rounded-full border border-line bg-ink/40 px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-paper"
        >
          Jsme
        </motion.span>

        <h1 className="font-display text-[clamp(64px,15vw,210px)] text-paper">
          {["Kreativní", "Studio"].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-6 text-[15px] text-paper"
        >
          Pro technologické značky
        </motion.p>
      </motion.div>

      {/* Video, které se scrollem přiblíží */}
      <div className="pointer-events-none sticky top-0 z-[1] -mt-[46vh] flex h-[56vh] items-center justify-center">
        <motion.div
          style={{ scale: vScale, y: vY, borderRadius: vRadius }}
          className="aspect-video w-[min(340px,60vw)] overflow-hidden border border-line"
        >
          <video
            src={MEDIA.heroVideo}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      </div>

      {/* Statistiky + popis — objeví se po odjetí videa */}
      <div className="relative z-[3] mx-auto max-w-[1320px] px-5 pt-[36vh] pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between"
        >
          <div className="flex gap-12">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[34px] text-paper">{s.value}</div>
                <div className="mt-1 text-[13px] text-mute">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-mute">
            <span className="text-paper">
              Nevěříme na univerzální řešení.
            </span>{" "}
            Každá značka má svůj příběh — naší prací je poskládat strategii,
            design a pohyb do jednoho srozumitelného systému.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
