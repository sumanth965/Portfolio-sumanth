import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { profile } from '@/lib/site-data'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative space-y-8">
          <div className="space-y-5">
            <p className="text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">
              Hello. I&apos;m {profile.name}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              {profile.title}
              <span className="mt-2 block bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                {profile.subtitle}
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {profile.intro}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(14,165,233,0.35)] transition hover:translate-y-[-2px]"
            >
              View My Projects
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-cyan-400/40 bg-white/5 px-7 py-4 text-base font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-white/10"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-auto right-8 top-10 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-12 left-4 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative h-[360px] w-[290px] sm:h-[440px] sm:w-[360px]">
            <div className="absolute inset-0 translate-x-6 translate-y-[-14px] rounded-[2rem] border-t-4 border-r-4 border-cyan-400/80" />
            <div className="absolute inset-0 translate-x-[-6px] translate-y-6 rounded-[2rem] border-b-4 border-l-4 border-violet-400/80" />
            <div className="absolute inset-[6%] rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/12 to-white/5 p-3 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur">
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/60">
                <Image
                  src="/profile.jpg"
                  alt={profile.fullName}
                  fill
                  sizes="(max-width: 768px) 290px, 360px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 h-px max-w-7xl bg-gradient-to-r from-transparent via-violet-400/80 to-cyan-400/80 sm:mt-20" />
    </section>
  )
}
