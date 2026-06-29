import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const WordReveal = ({
  text,
  highlightWords,
  className,
  scrollYProgress,
  startProgress,
  endProgress,
}: {
  text: string
  highlightWords: string[]
  className: string
  scrollYProgress: any
  startProgress: number
  endProgress: number
}) => {
  const words = text.split(' ')

  return (
    <p className={className}>
      {words.map((word, index) => {
        const wordStart =
          startProgress +
          (index / words.length) * (endProgress - startProgress)
        const wordEnd =
          startProgress +
          ((index + 1) / words.length) * (endProgress - startProgress)

        const rawOpacity = useTransform(
          scrollYProgress,
          [wordStart, wordEnd],
          [0.08, 1]
        )
        const opacity = useSpring(rawOpacity, {
          stiffness: 100,
          damping: 30,
          restDelta: 0.001,
        })

        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        )

        return (
          <motion.span
            key={index}
            style={{ opacity }}
            className={`inline-block mr-[0.25em] transition-colors duration-300 ${
              isHighlight ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

const Mission = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])
  const videoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -3])
  const videoY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50])

  const springScale = useSpring(videoScale, { stiffness: 100, damping: 30 })
  const springRotate = useSpring(videoRotate, { stiffness: 100, damping: 30 })
  const springY = useSpring(videoY, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={containerRef}
      id="filozofie"
      className="pt-0 pb-32 md:pb-44 px-8 md:px-28 relative overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Video with 3D scroll transform */}
        <motion.div
          style={{
            scale: springScale,
            rotateX: springRotate,
            y: springY,
            perspective: 1000,
          }}
          className="flex justify-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-[800px] h-[800px] object-cover rounded-2xl"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
                type="video/mp4"
              />
            </video>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </motion.div>

        {/* Paragraph 1 */}
        <WordReveal
          text="Budujeme prostor, kde zvědavost potkává jasnost — kde čtenáři nacházejí hloubku, autoři dosah a každý newsletter se stává konverzací, která stojí za to."
          highlightWords={['zvědavost', 'potkává', 'jasnost']}
          className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-[1.2] text-center max-w-5xl mx-auto"
          scrollYProgress={scrollYProgress}
          startProgress={0.15}
          endProgress={0.45}
        />

        {/* Paragraph 2 */}
        <WordReveal
          text="Platforma, kde obsah, komunita a vhled plynou dohromady — s menším šumem, menším třením a více smyslu pro každého zúčastněného."
          highlightWords={[]}
          className="text-xl md:text-2xl lg:text-3xl font-medium mt-10 leading-[1.3] text-center max-w-4xl mx-auto"
          scrollYProgress={scrollYProgress}
          startProgress={0.4}
          endProgress={0.7}
        />
      </div>
    </section>
  )
}

export default Mission