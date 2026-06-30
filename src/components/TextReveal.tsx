import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022 } },
}

const word = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

interface Props {
  text: string
  className?: string
  delay?: number
  as?: 'p' | 'span'
}

export default function TextReveal({ text, className, delay = 0, as: Tag = 'p' }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      style={{ transitionDelay: `${delay}s` } as CSSProperties}
    >
      <Tag className={className}>
        {text.split(' ').map((w, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
