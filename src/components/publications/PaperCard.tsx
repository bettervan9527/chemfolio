import { useGsapReveal } from '@/hooks/useGsapReveal'
import { ExternalLink, FileText } from 'lucide-react'
import type { Publication } from '@/types'

interface PaperCardProps {
  paper: Publication
  index: number
}

const JOURNAL_COLORS: Record<string, string> = {
  'JACS': '#ef4444',
  'Angew': '#f59e0b',
  'Nature': '#10b981',
  'Green': '#22c55e',
}

function getJournalColor(journal: string): string {
  for (const [key, color] of Object.entries(JOURNAL_COLORS)) {
    if (journal.includes(key)) return color
  }
  return '#00e5ff'
}

export function PaperCard({ paper, index }: PaperCardProps) {
  const accentColor = getJournalColor(paper.journal)
  const reportPath = paper.reportFile ? `/Paper/${paper.reportFile}` : null
  const ref = useGsapReveal({ delay: index * 0.1 })

  return (
    <div
      ref={ref}
      className="glass-panel group relative overflow-hidden cursor-default transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,229,255,0.1)]"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 group-hover:w-1.5"
        style={{ 
          backgroundColor: accentColor,
          boxShadow: `0 0 12px ${accentColor}40`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="pl-5 p-6 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] leading-relaxed group-hover:text-[var(--color-accent-cyan)] transition-all duration-300 font-[family-name:var(--font-display)]">
            {paper.title}
          </h4>
          {paper.doi && (
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-1.5 rounded-lg bg-white/[0.03] text-[var(--color-text-muted)]
                hover:text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/10 transition-all duration-200 hover:scale-110"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2 transition-all duration-300 group-hover:text-[var(--color-text-secondary)]">
          {paper.authors}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] transition-all duration-300 group-hover:bg-[var(--color-accent-cyan)]/20">
            {paper.journal}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">{paper.year}</span>

          {reportPath ? (
            <a
              href={reportPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg ml-auto
                bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)]
                hover:bg-[var(--color-accent-green)]/20 transition-all duration-200 hover:scale-105"
            >
              <FileText className="w-3 h-3" />
              查看报告
            </a>
          ) : (
            <span className="text-xs text-[var(--color-text-muted)]/50 italic ml-auto">
              实验报告整理中
            </span>
          )}
        </div>
        {paper.abstract && (
          <p className="mt-3 text-xs text-[var(--color-text-muted)]/70 leading-relaxed line-clamp-2 transition-all duration-300 group-hover:text-[var(--color-text-muted)]">
            {paper.abstract}
          </p>
        )}
      </div>
    </div>
  )
}
