import { motion } from 'framer-motion'

const cases = [
  { label: 'E-commerce', result: '+62 % konverzní poměr', name: 'Módní značka Lumira' },
  { label: 'SaaS landing page', result: '+41 % nových registrací', name: 'Fakturační nástroj Faktio' },
  { label: 'Firemní web', result: '3× více poptávek', name: 'Architektonické studio Forma' },
]

const PortfolioPreview = () => (
  <section className="py-24 md:py-36 px-8 md:px-28 border-t border-border/30">
    <div className="max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-xs tracking-[3px] uppercase text-muted-foreground mb-12 text-center"
      >
        Výsledky z praxe
      </motion.p>

      <div className="flex flex-col gap-4">
        {cases.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-between py-5 border-b border-border/20 group"
          >
            <div>
              <p className="text-xs text-muted-foreground mb-1 tracking-widest uppercase">{c.label}</p>
              <p className="text-sm font-medium">{c.name}</p>
            </div>
            <p className="text-foreground font-semibold text-sm group-hover:scale-105 transition-transform duration-200">
              {c.result}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default PortfolioPreview
