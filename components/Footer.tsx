import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { navItems, profile } from '@/lib/site-data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 text-sm text-slate-300 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold tracking-tight text-white">{profile.fullName}</h3>
          <p className="max-w-xs leading-7 text-slate-400">
            A passionate developer building modern, responsive, and scalable web experiences.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-cyan-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Contact</h4>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Follow Me</h4>
          <div className="flex gap-4 text-white">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 transition hover:border-cyan-400/40 hover:text-cyan-300"><Github className="h-5 w-5" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 transition hover:border-cyan-400/40 hover:text-cyan-300"><Linkedin className="h-5 w-5" /></a>
            <a href={`mailto:${profile.email}`} className="rounded-full border border-white/10 p-3 transition hover:border-cyan-400/40 hover:text-cyan-300"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © {currentYear} {profile.fullName}. All rights reserved.
      </div>
    </footer>
  )
}
