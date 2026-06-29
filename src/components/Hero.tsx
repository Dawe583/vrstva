import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const avatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=8',
]

const Hero = () => {
  const [email, setEmail] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const springVideoScale = useSpring(videoScale, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video with parallax */}
      <motion.div style={{ scale: springVideoScale, opacity: videoOpacity }} className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-[1]" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 pt-28 md:pt-32 px-8 text-center max-w-4xl mx-auto"
      >
        {/* Avatar Row */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Odběratel ${i + 1}`}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-sm"
          >
            7 000+ lidí již odebírá
          </motion.span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.15)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] mb-6 leading-[1.1]"
        >
          Buďte{' '}
          <motion.span
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif italic font-normal inline-block"
          >
            inspirováni
          </motion.span>{' '}
          s námi
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: 'hsl(var(--hero-subtitle))' }}
        >
          Připojte se k našemu kanálu pro smysluplné aktuality, novinky ze
          světa technologií a společnou cestu k hloubce a směru.
        </motion.p>

        {/* Email Form */}
        <motion.div
          {...fadeUp(0.45)}
          className="liquid-glass rounded-full p-2 max-w-lg mx-auto flex items-center gap-2"
        >
          <input
            type="email"
            placeholder="Zadejte svůj e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background rounded-full px-8 py-3 text-sm font-semibold tracking-wide"
          >
            ODBÍRAT
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero