import { useState, useEffect } from 'react'

const links = ['Home', 'About', 'Projects', 'Contact']

export default function Navbar() {
    const [active, setActive] = useState('Home')
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300
        ${scrolled ? 'glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent'}
      `}
        >
            {/* Logo */}
            <span
                className="grad-text font-display font-extrabold text-lg sm:text-xl tracking-tight cursor-pointer select-none"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                &lt;Sumanth /&gt;
            </span>

            {/* Desktop nav pills */}
            <div className="hidden sm:flex items-center glass-nav rounded-full px-2 py-1.5 gap-1">
                {links.map((link) => (
                    <button
                        key={link}
                        onClick={() => setActive(link)}
                        className={`
              px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer
              ${active === link
                                ? 'bg-gradient-to-r from-[#3b9eff] to-[#a855f7] text-white shadow-[0_0_16px_rgba(59,158,255,0.5)]'
                                : 'text-[#94a3b8] hover:text-white'}
            `}
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        {link}
                    </button>
                ))}
            </div>

            {/* Mobile hamburger */}
            <button
                className="sm:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-0.5 bg-[#3b9eff] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-[#a855f7] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-[#3b9eff] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 glass-nav border-t border-white/10 flex flex-col py-3">
                    {links.map((link) => (
                        <button
                            key={link}
                            onClick={() => { setActive(link); setMenuOpen(false) }}
                            className={`
                px-6 py-3 text-left text-sm font-semibold transition-colors cursor-pointer
                ${active === link ? 'grad-text' : 'text-[#94a3b8] hover:text-white'}
              `}
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {link}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    )
}