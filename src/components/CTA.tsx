import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import TextReveal from './TextReveal'
import Hls from 'hls.js'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const CTA = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const contentScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1])
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const springScale = useSpring(contentScale, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(contentOpacity, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hlsUrl =
      'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-8 md:px-28 border-t border-border/30 overflow-hidden"
    >
      {/* Background Video with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/45 z-[1]" />

      {/* Radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl z-[1] pointer-events-none"
      />

      {/* Content */}
      <motion.div
        style={{ scale: springScale, opacity: springOpacity }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        {/* Logo Icon */}
        <motion.div
          {...fadeUp(0)}
          className="flex justify-center mb-8"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative w-10 h-10 rounded-full border-2 border-foreground/60 flex items-center justify-center"
          >
            <div className="w-5 h-5 rounded-full border border-foreground/60" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...fadeUp(0.1)}
          className="text-4xl md:text-6xl font-medium tracking-[-1.5px] mb-6"
        >
          Začněme váš{' '}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif italic font-normal inline-block"
          >
            projekt
          </motion.span>
        </motion.h2>

        {/* Subtitle */}
        <div className="mb-10">
          <TextReveal
            text="Bezplatná konzultace, žádné závazky. Řekneme vám upřímně, co vašemu webu chybí — a co s tím lze dělat."
            className="text-muted-foreground text-lg max-w-lg mx-auto text-center"
            delay={0.2}
          />
        </div>

        {/* Buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="mailto:dsak01392@gmail.com"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="bg-foreground text-background rounded-lg px-8 py-3.5 font-semibold text-sm relative overflow-hidden group"
          >
            <span className="relative z-10">Domluvit konzultaci zdarma</span>
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
          <motion.a
            href="#pripady-pouziti"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="liquid-glass rounded-lg px-8 py-3.5 font-semibold text-sm"
          >
            Zobrazit portfolio
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CTA