import { useEffect, useRef } from 'react'
import profile from '../assets/img2.png';

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
    <section
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
          <div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            style={{ animation: 'fade-up 0.8s ease both' }}
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
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                animation: 'fade-up 0.7s ease 0.2s both'
              }}
            >
              <span className="text-white">Full Stack</span>
            </h1>

            <h1
              className="font-extrabold leading-[1.05] mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                animation: 'fade-up 0.7s ease 0.3s both'
              }}
            >
              <span className="shimmer-text">Developer | MERN</span>
              <br />
              <span className="shimmer-text">Specialist</span>
              <span
                ref={cursorRef}
                className="text-[#3b9eff] ml-1"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >|</span>
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
            <div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              style={{ animation: 'fade-up 0.7s ease 0.5s both' }}
            >
              <button className="btn-primary hover:opacity-85 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <span>View My Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="btn-outline hover:border-[#3b9eff] hover:text-[#3b9eff] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span>Contact Me</span>
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-6 sm:gap-8 justify-center lg:justify-start mt-10"
              style={{ animation: 'fade-up 0.7s ease 0.6s both' }}
            >
              {[
                { val: '3+', label: 'Years Exp.' },
                { val: '20+', label: 'Projects' },
                { val: '15+', label: 'Clients' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div
                    className="grad-text font-extrabold leading-none"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-[#475569] font-medium mt-0.5 uppercase tracking-widest">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PHOTO ── */}
          <div
            className="order-1 lg:order-2 flex-shrink-0"
            style={{ animation: 'fade-up 0.9s ease 0.3s both' }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-40 blur-xl"
                style={{
                  background: 'linear-gradient(135deg, #3b9eff, #a855f7)',
                  animation: 'glow-pulse 3s ease-in-out infinite'
                }}
              />
              {/* Spinning ring */}
              <div
                className="absolute -inset-2 rounded-3xl border border-dashed border-[rgba(59,158,255,0.3)]"
                style={{ animation: 'spin-slow 20s linear infinite' }}
              />

              {/* Frame */}
              <div className="photo-frame-border relative" style={{ width: 'clamp(220px,28vw,290px)' }}>
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(160deg, #1a2a4a 0%, #0d1929 100%)',
                    height: 'clamp(260px,34vw,350px)'
                  }}
                >
                  <img src={profile} className="w-full h-full object-cover object-top" alt="Sumanth" />
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-60">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#3b9eff" strokeWidth="1.5" />
                      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-xs text-[#475569] font-medium tracking-wide text-center px-4">
                      Add your photo here
                    </p>
                  </div>

                  {/* Floating tech badges */}
                  <div
                    className="absolute top-3 right-3 glass-card rounded-lg px-2 py-1 text-[10px] font-bold text-[#3b9eff] border-[rgba(59,158,255,0.2)]"
                    style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '0s', fontFamily: 'var(--font-display)' }}
                  >
                    React ⚛️
                  </div>
                  <div
                    className="absolute bottom-3 left-3 glass-card rounded-lg px-2 py-1 text-[10px] font-bold text-[#22c55e] border-[rgba(34,197,94,0.2)]"
                    style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1.5s', fontFamily: 'var(--font-display)' }}
                  >
                    Node.js 🟢
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              {[
                { cls: 'top-[-3px] left-[-3px]', style: { borderWidth: '3px 0 0 3px', borderRadius: '5px 0 0 0' } },
                { cls: 'top-[-3px] right-[-3px]', style: { borderWidth: '3px 3px 0 0', borderRadius: '0 5px 0 0' } },
                { cls: 'bottom-[-3px] left-[-3px]', style: { borderWidth: '0 0 3px 3px', borderRadius: '0 0 0 5px' } },
                { cls: 'bottom-[-3px] right-[-3px]', style: { borderWidth: '0 3px 3px 0', borderRadius: '0 0 5px 0' } },
              ].map(({ cls, style }, i) => (
                <div
                  key={i}
                  className={`corner-accent absolute w-6 h-6 border-[#06b6d4] ${cls}`}
                  style={{ ...style, borderStyle: 'solid', animation: 'glow-pulse 2.5s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Glow line */}
      <div className="glow-line w-full" />
    </section>
  )
}