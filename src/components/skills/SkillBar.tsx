import { useGsapReveal } from '@/hooks/useGsapReveal'
import type { Skill } from '@/types'

function levelLabel(level: number): { text: string; color: string; gradient: string; shadow: string } {
  if (level >= 80) {
    return {
      text: '精通',
      color: 'text-[#10b981]',
      gradient: 'bg-gradient-to-r from-[#10b981] to-[#34d399]',
      shadow: 'shadow-[0_0_12px_rgba(16,185,129,0.5)]'
    }
  }
  if (level >= 70) {
    return {
      text: '入门',
      color: 'text-[#00e5ff]',
      gradient: 'bg-gradient-to-r from-[#00e5ff] to-[#38bdf8]',
      shadow: 'shadow-[0_0_12px_rgba(0,229,255,0.5)]'
    }
  }
  return {
    text: '初级',
    color: 'text-[#00e5ff]',
    gradient: 'bg-gradient-to-r from-[#00e5ff] to-[#38bdf8]',
    shadow: 'shadow-[0_0_12px_rgba(0,229,255,0.5)]'
  }
}

interface SkillBarProps {
  skill: Skill
  index: number
  inView: boolean
}

export function SkillBar({ skill, index, inView }: SkillBarProps) {
  const ref = useGsapReveal<HTMLDivElement>({ delay: index * 0.08 })
  const levelInfo = levelLabel(skill.level)

  return (
    <div
      ref={ref}
      className="space-y-2 group"
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium transition-all duration-300 group-hover:brightness-125 ${
          levelInfo.color
        }`}>
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium transition-all duration-300 group-hover:scale-110 ${levelInfo.color}`}>
            {levelInfo.text}
          </span>
          <span className={`text-xs ${levelInfo.color} opacity-70`}>
            {skill.level}%
          </span>
        </div>
      </div>
      <div className={`h-2 rounded-full bg-[var(--color-border)]/50 overflow-hidden relative transition-shadow duration-300 group-hover:${levelInfo.shadow}`}>
        <div
          className={`h-full rounded-full relative ${levelInfo.gradient} ${levelInfo.shadow} group-hover:scale-y-125 transition-all duration-500 skill-bar-inner`}
          style={{ 
            width: inView ? `${skill.level}%` : '0%',
            transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-text-primary)]/10 to-transparent animate-shimmer" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--color-text-primary)]/8 to-transparent" />
          <div className="absolute inset-0 rounded-full skill-bar-shine" />
        </div>
      </div>
    </div>
  )
}
