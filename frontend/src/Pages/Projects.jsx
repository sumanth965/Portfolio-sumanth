import { useState, useRef } from 'react'

const projects = [
    {
        title: 'E-commerce Platform',
        desc: 'A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard built with the MERN stack.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        accent: '#a855f7',
        accentB: '#7c3aed',
        emoji: '🛒',
        mockup: (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 gap-2">
                <div className="w-full rounded-md overflow-hidden" style={{ background: 'rgba(168,85,247,0.15)', padding: '8px', border: '1px solid rgba(168,85,247,0.2)' }}>
                    <div className="text-[9px] font-bold text-[#c084fc] mb-2" style={{ fontFamily: 'var(--font-display)' }}>E-commerce Platform</div>
                    <div className="flex gap-1.5">
                        {['👕', '👟', '🎒'].map((em, i) => (
                            <div key={i} className="flex-1 rounded" style={{ background: 'rgba(168,85,247,0.2)', padding: '4px', textAlign: 'center', fontSize: '10px' }}>{em}</div>
                        ))}
                    </div>
                    <div className="mt-2 rounded h-1.5 w-3/4" style={{ background: 'linear-gradient(90deg, #a855f7, #7c3aed)' }} />
                </div>
            </div>
        ),
    },
    {
        title: 'Task Management App',
        desc: 'A collaborative Kanban-style project management tool with drag-and-drop, real-time updates, and team assignments.',
        tags: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
        accent: '#3b9eff',
        accentB: '#1d6fd4',
        emoji: '📋',
        mockup: (
            <div className="w-full h-full p-3 flex flex-col gap-2">
                <div className="text-[9px] font-bold text-[#60a5fa] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Sprint Board</div>
                {[
                    { label: 'Todo', color: '#475569', items: 3 },
                    { label: 'In Progress', color: '#3b9eff', items: 2 },
                    { label: 'Done', color: '#22c55e', items: 4 },
                ].map(({ label, color, items }) => (
                    <div key={label}>
                        <div className="text-[8px] font-semibold mb-1" style={{ color, fontFamily: 'var(--font-display)' }}>{label} · {items}</div>
                        {Array.from({ length: Math.min(items, 2) }).map((_, j) => (
                            <div key={j} className="h-1.5 rounded mb-1" style={{ background: `${color}33`, borderLeft: `2px solid ${color}` }} />
                        ))}
                    </div>
                ))}
            </div>
        ),
    },
    {
        title: 'Social Media Dashboard',
        desc: 'Analytics dashboard aggregating data from multiple social platforms with interactive charts, trend analysis, and scheduling.',
        tags: ['React', 'D3.js', 'Node.js', 'AWS'],
        accent: '#06b6d4',
        accentB: '#0891b2',
        emoji: '📊',
        mockup: (
            <div className="w-full h-full p-3 flex flex-col gap-2">
                <div className="text-[9px] font-bold text-[#22d3ee] mb-1" style={{ fontFamily: 'var(--font-display)' }}>Analytics Overview</div>
                <div className="flex gap-1 h-12 items-end">
                    {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 rounded-t transition-all"
                            style={{
                                height: `${h}%`,
                                background: `linear-gradient(to top, #06b6d4, #22d3ee66)`,
                                boxShadow: `0 0 6px rgba(6,182,212,0.4)`
                            }}
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    {['👍 2.4k', '💬 891', '🔁 1.2k'].map((stat, i) => (
                        <div key={i} className="text-[8px] text-[#64748b] font-medium">{stat}</div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: 'AI Chat Application',
        desc: 'Real-time AI-powered chat platform with context memory, multi-model support, and conversation history management.',
        tags: ['React', 'OpenAI', 'Node.js', 'Redis'],
        accent: '#22c55e',
        accentB: '#16a34a',
        emoji: '🤖',
        mockup: (
            <div className="w-full h-full p-3 flex flex-col gap-2 justify-end">
                <div className="text-[9px] font-bold text-[#4ade80] mb-1" style={{ fontFamily: 'var(--font-display)' }}>AI Assistant</div>
                {[
                    { msg: 'Hello! How can I help?', ai: true },
                    { msg: 'Build me a REST API', ai: false },
                    { msg: 'Sure! Here is the code...', ai: true },
                ].map((m, i) => (
                    <div key={i} className={`flex ${m.ai ? 'justify-start' : 'justify-end'}`}>
                        <div
                            className="text-[8px] px-2 py-1 rounded-lg max-w-[80%]"
                            style={{
                                background: m.ai ? 'rgba(34,197,94,0.15)' : 'rgba(59,158,255,0.15)',
                                color: m.ai ? '#4ade80' : '#60a5fa',
                                border: `1px solid ${m.ai ? 'rgba(34,197,94,0.2)' : 'rgba(59,158,255,0.2)'}`,
                            }}
                        >
                            {m.msg}
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
]

export default function Projects() {
    const [activeIdx, setActiveIdx] = useState(0)
    const scrollRef = useRef(null)

    const scroll = (dir) => {
        const el = scrollRef.current
        if (!el) return
        el.scrollBy({ left: dir * 240, behavior: 'smooth' })
    }

    return (
        <section
            className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #080f1e 0%, #060d1a 100%)' }}
        >
            {/* bg glow */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] blur-3xl rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
            />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section header */}
                <div
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12"
                    style={{ animation: 'fade-up 0.7s ease both' }}
                >
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-[#a855f7] to-transparent" />
                            <span className="text-xs font-bold text-[#a855f7] uppercase tracking-[0.2em]">Portfolio</span>
                        </div>
                        <h2 className="section-heading">
                            Featured{' '}
                            <span className="grad-text-reverse">Projects</span>
                        </h2>
                        <p className="text-[#475569] text-sm sm:text-base mt-2 max-w-md">
                            A selection of projects showcasing my full-stack capabilities.
                        </p>
                    </div>

                    {/* Arrow controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll(-1)}
                            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#94a3b8] hover:text-[#3b9eff] hover:border-[#3b9eff] transition-all cursor-pointer"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                            aria-label="Scroll left"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => scroll(1)}
                            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#94a3b8] hover:text-[#3b9eff] hover:border-[#3b9eff] transition-all cursor-pointer"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                            aria-label="Scroll right"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Horizontal scroll on mobile, grid on desktop */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
                >
                    {projects.map((p, i) => (
                        <div
                            key={p.title}
                            onMouseEnter={() => setActiveIdx(i)}
                            className="flex-shrink-0 w-[240px] sm:w-auto glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group"
                            style={{
                                animation: `fade-up 0.6s ease ${i * 0.1}s both`,
                                borderColor: activeIdx === i ? `${p.accent}44` : undefined,
                                boxShadow: activeIdx === i ? `0 16px 50px ${p.accent}18` : undefined,
                                transform: activeIdx === i ? 'translateY(-6px)' : 'translateY(0)',
                            }}
                        >
                            {/* Mockup thumb */}
                            <div
                                className="relative overflow-hidden"
                                style={{
                                    height: '140px',
                                    background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accentB}10 100%)`,
                                    borderBottom: `1px solid ${p.accent}22`,
                                }}
                            >
                                {p.mockup}
                                {/* Shine effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `linear-gradient(135deg, ${p.accent}08 0%, transparent 60%)`,
                                    }}
                                />
                                {/* Emoji badge */}
                                <div
                                    className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                                    style={{ background: `${p.accent}22`, backdropFilter: 'blur(8px)' }}
                                >
                                    {p.emoji}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3
                                    className="text-sm font-bold text-[#e2e8f0] mb-1.5 group-hover:text-white transition-colors"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {p.title}
                                </h3>
                                <p className="text-[#475569] text-xs leading-relaxed mb-3 line-clamp-3">
                                    {p.desc}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {p.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                                            style={{
                                                background: `${p.accent}15`,
                                                color: p.accent,
                                                border: `1px solid ${p.accent}30`,
                                                fontFamily: 'var(--font-display)',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-2">
                                    <button
                                        className="flex items-center gap-1 text-[10px] font-bold transition-colors"
                                        style={{ color: p.accent, fontFamily: 'var(--font-display)' }}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                        Code
                                    </button>
                                    <button
                                        className="flex items-center gap-1 text-[10px] font-bold text-[#475569] hover:text-[#94a3b8] transition-colors"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
                                        Live Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 justify-center mt-6 sm:hidden">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            className="transition-all duration-300 rounded-full cursor-pointer"
                            style={{
                                width: activeIdx === i ? '20px' : '8px',
                                height: '8px',
                                background: activeIdx === i ? '#3b9eff' : 'rgba(59,158,255,0.25)',
                            }}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}