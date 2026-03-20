import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import img3 from "../assets/img3.jpg";
import { 
  Code, Server, Globe, Download, MapPin, 
  Sparkles, Award, Zap, Briefcase, GraduationCap, ChevronRight
} from "lucide-react";

const SKILLS = [
  { name: "Frontend", level: 92, tech: "React, Next.js, Tailwind CSS" },
  { name: "Backend", level: 85, tech: "Node.js, Express, REST APIs" },
  { name: "Database", level: 88, tech: "MongoDB, PostgreSQL, Redis" },
  { name: "DevOps", level: 65, tech: "AWS, Docker, CI/CD" },
];

const EXPERIENCE = [
  {
    type: "internship",
    company: "Zephyr Technologies",
    role: "Full-Stack Intern",
    year: "2024",
    desc: "Engineered a high-performance Restaurant Management System with real-time order processing and an 8-page e-commerce dashboard."
  },
  {
    type: "internship",
    company: "MotionCut",
    role: "Frontend Developer",
    year: "2024",
    desc: "Built modern, component-driven UI layouts using React, focusing on mobile-first responsiveness and pixel-perfect design."
  },
  {
    type: "education",
    company: "DR NSAM College",
    role: "BCA Graduate",
    year: "2022-2025",
    desc: "Consistent 9.03 CGPA with specialization in Algorithmic Problem Solving and Web Architecture."
  }
];

export default function About({ theme }) {
  const [activeTab, setActiveTab] = useState("skills");

  const bg = theme === "dark" ? "bg-[#0b1120]" : "bg-slate-50";
  const cardBg = theme === "dark" ? "bg-slate-900/50" : "bg-white";

  return (
    <section id="about" className={`${bg} py-24 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Left: Image / Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
             <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-cyan-500/10 shadow-2xl">
                <img 
                  src={img3} 
                  alt="Sumanth Poojary" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
             </div>
             
             {/* Stats Overlay Card */}
             <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`absolute -bottom-8 -right-8 p-8 rounded-3xl border ${cardBg} border-white/10 shadow-2xl backdrop-blur-xl z-20 hidden md:block`}
             >
                <div className="flex items-center gap-6">
                   <div className="text-center border-r border-white/10 pr-6">
                      <h3 className="text-3xl font-black text-cyan-500">
                        <CountUp end={6} duration={3} />+
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Projects</p>
                   </div>
                   <div className="text-center border-r border-white/10 pr-6">
                      <h3 className="text-3xl font-black text-cyan-500">
                        <CountUp end={3} duration={3} />
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Internships</p>
                   </div>
                   <div className="text-center">
                      <h3 className="text-3xl font-black text-cyan-500">
                        <CountUp end={9} duration={3} decimals={2} />
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">CGPA</p>
                   </div>
                </div>
             </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={14} /> My Identity
             </div>
             
             <h2 className={`text-4xl md:text-5xl font-black mb-10 ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                I RE-ENGINEER <br />
                <span className="text-cyan-500 underline decoration-cyan-500/20 underline-offset-8">COMPLEX SYSTEMS</span>
             </h2>

             <p className={`text-lg leading-relaxed mb-10 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                As a Master of Computer Applications student and full-stack engineer, I bridge the gap between architectural theory and practical implementation. My journey started in 2022 with a focus on core programming, eventually evolving into building production-ready applications powered by the MERN stack.
             </p>

             <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="/Resume_2k25.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan-500 text-white font-black text-sm uppercase tracking-widest no-underline shadow-lg shadow-cyan-500/20 hover:bg-cyan-600 transition-all"
                >
                  Download CV <Download size={18} />
                </motion.a>
                <div className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20 ${theme === "dark" ? "text-white bg-white/5" : "text-slate-900"}`}>
                  <MapPin size={16} className="text-cyan-500" /> Udupi, India
                </div>
             </div>
          </motion.div>
        </div>

        {/* Dynamic Experience/Skills Section */}
        <div className="mt-40 grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Left: Interactive Tabs */}
           <div className="lg:col-span-4 space-y-4">
              {["skills", "experience"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left p-8 rounded-3xl border transition-all relative overflow-hidden group ${
                    activeTab === item 
                      ? "border-cyan-500 bg-cyan-500 text-white shadow-2xl shadow-cyan-500/20" 
                      : (theme === "dark" ? "border-white/5 bg-white/5 text-slate-400" : "border-slate-200 bg-white text-slate-600")
                  }`}
                >
                   <div className="relative z-10 flex items-center justify-between">
                      <div className="space-y-1">
                         <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Section</h4>
                         <span className="text-xl font-bold capitalize">{item}</span>
                      </div>
                      {activeTab === item ? <Zap size={24} /> : <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center"><ChevronRight size={18} /></div>}
                   </div>
                   {activeTab !== item && (
                     <div className="absolute inset-0 bg-cyan-500 transition-transform origin-left translate-x-[-100%] group-hover:translate-x-0" />
                   )}
                </button>
              ))}
           </div>

           {/* Right: Tab Content */}
           <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className={`p-10 rounded-[3rem] border ${cardBg} border-white/10 shadow-2xl relative overflow-hidden`}
                 >
                    {activeTab === "skills" ? (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {SKILLS.map((item, i) => (
                            <div key={i} className="space-y-4 animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                               <div className="flex justify-between items-end">
                                  <div className="space-y-1">
                                     <h5 className={`font-black text-xs uppercase tracking-widest ${theme === "dark" ? "text-white" : "text-slate-950"}`}>{item.name}</h5>
                                     <p className="text-[10px] text-slate-500 font-bold">{item.tech}</p>
                                  </div>
                                  <span className="text-xs font-black text-cyan-500">{item.level}%</span>
                               </div>
                               <div className={`h-2 rounded-full ${theme === "dark" ? "bg-white/5" : "bg-slate-100"} overflow-hidden`}>
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.level}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-cyan-500 relative"
                                  >
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
                                  </motion.div>
                               </div>
                            </div>
                          ))}
                       </div>
                    ) : (
                       <div className="space-y-10">
                          {EXPERIENCE.map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                               <div className="flex flex-col items-center">
                                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                    theme === "dark" ? "bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white" : "bg-slate-100 text-cyan-600"
                                  }`}>
                                     {item.type === "internship" ? <Briefcase size={24} /> : <GraduationCap size={24} />}
                                  </div>
                                  {i !== EXPERIENCE.length - 1 && <div className="w-px flex-grow bg-white/5 my-2" />}
                               </div>
                               <div className="space-y-2">
                                  <div className="flex flex-wrap items-center gap-3">
                                     <h5 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{item.role}</h5>
                                     <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest">{item.year}</span>
                                  </div>
                                  <p className="text-cyan-500 font-bold uppercase tracking-widest text-xs">{item.company}</p>
                                  <p className={`text-sm leading-relaxed max-w-lg ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>{item.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    )}
                    
                    {/* Decorative Corner icon */}
                    <div className="absolute top-10 right-10 opacity-5">
                       {activeTab === "skills" ? <Code size={120} /> : <Briefcase size={120} />}
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>

      </div>
    </section>
  );
}
