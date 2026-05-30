import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle: string
  align?: 'left' | 'center'
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <div className="flex items-center gap-4 mb-4 justify-center">
        <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)]/30 to-transparent" />
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-gradient-cyan">
          {title}
        </h2>
        <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)]/30 to-transparent" />
      </div>
      <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  )
}
