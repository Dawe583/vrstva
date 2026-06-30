import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const testimonials = [
  {
    quote: 'Za tři měsíce od spuštění nového webu se nám zdvojnásobil počet poptávek. Konečně web, který pracuje za nás.',
    name: 'Petra Nováková',
    role: 'CEO, architektonické studio Forma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Spolupráce byla jiná než s ostatními agenturami — pochopili náš byznys, ne jen design. Výsledek mluví za sebe.',
    name: 'Tomáš Blažek',
    role: 'Founder, Faktio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
  },
  {
    quote: 'Rychlost, profesionalita a web, který jsme si skutečně přáli. Doporučuji každé firmě, která to myslí vážně.',
    name: 'Jana Horáčková',
    role: 'Marketing Director, Lumira',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80',
  },
]

const Testimonials = () => (
  <section className="py-24 md:py-36 px-8 md:px-28 border-t border-border/30">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-xs tracking-[3px] uppercase text-muted-foreground mb-12 text-center"
      >
        Co říkají klienti
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6 p-6 rounded-xl border border-border/20 bg-white/[0.02] hover:border-border/50 hover:bg-white/[0.04] transition-colors duration-300"
          >
            <TextReveal
              text={'„' + t.quote + '“'}
              className="text-foreground/80 text-sm leading-relaxed"
            />
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Testimonials
