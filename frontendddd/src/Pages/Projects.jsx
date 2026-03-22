import { useMemo, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowUpRight, Github, Search } from 'lucide-react';

const projects = [
  {
    name: 'MERN Excel Analytics',
    description: 'Analytics dashboard for Excel-driven business data with secure authentication and clear visual reporting.',
    link: 'https://github.com/sumanth965/MERN-Excel-Analytics-Project-',
    demo: '',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Charts'],
  },
  {
    name: 'Foodify Ecosystem',
    description: 'Restaurant management workflow covering menu operations, order management, and internal admin views.',
    link: 'https://github.com/sumanth965/Foodify',
    demo: '',
    category: 'Full Stack',
    tech: ['MERN', 'Socket.io', 'Redux', 'Tailwind'],
  },
  {
    name: 'Precision Slider UI',
    description: 'Interactive image slider with smooth transitions, responsive motion, and a lightweight front-end setup.',
    link: 'https://github.com/sumanth965/Image_Slider',
    demo: 'https://sumanth09-image-slider.netlify.app/',
    category: 'Frontend',
    tech: ['React', 'Framer Motion', 'Vite'],
  },
  {
    name: 'E-Commerce Core',
    description: 'Shopping cart interface with clean pricing logic, persistent state handling, and intuitive browsing flow.',
    link: 'https://github.com/sumanth965/Cart_page',
    demo: 'https://sumanth09-cartpage.netlify.app/#',
    category: 'Frontend',
    tech: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
  },
  {
    name: 'Bucket List Pro',
    description: 'Task-focused productivity app designed for quick entry, local persistence, and simple day-to-day use.',
    link: 'https://github.com/sumanth965/Buket_List',
    demo: 'https://sumanth09-bucketlist.netlify.app/',
    category: 'Frontend',
    tech: ['React', 'Context API', 'Storage'],
  },
  {
    name: 'Secure Auth Portal',
    description: 'Authentication flow template with sign-in, sign-up, and backend validation patterns for production-ready apps.',
    link: 'https://github.com/sumanth965/signin-signup-page',
    demo: 'https://su-manth09-signin-signup-page-frontend.onrender.com/',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'JWT', 'Bcrypt'],
  },
];

const categories = ['All', 'Frontend', 'Full Stack'];
const gradients = [
  'from-cyan-500/25 to-blue-500/10',
  'from-violet-500/25 to-cyan-500/10',
  'from-emerald-500/25 to-sky-500/10',
];

export default function Projects({ theme }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
        const haystack = `${project.name} ${project.description} ${project.tech.join(' ')}`.toLowerCase();
        return matchesCategory && haystack.includes(query.toLowerCase());
      }),
    [activeCategory, query],
  );

  return (
    <section id="projects" className="section-shell px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-500">Selected work</p>
            <h2 className={`text-4xl font-semibold sm:text-5xl ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Projects presented with a cleaner, studio-style layout.
            </h2>
            <p className={`text-lg leading-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              A focused collection of builds that highlight product thinking, component quality, and practical full-stack delivery.
            </p>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-4">
            <div className={`flex items-center gap-3 rounded-full border px-4 py-3 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects or technologies"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-cyan-500 text-white'
                      : theme === 'dark'
                        ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filtered.map((project, index) => (
              <Motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className={`surface-card overflow-hidden rounded-[2rem] border ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/85'}`}
              >
                <div className={`h-40 bg-gradient-to-br ${gradients[index % gradients.length]} p-6`}>
                  <div className="flex h-full flex-col justify-between">
                    <span className="w-fit rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                      {project.category}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-700/70">Featured project</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-950">{project.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <p className={`text-sm leading-7 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${theme === 'dark' ? 'bg-white/8 text-slate-200' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold no-underline transition ${
                        theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Github size={16} /> Repository
                    </a>
                    <a
                      href={project.demo || project.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold no-underline transition ${
                        project.demo ? 'bg-cyan-500 text-white hover:bg-cyan-400' : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      <ArrowUpRight size={16} /> {project.demo ? 'Live demo' : 'Preview soon'}
                    </a>
                  </div>
                </div>
              </Motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
