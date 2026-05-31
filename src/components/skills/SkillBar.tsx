import { useGsapReveal } from '@/hooks/useGsapReveal'
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
  const barRef = useGsapReveal({ x: -10, opacity: 0 })

  return (
    <div
      ref={barRef}
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
    </div>
  )
}
