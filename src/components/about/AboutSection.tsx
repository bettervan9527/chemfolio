import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { EducationTimeline } from './EducationTimeline'
import { ResearchInterest } from './ResearchInterest'
import { profile } from '@/data/profile'

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)]/20 to-transparent" />

      <div className="section-container">
        <SectionTitle
          title="关于我"
          subtitle="从分子结构到生命奥秘，我始终保持着对化学世界的好奇与探索"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-panel p-8 h-full">
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-6">
                个人简介
              </h3>
              <div className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line text-sm">
                {profile.about}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-8">
              教育经历
            </h3>
            <EducationTimeline education={profile.education} />
          </motion.div>
        </div>

        <div>
          <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-8 text-center">
            研究方向
          </h3>
          <ResearchInterest fields={profile.researchFields} />
        </div>
      </div>
    </section>
  )
}
