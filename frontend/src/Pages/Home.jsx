import profile from '../assets/img2.png'

const metrics = [
  { value: '3+', label: 'Years building products' },
  { value: '20+', label: 'Projects delivered' },
  { value: 'MERN', label: 'Primary specialization' },
]

const highlights = [
  'Responsive web interfaces for desktop, tablet, and mobile.',
  'Clean frontend architecture with scalable backend integration.',
  'Strong focus on performance, clarity, and polished user experience.',
]

export default function Home() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pt-32"
      style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(59,130,246,0.18), transparent 28%),
          radial-gradient(circle at 85% 18%, rgba(168,85,247,0.18), transparent 26%),
          radial-gradient(circle at 50% 75%, rgba(34,211,238,0.1), transparent 35%),
          linear-gradient(180deg, #06111f 0%, #091523 48%, #08111d 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
              Available for full-stack opportunities
            </div>

            <div className="mt-6 max-w-3xl">
              <p className="text-lg font-medium text-slate-300 sm:text-xl">Hello, I&apos;m Sumanth</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.6rem] xl:leading-[1.02]">
                Full Stack
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Developer | MERN
                </span>
                <span className="block text-slate-100">Specialist</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/90 sm:text-lg">
                I design and build modern digital products with responsive interfaces, scalable APIs,
                and a professional user experience across desktop and mobile devices.
              </p>
            </div>

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

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_40px_rgba(2,8,23,0.35)] backdrop-blur-xl"
                >
                  <p className="text-2xl font-bold text-sky-300">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[28px] border border-white/10 bg-slate-950/30 p-6 shadow-[0_14px_50px_rgba(2,8,23,0.35)] backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">What I deliver</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/4 p-4 text-sm leading-7 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-lg">
            <div className="relative">
              <div className="absolute -inset-8 rounded-[38px] bg-gradient-to-br from-sky-500/20 via-transparent to-violet-500/20 blur-3xl" />
              <div className="absolute -left-5 top-10 hidden h-24 w-24 rounded-3xl border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-xl sm:block" />
              <div className="absolute -right-4 bottom-12 hidden h-20 w-20 rounded-full border border-violet-400/30 bg-violet-400/10 backdrop-blur-xl sm:block" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(145deg,rgba(15,23,42,0.94),rgba(15,23,42,0.6))] p-4 shadow-[0_24px_80px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-5">
                <div className="rounded-[28px] border border-sky-400/20 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.95))] p-4 sm:p-5">
                  <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-900">
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-sky-400/15 to-transparent" />
                    <img
                      src={profile}
                      alt="Portrait of Sumanth"
                      className="h-[430px] w-full object-cover object-top sm:h-[520px]"
                    />
                    <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-md">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Role</p>
                      <p className="mt-1 text-sm font-semibold text-white">Full Stack Developer</p>
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-2xl border border-sky-400/20 bg-slate-950/70 px-4 py-3 backdrop-blur-md">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Focus</p>
                      <p className="mt-1 text-sm font-semibold text-sky-300">Responsive MERN Apps</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Frontend</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">Modern React interfaces with clear information hierarchy and polished interactions.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Backend</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">Reliable APIs, data flow, and maintainable architecture for scalable products.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-sky-400/70 to-transparent shadow-[0_0_30px_rgba(56,189,248,0.4)] sm:mt-20" />
      </div>
    </section>
  )
}
