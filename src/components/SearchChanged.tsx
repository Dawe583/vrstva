import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import TextReveal from './TextReveal'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const pillars = [
  {
    name: 'Design',
    description:
      'Každý pixel má důvod. Tvoříme vizuální identitu, která okamžitě sdělí hodnotu vaší značky — ještě než uživatel přečte jediné slovo.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&q=80',
  },
  {
    name: 'Rychlost',
    description:
      'Web, který se načte za 3 sekundy, ztrácí 53 % návštěvníků. Naše weby jsou optimalizované pro Core Web Vitals a rychlost, která konvertuje.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&q=80',
  },
  {
    name: 'Konverze',
    description:
      'Hezký web nestačí. Každý prvek navrhujeme s ohledem na cestu uživatele — od prvního dojmu až po odeslání poptávky.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80',
  },
]

const SearchChanged = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%'])
  const springLineHeight = useSpring(lineHeight, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={sectionRef}
      id="jak-to-funguje"
      className="pt-52 md:pt-64 pb-6 md:pb-9 px-8 md:px-28 relative"
    >
      {/* Decorative line */}
      <div className="absolute left-8 md:left-28 top-0 bottom-0 w-px bg-border/20">
        <motion.div
          style={{ height: springLineHeight }}
          className="w-full bg-foreground/30"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          {...fadeUp(0)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] text-center mb-6"
        >
          První dojem.{' '}
          <motion.span
            initial={{ opacity: 0, skewX: -10 }}
            whileInView={{ opacity: 1, skewX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic font-normal inline-block"
          >
            Jen jednou.
          </motion.span>
        </motion.h2>

        <div className="mb-24">
          <TextReveal
            text="Uživatelé si vytvoří názor na váš web za 50 milisekund. Než stihnou přečíst jedinou větu, už vědí, zda vám důvěřují. Tři pilíře, na kterých stavíme každý projekt."
            className="text-muted-foreground text-lg max-w-2xl mx-auto text-center"
            delay={0.15}
          />
        </div>

        {/* Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {pillars.map((pillar, index: number) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: 0.1 * (index + 1),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex flex-col items-start text-left group cursor-default"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-white/5 ring-1 ring-white/5 group-hover:ring-white/15 transition-all duration-300">
                <img
                  src={pillar.image}
                  alt={pillar.name}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <h3 className="font-semibold text-base mb-2">{pillar.name}</h3>
              <TextReveal
                text={pillar.description}
                className="text-muted-foreground text-sm leading-relaxed"
                delay={0.05 * index}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.05em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-muted-foreground text-sm"
          >
            Pokud váš web neprodává, prodává konkurence.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default SearchChanged
