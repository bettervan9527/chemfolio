import { useGsapReveal } from '@/hooks/useGsapReveal'
import { GraduationCap } from 'lucide-react'
import type { Education } from '@/types'

interface EducationItemProps {
  edu: Education
  index: number
}

function EducationItem({ edu, index }: EducationItemProps) {
  const ref = useGsapReveal<HTMLDivElement>({ delay: index * 0.15 })

  return (
    <div
      ref={ref}
      className="relative pl-12 md:pl-16"
    >
      <div className="absolute left-0 md:left-4 top-1 w-8 h-8 -translate-x-1/2 rounded-full glass-panel glow-border
        flex items-center justify-center">
        <GraduationCap className="w-4 h-4 text-[var(--color-accent-cyan)]" />
      </div>

      <div className="glass-panel p-6 hover:border-[var(--color-accent-cyan)]/30 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--color-text-primary)]">
            {edu.degree}
          </h3>
          <span className="text-sm font-medium text-[var(--color-accent-cyan)] whitespace-nowrap">
            {edu.period}
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] font-medium mb-1">
          {edu.school} · {edu.major}
        </p>
        {edu.description && (
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-2">
            {edu.description}
          </p>
        )}
      </div>
    </div>
  )
}

interface EducationTimelineProps {
  education: Education[]
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent-cyan)]/50 via-[var(--color-accent-purple)]/30 to-transparent" />

      <div className="space-y-10">
        {education.map((edu, index) => (
          <EducationItem key={edu.period} edu={edu} index={index} />
        ))}
      </div>
    </div>
  )
}
