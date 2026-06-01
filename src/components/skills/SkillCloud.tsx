import { useState, type ReactNode } from 'react'
import { useGsapStagger } from '@/hooks/useGsapReveal'
import {
  Beaker,
  Droplets,
  Filter,
  Zap,
  TestTubes,
  Atom,
  Sun,
  Scale,
  Lightbulb,
  Thermometer,
  BarChart3,
  ChartScatter,
  Workflow,
  LineChart,
  Table,
  PenTool,
  FlaskConical,
  Terminal,
} from 'lucide-react'
import type { SkillCategory } from '@/types'

const SKILL_ICON_MAP: Record<string, ReactNode> = {
  '无机合成': <FlaskConical className="w-5 h-5" />,
  '滴定分析': <Droplets className="w-5 h-5" />,
  '重结晶纯化': <Filter className="w-5 h-5" />,
  '电化学实验': <Zap className="w-5 h-5" />,
  '固相合成': <TestTubes className="w-5 h-5" />,
  '配合物合成': <Atom className="w-5 h-5" />,
  '紫外-可见光谱仪': <Sun className="w-5 h-5" />,
  '电子天平': <Scale className="w-5 h-5" />,
  'pH计': <Droplets className="w-5 h-5" />,
  '电化学工作站': <Zap className="w-5 h-5" />,
  '荧光光谱仪': <Lightbulb className="w-5 h-5" />,
  '烘箱与马弗炉': <Thermometer className="w-5 h-5" />,
  'SPSS': <BarChart3 className="w-5 h-5" />,
  'MATLAB': <ChartScatter className="w-5 h-5" />,
  'Draw.io': <Workflow className="w-5 h-5" />,
  'Origin': <LineChart className="w-5 h-5" />,
  'Excel 数据分析': <Table className="w-5 h-5" />,
  'ChemDraw': <PenTool className="w-5 h-5" />,
  'Python': <Terminal className="w-5 h-5" />,
}

function getSkillIcon(name: string): ReactNode {
  return SKILL_ICON_MAP[name] || <Beaker className="w-5 h-5" />
}

function levelLabel(level: number): string {
  if (level >= 86) return '精通'
  if (level >= 76) return '熟练'
  return '入门'
}

interface SkillCloudProps {
  categories: SkillCategory[]
}

export function SkillCloud({ categories }: SkillCloudProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.category || '')
  const staggerRef = useGsapStagger(0.05)

  const allSkills = categories
    .find((c) => c.category === activeCategory)
    ?.items || []

  const maxLevel = Math.max(...allSkills.map((s) => s.level), 1)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer
              ${activeCategory === cat.category
                ? 'bg-[var(--color-accent-cyan)]/15 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30 shadow-[0_0_12px_rgba(0,229,255,0.1)]'
                : 'bg-white/[0.02] text-[var(--color-text-muted)] border border-transparent hover:text-[var(--color-text-secondary)] hover:bg-white/[0.04)]'
              }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div ref={staggerRef} className="flex flex-wrap gap-4 justify-center min-h-[120px] items-start py-4">
        {allSkills.map((skill, index) => {
          const size = 0.8 + (skill.level / maxLevel) * 0.8
          return (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="relative glass-panel glow-border rounded-2xl flex flex-col items-center justify-center gap-1
                  cursor-default hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300 p-4"
                style={{
                  width: `${80 + size * 24}px`,
                  height: `${80 + size * 24}px`,
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-[var(--color-accent-cyan)]/5 group-hover:bg-[var(--color-accent-cyan)]/10 transition-colors" />
                <div className="relative z-10 text-[var(--color-accent-cyan)]">
                  {getSkillIcon(skill.name)}
                </div>
                <span
                  className="relative z-10 font-bold font-[family-name:var(--font-display)] text-[var(--color-accent-cyan)]"
                  style={{ fontSize: `${11 + size * 3}px` }}
                >
                  {levelLabel(skill.level)}
                </span>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors text-center leading-tight max-w-[90px]">
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
