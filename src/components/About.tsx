import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Vrstva je nezávislé designové studio z Prahy. Navrhujeme a stavíme weby pro značky, které to myslí vážně. Žádné šablony, žádný hluk. Jen promyšlený design, čistý kód a výsledky, které poznáte na číslech.";

/** Text se rozsvěcuje slovo po slově při scrollu (GSAP scrub). Běží všude. */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-word",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="studio" className="py-32 md:py-44">
      <div ref={ref} className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="max-w-[24ch] font-display text-3xl font-medium leading-[1.15] tracking-tight md:max-w-[28ch] md:text-6xl">
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className="about-word">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
