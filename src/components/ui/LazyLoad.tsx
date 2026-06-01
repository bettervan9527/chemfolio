import { useEffect, useState, useRef, Suspense, useCallback } from 'react'
import { consumeForceLoad } from './lazyLoadUtils'

interface LazyLoadProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  rootMargin?: string
  threshold?: number
  sectionId?: string
}

export function LazyLoad({ 
  children, 
  placeholder = <div className="animate-pulse bg-[var(--color-border)]/30 rounded-lg" />,
  rootMargin = '100px',
  threshold = 0.1,
  sectionId,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const checkForceLoad = useCallback(() => {
    if (sectionId && consumeForceLoad(sectionId)) {
      setIsVisible(true)
      return true
    }
    return false
  }, [sectionId])

  useEffect(() => {
    if (checkForceLoad()) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin,
        threshold,
      }
    )

    const element = containerRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
      observer.disconnect()
    }
  }, [containerRef, rootMargin, threshold, checkForceLoad])

  useEffect(() => {
    const interval = setInterval(() => {
      checkForceLoad()
    }, 100)
    return () => clearInterval(interval)
  }, [checkForceLoad])

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>}>
      {isVisible ? (
        <Suspense fallback={placeholder}>
          {children}
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  )
}
