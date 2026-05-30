import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/hero/HeroSection'
import { AboutSection } from '@/components/about/AboutSection'
import { PublicationsSection } from '@/components/publications/PublicationsSection'
import { SkillsSection } from '@/components/skills/SkillsSection'
import { ContactSection } from '@/components/contact/ContactSection'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PublicationsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
