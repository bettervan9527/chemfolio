import { ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 border-t border-[var(--color-border)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)]/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-accent-cyan)]/30" />
          <span className="text-[var(--color-text-muted)] text-6xl font-light font-[family-name:var(--font-display)] select-none">
            C₆H₆
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-accent-orange)]/30" />
        </div>

        <p className="text-[var(--color-text-muted)] text-sm">
          &copy; {new Date().getFullYear()} ChemFolio · 用分子语言讲述我的故事
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-muted)]
            hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          回到顶部
        </button>
      </div>
    </footer>
  )
}
