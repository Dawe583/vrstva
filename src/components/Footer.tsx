import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 px-8 md:px-28 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/20"
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-muted-foreground text-sm"
      >
        © 2026 Branzly. Všechna práva vyhrazena.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-6"
      >
        {['Ochrana osobních údajů', 'Podmínky', 'Kontakt'].map((label) => (
          <motion.a
            key={label}
            href="#"
            whileHover={{ y: -2 }}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
          >
            {label}
          </motion.a>
        ))}
      </motion.div>
    </motion.footer>
  )
}

export default Footer