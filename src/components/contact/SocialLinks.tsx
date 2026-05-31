import { useGsapStagger } from '@/hooks/useGsapReveal'
import type { Social } from '@/types'
import {
  GraduationCap,
  FlaskConical,
  BookOpen,
  Github,
  Linkedin,
  ExternalLink,
} from 'lucide-react'
import type { ReactNode } from 'react'

const ICON_MAP: Record<string, ReactNode> = {
  'graduation-cap': <GraduationCap className="w-5 h-5" />,
  'flask-conical': <FlaskConical className="w-5 h-5" />,
  'book-open': <BookOpen className="w-5 h-5" />,
  'github': <Github className="w-5 h-5" />,
  'linkedin': <Linkedin className="w-5 h-5" />,
}

interface SocialLinksProps {
  social: Social[]
}

export function SocialLinks({ social }: SocialLinksProps) {
  const containerRef = useGsapStagger(0.1, { scale: 0.8, opacity: 0 })

  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {social.map((item) => (
        <a
          key={item.platform}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel glow-border p-4 flex flex-col items-center gap-2 group cursor-pointer
            hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] hover:scale-105 transition-transform duration-300"
        >
          <div className="text-[var(--color-accent-cyan)] group-hover:text-[var(--color-accent-cyan)] transition-colors">
            {ICON_MAP[item.icon] || <ExternalLink className="w-5 h-5" />}
          </div>
          <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
            {item.platform}
          </span>
        </a>
      ))}
    </div>
  )
}
