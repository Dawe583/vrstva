import Reveal from "./Reveal";
import SplitText from "./SplitText";
import MeshTile from "./MeshTile";
import Avatar from "./Avatar";
import { TEAM } from "../content";

/** Tým: portréty s hover odhalením (grayscale→barva, jméno vyjede). */
export default function Team() {
  return (
    <section id="tym" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm uppercase tracking-[0.16em] text-accent">Kdo jsme</span>
            <SplitText
              text="Malý tým, velká péče."
              className="mt-4 font-display text-4xl font-medium tracking-tighter md:text-6xl"
            />
          </div>
          <Reveal>
            <p className="max-w-[38ch] text-muteb">
              Nejsme fabrika na weby. Na každém projektu pracují lidé, které poznáte jménem — od strategie po poslední animaci.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div data-cursor="hover" className="group">
                <div className="relative overflow-hidden rounded-xl">
                  <MeshTile
                    seed={m.seed}
                    motif="rings"
                    className="aspect-[4/5] w-full transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <Avatar
                        name={m.name}
                        seed={m.seed}
                        className="h-24 w-24 text-3xl shadow-lg shadow-ink/40 transition-transform duration-500 group-hover:scale-110 md:h-28 md:w-28"
                      />
                    </div>
                  </MeshTile>
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-ink">
                      Napsat →
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight md:text-xl">{m.name}</h3>
                <p className="text-sm text-mute">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
