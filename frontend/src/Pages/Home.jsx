import { useEffect, useRef } from 'react'
import { motion as Motion } from 'framer-motion'
import { sectionFadeUp } from '../utils/motion'
import profile from '../assets/p2.png';

const particles = [
  { size: 5, top: '12%', left: '6%', delay: '0s', dur: '6s' },
  { size: 3, top: '28%', left: '14%', delay: '1.2s', dur: '7s' },
  { size: 4, top: '62%', left: '4%', delay: '2.4s', dur: '5.5s' },
  { size: 6, top: '18%', right: '10%', delay: '0.6s', dur: '6.5s' },
  { size: 3, top: '48%', right: '18%', delay: '1.8s', dur: '8s' },
  { size: 5, top: '76%', right: '7%', delay: '3s', dur: '6s' },
  { size: 4, top: '40%', left: '50%', delay: '1.5s', dur: '7.5s' },
  { size: 2, top: '85%', left: '30%', delay: '0.9s', dur: '5s' },
]

export default function Hero() {
  const cursorRef = useRef(null)

  /* blinking cursor effect on title */
  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    let visible = true
    const id = setInterval(() => {
      el.style.opacity = visible ? '0' : '1'
      visible = !visible
    }, 600)
    return () => clearInterval(id)
  }, [])

  return (
    <Motion.section
      id="home"
      {...sectionFadeUp}
      className="relative min-h-screen flex flex-col overflow-hidden noise"
      style={{
        background: `
          radial-gradient(ellipse 75% 55% at 68% 38%, rgba(59,158,255,0.13) 0%, transparent 62%),
          radial-gradient(ellipse 55% 45% at 18% 78%, rgba(168,85,247,0.11) 0%, transparent 58%),
          radial-gradient(ellipse 40% 40% at 50% 10%, rgba(6,182,212,0.06) 0%, transparent 55%),
          linear-gradient(180deg, #060d1a 0%, #0a1628 55%, #060d1a 100%)
        `
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,158,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,158,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle-dot absolute"
          style={{
            width: p.size, height: p.size,
            top: p.top, left: p.left, right: p.right,
            background: i % 2 === 0
              ? 'rgba(59,158,255,0.7)'
              : 'rgba(168,85,247,0.6)',
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
            animation: `float ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Main hero content */}
      <div className="flex-1 flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT TEXT ── */}
          <Motion.div
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-nav rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse" />
              <span className="text-xs font-semibold text-[#94a3b8] tracking-wider uppercase">
                Available for work
              </span>
            </div>

            <p
              className="text-[#94a3b8] text-base sm:text-lg font-medium mb-2 tracking-wide"
              style={{ fontFamily: 'var(--font-display)', animation: 'fade-up 0.7s ease 0.1s both' }}
            >
              Hello. I'm Sumanth
            </p>

            <h1
              className="font-extrabold leading-[1.05] mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                animation: 'fade-up 0.7s ease 0.2s both'
              }}
            >
              <span className="text-white">Full Stack</span>
            </h1>

            <h1
              className="font-extrabold leading-[1.05] mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                animation: 'fade-up 0.7s ease 0.3s both'
              }}
            >
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Developer | MERN
              </span>
              <span className="shimmer-text">Specialist</span>

            </h1>

            <p
              className="text-[#64748b] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              style={{ animation: 'fade-up 0.7s ease 0.4s both' }}
            >
              I have a passion for building scalable web applications using{' '}
              <span className="text-[#3b9eff] font-medium">MongoDB</span>,{' '}
              <span className="text-[#a855f7] font-medium">Express.js</span>,{' '}
              <span className="text-[#06b6d4] font-medium">React.js</span>, and{' '}
              <span className="text-[#22c55e] font-medium">Node.js</span> — crafting
              robust, elegant solutions from front to back.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)]"
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-sky-400/35 bg-slate-950/20 px-6 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition duration-300 hover:border-sky-300 hover:bg-slate-900/40"
              >
                Contact Me
              </a>
            </div>


          </Motion.div>

          {/* ── RIGHT PHOTO ── */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 lg:order-2 flex-shrink-0 group"
          >
            <div
              className="relative transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ width: 'clamp(290px, 34vw, 390px)', margin: '40px' }}
            >

              {/* ── Outer glow layer ── */}
              <div
                className="absolute"
                style={{
                  inset: '-30px',
                  background: 'radial-gradient(circle at 60% 40%, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.05) 50%, transparent 80%)',
                  borderRadius: '50%',
                  filter: 'blur(35px)',
                  zIndex: 0,
                  opacity: 0.6,
                }}
              />

              {/* ── Photo card with diagonal cut ── */}
              <div
                className="relative overflow-hidden z-[2]"
                style={{
                  clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)',
                  height: 'clamp(460px, 34vw, 540px)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                {/* Subtle Scanline Effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '100% 4px'
                  }}
                />

                <img
                  src={profile}
                  alt="Sumanth"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out"
                />

                {/* HUD Overlay - Top Left Status */}
                <div className="absolute top-8 left-10 flex items-center gap-2 opacity-60 z-[2]">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-[0.2em] text-cyan-400 uppercase">System.Active</span>
                </div>

                {/* HUD Overlay - Bottom Left Binary */}
                <div className="absolute bottom-10 left-6 font-mono text-[8px] text-sky-400/30 space-y-0.5 leading-none z-[2]">
                  <div>110010101</div>
                  <div>010110011</div>
                </div>

                {/* Reflection Sweep Animation */}
                <Motion.div
                  className="absolute inset-0 z-[3] pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)'
                  }}
                />

                {/* Bottom dark vignette fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[40%] z-[2]"
                  style={{
                    background: 'linear-gradient(to top, rgba(6,13,26,0.9) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* ══ CYAN brackets — TOP-RIGHT ══ */}
              <div className="absolute" style={{ top: '-10px', right: '-10px', width: '90px', height: '90px', zIndex: 4 }}>
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '100%', height: '2px',
                  background: 'linear-gradient(90deg, transparent, #22d3ee)',
                  boxShadow: '0 0 12px rgba(34,211,238,0.5)',
                }} />
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '2px', height: '100%',
                  background: 'linear-gradient(180deg, #22d3ee, transparent)',
                  boxShadow: '0 0 12px rgba(34,211,238,0.5)',
                }} />
              </div>

              {/* ══ PURPLE brackets — BOTTOM-LEFT ══ */}
              <div className="absolute" style={{ bottom: '-10px', left: '-10px', width: '90px', height: '90px', zIndex: 4 }}>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: '100%', height: '2px',
                  background: 'linear-gradient(90deg, #a855f7, transparent)',
                  boxShadow: '0 0 12px rgba(168,85,247,0.5)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: '2px', height: '100%',
                  background: 'linear-gradient(180deg, transparent, #a855f7)',
                  boxShadow: '0 0 12px rgba(168,85,247,0.5)',
                }} />
              </div>

              {/* Decorative Ticks - Relative Positioning */}
              <div className="absolute" style={{ right: '-8px', top: '45%', width: '4px', height: '32px', zIndex: 4 }}>
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(180deg, transparent, #22d3ee, transparent)',
                  boxShadow: '0 0 8px #22d3ee',
                  opacity: 0.6,
                }} />
              </div>
              <div className="absolute" style={{ left: '-8px', top: '35%', width: '4px', height: '32px', zIndex: 4 }}>
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(180deg, transparent, #a855f7, transparent)',
                  boxShadow: '0 0 8px #a855f7',
                  opacity: 0.6,
                }} />
              </div>

            </div>
          </Motion.div>

        </div>
      </div>

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
    </Motion.section>
  )
}