import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, Briefcase, Download, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import img3 from '../assets/img3.jpg';

const skillGroups = [
  { name: 'Frontend engineering', level: 92, detail: 'React, Tailwind CSS, responsive UI systems' },
  { name: 'Backend development', level: 86, detail: 'Node.js, Express, REST APIs, authentication' },
  { name: 'Data & persistence', level: 84, detail: 'MongoDB, SQL fundamentals, schema design' },
  { name: 'Delivery workflow', level: 72, detail: 'Git, deployment, debugging, product iteration' },
];

const timeline = [
  {
    title: 'Full-Stack Intern',
    organization: 'Zephyr Technologies',
    period: '2024',
    description: 'Built dashboard and ordering experiences for a restaurant management system with reusable UI and backend integration.',
  },
  {
    title: 'Frontend Developer Intern',
    organization: 'MotionCut',
    period: '2024',
    description: 'Delivered mobile-first React interfaces with a strong focus on spacing, usability, and visual consistency.',
  },
  {
    title: 'BCA Graduate',
    organization: 'DR NSAM College',
    period: '2022 – 2025',
    description: 'Graduated with a 9.03 CGPA while building practical full-stack projects and strengthening system design fundamentals.',
  },
];

export default function About({ theme }) {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <section id="about" className="section-shell px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-16">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-blue-600/5 blur-3xl" />
            <div className={`surface-card relative overflow-hidden rounded-[2rem] border p-4 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/80'}`}>
              <img src={img3} alt="Sumanth Poojary" className="rounded-[1.5rem] object-cover" />
            </div>
            <div className={`surface-card absolute -bottom-6 right-0 rounded-3xl border px-6 py-5 ${theme === 'dark' ? 'border-white/10 bg-slate-900/90' : 'border-slate-200 bg-white'}`}>
              <div className="grid grid-cols-3 gap-5 text-center">
                <div>
                  <p className="text-2xl font-semibold text-cyan-500"><CountUp end={12} />+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-cyan-500"><CountUp end={2} /></p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Internships</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-cyan-500"><CountUp end={9.03} decimals={2} /></p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">CGPA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-500">
              <Sparkles size={14} /> About me
            </div>
            <h2 className={`text-4xl font-semibold leading-tight sm:text-5xl ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              I design developer-friendly interfaces and production-minded web applications.
            </h2>
            <p className={`max-w-2xl text-lg leading-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              My work blends clean visual design with dependable engineering. I enjoy shaping user experiences, organizing components,
              and building APIs that are simple to maintain as products grow.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm ${theme === 'dark' ? 'bg-white/5 text-slate-200' : 'bg-white text-slate-700 shadow-sm'}`}>
                <MapPin size={16} className="text-cyan-500" /> Udupi, India
              </div>
              <a href="/Resume%20_2k25.pdf" download className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-cyan-400">
                Download resume <Download size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="space-y-3">
            {['skills', 'experience'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-3xl border px-6 py-5 text-left transition ${
                  activeTab === tab
                    ? 'border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : theme === 'dark'
                      ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/8'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.3em] opacity-70">Overview</p>
                <div className="mt-2 flex items-center justify-between text-lg font-semibold capitalize">
                  {tab}
                  <ArrowRight size={18} />
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <Motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`surface-card rounded-[2rem] border p-8 sm:p-10 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/80'}`}
            >
              {activeTab === 'skills' ? (
                <div className="grid gap-8 md:grid-cols-2">
                  {skillGroups.map((item) => (
                    <div key={item.name} className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className={`mt-1 text-sm leading-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{item.detail}</p>
                        </div>
                        <span className="text-sm font-semibold text-cyan-500">{item.level}%</span>
                      </div>
                      <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${item.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={item.title} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme === 'dark' ? 'bg-white/8 text-cyan-400' : 'bg-slate-100 text-cyan-600'}`}>
                          {index < 2 ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                        </div>
                        {index !== timeline.length - 1 && <div className={`mt-3 h-full w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} />}
                      </div>
                      <div className="pb-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">{item.period}</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.organization}</p>
                        <p className={`mt-3 max-w-2xl text-sm leading-7 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
