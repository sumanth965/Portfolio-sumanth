import { useState, useRef, useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
import { sectionFadeUp, staggerContainer, staggerItem } from '../utils/motion'

/* ─────────────────── REAL PROJECT DATA + MOCKUPS ─────────────────── */
const projects = [
  {
    name: 'AI Hand Rehabilitation System',
    desc: 'AI-powered hand rehabilitation system using computer vision to track hand movements, evaluate exercises, provide feedback, and monitor rehabilitation progress.',
    link: 'https://github.com/sumanth965/AI-Hand-Rehabilitation-System',
    demo: '',
    category: 'AI / Computer Vision',
    accent: '#14b8a6',
    accentB: '#0f766e',
    emoji: '🖐️',
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'Computer Vision'],
  },

  {
    name: 'Online Art Auction',
    desc: 'Full-stack art auction platform for managing artworks, artists, buyers, bids, and auction workflows with a React frontend and Node.js backend.',
    link: 'https://github.com/sumanth965/Online-Art-Auction',
    demo: 'https://online-art-auction.vercel.app/',
    category: 'Full Stack',
    accent: '#a855f7',
    accentB: '#6b21a8',
    emoji: '🎨',
    img: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=600&q=80',
    tags: ['MERN', 'MongoDB', 'Auction System', 'React'],
  },

  {
    name: 'Smart Student Productivity System',
    desc: 'Student productivity platform for managing tasks, deadlines, schedules, and academic activities through a full-stack web application.',
    link: 'https://github.com/sumanth965/smart-student-productivity-system',
    demo: 'https://smart-student-productivity-system.onrender.com/',
    category: 'Full Stack',
    accent: '#22c55e',
    accentB: '#15803d',
    emoji: '🎯',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Task Management'],
  },

  {
    name: 'Employee Leave Management System',
    desc: 'Role-based employee leave management application with leave requests, approval workflows, session handling, pagination, and MySQL database integration.',
    link: 'https://github.com/sumanth965/Employee-Leave-Management-System',
    demo: 'https://elms-management.onrender.com/',
    category: 'Full Stack',
    accent: '#0ea5e9',
    accentB: '#0369a1',
    emoji: '🏢',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    tags: ['Java', 'Servlets/JSP', 'MySQL', 'MVC'],
  },

  {
    name: 'MERN Excel Analytics',
    desc: 'Data analytics web application that processes Excel datasets and converts them into interactive tables, charts, and visual insights.',
    link: 'https://github.com/sumanth965/MERN-excel-analytics-',
    demo: 'https://excel-analytic-sumanth09.onrender.com',
    category: 'Full Stack',
    accent: '#3b9eff',
    accentB: '#1d4ed8',
    emoji: '📊',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tags: ['MERN', 'Excel Processing', 'Data Visualization', 'Chart.js'],
  },

  {
    name: 'Foodify',
    desc: 'Full-stack food ordering application where users can browse food, manage carts, place orders, track order status, while admins manage food items and orders.',
    link: 'https://github.com/sumanth965/Foodify',
    demo: 'https://foodify-frontend-4vlo.onrender.com',
    category: 'Full Stack',
    accent: '#f97316',
    accentB: '#c2410c',
    emoji: '🍔',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    tags: ['MERN', 'JWT Auth', 'MongoDB', 'Order Management'],
  },

  {
    name: 'MediCare+',
    desc: 'Flutter-based healthcare application focused on providing a digital platform for personal healthcare management and essential health-related features.',
    link: 'https://github.com/sumanth965/medicare-plus-flutter',
    demo: '',
    category: 'Mobile',
    accent: '#06b6d4',
    accentB: '#0e7490',
    emoji: '🩺',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    tags: ['Flutter', 'Dart', 'Healthcare', 'Mobile App'],
  },

  {
    name: 'Expense Tracker',
    desc: 'Full-stack expense management application built with Spring Boot and MySQL for recording income and expenses, viewing transactions, and monitoring financial summaries.',
    link: 'https://github.com/sumanth965/expense-tracker-springboot',
    demo: '',
    category: 'Full Stack',
    accent: '#84cc16',
    accentB: '#4d7c0f',
    emoji: '💰',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    tags: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
  },

  {
    name: 'Lyrics Teleprompter',
    desc: 'Web-based lyrics teleprompter application designed for displaying and controlling lyrics with a responsive modern interface.',
    link: 'https://github.com/sumanth965/Lyrics-Teleprompter-App',
    demo: 'https://lyrics-teleprompter.onrender.com/',
    category: 'Frontend',
    accent: '#ec4899',
    accentB: '#9d174d',
    emoji: '🎤',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Web App'],
  },

  {
    name: 'Nexus Web Games',
    desc: 'Collection of interactive browser games built with JavaScript, featuring game logic, responsive interfaces, and interactive gameplay experiences.',
    link: 'https://github.com/sumanth965/nexus-web-games',
    demo: 'https://nexus-web-games.vercel.app/',
    category: 'Frontend',
    accent: '#f43f5e',
    accentB: '#be123c',
    emoji: '🎮',
    img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
    tags: ['JavaScript', 'Game Logic', 'Canvas', 'UI/UX'],
  },

  {
    name: 'TST Gadgets',
    desc: 'Responsive electronic gadgets e-commerce interface with product browsing and dedicated user-facing and administrative experiences.',
    link: 'https://github.com/sumanth965/TST_Electronic_Gadgets-',
    demo: 'https://tst-electronic-gadgets-su-manth09.onrender.com',
    category: 'Frontend',
    accent: '#06b6d4',
    accentB: '#0891b2',
    emoji: '📱',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    tags: ['E-commerce', 'Responsive Design', 'HTML5', 'CSS'],
  },

  {
    name: 'Resume Builder',
    desc: 'Django-based web application for creating resumes and generating downloadable PDF documents from user-provided information.',
    link: 'https://github.com/sumanth965/Resume-Builder-with-PDF-Generation-using-Django',
    demo: '',
    category: 'Full Stack',
    accent: '#6366f1',
    accentB: '#4338ca',
    emoji: '📄',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
    tags: ['Python', 'Django', 'PDF Generation', 'Web App'],
  },

  {
    name: 'Rails Project Management',
    desc: 'Ruby on Rails project exploring project management functionality and server-side web application development.',
    link: 'https://github.com/sumanth965/rails-project-management',
    demo: '',
    category: 'Backend',
    accent: '#ef4444',
    accentB: '#b91c1c',
    emoji: '📋',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80',
    tags: ['Ruby on Rails', 'Ruby', 'Web Development'],
  },

  {
    name: 'Unified Image Slider',
    desc: 'Responsive image slider project with interactive navigation, visual transitions, and a mobile-friendly frontend experience.',
    link: 'https://github.com/sumanth965/Image_Slider',
    demo: 'https://sumanth09-image-slider.netlify.app/',
    category: 'Frontend',
    accent: '#a855f7',
    accentB: '#7c3aed',
    emoji: '🎞️',
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
    tags: ['HTML5', 'CSS', 'JavaScript', 'Animations'],
  },

  {
    name: 'Secure Authentication System',
    desc: 'Authentication-focused web application implementing user sign-in and sign-up flows with backend authentication functionality.',
    link: 'https://github.com/sumanth965/signin-signup-page',
    demo: 'https://su-manth09-signin-signup-page-frontend.onrender.com',
    category: 'Full Stack',
    accent: '#facc15',
    accentB: '#ca8a04',
    emoji: '🔐',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&w=600&q=80',
    tags: ['Authentication', 'JavaScript', 'Forms', 'Web Security'],
  },
]

const CATEGORIES = [
  'All',
  'Frontend',
  'Full Stack',
  'AI / Computer Vision',
  'Mobile',
  'Backend',
]
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
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(25px) saturate(180%)',
        WebkitBackdropFilter: 'blur(25px) saturate(180%)',
        border: `1px solid ${hovered ? project.accent + '60' : 'rgba(255, 255, 255, 0.2)'}`,
        boxShadow: hovered
          ? `0 30px 60px -20px ${project.accent}35, 0 10px 24px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.7)`
          : `0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.2)`,
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* ── MOCKUP PANEL ── */}
      <div style={{
        height: 148,
        background: `linear-gradient(135deg, ${project.accent}1a 0%, ${project.accentB}10 100%)`,
        borderBottom: `1px solid ${project.accent}20`,
        boxShadow: `inset 0 3px 12px rgba(0,0,0,0.35), inset 0 -1px 0 ${project.accent}25`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.img ? (
          <img
            src={project.img}
            alt={project.name}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : project.mockup ? project.mockup(project.accent) : (
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
          background: `linear-gradient(155deg, ${project.accent}40, ${project.accent}15)`,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${project.accent}45`,
          boxShadow: `0 6px 14px -6px ${project.accent}50, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.25)`,
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
          background: 'linear-gradient(155deg, rgba(0,0,0,0.6), rgba(0,0,0,0.45))',
          backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 4px 10px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          fontFamily: 'monospace',
        }}>
          {project.category.toUpperCase()}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '1rem' }}>
        {/* title */}
        <h3 style={{
          fontSize: 14, fontWeight: 900, color: '#f8fafc',
          margin: '0 0 6px', lineHeight: 1.3, fontFamily: 'monospace',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>{project.name}</span>
          <span style={{ fontSize: 10, color: project.accent, opacity: 0.8 }}>↗</span>
        </h3>
        <p style={{
          color: '#cbd5e1', fontSize: 11, lineHeight: 1.65, margin: '0 0 10px',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.desc}
        </p>

        {/* tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 700,
              background: `linear-gradient(155deg, ${project.accent}26, ${project.accent}0a)`,
              color: project.accent,
              border: `1px solid ${project.accent}38`,
              boxShadow: `0 3px 8px -4px ${project.accent}40, inset 0 1px 0 ${project.accent}28`,
              fontFamily: 'monospace',
            }}>{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span style={{
              fontSize: 9, padding: '2px 7px', borderRadius: 20, fontWeight: 700,
              background: 'linear-gradient(155deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 3px 8px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
              color: '#475569', fontFamily: 'monospace'
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
              background: `linear-gradient(155deg, ${project.accent}20, ${project.accent}08)`,
              border: `1px solid ${project.accent}35`,
              boxShadow: `0 6px 14px -8px ${project.accent}40, inset 0 1px 0 ${project.accent}28`,
              textDecoration: 'none', fontFamily: 'monospace',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(155deg, ${project.accent}38, ${project.accent}15)` }}
            onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(155deg, ${project.accent}20, ${project.accent}08)` }}
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
                boxShadow: `0 10px 22px -8px ${project.accent}55, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.2)`,
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
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.4)',
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
  const [selectedProject, setSelectedProject] = useState(null)
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
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <style>{`
        @keyframes pj-fade-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes pj-glow{0%,100%{opacity:.04}50%{opacity:.08}}
        .pj-cat{
          border:1px solid rgba(255,255,255,0.08);
          background:rgba(6,13,26,0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color:#94a3b8;font-size:10px;font-weight:800;letter-spacing:.14em;
          padding:6px 14px;border-radius:20px;cursor:pointer;
          box-shadow:0 5px 12px -7px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06);
          transition:all .2s;
        }
        .pj-cat.on{
          color:#fff;
          background:linear-gradient(155deg, rgba(34,211,238,0.32), rgba(168,85,247,0.12));
          border-color:rgba(34,211,238,0.45);
          box-shadow:0 8px 18px -8px rgba(34,211,238,0.55), inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .pj-cat:hover:not(.on){color:#f1f5f9;background:rgba(255,255,255,0.08);}
        .pj-search{
          background:rgba(6,13,26,0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border:1px solid rgba(255,255,255,0.09);
          color:#f8fafc;font-size:12px;
          padding:9px 14px 9px 36px;border-radius:12px;outline:none;
          width:210px;
          box-shadow:inset 0 2px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(0,0,0,0.2);
          transition:border-color .2s, box-shadow .2s;
        }
        .pj-search:focus{border-color:rgba(34,211,238,0.4);box-shadow:inset 0 2px 6px rgba(0,0,0,0.45), 0 0 0 3px rgba(34,211,238,0.12);}
        .pj-search::placeholder{color:#64748b;}
        .pj-arrow{
          width:36px;height:36px;border-radius:50%;
          background:rgba(6,13,26,0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border:1px solid rgba(255,255,255,0.12);
          color:#94a3b8;font-size:16px;cursor:pointer;
          box-shadow:0 8px 16px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.25);
          display:flex;align-items:center;justify-content:center;
          transition:all .2s;
        }
        .pj-arrow:hover{
          color:#22d3ee;border-color:rgba(34,211,238,0.4);
          background:linear-gradient(155deg, rgba(34,211,238,0.2), rgba(34,211,238,0.05));
          box-shadow:0 10px 20px -8px rgba(34,211,238,0.5), inset 0 1px 0 rgba(255,255,255,0.18);
        }
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
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
              justifyContent: 'space-between', gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#22d3ee', letterSpacing: '.2em', fontFamily: 'monospace' }}>
                  02 // FEATURED PROJECTS
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#f1f5f9',
                margin: 0, lineHeight: 1.1, fontFamily: 'monospace'
              }}>
                Engineering &{' '}
                <span style={{
                  background: 'linear-gradient(135deg,#22d3ee,#a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  Architectures
                </span>
              </h2>
            </div>
          </Motion.div>

          {/* ── STAT STRIP ── */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1.8rem',
            }}
          >
            {[
              { label: 'Total Projects', value: `${projects.length}`, color: '#22d3ee' },
              { label: 'Live Demos', value: `${liveCount}`, color: '#22c55e' },
              { label: 'Full Stack', value: `${projects.filter(p => p.category === 'Full Stack').length}`, color: '#a855f7' },
              { label: 'Frontend', value: `${projects.filter(p => p.category === 'Frontend').length}`, color: '#f97316' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(6, 13, 26, 0.45)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '8px 16px',
                boxShadow: '0 10px 20px -10px rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: s.color, fontFamily: 'monospace' }}>{s.value}</span>
                <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '.1em' }}>
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </Motion.div>

          {/* ── FILTERS ── */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10,
              marginBottom: '2rem',
            }}
          >
            {/* search */}
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                color: '#64748b', fontSize: 14, pointerEvents: 'none'
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

            <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginLeft: 'auto', fontFamily: 'monospace' }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </Motion.div>

          {/* ── CARDS SCROLL ── */}
          {filtered.length > 0 ? (
            <Motion.div
              variants={staggerContainer(0.1)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.15 }}
              ref={scrollRef}
              className="hide-scroll"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                paddingBottom: 12,
              }}
            >
              {filtered.map((p, i) => (
                <div key={p.name} onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                  <ProjectCard
                    project={p}
                    index={i}
                    onHover={setActiveIdx}
                  />
                </div>
              ))}
            </Motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⌀</div>
              <div style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>
                No projects match "{query}"
              </div>
            </div>
          )}

        </div>
      </Motion.section>

      {/* ── PROJECT DETAIL MODAL ── */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
            background: 'rgba(3, 7, 18, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            animation: 'pj-fade-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 640,
              maxHeight: '90vh', overflowY: 'auto',
              background: 'linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)',
              border: `1px solid ${selectedProject.accent}45`,
              borderRadius: 24,
              boxShadow: `0 32px 80px -16px ${selectedProject.accent}35, 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
              position: 'relative',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Modal Header Image */}
            <div style={{
              height: 220, position: 'relative', overflow: 'hidden',
              borderRadius: '24px 24px 0 0',
              borderBottom: `1px solid ${selectedProject.accent}30`,
            }}>
              <img
                src={selectedProject.img}
                alt={selectedProject.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to top, rgba(15,23,42,0.98) 0%, transparent 60%)`,
              }} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(6, 13, 26, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                ✕
              </button>

              {/* Category Badge */}
              <div style={{
                position: 'absolute', bottom: 16, left: 24,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 24 }}>{selectedProject.emoji}</span>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '.14em',
                  padding: '4px 12px', borderRadius: 20,
                  background: `linear-gradient(155deg, ${selectedProject.accent}40, ${selectedProject.accent}15)`,
                  color: '#fff', border: `1px solid ${selectedProject.accent}50`,
                  fontFamily: 'monospace',
                }}>
                  {selectedProject.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Modal Body Content */}
            <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h3 style={{
                  fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc',
                  margin: '0 0 8px', fontFamily: 'monospace', lineHeight: 1.2
                }}>
                  {selectedProject.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  {selectedProject.desc}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#64748b', letterSpacing: '.15em', marginBottom: 10, fontFamily: 'monospace' }}>
                  ARCHITECTURE & TECH STACK
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {selectedProject.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, padding: '5px 12px', borderRadius: 20, fontWeight: 700,
                      background: `linear-gradient(155deg, ${selectedProject.accent}25, ${selectedProject.accent}0a)`,
                      color: selectedProject.accent,
                      border: `1px solid ${selectedProject.accent}40`,
                      boxShadow: `0 4px 12px -4px ${selectedProject.accent}40`,
                      fontFamily: 'monospace',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontSize: 12, fontWeight: 800, padding: '12px 0', borderRadius: 12,
                    color: selectedProject.accent,
                    background: `linear-gradient(155deg, ${selectedProject.accent}20, ${selectedProject.accent}08)`,
                    border: `1px solid ${selectedProject.accent}45`,
                    boxShadow: `0 8px 20px -8px ${selectedProject.accent}50`,
                    textDecoration: 'none', fontFamily: 'monospace',
                    transition: 'all .2s',
                  }}
                >
                  <GithubIcon /> View Source Code
                </a>
                {selectedProject.demo ? (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      fontSize: 12, fontWeight: 800, padding: '12px 0', borderRadius: 12,
                      color: '#fff',
                      background: `linear-gradient(135deg, ${selectedProject.accent}, ${selectedProject.accentB})`,
                      border: 'none', textDecoration: 'none', fontFamily: 'monospace',
                      boxShadow: `0 12px 26px -8px ${selectedProject.accent}65`,
                      transition: 'transform .2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <ExternalIcon /> Launch Live Demo
                  </a>
                ) : (
                  <div style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, padding: '12px 0', borderRadius: 12,
                    color: '#64748b', background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace',
                  }}>
                    Demo Coming Soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  )
}