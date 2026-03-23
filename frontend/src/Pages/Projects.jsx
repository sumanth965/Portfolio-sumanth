import { useState, useRef, useMemo } from 'react'

/* ─────────────────── REAL PROJECT DATA + MOCKUPS ─────────────────── */
const projects = [
  {
    name: 'MERN Excel Analytics',
    desc: 'Analytics dashboard for Excel-driven business data with secure authentication and clear visual reporting.',
    link: 'https://github.com/sumanth965/MERN-Excel-Analytics-Project-',
    demo: '',
    category: 'Full Stack',
    accent: '#3b9eff',
    accentB: '#1d6fd4',
    emoji: '📊',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Charts'],
    mockup: (accent) => (
      <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: accent, marginBottom: 2, fontFamily: 'monospace', letterSpacing: '.1em' }}>
          ANALYTICS · DASHBOARD
        </div>
        <div style={{ display: 'flex', gap: 6, flex: 1 }}>
          {/* bar chart */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3, paddingBottom: 4 }}>
            {[55, 80, 45, 90, 65, 75, 88].map((h, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: '3px 3px 0 0',
                height: `${h}%`,
                background: `linear-gradient(to top, ${accent}, ${accent}55)`,
                boxShadow: `0 0 6px ${accent}44`,
              }} />
            ))}
          </div>
          {/* mini stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
            {[['↑ 24%', '#22c55e'], ['3.4k', '#f7df1e']].map(([v, c], i) => (
              <div key={i} style={{
                fontSize: 9, fontWeight: 800, color: c, fontFamily: 'monospace',
                padding: '2px 6px', borderRadius: 4, background: `${c}18`, border: `1px solid ${c}30`
              }}>{v}</div>
            ))}
          </div>
        </div>
        <div style={{ height: 3, borderRadius: 3, background: `linear-gradient(90deg,${accent},${accent}33)`, width: '80%' }} />
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>Excel → Visual Reports</div>
      </div>
    ),
  },
  {
    name: 'Foodify Ecosystem',
    desc: 'Restaurant management workflow covering menu operations, order management, and internal admin views.',
    link: 'https://github.com/sumanth965/Foodify',
    demo: '',
    category: 'Full Stack',
    accent: '#f97316',
    accentB: '#ea580c',
    emoji: '🍕',
    tags: ['MERN', 'Socket.io', 'Redux', 'Tailwind'],
    mockup: (accent) => (
      <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: accent, fontFamily: 'monospace', letterSpacing: '.1em' }}>FOODIFY · MENU</div>
        <div style={{ display: 'flex', gap: 5, flex: 1 }}>
          {['🍔', '🌮', '🍜'].map((em, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: 8,
              background: `${accent}18`, border: `1px solid ${accent}30`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
            }}>
              <span style={{ fontSize: 14 }}>{em}</span>
              <div style={{ width: '60%', height: 2, borderRadius: 2, background: `${accent}50` }} />
              <div style={{ fontSize: 7, color: accent, fontWeight: 700, fontFamily: 'monospace' }}>
                ${(6 + i * 3).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>3 orders live · Real-time</div>
        </div>
      </div>
    ),
  },
  {
    name: 'Precision Slider UI',
    desc: 'Interactive image slider with smooth transitions, responsive motion, and a lightweight front-end setup.',
    link: 'https://github.com/sumanth965/Image_Slider',
    demo: 'https://sumanth09-image-slider.netlify.app/',
    category: 'Frontend',
    accent: '#a855f7',
    accentB: '#7c3aed',
    emoji: '🎞',
    tags: ['React', 'Framer Motion', 'Vite'],
    mockup: (accent) => (
      <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          width: '100%', height: 56, borderRadius: 10, overflow: 'hidden', position: 'relative',
          background: `${accent}18`, border: `1px solid ${accent}30`
        }}>
          {/* slide panels */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute', top: 0, bottom: 0,
              left: `${i * 33.33}%`, width: '33.33%',
              background: i === 1 ? `${accent}35` : `${accent}15`,
              borderRight: `1px solid ${accent}22`,
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px',
          }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: accent }}>‹</div>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: accent }}>›</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: i === 1 ? 16 : 6, height: 6, borderRadius: 3,
              background: i === 1 ? accent : `${accent}35`, transition: 'all .3s'
            }} />
          ))}
        </div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>Smooth · Responsive</div>
      </div>
    ),
  },
  {
    name: 'E-Commerce Core',
    desc: 'Shopping cart interface with clean pricing logic, persistent state handling, and intuitive browsing flow.',
    link: 'https://github.com/sumanth965/Cart_page',
    demo: 'https://sumanth09-cartpage.netlify.app/#',
    category: 'Frontend',
    accent: '#22c55e',
    accentB: '#16a34a',
    emoji: '🛒',
    tags: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
    mockup: (accent) => (
      <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: accent, fontFamily: 'monospace', letterSpacing: '.1em' }}>CART · 3 ITEMS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {[['👕 T-Shirt', '$29'], ['👟 Sneakers', '$89'], ['🎒 Bag', '$45']].map(([item, price], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '4px 8px', borderRadius: 6,
              background: `${accent}12`, border: `1px solid ${accent}25`,
            }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>{item}</span>
              <span style={{ fontSize: 9, color: accent, fontWeight: 800, fontFamily: 'monospace' }}>{price}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 2, borderRadius: 2, background: `${accent}25` }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>Total</span>
          <span style={{ fontSize: 10, color: accent, fontWeight: 900, fontFamily: 'monospace' }}>$163.00</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Bucket List Pro',
    desc: 'Task-focused productivity app designed for quick entry, local persistence, and simple day-to-day use.',
    link: 'https://github.com/sumanth965/Buket_List',
    demo: 'https://sumanth09-bucketlist.netlify.app/',
    category: 'Frontend',
    accent: '#06b6d4',
    accentB: '#0891b2',
    emoji: '✅',
    tags: ['React', 'Context API', 'Storage'],
    mockup: (accent) => (
      <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: accent, fontFamily: 'monospace', letterSpacing: '.1em' }}>BUCKET LIST</div>
        {[
          { text: 'Visit Iceland', done: true },
          { text: 'Learn Rust', done: true },
          { text: 'Build SaaS', done: false },
          { text: 'Read 12 books', done: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 10, height: 10, borderRadius: 3, flexShrink: 0,
              background: item.done ? accent : `${accent}15`,
              border: `1px solid ${item.done ? accent : `${accent}40`}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {item.done && <span style={{ fontSize: 7, color: '#000', fontWeight: 900 }}>✓</span>}
            </div>
            <span style={{
              fontSize: 9, fontFamily: 'monospace',
              color: item.done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.65)',
              textDecoration: item.done ? 'line-through' : 'none',
            }}>{item.text}</span>
          </div>
        ))}
        <div style={{ marginTop: 'auto', fontSize: 8, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>2 / 4 complete</div>
      </div>
    ),
  },
  {
    name: 'Secure Auth Portal',
    desc: 'Authentication flow with sign-in, sign-up, and backend validation patterns for production-ready apps.',
    link: 'https://github.com/sumanth965/signin-signup-page',
    demo: 'https://su-manth09-signin-signup-page-frontend.onrender.com/',
    category: 'Full Stack',
    accent: '#f7df1e',
    accentB: '#ca8a04',
    emoji: '🔐',
    tags: ['React', 'Node.js', 'JWT', 'Bcrypt'],
    mockup: (accent) => (
      <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: accent, fontFamily: 'monospace', letterSpacing: '.1em', marginBottom: 2 }}>SECURE · AUTH</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {['Email address', 'Password'].map((label, i) => (
            <div key={i}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginBottom: 2 }}>{label}</div>
              <div style={{
                height: 18, borderRadius: 5,
                background: `${accent}10`, border: `1px solid ${accent}30`,
                display: 'flex', alignItems: 'center', padding: '0 6px',
              }}>
                {i === 1 && <div style={{ display: 'flex', gap: 2 }}>
                  {[...Array(5)].map((_, k) => (
                    <div key={k} style={{ width: 4, height: 4, borderRadius: '50%', background: `${accent}80` }} />
                  ))}
                </div>}
              </div>
            </div>
          ))}
          <div style={{
            height: 20, borderRadius: 5, marginTop: 2,
            background: `linear-gradient(90deg,${accent},${accent}99)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 8, fontWeight: 900, color: '#000', fontFamily: 'monospace', letterSpacing: '.1em' }}>SIGN IN →</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', marginTop: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>JWT · Bcrypt secured</span>
        </div>
      </div>
    ),
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
function ProjectCard({ project, index, isActive, onHover }) {
  const [hovered, setHovered] = useState(false)

  const enter = () => { setHovered(true); onHover(index) }
  const leave = () => { setHovered(false) }

  return (
    <div
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
        {project.mockup(project.accent)}

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
    </div>
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
      <section style={{
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
              <div
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
                    isActive={activeIdx === i}
                    onHover={setActiveIdx}
                  />
                ))}
              </div>

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
      </section>
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