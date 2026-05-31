import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapStagger } from '@/hooks/useGsapReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillCloud } from './SkillCloud'
import { SkillBar } from './SkillBar'
import { profile } from '@/data/profile'

gsap.registerPlugin(ScrollTrigger)

export function SkillsSection() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useGsapStagger(0.15, { y: 20, opacity: 0 })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => setInView(true),
      once: true,
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section id="skills" className="relative py-24 md:py-32" ref={sectionRef}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-purple)]/20 to-transparent" />

      <div className="section-container">
        <SectionTitle
          title="技能工具"
          subtitle="多年实验室工作积累的实验技能与仪器操作能力"
        />

        <div className="mb-16">
          <SkillCloud categories={profile.skills} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={gridRef}>
          {profile.skills.map((category) => (
            <div key={category.category}>
              <div className="glass-panel p-6 h-full">
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-6">
                  {category.category}
                </h3>
                <div className="space-y-5">
                  {category.items.map((skill, idx) => (
                    <SkillBar key={skill.name} skill={skill} index={idx} inView={inView} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
