const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
        color: '#e2e8f0',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: '#0a66c2',
    },
    {
        label: 'Email',
        href: 'mailto:sumanth@example.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
        color: '#f43f5e',
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        color: '#1d9bf0',
    },
]

export default function Footer() {
    return (
        <footer
            className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
            {/* subtle top glow line */}
            <div className="glow-line w-full absolute top-0 left-0" style={{ opacity: 0.4 }} />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                    {/* Left: brand */}
                    <div className="text-center sm:text-left">
                        <span
                            className="grad-text font-extrabold text-xl block mb-1"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            &lt;Sumanth /&gt;
                        </span>
                        <p className="text-[#475569] text-xs">
                            Full Stack Developer · MERN Specialist
                        </p>
                    </div>

                    {/* Center: nav links */}
                    <div className="flex gap-4 sm:gap-6">
                        {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                            <button
                                key={link}
                                className="text-xs font-semibold text-[#475569] hover:text-[#3b9eff] transition-colors cursor-pointer"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {link}
                            </button>
                        ))}
                    </div>

                    {/* Right: social icons */}
                    <div className="flex gap-3">
                        {socials.map(({ label, href, icon, color }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#475569] transition-all duration-200 hover:-translate-y-0.5"
                                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                                onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.boxShadow = `0 0 16px ${color}33`; e.currentTarget.style.borderColor = `${color}44` }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                    <p className="text-[#2d3a4a] text-xs">
                        Copyright © 2024 Sumanth's Portfolio. All rights reserved.
                    </p>
                    <p className="text-[#2d3a4a] text-xs">
                        Built with{' '}
                        <span className="text-[#61dafb]">React</span>
                        {' '}+{' '}
                        <span className="text-[#38bdf8]">Tailwind CSS v4</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}