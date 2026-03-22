import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Briefcase, Home, Mail, Menu, Moon, Sparkles, Sun, User, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const current = navLinks.find(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return false;
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;
        return window.scrollY >= top && window.scrollY < bottom;
      });
      if (current) setActiveTab(current.name);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navShell = theme === 'dark'
    ? 'border-white/10 bg-slate-950/75 text-white shadow-2xl shadow-cyan-950/10'
    : 'border-slate-200/80 bg-white/85 text-slate-900 shadow-xl shadow-slate-200/70';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 ${navShell} ${
          isScrolled ? 'surface-card' : ''
        }`}
      >
        <a href="#home" className="flex items-center gap-3 no-underline">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-500">Portfolio</p>
            <h1 className="text-lg font-bold tracking-[0.2em]">SUMANTH</h1>
          </div>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium no-underline transition ${
                activeTab === link.name
                  ? 'text-cyan-500'
                  : theme === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {activeTab === link.name && (
                <Motion.span
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-full bg-cyan-500/10"
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                />
              )}
              <link.icon size={16} className="relative z-10" />
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`ml-2 flex h-11 w-11 items-center justify-center rounded-full border transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-amber-300 hover:bg-white/10'
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`flex h-10 w-10 items-center justify-center rounded-full border ${
              theme === 'dark' ? 'border-white/10 bg-white/5 text-amber-300' : 'border-slate-200 bg-white text-slate-700'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border ${
              theme === 'dark' ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white text-slate-900'
            }`}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={`surface-card mx-auto mt-3 max-w-7xl rounded-3xl border p-4 md:hidden ${navShell}`}
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium no-underline ${
                    activeTab === link.name
                      ? 'bg-cyan-500/10 text-cyan-500'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:bg-white/5'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </a>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
