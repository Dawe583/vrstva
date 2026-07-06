import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // ponytail: bez backendu, poptávka odchází přes mailto klienta
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
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
          <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tighter md:text-7xl">
            Pojďme vytvořit web, který si zapamatují.
          </h2>
          <p className="mt-6 max-w-[40ch] text-mute">
            Napište nám pár vět o projektu. Ozveme se do 24 hodin.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          {sent ? (
            <div className="flex h-full flex-col justify-center">
              <p className="font-display text-3xl font-medium tracking-tight">
                Díky za zprávu.
              </p>
              <p className="mt-3 text-mute">
                Otevřel se váš e-mailový klient. Pokud ne, napište nám přímo na{" "}
                <a href="mailto:hello@vrstva.studio" className="text-paper underline underline-offset-4">
                  hello@vrstva.studio
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <label htmlFor="jmeno" className="text-sm text-paper/80">
                  Jméno
                </label>
                <input id="jmeno" name="jmeno" required placeholder="Jana Nováková" className={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-paper/80">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jana@firma.cz"
                  className={field}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="zprava" className="text-sm text-paper/80">
                  Zpráva
                </label>
                <textarea
                  id="zprava"
                  name="zprava"
                  required
                  rows={4}
                  placeholder="S čím vám můžeme pomoct?"
                  className={`${field} resize-none`}
                />
              </div>
              <MagneticButton className="mt-2 self-start rounded-full bg-accent px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-paper">
                Odeslat poptávku
              </MagneticButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
