import { useEffect, useMemo, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('#home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.href.slice(1)), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.6],
      },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const onNavigate = (href) => {
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <nav
        className={[
          'mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-3 py-2 sm:px-4 transition-all duration-300',
          scrolled
            ? 'border-white/15 bg-[#061123]/80 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-white/8 bg-[#061123]/55 backdrop-blur-md',
        ].join(' ')}
      >
        <button
          type="button"
          onClick={() => onNavigate('#home')}
          className="grad-text cursor-pointer select-none text-base font-extrabold tracking-tight sm:text-lg"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          &lt;Sumanth /&gt;
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => onNavigate(link.href)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer',
                active === link.href
                  ? 'bg-gradient-to-r from-[#3b9eff] to-[#a855f7] text-white shadow-[0_0_18px_rgba(59,158,255,0.42)]'
                  : 'text-[#94a3b8] hover:bg-white/5 hover:text-white',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 sm:hidden"
          onClick={() => setMenuOpen((state) => !state)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-[#8cc4ff] transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-[#e2b8ff] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-[#8cc4ff] transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </nav>

      <div
        className={[
          'sm:hidden overflow-hidden rounded-2xl border border-white/10 bg-[#08152b]/95 backdrop-blur-xl transition-all duration-300',
          menuOpen ? 'mt-2 max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="space-y-1 p-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => onNavigate(link.href)}
              className={[
                'w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                active === link.href
                  ? 'bg-gradient-to-r from-[#3b9eff]/25 to-[#a855f7]/25 text-white'
                  : 'text-[#94a3b8] hover:bg-white/5 hover:text-white',
              ].join(' ')}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
