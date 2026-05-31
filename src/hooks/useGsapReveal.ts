import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options?: gsap.TweenVars
) {
  const ref = useRef<T>(null)
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    ctx.current = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ...options,
        }
      )
    }, el)

    return () => {
      ctx.current?.revert()
    }
  }, [])

  return ref
}

export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  staggerDelay: number = 0.1,
  options?: gsap.TweenVars
) {
  const ref = useRef<T>(null)
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    ctx.current = gsap.context(() => {
      const children = el.children
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: staggerDelay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ...options,
        }
      )
    }, el)

    return () => {
      ctx.current?.revert()
    }
  }, [])

  return ref
}
