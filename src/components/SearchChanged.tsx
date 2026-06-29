import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const platforms = [
  {
    name: 'ChatGPT',
    description:
      'Konverzační AI, která rozumí kontextu a generuje lidsky znějící odpovědi na jakýkoliv dotaz.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  },
  {
    name: 'Perplexity',
    description:
      'AI vyhledávač, který poskytuje přímé odpovědi s citovanými zdroji a informacemi v reálném čase.',
    icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png',
  },
  {
    name: 'Google AI',
    description:
      'Integrované AI funkce napříč Google Vyhledáváním s inteligentními souhrny a vylepšenými výsledky.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
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
          Vyhledávání se{' '}
          <motion.span
            initial={{ opacity: 0, skewX: -10 }}
            whileInView={{ opacity: 1, skewX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic font-normal inline-block"
          >
            změnilo.
          </motion.span>{' '}
          A vy?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.15)}
          className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-24"
        >
          Způsob, jakým lidé objevují informace, se zásadně proměnil. Statické
          výsledky vyhledávání ustupují dynamickým, konverzačním zážitkům,
          které vyžadují nový přístup k obsahu.
        </motion.p>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: 0.1 * (index + 1),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-[200px] h-[200px] flex items-center justify-center mb-6"
              >
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-32 h-32 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.parentElement?.querySelector('.fallback-icon') as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div className="fallback-icon hidden w-32 h-32 rounded-2xl bg-white/5 border border-white/10 items-center justify-center text-2xl font-bold text-foreground/40">
                  {platform.name[0]}
                </div>
              </motion.div>
              <h3 className="font-semibold text-base mb-2">{platform.name}</h3>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                {platform.description}
              </p>
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
            Pokud neodpovíte na otázky, odpoví někdo jiný.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default SearchChanged