import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaSearch, FaHistory } from "react-icons/fa";
import { Briefcase, Layers, Cpu, Layout, Sparkles, Zap, ChevronRight, Play } from "lucide-react";

/* ─── REAL DATA ──────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    name: "MERN Excel Analytics",
    description: "Robust data visualization platform that transforms complex Excel datasets into interactive dashboards with JWT security.",
    link: "https://github.com/sumanth965/MERN-Excel-Analytics-Project-",
    demo: "",
    image: "/images/excel-analytics.jpg",
    tech: ["React", "Express", "Node", "MongoDB", "Charts.js"],
    category: "Full Stack",
    highlight: "production-ready"
  },
  {
    name: "Foodify Ecosystem",
    description: "End-to-end restaurant management platform featuring menu orchestration, real-time ordering, and comprehensive admin controls.",
    link: "https://github.com/sumanth965/Foodify",
    demo: "",
    image: "/images/foodify.jpg",
    tech: ["MERN", "Socket.io", "Redux", "Tailwind"],
    category: "Full Stack",
    highlight: "scalable"
  },
  {
    name: "Precision Slider UI",
    description: "Engineered a high-performance, GPU-accelerated image gallery with fluid transitions and mobile-first touch optimization.",
    link: "https://github.com/sumanth965/Image_Slider",
    demo: "https://sumanth09-image-slider.netlify.app/",
    image: "/images/image-slider.jpg",
    tech: ["React", "Framer Motion", "Vite"],
    category: "Frontend",
    highlight: "performance"
  },
  {
    name: "E-Commerce Core",
    description: "Architected a modular shopping cart experience with persistent state management and dynamic price calculations.",
    link: "https://github.com/sumanth965/Cart_page",
    demo: "https://sumanth09-cartpage.netlify.app/#",
    image: "/images/cart-page.jpg",
    tech: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
    category: "Frontend",
    highlight: "state-management"
  },
  {
    name: "Bucket List Pro",
    description: "Productivity application with localized data persistence, prioritizing clean UI and minimal user friction.",
    link: "https://github.com/sumanth965/Buket_List",
    demo: "https://sumanth09-bucketlist.netlify.app/",
    image: "/images/bucket-list.jpg",
    tech: ["React", "Context API", "LocalDB"],
    category: "Full Stack",
    highlight: "productivity"
  },
  {
    name: "Secure Auth Portal",
    description: "Standardized authentication templates with multi-factor support, built for high-security integration environments.",
    link: "https://github.com/sumanth965/signin-signup-page",
    demo: "https://su-manth09-signin-signup-page-frontend.onrender.com/",
    image: "/images/signin-signup.jpg",
    tech: ["React", "Node", "Bcrypt", "JWT"],
    category: "Full Stack",
    highlight: "security"
  }
];

const CATEGORIES = ["All", "Frontend", "Full Stack"];

export default function Projects({ theme }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === "All" || proj.category === activeCategory;
    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bg = theme === "dark" ? "bg-[#0b1120]" : "bg-white";
  const cardBg = theme === "dark" ? "bg-slate-900/50" : "bg-slate-50";

  return (
    <section id="projects" className={`${bg} py-32 transition-colors duration-500 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center gap-10 mb-20 text-center md:text-left">
           <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
           >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">
                <Zap size={14} /> My Portfolio
              </div>
              <h2 className={`text-4xl md:text-6xl font-black ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                FEATURED <br />
                <span className="text-cyan-500">PROJECTS</span>
              </h2>
           </motion.div>

           {/* Search & Filter */}
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 w-full md:w-auto"
           >
              <div className="relative group overflow-hidden">
                 <FaSearch size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10" />
                 <input 
                  type="text" 
                  placeholder="Search architecture..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 pr-6 py-4 rounded-2xl outline-none text-sm font-bold w-full transition-all border ${
                    theme === "dark" 
                      ? "bg-slate-900 border-white/5 text-white focus:ring-2 focus:ring-cyan-500/50" 
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-cyan-600/20"
                  }`}
                 />
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center">
                 {CATEGORIES.map((cat) => (
                   <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeCategory === cat 
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" 
                        : (theme === "dark" ? "bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50")
                    }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           <AnimatePresence mode="popLayout">
              {filtered.map((proj, i) => (
                <motion.div
                  key={proj.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`group relative rounded-[2.5rem] border ${cardBg} border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-cyan-500/50`}
                >
                   {/* Thumbnail Container */}
                   <div className="relative h-64 overflow-hidden rounded-t-[2.5rem]">
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <img 
                        src={proj.image} 
                        alt={proj.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                        {proj.category}
                      </div>

                      {/* Tech Stack Overlay on hover */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                         {proj.tech.map((t) => (
                           <span key={t} className="px-3 py-1 rounded-lg bg-cyan-500 text-white text-[9px] font-black tracking-widest uppercase shadow-lg shadow-cyan-500/30 border border-cyan-400">
                             {t}
                           </span>
                         ))}
                      </div>
                   </div>

                   {/* Content */}
                   <div className="p-10 space-y-6">
                      <div className="space-y-4 min-h-[140px]">
                         <h3 className={`text-2xl font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{proj.name}</h3>
                         <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>{proj.description}</p>
                      </div>

                      <div className="flex items-center gap-4">
                         <motion.a 
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 p-4 rounded-2xl flex items-center justify-center gap-3 no-underline text-xs font-black uppercase tracking-widest transition-all ${
                            theme === "dark" ? "bg-white/5 text-white hover:bg-white/10" : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
                          }`}
                         >
                            <FaGithub size={16} /> Codebase
                         </motion.a>
                         <motion.a 
                          href={proj.demo || "#"}
                          disabled={!proj.demo}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={proj.demo ? { scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.4)" } : {}}
                          whileTap={proj.demo ? { scale: 0.95 } : {}}
                          className={`flex-1 p-4 rounded-2xl flex items-center justify-center gap-3 no-underline text-xs font-black uppercase tracking-widest transition-all ${
                            proj.demo 
                              ? "bg-cyan-500 text-white" 
                              : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                          }`}
                         >
                            {proj.demo ? <><Play size={14} fill="currentColor" /> Live</> : <><FaHistory size={14} /> WIP</>}
                         </motion.a>
                      </div>
                   </div>

                   {/* Decorative background glow */}
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-[50px] pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700 rounded-full" />
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Global Stats bar */}
        <div className={`mt-32 p-12 rounded-[3.5rem] border ${cardBg} border-white/5 shadow-2xl relative overflow-hidden`}>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10 text-center">
              {[
                { label: "Hours Encoded", val: 2400 },
                { label: "Lines Pushed", val: 55000 },
                { label: "PRs Merged", val: 128 },
                { label: "Coffee Brewed", val: 420 }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                   <h4 className="text-3xl font-black text-cyan-500 underline decoration-cyan-500/10 underline-offset-8 transition-all hover:decoration-cyan-500">
                      {stat.val.toLocaleString()}
                   </h4>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                </div>
              ))}
           </div>
           
           {/* Background branding */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
              <span className="text-7xl font-black uppercase tracking-[0.4em] whitespace-nowrap">ARCHITECTURE</span>
           </div>
        </div>

      </div>
    </section>
  );
}