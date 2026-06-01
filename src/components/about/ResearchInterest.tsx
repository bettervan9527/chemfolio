import { useGsapStagger } from '@/hooks/useGsapReveal'
import { Atom, Beaker, FlaskConical, FlaskRound, BarChart3, Code } from 'lucide-react'
import type { ReactNode } from 'react'

const FIELD_ICONS: Record<string, ReactNode> = {
  '无机化学': <FlaskConical className="w-6 h-6" />,
  '分析化学': <Beaker className="w-6 h-6" />,
  '配位化学': <Atom className="w-6 h-6" />,
  '物理化学': <FlaskRound className="w-6 h-6" />,
  'Python 编程': <Code className="w-6 h-6" />,
  '数据分析': <BarChart3 className="w-6 h-6" />,
}

interface ResearchInterestProps {
  fields: string[]
}

export function ResearchInterest({ fields }: ResearchInterestProps) {
  const getIcon = (field: string): ReactNode => {
    for (const [key, icon] of Object.entries(FIELD_ICONS)) {
      if (field.includes(key) || key.includes(field)) return icon
    }
    return <Beaker className="w-6 h-6" />
  }

  const containerRef = useGsapStagger(0.1)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field, index) => (
        <div
          key={field}
          ref={containerRef}
          className="glass-panel glow-border p-6 group cursor-default"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-cyan)]/10 flex items-center justify-center
              text-[var(--color-accent-cyan)] flex-shrink-0 group-hover:bg-[var(--color-accent-cyan)]/20 transition-colors">
              {getIcon(field)}
            </div>
            <div>
              <h4 className="font-bold font-[family-name:var(--font-display)] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-cyan)] transition-colors">
                {field}
              </h4>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[var(--color-accent-cyan)]/50 to-transparent transition-all duration-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
