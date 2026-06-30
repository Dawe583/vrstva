import { useState, Fragment } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Domů', href: '#hero' },
  { label: 'Jak pracujeme', href: '#jak-to-funguje' },
  { label: 'Náš přístup', href: '#filozofie' },
  { label: 'Portfolio', href: '#pripady-pouziti' },
  { label: 'Kontakt', href: '#kontakt' },
]

const Navbar = () => {
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-28 py-4 flex items-center justify-between"
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-3 group">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <Logo size={16} className="text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
        </motion.div>
        <span className="font-bold text-lg tracking-tight group-hover:tracking-wide transition-all duration-300">
          Branzly
        </span>
      </a>

      {/* Nav Links — desktop */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link, index) => (
          <Fragment key={link.label}>
            <motion.a
              href={link.href}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm px-3 py-1"
            >
              {link.label}
            </motion.a>
            {index < navLinks.length - 1 && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-muted-foreground/40 text-xs"
              >
                •
              </motion.span>
            )}
          </Fragment>
        ))}
      </div>

      {/* Social Icons + CTA + Mobile toggle */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3">
          {[Instagram, Linkedin, Twitter].map((Icon, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
            >
              <Icon size={16} strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>
        <motion.a
          href="mailto:dsak01392@gmail.com"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex bg-foreground text-background rounded-full px-5 py-2 text-xs font-semibold tracking-wide"
        >
          Konzultace zdarma
        </motion.a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden liquid-glass w-10 h-10 rounded-full flex items-center justify-center"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0, pointerEvents: 'auto' as const } : { opacity: 0, y: -20, pointerEvents: 'none' as const }}
        transition={{ duration: 0.3 }}
        className="absolute top-full left-4 right-4 mt-2 liquid-glass rounded-2xl p-6 md:hidden"
      >
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar