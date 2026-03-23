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
        href: 'mailto:sumanthpoojary965@gmail.com',
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
            id="footer"
            style={{
                position: 'relative',
                padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem)',
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'linear-gradient(180deg, #060c19 0%, #050b16 100%)',
            }}
        >
            <style>{`
                @keyframes fade-up-footer { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
                .footer-link {
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                    transition: color 0.2s;
                    cursor: pointer;
                    text-decoration: none;
                }
                .footer-link:hover {
                    color: #3b9eff;
                }
                .social-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .social-icon:hover {
                    transform: translateY(-2px);
                }
            `}</style>

            {/* Subtle top glow line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #3b9eff, transparent)',
                opacity: 0.4,
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                animation: 'fade-up-footer 0.8s ease both',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                }}>
                    {/* Top section */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: '1.5rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1.5rem',
                        }}>
                            {/* Left: brand */}
                            <div style={{ textAlign: 'center' }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #3b9eff, #a855f7)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 800,
                                    fontSize: '20px',
                                    display: 'block',
                                    marginBottom: '4px',
                                    fontFamily: 'monospace',
                                }}>
                                    &lt;Sumanth /&gt;
                                </span>
                                <p style={{
                                    color: '#475569',
                                    fontSize: '11px',
                                    margin: 0,
                                }}>
                                    Full Stack Developer · MERN Specialist
                                </p>
                            </div>

                            {/* Center: nav links */}
                            <div style={{
                                display: 'flex',
                                gap: 'clamp(1rem, 3vw, 1.5rem)',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}>
                                {['Home', 'Skills', 'Projects', 'Contact'].map((link) => (
                                    <a
                                        key={link}
                                        href={`#${link.toLowerCase()}`}
                                        className="footer-link"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>

                            {/* Right: social icons */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'center',
                            }}>
                                {socials.map(({ label, href, icon, color }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="social-icon"
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = color;
                                            e.currentTarget.style.boxShadow = `0 0 16px ${color}33`;
                                            e.currentTarget.style.borderColor = `${color}44`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = '#475569';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                                        }}
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div style={{
                        marginTop: '1.5rem',
                        paddingTop: '1.5rem',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                    }}>
                        <p style={{
                            color: '#2d3a4a',
                            fontSize: '11px',
                            margin: 0,
                            textAlign: 'center',
                        }}>
                            Copyright © 2025 Sumanth's Portfolio. All rights reserved.
                        </p>
                        <p style={{
                            color: '#2d3a4a',
                            fontSize: '11px',
                            margin: 0,
                            textAlign: 'center',
                        }}>
                            Built with{' '}
                            <span style={{ color: '#61dafb' }}>React</span>
                            {' '}+{' '}
                            <span style={{ color: '#38bdf8' }}>Tailwind CSS</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
