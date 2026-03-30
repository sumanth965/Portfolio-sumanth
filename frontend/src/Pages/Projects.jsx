import { useState, useRef, useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
import { sectionFadeUp, staggerContainer, staggerItem } from '../utils/motion'

/* ─────────────────── REAL PROJECT DATA + MOCKUPS ─────────────────── */
const projects = [
  {
    name: 'Employee Leave Management System',
    desc: 'Full-stack enterprise leave tracking system featuring multi-role authentication, automated approval workflows, and real-time dashboard analytics.',
    link: 'https://github.com/sumanth965/Employee-Leave-Management-System',
    demo: 'https://elms-management.onrender.com/',
    category: 'Full Stack',
    accent: '#0ea5e9',
    accentB: '#0369a1',
    emoji: '🏢',
    tags: ['MERN Stack', 'JWT Auth', 'Approval Workflow', 'Admin Panel'],
  },
  {
    name: 'Smart Student Productivity System',
    desc: 'High-performance productivity suite for students, integrating task management, deadline tracking, and smart schedule optimization algorithms.',
    link: 'https://github.com/sumanth965/smart-student-productivity-system',
    demo: 'https://smart-student-productivity-system.onrender.com/',
    category: 'Full Stack',
    accent: '#22c55e',
    accentB: '#15803d',
    emoji: '🎯',
    tags: ['React', 'Node.js', 'Workflow Optimization', 'Task Tracking'],
  },
  {
    name: 'Nexus Web Games',
    desc: 'A decentralized collection of high-interaction browser games, prioritizing smooth gameplay performance and responsive UI architecture.',
    link: 'https://github.com/sumanth965/nexus-web-games',
    demo: 'https://nexus-web-games.vercel.app/',
    category: 'Frontend',
    accent: '#f43f5e',
    accentB: '#be123c',
    emoji: '🎮',
    tags: ['JavaScript ES6+', 'Canvas API', 'Game Logic', 'UI/UX'],
  },
  {
    name: 'Online Art Auction',
    desc: 'E-commerce auction platform for digital art, featuring real-time bidding updates, secure payment simulations, and curated artist galleries.',
    link: 'https://github.com/sumanth965/Online-Art-Auction',
    demo: 'https://online-art-auction.vercel.app/',
    category: 'Full Stack',
    accent: '#a855f7',
    accentB: '#6b21a8',
    emoji: '🎨',
    tags: ['MERN', 'WebSocket', 'Real-time Bidding', 'Digital Commerce'],
  },
  {
    name: 'MERN Excel Analytics',
    desc: 'Advanced data orchestration platform that transforms Excel datasets into interactive visual insights and professional PDF reports.',
    link: 'https://github.com/sumanth965/MERN-excel-analytics-',
    demo: 'https://excel-analytic-sumanth09.onrender.com',
    category: 'Full Stack',
    accent: '#3b9eff',
    accentB: '#1d4ed8',
    emoji: '📊',
    tags: ['Data Visualization', 'Excel Parser', 'Chart.js', 'Express.js'],
  },
  {
    name: 'Unified Image Slider',
    desc: 'GPU-accelerated responsive gallery engine with fluid transitions, lazy loading, and touch-optimized navigation for mobile platforms.',
    link: 'https://github.com/sumanth965/Image_Slider',
    demo: 'https://sumanth09-image-slider.netlify.app/',
    category: 'Frontend',
    accent: '#a855f7',
    accentB: '#7c3aed',
    emoji: '🎞',
    tags: ['Frontend Architecture', 'CSS Animations', 'Performance', 'Vite'],
  },
  {
    name: 'Secure Cloud Auth',
    desc: 'Enterprise-grade authentication system featuring encrypted session management, password hashing, and role-based access control (RBAC).',
    link: 'https://github.com/sumanth965/signin-signup-page',
    demo: 'https://su-manth09-signin-signup-page-frontend.onrender.com',
    category: 'Full Stack',
    accent: '#facc15',
    accentB: '#ca8a04',
    emoji: '🔐',
    tags: ['Cybersecurity', 'Session Management', 'Hashing', 'Auth Flow'],
  },
  {
    name: 'Foodify',
    desc: 'End-to-end food delivery orchestration system with menu management, live order tracking, and sophisticated administrative controls.',
    link: 'https://github.com/sumanth965/Foodify',
    demo: 'https://foodify-frontend-4vlo.onrender.com',
    category: 'Full Stack',
    accent: '#f97316',
    accentB: '#c2410c',
    emoji: '🍔',
    tags: ['Food Tech', 'Real-time Tracking', 'Admin Control', 'Redux'],
  },
  {
    name: 'TST Gadgets - Frontend',
    desc: 'A premium gadget ecosystem frontend, built for high-conversion product browsing with a modular, atomic UI design pattern.',
    link: 'https://github.com/sumanth965/TST_Electronic_Gadgets-',
    demo: 'https://tst-electronic-gadgets-su-manth09.onrender.com',
    category: 'Frontend',
    accent: '#06b6d4',
    accentB: '#0891b2',
    emoji: '📱',
    tags: ['E-commerce UI', 'Responsive Design', 'Modular CSS', 'HTML5'],
  },
  {
    name: 'TST Gadgets - Admin',
    desc: 'Architectural admin gateway for product orchestration, featuring inventory lifecycle management and secure data synchronization.',
    link: 'https://github.com/sumanth965/TST_Electronic_Gadgets-',
    demo: 'https://tst-electronic-gadgets-su-manth09.onrender.com',
    category: 'Full Stack',
    accent: '#0891b2',
    accentB: '#155e75',
    emoji: '⚙️',
    tags: ['Inventory Control', 'Data Sync', 'Admin UX', 'Resource Management'],
  },
]

const CATEGORIES = ['All', 'Frontend', 'Full Stack']

/* ─────────────────── GITHUB ICON ─────────────────── */
const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
  </svg>
)

/* ─────────────────── PROJECT CARD ─────────────────── */
function ProjectCard({ project, index, onHover }) {
  const [hovered, setHovered] = useState(false)

  const enter = () => { setHovered(true); onHover(index) }
  const leave = () => { setHovered(false) }

  return (
    <Motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        flexShrink: 0,
        width: 240,
        borderRadius: 22,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? project.accent + '50' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 20px 60px ${project.accent}18, 0 0 0 1px ${project.accent}25` : '0 4px 24px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
        animation: `pj-fade-up 0.55s ease ${index * 0.08}s both`,
        position: 'relative',
      }}
    >
      {/* ── MOCKUP PANEL ── */}
      <div style={{
        height: 148,
        background: `linear-gradient(135deg, ${project.accent}1a 0%, ${project.accentB}10 100%)`,
        borderBottom: `1px solid ${project.accent}20`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.mockup ? project.mockup(project.accent) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px',
            color: project.accent, fontFamily: 'monospace',
          }}>
            <div style={{ fontSize: 28 }}>{project.emoji}</div>
            <div style={{ fontSize: 9, letterSpacing: '0.08em', textAlign: 'center' }}>
              {project.name}
            </div>
          </div>
        )}

        {/* animated corner glow on hover */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 80% 20%, ${project.accent}15, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }} />

        {/* emoji badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          width: 28, height: 28, borderRadius: 9,
          background: `${project.accent}25`,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${project.accent}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14,
        }}>
          {project.emoji}
        </div>

        {/* category badge */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          fontSize: 8, fontWeight: 800, letterSpacing: '.12em',
          padding: '3px 8px', borderRadius: 20,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'monospace',
        }}>
          {project.category.toUpperCase()}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{
          fontSize: 13, fontWeight: 800, color: '#e2e8f0', margin: '0 0 6px',
          fontFamily: 'monospace',
          transition: 'color .2s',
          ...(hovered && { color: '#fff' }),
        }}>
          {project.name}
        </h3>
        <p style={{
          color: '#475569', fontSize: 11, lineHeight: 1.65, margin: '0 0 10px',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.desc}
        </p>

        {/* tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 700,
              background: `${project.accent}15`, color: project.accent,
              border: `1px solid ${project.accent}30`, fontFamily: 'monospace',
            }}>{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span style={{
              fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 700,
              background: 'rgba(255,255,255,0.05)', color: '#475569', fontFamily: 'monospace'
            }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* links */}
        <div style={{ display: 'flex', gap: 6 }}>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              fontSize: 10, fontWeight: 800, padding: '7px 0', borderRadius: 10,
              color: project.accent,
              background: `${project.accent}12`,
              border: `1px solid ${project.accent}30`,
              textDecoration: 'none', fontFamily: 'monospace',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}25` }}
            onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}12` }}
          >
            <GithubIcon /> Code
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                fontSize: 10, fontWeight: 800, padding: '7px 0', borderRadius: 10,
                color: '#fff',
                background: `linear-gradient(135deg, ${project.accent}, ${project.accentB})`,
                border: 'none', textDecoration: 'none', fontFamily: 'monospace',
                boxShadow: `0 4px 14px ${project.accent}35`,
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <ExternalIcon /> Live
            </a>
          ) : (
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              fontSize: 10, fontWeight: 700, padding: '7px 0', borderRadius: 10,
              color: '#334155',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'monospace', cursor: 'not-allowed',
            }}>
              Soon…
            </div>
          )}
        </div>
      </div>
    </Motion.div>
  )
}

/* ─────────────────── MAIN ─────────────────── */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef(null)

  const filtered = useMemo(() =>
    projects.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const hay = `${p.name} ${p.desc} ${p.tags.join(' ')}`.toLowerCase()
      return matchCat && hay.includes(query.toLowerCase())
    }),
    [activeCategory, query])

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' })

  const liveCount = projects.filter(p => p.demo).length

  return (
    <>
      <Motion.section id="projects" {...sectionFadeUp} style={{
        position: 'relative',
        padding: '4rem 1.5rem',
        background: 'linear-gradient(180deg, #080f1e 0%, #060d1a 100%)',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <style>{`
        @keyframes pj-fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes pj-glow{0%,100%{opacity:.04}50%{opacity:.08}}
        .pj-cat{
          border:1px solid rgba(255,255,255,0.08);background:transparent;
          color:#64748b;font-size:10px;font-weight:800;letter-spacing:.14em;
          padding:6px 14px;border-radius:20px;cursor:pointer;transition:all .2s;
        }
        .pj-cat.on{color:#fff;background:rgba(59,158,255,0.15);border-color:rgba(59,158,255,0.45);}
        .pj-cat:hover:not(.on){color:#94a3b8;background:rgba(255,255,255,0.04);}
        .pj-search{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#e2e8f0;font-size:12px;
          padding:9px 14px 9px 36px;border-radius:12px;outline:none;
          width:210px;transition:border-color .2s;
        }
        .pj-search:focus{border-color:rgba(59,158,255,0.4);}
        .pj-search::placeholder{color:#2d3748;}
        .pj-arrow{
          width:36px;height:36px;border-radius:50%;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.1);
          color:#64748b;font-size:16px;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          transition:all .2s;
        }
        .pj-arrow:hover{color:#3b9eff;border-color:rgba(59,158,255,0.4);background:rgba(59,158,255,0.08);}
        .hide-scroll::-webkit-scrollbar{display:none;}
        .hide-scroll{-ms-overflow-style:none;scrollbar-width:none;}
      `}</style>

        {/* bg glows */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,#a855f7,transparent)', opacity: .04,
          filter: 'blur(60px)', animation: 'pj-glow 7s ease infinite', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-5%', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle,#3b9eff,transparent)', opacity: .04,
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 10 }}>

          {/* ── HEADER ROW ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
            justifyContent: 'space-between', gap: '1.5rem',
            marginBottom: '2rem',
            animation: 'pj-fade-up .7s ease both',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg,#a855f7,transparent)' }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: '#a855f7', letterSpacing: '.2em' }}>PORTFOLIO</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#f1f5f9',
                margin: 0, lineHeight: 1.1, fontFamily: 'monospace'
              }}>
                Featured{' '}
                <span style={{
                  background: 'linear-gradient(135deg,#a855f7,#3b9eff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  Projects
                </span>
              </h2>
              <p style={{ color: '#475569', fontSize: 13, marginTop: 8, maxWidth: 420 }}>
                Real-world builds showcasing full-stack capabilities, clean UI, and production-ready patterns.
              </p>
            </div>

            {/* scroll arrows */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="pj-arrow" onClick={() => scroll(-1)}>←</button>
              <button className="pj-arrow" onClick={() => scroll(1)}>→</button>
            </div>
          </div>

          {/* ── STAT STRIP ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1.8rem',
            animation: 'pj-fade-up .7s ease .08s both',
          }}>
            {[
              { label: 'Total Projects', value: `${projects.length}`, color: '#3b9eff' },
              { label: 'Live Demos', value: `${liveCount}`, color: '#22c55e' },
              { label: 'Full Stack', value: `${projects.filter(p => p.category === 'Full Stack').length}`, color: '#a855f7' },
              { label: 'Frontend', value: `${projects.filter(p => p.category === 'Frontend').length}`, color: '#f97316' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12, padding: '8px 16px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: s.color, fontFamily: 'monospace' }}>{s.value}</span>
                <span style={{ fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '.1em' }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          {/* ── FILTERS ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10,
            marginBottom: '2rem',
            animation: 'pj-fade-up .7s ease .12s both',
          }}>
            {/* search */}
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                color: '#334155', fontSize: 14, pointerEvents: 'none'
              }}>⌕</span>
              <input
                className="pj-search"
                placeholder="Search projects..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            {/* category pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`pj-cat ${activeCategory === cat ? 'on' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <span style={{ fontSize: 11, color: '#334155', fontWeight: 600, marginLeft: 'auto', fontFamily: 'monospace' }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* ── CARDS SCROLL ── */}
          {filtered.length > 0 ? (
            <>
              <Motion.div
                variants={staggerContainer(0.1)}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.15 }}
                ref={scrollRef}
                className="hide-scroll"
                style={{
                  display: 'flex', gap: 14,
                  overflowX: 'auto',
                  paddingBottom: 12,
                  /* on larger screens show as wrap grid */
                  flexWrap: 'nowrap',
                }}
              >
                {filtered.map((p, i) => (
                  <ProjectCard
                    key={p.name}
                    project={p}
                    index={i}
                    onHover={setActiveIdx}
                  />
                ))}
              </Motion.div>

              {/* dot indicators */}
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 16 }}>
                {filtered.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    style={{
                      width: activeIdx === i ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      border: 'none',
                      cursor: 'pointer',
                      background: activeIdx === i ? p.accent : 'rgba(255,255,255,0.12)',
                      transition: 'all .35s cubic-bezier(0.34,1.56,0.64,1)',
                      boxShadow: activeIdx === i ? `0 0 8px ${p.accent}` : 'none',
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#334155' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⌀</div>
              <div style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>
                No projects match "{query}"
              </div>
            </div>
          )}

        </div>
      </Motion.section>
      {/* Glow line */}
      <div className="relative w-full overflow-hidden" style={{ height: '60px' }}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Glow blur layer */}
          <path
            d="M0,14 L350,14 L420,46 L1200,46" fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.5"
          />
          {/* Sharp line on top */}
          <path
            d="M0,14 L350,14 L420,46 L1200,46" fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>

  )
}