import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from './TextReveal'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const fields = [
  { name: 'name', label: 'Jméno a příjmení', type: 'text', placeholder: 'Jan Novák' },
  { name: 'email', label: 'E-mail', type: 'email', placeholder: 'jan@firma.cz' },
  { name: 'company', label: 'Firma (nepovinné)', type: 'text', placeholder: 'Název firmy' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-24 md:py-36 px-8 md:px-28 border-t border-border/30">
      <div className="max-w-3xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4 text-center"
        >
          Kontakt
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="text-4xl md:text-5xl font-medium tracking-[-1.5px] mb-4 text-center"
        >
          Řekněte nám o{' '}
          <span className="font-serif italic font-normal">svém projektu</span>
        </motion.h2>
        <div className="mb-14">
          <TextReveal
            text="Odpovíme do 24 hodin. Bez závazků, bez obchodního tlaku."
            className="text-muted-foreground text-base text-center max-w-lg mx-auto"
            delay={0.2}
          />
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                className="w-14 h-14 rounded-full border-2 border-foreground/60 flex items-center justify-center mx-auto mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4.5 4.5L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <p className="text-xl font-medium mb-2">Zpráva odeslána</p>
              <p className="text-muted-foreground text-sm">Ozveme se vám do 24 hodin.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                {fields.slice(0, 2).map((field, i) => (
                  <motion.div key={field.name} {...fadeUp(0.1 + i * 0.05)}>
                    <label className="block text-xs text-muted-foreground mb-2 tracking-wide uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.name !== 'company'}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                      className="w-full bg-white/[0.03] border border-border/30 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/40 transition-colors duration-200"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeUp(0.2)}>
                <label className="block text-xs text-muted-foreground mb-2 tracking-wide uppercase">
                  {fields[2].label}
                </label>
                <input
                  type="text"
                  placeholder={fields[2].placeholder}
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-border/30 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/40 transition-colors duration-200"
                />
              </motion.div>

              <motion.div {...fadeUp(0.25)}>
                <label className="block text-xs text-muted-foreground mb-2 tracking-wide uppercase">
                  Zpráva
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Popište váš projekt, cíle a časový rámec..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-border/30 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/40 transition-colors duration-200 resize-none"
                />
              </motion.div>

              <motion.div {...fadeUp(0.3)} className="flex items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted-foreground/60">
                  Nebo nás kontaktujte přímo:{' '}
                  <a href="mailto:dsak01392@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    dsak01392@gmail.com
                  </a>
                </p>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-foreground text-background rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide flex-shrink-0"
                >
                  Odeslat zprávu
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
