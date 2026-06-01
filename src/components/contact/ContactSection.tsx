import { useGsapReveal } from '@/hooks/useGsapReveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SocialLinks } from './SocialLinks'
import { profile } from '@/data/profile'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const formRef = useGsapReveal<HTMLDivElement>()
  const infoRef = useGsapReveal<HTMLDivElement>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `来自个人网站的联络 - ${name}`
    const body = `姓名：${name}\n邮箱：${email}\n\n${message}`
    window.location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 section-offscreen">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-green)]/20 to-transparent" />

      <div className="section-container">
        <SectionTitle
          title="联系方式"
          subtitle="期待与您交流，欢迎通过以下方式联系我"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={formRef}>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-6">
              发送消息
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">姓名</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl glass-panel text-[var(--color-text-primary)] text-sm
                    border border-[var(--color-border)] focus:border-[var(--color-accent-cyan)]/50
                    focus:outline-none focus:shadow-[0_0_12px_rgba(0,229,255,0.1)] transition-all
                    placeholder:text-[var(--color-text-muted)] bg-transparent"
                  placeholder="您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl glass-panel text-[var(--color-text-primary)] text-sm
                    border border-[var(--color-border)] focus:border-[var(--color-accent-cyan)]/50
                    focus:outline-none focus:shadow-[0_0_12px_rgba(0,229,255,0.1)] transition-all
                    placeholder:text-[var(--color-text-muted)] bg-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">留言</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl glass-panel text-[var(--color-text-primary)] text-sm
                    border border-[var(--color-border)] focus:border-[var(--color-accent-cyan)]/50
                    focus:outline-none focus:shadow-[0_0_12px_rgba(0,229,255,0.1)] transition-all resize-none
                    placeholder:text-[var(--color-text-muted)] bg-transparent"
                  placeholder="写下您想说的话..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm
                  bg-[var(--color-accent-cyan)]/10 border border-[var(--color-accent-cyan)]/30
                  text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/20
                  hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                发送消息
              </button>
            </form>
          </div>

          <div ref={infoRef}>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-6">
              联系信息
            </h3>

            <div className="glass-panel p-6 space-y-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-cyan)]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-0.5">电子邮箱</p>
                  <a href={`mailto:${profile.contact.email}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors">
                    {profile.contact.email}
                  </a>
                </div>
              </div>
              {profile.contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-cyan)]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5">电话</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{profile.contact.phone}</p>
                  </div>
                </div>
              )}
              {profile.contact.address && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-cyan)]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5">地址</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{profile.contact.address}</p>
                  </div>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-gradient-cyan mb-4">
              学术社交
            </h3>
            <SocialLinks social={profile.social} />
          </div>
        </div>
      </div>
    </section>
  )
}
