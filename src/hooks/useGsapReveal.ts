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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          ...options,
        }
      )
    }, el)

    return () => {
      ctx.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: staggerDelay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          ...options,
        }
      )
    }, el)

    return () => {
      ctx.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
