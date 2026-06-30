import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const Founder = () => (
  <section className="py-24 md:py-32 px-8 md:px-28 border-t border-border/30">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col md:flex-row gap-8 items-start"
      >
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80"
          alt="Zakladatel"
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <div className="mb-6">
            <TextReveal
              text={'„Viděl jsem příliš mnoho firem s výjimečným produktem a průměrným webem, který je srážel. Rozhodl jsem se to změnit. Každý projekt beru osobně — protože vím, že za každým webem je někdo, komu na tom záleží."'}
              className="text-foreground/80 text-lg md:text-xl leading-relaxed"
            />
          </div>
          <div>
            <p className="text-sm font-medium">David Sak</p>
            <p className="text-xs text-muted-foreground">Zakladatel, Branzly Studio</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default Founder
