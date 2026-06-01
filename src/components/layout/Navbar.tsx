import { Menu, X, Sun, Moon } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '@/hooks/useTheme'
import { forceLoadSection } from '@/components/ui/lazyLoadUtils'

const NAV_ITEMS = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'publications', label: '实验进程' },
  { id: 'skills', label: '技能工具' },
  { id: 'contact', label: '联系方式' },
]

export function Navbar() {
  const { activeSection, isMenuOpen, toggleMenu, closeMenu } = useAppStore()
  const { theme, toggleTheme } = useTheme()
  useScrollSpy()
  const navItemsRef = useRef<Map<string, HTMLElement>>(new Map())
  const indicatorRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

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

  useEffect(() => {
    if (!indicatorRef.current || initialized.current) return

    const activeItem = navItemsRef.current.get(activeSection)
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect()
      const parentRect = activeItem.parentElement?.getBoundingClientRect()
      if (parentRect) {
        const left = rect.left - parentRect.left + rect.width / 2 - 24
        gsap.set(indicatorRef.current, { left, width: 48 })
        initialized.current = true
      }
    }
  }, [activeSection])

  useEffect(() => {
    if (!indicatorRef.current || !initialized.current) return

    const updateIndicator = () => {
      const activeItem = navItemsRef.current.get(activeSection)
      if (activeItem) {
        const rect = activeItem.getBoundingClientRect()
        const parentRect = activeItem.parentElement?.getBoundingClientRect()
        if (parentRect) {
          const left = rect.left - parentRect.left + rect.width / 2 - 24
          gsap.to(indicatorRef.current, {
            left,
            width: 48,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      }
    }

    updateIndicator()
  }, [activeSection])

  const scrollTo = (id: string) => {
    closeMenu()
    forceLoadSection(id)
    
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) {
        const headerHeight = 72
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
    
    setTimeout(scrollToTarget, 150)
    setTimeout(scrollToTarget, 300)
    setTimeout(scrollToTarget, 500)
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

        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) navItemsRef.current.set(item.id, el)
                }}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer z-10
                  ${activeSection === item.id
                    ? 'text-[var(--color-accent-cyan)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div
              ref={indicatorRef}
              className="absolute bottom-2 h-0.5 bg-[var(--color-accent-cyan)] rounded-full
                shadow-[0_0_8px_var(--color-accent-cyan)]"
              style={{ left: '0px', width: '40px' }}
            />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-all duration-300 cursor-pointer hover:scale-110 rounded-lg hover:bg-white/[0.03]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-all duration-300 cursor-pointer hover:scale-110 rounded-lg hover:bg-white/[0.03]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
