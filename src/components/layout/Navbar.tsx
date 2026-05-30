import { Menu, X } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'publications', label: '实验进程' },
  { id: 'skills', label: '技能工具' },
  { id: 'contact', label: '联系方式' },
]

export function Navbar() {
  const { activeSection, isMenuOpen, toggleMenu, closeMenu } = useAppStore()
  useScrollSpy()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const scrollTo = (id: string) => {
    closeMenu()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-t-0 rounded-none">
      <div className="section-container flex items-center justify-between h-16">
        <button
          onClick={() => scrollTo('hero')}
          className="font-bold text-lg font-[family-name:var(--font-display)] text-gradient-cyan cursor-pointer"
        >
          ChemFolio
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer
                ${activeSection === item.id
                  ? 'text-[var(--color-accent-cyan)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--color-accent-cyan)] rounded-full
                  shadow-[0_0_8px_var(--color-accent-cyan)]" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t-0 rounded-none border-x-0 animate-fade-in-up">
          <div className="section-container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                  ${activeSection === item.id
                    ? 'bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-white/[0.03] hover:text-[var(--color-text-primary)]'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
