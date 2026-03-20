import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const navItems = ['Home', 'About', 'Projects', 'Contact'];

export default function Footer({ theme }) {
  return (
    <footer className={`border-t px-6 py-10 ${theme === 'dark' ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-500">Sumanth Poojary</p>
          <h3 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Full-stack developer creating clean, dependable, and modern web experiences.
          </h3>
          <div className="flex gap-3">
            <a href="https://github.com/sumanth965" target="_blank" rel="noreferrer" className={`flex h-11 w-11 items-center justify-center rounded-full border ${theme === 'dark' ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/sumanth-poojary-2a1052246/" target="_blank" rel="noreferrer" className={`flex h-11 w-11 items-center justify-center rounded-full border ${theme === 'dark' ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Navigation</p>
          <div className="mt-4 space-y-3">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`block no-underline transition ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Contact</p>
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail size={16} className="text-cyan-500" /> sumanthpoojary965@gmail.com</div>
            <div className="flex items-center gap-3"><Phone size={16} className="text-cyan-500" /> +91 9113201800</div>
            <div className="flex items-center gap-3"><MapPin size={16} className="text-cyan-500" /> Udupi, Karnataka, India</div>
          </div>
        </div>
      </div>

      <div className={`mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center ${theme === 'dark' ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} Sumanth Poojary. Crafted with React and Tailwind CSS.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Back to top <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
