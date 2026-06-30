import { type ReactNode } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  return (
    <>
      {/* Horizontal progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Vertical connecting thread */}
      <div className="fixed left-6 top-0 bottom-0 w-px bg-border/10 z-50 pointer-events-none">
        <motion.div
          className="w-full bg-foreground/25 origin-top"
          style={{ scaleY }}
        />
      </div>
      {children}
    </>
  )
}

export default SmoothScroll
