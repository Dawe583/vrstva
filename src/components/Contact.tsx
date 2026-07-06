import { useState, type FormEvent } from "react";
import { IconMail, IconMapPin, IconClock, IconCalendarEvent, IconArrowUpRight } from "@tabler/icons-react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

/**
 * Odeslání: pokud vyplníš FORMSPREE endpoint, poptávka odejde přes fetch
 * (bez otevírání e-mailového klienta). Jinak fallback na mailto.
 * Alternativa: Resend / vlastní API — stačí prohodit submit().
 */
const FORMSPREE = ""; // např. "https://formspree.io/f/xxxxxxx"

const INFO = [
  { icon: IconMail, label: "E-mail", value: "hello@vrstva.studio", href: "mailto:hello@vrstva.studio" },
  { icon: IconMapPin, label: "Kde nás najdete", value: "Praha, Česko" },
  { icon: IconClock, label: "Odezva", value: "Do 24 hodin" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (FORMSPREE) {
      setBusy(true);
      try {
        const res = await fetch(FORMSPREE, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) setSent(true);
      } finally {
        setBusy(false);
      }
      return;
    }

    // fallback: mailto
    const body = `Jméno: ${data.get("jmeno")}\nE-mail: ${data.get("email")}\n\n${data.get("zprava")}`;
    window.location.href = `mailto:hello@vrstva.studio?subject=${encodeURIComponent(
      "Poptávka z webu"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full border-b border-line bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-mute/60 focus:border-accent";

  return (
    <section id="kontakt" className="py-32 md:py-44">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-6">
          <span className="text-sm uppercase tracking-[0.16em] text-accent">Kontakt</span>
          <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] tracking-tighter md:text-7xl">
            Pojďme vytvořit web, který si zapamatují.
          </h2>
          <p className="mt-6 max-w-[40ch] text-muteb">
            Napište nám pár vět o projektu, nebo si rovnou zarezervujte nezávazný hovor. Ozveme se do 24 hodin.
          </p>

          {/* rezervace hovoru */}
          <a
            href="https://cal.com/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-accent/50"
          >
            <IconCalendarEvent size={18} stroke={1.7} className="text-accent" />
            Rezervovat 30min hovor
            <IconArrowUpRight size={15} stroke={2} className="text-mute" />
          </a>

          {/* kontaktní bloky */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {INFO.map((it) => {
              const inner = (
                <>
                  <it.icon size={20} stroke={1.6} className="mb-3 text-accent" />
                  <div className="text-xs uppercase tracking-[0.1em] text-mute">{it.label}</div>
                  <div className="mt-1 text-sm text-paper/90">{it.value}</div>
                </>
              );
              return it.href ? (
                <a key={it.label} href={it.href} data-cursor="hover" className="rounded-xl border border-line2 p-4 transition-colors hover:border-line">
                  {inner}
                </a>
              ) : (
                <div key={it.label} className="rounded-xl border border-line2 p-4">
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          {sent ? (
            <div className="flex h-full flex-col justify-center">
              <p className="font-display text-3xl font-medium tracking-tight">Díky za zprávu.</p>
              <p className="mt-3 text-muteb">
                Ozveme se do 24 hodin. Pokud spěcháte, napište přímo na{" "}
                <a href="mailto:hello@vrstva.studio" className="text-paper underline underline-offset-4">
                  hello@vrstva.studio
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <label htmlFor="jmeno" className="text-sm text-paper/80">Jméno</label>
                <input id="jmeno" name="jmeno" required placeholder="Jana Nováková" className={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-paper/80">E-mail</label>
                <input id="email" name="email" type="email" required placeholder="jana@firma.cz" className={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="zprava" className="text-sm text-paper/80">Zpráva</label>
                <textarea id="zprava" name="zprava" required rows={4} placeholder="S čím vám můžeme pomoct?" className={`${field} resize-none`} />
              </div>
              <MagneticButton className="mt-2 self-start rounded-full bg-accent px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:opacity-60">
                {busy ? "Odesílám…" : "Odeslat poptávku"}
              </MagneticButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
