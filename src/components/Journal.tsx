import Reveal from "./Reveal";
import FrameReveal from "./FrameReveal";
import { JOURNAL } from "../site";
import { local } from "../media";

export default function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-[1320px] px-5 py-24 md:py-32">
      <Reveal>
        <h2 className="text-center font-display text-[clamp(44px,9vw,120px)] text-paper">
          Žurnál
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {JOURNAL.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08} amount={0.2}>
            <a
              href={`#journal`}
              onClick={(e) => e.preventDefault()}
              className="group block"
            >
              <div className="relative aspect-[4/5] transform-gpu overflow-hidden rounded-xl border border-line [contain:paint]">
                <img
                  src={local(post.img)}
                  alt={post.title}
                  width={768}
                  height={960}
                  className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [backface-visibility:hidden] group-hover:scale-[1.05]"
                  decoding="async"
                  loading="lazy"
                />
                <FrameReveal />
              </div>
              <div className="mt-5">
                <div className="text-[13px] lowercase text-mute">
                  {post.category}
                </div>
                <h3 className="mt-2 font-display text-[22px] normal-case leading-tight tracking-normal text-paper transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
