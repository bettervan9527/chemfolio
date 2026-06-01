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
  const staggerRef = useGsapStagger(0.1)

  return (
    <div ref={staggerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {social.map((item) => {
        const hasUrl = item.url && item.url.length > 0
        
        if (hasUrl) {
          return (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glow-border p-4 flex flex-col items-center gap-2 group cursor-pointer
                transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] hover:scale-[1.05] hover:-rotate-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-accent-cyan)]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-[var(--color-accent-cyan)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 relative z-10">
                  {ICON_MAP[item.icon] || <ExternalLink className="w-5 h-5" />}
                </div>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-all duration-300 group-hover:translate-y-0.5">
                {item.platform}
              </span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-accent-cyan)] rounded-full group-hover:w-1/2 transition-all duration-300" />
            </a>
          )
        }

        return (
          <div
            key={item.platform}
            className="glass-panel p-4 flex flex-col items-center gap-2 group cursor-default opacity-60"
          >
            <div className="relative">
              <div className="text-[var(--color-accent-cyan)] relative z-10">
                {ICON_MAP[item.icon] || <ExternalLink className="w-5 h-5" />}
              </div>
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">
              {item.platform}
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)] opacity-60">
              暂未开放
            </span>
          </div>
        )
      })}
    </div>
  )
}
