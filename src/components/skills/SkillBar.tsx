import { motion } from 'framer-motion'
import type { Skill } from '@/types'

function levelLabel(level: number): string {
  if (level >= 86) return '精通'
  if (level >= 76) return '熟练'
  return '入门'
}

interface SkillBarProps {
  skill: Skill
  index: number
  inView: boolean
}

export function SkillBar({ skill, index, inView }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)] font-medium">{skill.name}</span>
        <span className="text-xs text-[var(--color-accent-cyan)] font-medium">{levelLabel(skill.level)}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--color-border)]/50 overflow-hidden">
        <div
          className="h-full rounded-full skill-bar-fill"
          style={{ width: inView ? `${skill.level}%` : '0%' }}
        />
      </div>
    </motion.div>
  )
}
