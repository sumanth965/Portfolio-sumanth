import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaLocationDot, FaRocket, FaArrowUp } from 'react-icons/fa6';
import { Sparkles, Globe, Cpu, Zap, Code } from 'lucide-react';

const socials = [
    { label: 'GitHub', href: 'https://github.com/sumanth965', icon: <FaGithub />, color: '#ffffff' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sumanth-poojary-2a1052246/', icon: <FaLinkedin />, color: '#0077b5' },
    { label: 'Twitter', href: 'https://twitter.com', icon: <FaXTwitter />, color: '#1da1f2' },
    { label: 'Email', href: 'mailto:sumanthpoojary965@gmail.com', icon: <FaEnvelope />, color: '#ea4335' },
];

const NAVIGATION_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const RECENT_PROJECTS = [
    { name: 'Leave Management', href: '#projects' },
    { name: 'Productivity System', href: '#projects' },
    { name: 'Nexus Web Games', href: '#projects' },
    { name: 'Excel Analytics', href: '#projects' },
];

export default function Footer({ theme }) {
    const isDark = theme === 'dark';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className={`relative pt-24 pb-12 overflow-hidden border-t ${isDark ? 'bg-[#080f1e] border-white/5 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>

            {/* ── ADVANCED BACKGROUND EFFECTS ── */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className={`absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] ${isDark ? 'opacity-10' : 'opacity-20'}`} />
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${isDark ? 'from-[#080f1e] via-transparent to-[#080f1e]' : 'from-slate-50 via-transparent to-slate-50'}`} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <span className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                SUMANTH<span className="text-cyan-500">.</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Crafting scalable full-stack architectures and high-performance digital experiences using the MERN ecosystem.
                        </p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-cyan-50 border-cyan-100 text-cyan-600'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            Open for Collaboration
                        </div>
                    </div>

                    {/* Quick Nav */}
                    <div>
                        <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Navigation</h4>
                        <ul className="space-y-4 list-none p-0">
                            {NAVIGATION_LINKS.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm no-underline hover:text-cyan-500 transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800 transition-all group-hover:bg-cyan-500 group-hover:scale-150" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Projects Link */}
                    <div>
                        <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Recent Builds</h4>
                        <ul className="space-y-4 list-none p-0">
                            {RECENT_PROJECTS.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm no-underline hover:text-cyan-500 transition-colors flex items-center gap-2 group">
                                        <FaRocket size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div className="space-y-8">
                        <div>
                            <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Network Gateway</h4>
                            <div className="flex gap-3">
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10' : 'bg-white border border-slate-200 hover:border-cyan-500 hover:shadow-lg'}`}
                                        style={{ color: isDark ? '#94a3b8' : '#475569' }}
                                        onMouseEnter={(e) => { if (!isDark) e.currentTarget.style.color = social.color }}
                                        onMouseLeave={(e) => { if (!isDark) e.currentTarget.style.color = '#475569' }}
                                    >
                                        {React.cloneElement(social.icon, { size: 18 })}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Base Coordinates</p>
                            <div className="flex items-center gap-3">
                                <FaLocationDot className="text-cyan-500" />
                                <span className="text-xs font-bold">Udupi, Karnataka, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── FOOTER BOTTOM BAR ── */}
                <div className={`pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-8 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                    <div className="space-y-2 text-center md:text-left">
                        <p className="text-xs font-bold tracking-wide">
                            © {new Date().getFullYear()} <span className="text-cyan-500">Sumanth Poojary</span>. Re-engineering digital possibilities.
                        </p>
                        <div className="flex items-center gap-4 justify-center md:justify-start opacity-50">
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
                                <Code size={12} /> React v19
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-500" />
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
                                <Zap size={12} /> Tailwind 4.0
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10' : 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm hover:shadow-md'}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] transition-all group-hover:text-cyan-500">Back to Top</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'} group-hover:bg-cyan-500 group-hover:text-white`}>
                            <FaArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </button>
                </div>

            </div>

            {/* Decorative accent lines at the very bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 opacity-20" />
        </footer>
    );
}
