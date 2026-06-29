import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const features = [
  {
    title: 'Kurátorovaný feed',
    description:
      'Personalizované proudy obsahu, které překonávají šum a doručují to, co pro každého čtenáře nejvíce znamená.',
  },
  {
    title: 'Nástroje pro autory',
    description:
      'Výkonná sada pro tvorbu s analytikou, plánováním a distribučními nástroji pro moderní vypravěče.',
  },
  {
    title: 'Komunita',
    description:
      'Zapojte se s promyšlenými čtenáři a kolegy autory prostřednictvím komentářů, diskuzí a kolaborativních prostorů.',
  },
  {
    title: 'Distribuce',
    description:
      'Chytré algoritmy a sdílení napříč platformami, které pomáhají vašemu obsahu oslovit správné publikum ve správný čas.',
  },
]

const Solution = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const videoY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const springVideoY = useSpring(videoY, { stiffness: 100, damping: 30 })
  const springVideoScale = useSpring(videoScale, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={sectionRef}
      id="pripady-pouziti"
      className="py-32 md:py-44 px-8 md:px-28 border-t border-border/30 relative overflow-hidden"
    >
      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 left-10 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[3px] uppercase text-muted-foreground">
            ŘEŠENÍ
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeUp(0.1)}
          className="text-4xl md:text-6xl font-medium tracking-[-1.5px] mb-16"
        >
          Platforma pro{' '}
          <motion.span
            initial={{ opacity: 0, skewX: -8 }}
            whileInView={{ opacity: 1, skewX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic font-normal inline-block"
          >
            smysluplný
          </motion.span>{' '}
          obsah
        </motion.h2>

        {/* Video with parallax */}
        <motion.div
          style={{ y: springVideoY, scale: springVideoScale }}
          className="mb-20 rounded-2xl overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[3/1] object-cover rounded-2xl"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: 0.1 * (index + 1),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group cursor-default"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '2rem' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="h-px bg-foreground/30 mb-4"
              />
              <h3 className="font-semibold text-base mb-3 group-hover:text-foreground transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solution