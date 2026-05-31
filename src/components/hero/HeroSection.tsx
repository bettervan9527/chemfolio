import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { MoleculeCanvas } from './MoleculeCanvas'
import { profile } from '@/data/profile'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const children = el.children

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.fromTo(
        children[0],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0
      )
      tl.fromTo(
        children[1],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.15
      )
      tl.fromTo(
        children[2],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      )
      tl.fromTo(
        children[3],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.45
      )
      tl.fromTo(
        children[4],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      )
      tl.fromTo(
        children[5],
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.2
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MoleculeCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-primary)]/30 to-[var(--color-bg-primary)] pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--color-accent-cyan)]/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[var(--color-accent-orange)]/5 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-accent-purple)]/3 blur-[180px] animate-pulse-glow" style={{ animationDelay: '0.7s' }} />

      <div className="section-container relative z-10 flex flex-col items-center text-center pt-20">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full glass-panel glow-border flex items-center justify-center overflow-hidden relative">
            <img
              src="/touxiang.jpg"
              alt={profile.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-cyan)]/10 to-transparent pointer-events-none" />
          </div>
        </div>

        <div ref={containerRef}>
          <div>
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-accent-cyan)]/30" />
              <span className="text-sm text-[var(--color-accent-cyan)]/80 font-medium font-[family-name:var(--font-display)] tracking-widest uppercase">
                Chemistry
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-accent-cyan)]/30" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] mb-4">
            <span className="text-gradient-cyan">{profile.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-2 font-medium">
            {profile.title}
          </p>

          <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-xl mb-10 leading-relaxed">
            {profile.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {profile.researchFields.map((field, i) => (
              <span
                key={field}
                className="px-4 py-1.5 text-xs font-medium rounded-full glass-panel text-[var(--color-accent-cyan)]
                  border-[var(--color-accent-cyan)]/20 shadow-[0_0_12px_rgba(0,229,255,0.08)] animate-fade-in-up"
                style={{ animationDelay: `${0.7 + i * 0.1}s` }}
              >
                {field}
              </span>
            ))}
          </div>

          <a
            href="#about"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}