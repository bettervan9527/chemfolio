import { ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-10 border-t border-[var(--color-border)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)]/50 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center gap-5">
        <p className="text-[var(--color-text-muted)] text-sm">
          &copy; {new Date().getFullYear()} 樊高运 · 河南大学化学与分子科学学院
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
