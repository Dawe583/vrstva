import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { MEDIA, STATS } from "../site";
import { local } from "../media";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

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
        className="absolute left-1/2 top-[6%] h-[94%] w-[min(1200px,96vw)] -translate-x-1/2"
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
      <div className="absolute bottom-[-44vw] left-1/2 -translate-x-1/2">
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

/**
 * Hero 1:1 s referencí: celá scéna je „připnutá" (sticky) po dobu 240vh
 * scrollu. Malé video sedí V POPŘEDÍ uprostřed nadpisu a scrollem se plynule
 * zvětšuje, dokud nezakryje úplně celý viewport — cílový scale se měří
 * z reálné velikosti prvku, takže sedí na každém zařízení i po otočení
 * displeje. Pak se scéna odpojí a odjede nahoru.
 */
export default function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [cover, setCover] = useState(6);

  useEffect(() => {
    const calc = () => {
      const el = frame.current;
      if (!el) return;
      // offsetWidth/Height ignorují transform => čistá layout velikost
      const w = el.offsetWidth || 1;
      const h = el.offsetHeight || 1;
      setCover(
        Math.max(window.innerWidth / w, window.innerHeight / h) * 1.06
      );
    };
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0.06, 0.88], [1, cover]);
  const radius = useTransform(scrollYProgress, [0.06, 0.55], [14, 0]);

  // Opacity řídíme imperativně (useMotionValue + event) místo useTransform:
  // motion by si scroll-vázanou opacity jinak přeložil do nativní
  // ScrollTimeline, která u sticky cíle počítá progress jinak a text se
  // „vracel". Takhle je fade deterministický: plně vidět jen na startu,
  // scrollem postupně mizí a je pryč dřív, než video zakryje celý displej.
  const metaFade = useMotionValue(1);
  const headFade = useMotionValue(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    metaFade.set(1 - clamp01(v / 0.18));
    headFade.set(1 - clamp01((v - 0.08) / 0.42));
  });

  return (
    <section id="top" className="relative">
      <div ref={track} className="relative h-[240vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <RoadBackground />

          {/* Nadpisová vrstva — je NAD videem, text přes něj zůstává čitelný */}
          <motion.div
            style={{ opacity: headFade }}
            className="relative z-10 flex flex-col items-center px-5 text-center"
          >
            <motion.div style={{ opacity: metaFade }}>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="mb-5 inline-block rounded-full border border-line bg-ink/40 px-4 py-1.5 text-[12px] uppercase tracking-[0.18em] text-paper"
              >
                Jsme
              </motion.span>
            </motion.div>

            <h1 className="font-display text-[clamp(60px,14.5vw,200px)] leading-[1.12] text-paper">
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

            <motion.div style={{ opacity: metaFade }}>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="mt-6 text-[15px] text-paper"
              >
                Pro technologické značky
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Video ZA textem — roste scrollem, přes celou obrazovku na konci */}
          <div className="pointer-events-none absolute inset-0 z-[5] grid place-items-center">
            <motion.div
              ref={frame}
              style={{ scale, borderRadius: radius }}
              className="aspect-video w-[min(64vw,300px)] transform-gpu overflow-hidden border border-line bg-ink md:w-[min(36vw,540px)]"
            >
              <video
                src={local(MEDIA.heroVideo)}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statistiky + popis — nastoupí po odpojení scény */}
      <div className="relative mx-auto max-w-[1320px] px-5 pb-24 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between"
        >
          <div className="flex flex-wrap gap-8 md:gap-12">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[28px] text-paper md:text-[34px]">
                  {s.value}
                </div>
                <div className="mt-1 text-[13px] text-mute">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-mute">
            <span className="text-paper">Nevěříme na univerzální řešení.</span>{" "}
            Každá značka má svůj příběh — naší prací je poskládat strategii,
            design a pohyb do jednoho srozumitelného systému.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
