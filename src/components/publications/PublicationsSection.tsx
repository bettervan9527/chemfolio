import { useGsapReveal } from '@/hooks/useGsapReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { PaperCard } from './PaperCard'
import { profile } from '@/data/profile'

export function PublicationsSection() {
  const publicationsByYear = profile.publications.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = []
    acc[pub.year].push(pub)
    return acc
  }, {} as Record<number, typeof profile.publications>)

  const sortedYears = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  const yearRef = useGsapReveal()

  return (
    <section id="publications" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-orange)]/20 to-transparent" />

      <div className="section-container">
        <SectionTitle
          title="实验进程"
          subtitle="本科期间的化学实验记录与探索"
        />

        <div className="space-y-12">
          {sortedYears.map((year) => (
            <div key={year}>
              <div
                ref={yearRef}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-gradient-fire">
                  {year}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent-orange)]/30 to-transparent" />
              </div>

              <div className="space-y-4">
                {publicationsByYear[year].map((paper, index) => (
                  <PaperCard key={paper.title} paper={paper} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
