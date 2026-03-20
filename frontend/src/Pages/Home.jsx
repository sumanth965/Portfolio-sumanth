import { motion as Motion } from 'framer-motion';
import { ArrowRight, Briefcase, Download, Mail } from 'lucide-react';
import { FaAws, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiExpress, SiJavascript, SiMongodb } from 'react-icons/si';
import profile from '../assets/IMG.png';

const stats = [
  { label: 'Years building on the web', value: '3+' },
  { label: 'Projects delivered', value: '12+' },
  { label: 'Focus areas', value: 'MERN · UI' },
];

const stack = [SiMongodb, SiExpress, FaReact, FaNodeJs, SiJavascript, FaAws];

export default function Home({ theme }) {
  return (
    <section id="home" className="section-shell overflow-hidden px-6 pb-24 pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <Motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-500">
            <Briefcase size={14} /> Available for full-stack opportunities
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Sumanth Poojary</p>
            <h2 className={`max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Building polished digital products with reliable engineering and modern design.
            </h2>
            <p className={`max-w-2xl text-lg leading-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Full-stack developer focused on responsive interfaces, scalable APIs, and experiences that feel calm,
              credible, and easy to use.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              View projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold no-underline transition ${
                theme === 'dark'
                  ? 'border-white/10 text-white hover:bg-white/5'
                  : 'border-slate-200 text-slate-900 hover:bg-white'
              }`}
            >
              Start a conversation <Mail size={16} />
            </a>
            <a
              href="/Resume%20_2k25.pdf"
              download
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold no-underline transition ${
                theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Download resume <Download size={16} />
            </a>
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className={`surface-card rounded-3xl border p-5 ${
                  theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/80'
                }`}
              >
                <p className="text-2xl font-semibold text-cyan-500">{item.value}</p>
                <p className={`mt-2 text-sm leading-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Core stack</span>
            {stack.map((Icon, index) => (
              <div
                key={index}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                  theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'
                }`}
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-3xl" />
          <div className={`surface-card relative overflow-hidden rounded-[2rem] border p-4 ${theme === 'dark' ? 'border-white/10 bg-slate-900/75' : 'border-white bg-white/90'}`}>
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
              <img src={profile} alt="Sumanth Poojary portrait" className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Specialty</p>
                <p className="mt-2 text-base font-semibold">Frontend systems & API integration</p>
              </div>
              <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Location</p>
                <p className="mt-2 text-base font-semibold">Udupi, Karnataka</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
