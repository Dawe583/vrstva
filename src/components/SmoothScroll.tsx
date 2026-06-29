import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

interface SmoothScrollProps {
  children: React.ReactNode
}

// Framer Blocks-style smooth scroll with Lenis-like inertia
const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Smooth scroll velocity for skew effect
  const scrollVelocity = useMotionValue(0)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateVelocity = () => {
      const currentScrollY = window.scrollY
      const velocity = currentScrollY - lastScrollY
      lastScrollY = currentScrollY
      scrollVelocity.set(velocity)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVelocity)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollVelocity])

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Scroll velocity skew wrapper */}
      <ScrollSkew smoothVelocity={smoothVelocity}>
        {children}
      </ScrollSkew>
    </>
  )
}

const ScrollSkew: React.FC<{
  children: React.ReactNode
  smoothVelocity: ReturnType<typeof useSpring>
}> = ({ children, smoothVelocity }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = smoothVelocity.on('change', (v) => {
      if (ref.current) {
        const skew = Math.max(-2, Math.min(2, v * 0.08))
        ref.current.style.transform = `skewY(${skew}deg)`
      }
    })
    return () => unsubscribe()
  }, [smoothVelocity])

  return (
    <div
      ref={ref}
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

export default SmoothScroll