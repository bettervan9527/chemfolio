import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SkillCloud } from './SkillCloud'
import { SkillBar } from './SkillBar'
import { profile } from '@/data/profile'

export function SkillsSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-purple)]/20 to-transparent" />

      <div className="section-container">
        <SectionTitle
          title="技能工具"
          subtitle="多年实验室工作积累的实验技能与仪器操作能力"
        />

        <div className="mb-16">
          <SkillCloud categories={profile.skills} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={ref}>
          {profile.skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              onAnimationComplete={() => {
                if (catIdx === profile.skills.length - 1) setInView(true)
              }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
