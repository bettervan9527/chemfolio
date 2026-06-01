import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { MoleculeCanvas } from './MoleculeCanvas'
import { profile } from '@/data/profile'

export function HeroSection() {
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'easeOut'
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.15,
      ease: 'easeOut'
    }, '-=0.5')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'easeOut'
    }, '-=0.5')
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.45,
      ease: 'easeOut'
    }, '-=0.5')
    .to(tagsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.6,
      ease: 'easeOut'
    }, '-=0.5')
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.6,
      delay: 1.2
    })
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

        <div
          ref={labelRef}
          className="opacity-0 translate-y-[30px]"
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-accent-cyan)]/30" />
            <span className="text-sm text-[var(--color-accent-cyan)]/80 font-medium font-[family-name:var(--font-display)] tracking-widest uppercase">
              Chemistry
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-accent-cyan)]/30" />
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] mb-4 opacity-0 translate-y-[30px]"
        >
          <span className="text-gradient-cyan">{profile.name}</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-2 font-medium opacity-0 translate-y-[20px]"
        >
          {profile.title}
        </p>

        <p
          ref={descriptionRef}
          className="text-sm md:text-base text-[var(--color-text-muted)] max-w-xl mb-10 leading-relaxed opacity-0 translate-y-[20px]"
        >
          {profile.subtitle}
        </p>

        <div
          ref={tagsRef}
          className="flex flex-wrap gap-3 justify-center mb-12 opacity-0 translate-y-[20px]"
        >
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
          ref={scrollIndicatorRef}
          href="#about"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer opacity-0"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
