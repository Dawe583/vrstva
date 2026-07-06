import { InstagramLogo, BehanceLogo, DribbbleLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 pb-16 md:flex-row md:items-end">
          <a
            href="mailto:hello@vrstva.studio"
            className="font-display text-2xl font-medium tracking-tight transition-colors hover:text-accent md:text-4xl"
          >
            hello@vrstva.studio
          </a>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Instagram" className="text-paper/60 transition-colors hover:text-paper">
              <InstagramLogo size={22} />
            </a>
            <a href="#" aria-label="Behance" className="text-paper/60 transition-colors hover:text-paper">
              <BehanceLogo size={22} />
            </a>
            <a href="#" aria-label="Dribbble" className="text-paper/60 transition-colors hover:text-paper">
              <DribbbleLogo size={22} />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line py-5 text-xs text-mute">
          <span>© 2026 Vrstva studio</span>
          <span>Praha</span>
        </div>

        <h2
          aria-hidden
          className="select-none pb-2 text-center font-display text-[21vw] font-medium leading-[0.8] tracking-tighter text-paper/[0.07]"
        >
          VRSTVA
        </h2>
      </div>
    </footer>
  );
}
