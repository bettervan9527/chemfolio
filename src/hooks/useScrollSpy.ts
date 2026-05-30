import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

const SECTION_IDS = ['hero', 'about', 'publications', 'skills', 'contact']

export function useScrollSpy() {
  const setActiveSection = useAppStore((s) => s.setActiveSection)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTION_IDS[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(SECTION_IDS[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])
}
