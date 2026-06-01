import { lazy, Suspense, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { LazyLoad } from '@/components/ui/LazyLoad'
import { useTheme } from '@/hooks/useTheme'

const HeroSection = lazy(() => 
  import('@/components/hero/HeroSection').then(({ HeroSection }) => ({ default: HeroSection }))
)
const AboutSection = lazy(() => 
  import('@/components/about/AboutSection').then(({ AboutSection }) => ({ default: AboutSection }))
)
const PublicationsSection = lazy(() => 
  import('@/components/publications/PublicationsSection').then(({ PublicationsSection }) => ({ default: PublicationsSection }))
)
const SkillsSection = lazy(() => 
  import('@/components/skills/SkillsSection').then(({ SkillsSection }) => ({ default: SkillsSection }))
)
const ContactSection = lazy(() => 
  import('@/components/contact/ContactSection').then(({ ContactSection }) => ({ default: ContactSection }))
)

const SectionPlaceholder = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[var(--color-accent-cyan)] border-t-transparent rounded-full animate-spin" />
  </div>
)

export default function App() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const navEntry = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navEntry?.type === 'reload') {
      window.scrollTo(0, 0)
      return
    }
    
    const savedPosition = sessionStorage.getItem('scrollPosition')
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10))
      }, 100)
    }
    
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />
      <main>
        <Suspense fallback={<SectionPlaceholder />}>
          <HeroSection />
        </Suspense>
        
        <LazyLoad placeholder={<SectionPlaceholder />} sectionId="about">
          <AboutSection />
        </LazyLoad>
        
        <LazyLoad placeholder={<SectionPlaceholder />} sectionId="publications">
          <PublicationsSection />
        </LazyLoad>
        
        <LazyLoad placeholder={<SectionPlaceholder />} sectionId="skills">
          <SkillsSection />
        </LazyLoad>
        
        <LazyLoad placeholder={<SectionPlaceholder />} sectionId="contact">
          <ContactSection />
        </LazyLoad>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}