import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../assets/IMG.png";
import {
  FaReact, FaPython, FaJava, FaAws, FaNodeJs,
  FaGithub, FaLinkedin, FaDatabase, FaRocket, FaCode, FaLaptopCode
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiJavascript } from "react-icons/si";
import { Mail, ChevronRight, Sparkles, Zap, Smartphone, Server } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const SKILLS = [
  { name: "MERN Stack", icon: <SiMongodb size={20} />, color: "#47A248", level: 90 },
  { name: "Python",     icon: <FaPython  size={20} />, color: "#3776AB", level: 75 },
  { name: "Java",       icon: <FaJava    size={20} />, color: "#f89820", level: 65 },
  { name: "AWS",        icon: <FaAws     size={20} />, color: "#232F3E", level: 60 },
  { name: "Node.js",    icon: <FaNodeJs  size={20} />, color: "#68A063", level: 85 },
  { name: "React.js",   icon: <FaReact   size={20} />, color: "#61DAFB", level: 92 },
  { name: "JavaScript", icon: <SiJavascript size={20} />, color: "#F7DF1E", level: 88 },
  { name: "Express",    icon: <SiExpress size={20} />, color: "#828282", level: 80 },
];

/* ─── NEON FRAME ────────────────────────────────────────────────────────── */
function HeroImage({ src }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto md:mx-0">
      {/* Outer Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] pointer-events-none rounded-full" />

      {/* Main Image Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/5 shadow-2xl z-10"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-4">
             <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full" 
             />
             <span className="text-xs font-bold text-slate-500 tracking-widest animate-pulse">LOADING</span>
          </div>
        )}
        <img
          src={src}
          alt="Sumanth"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

        {/* Floating Badges */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-10 -left-6 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl z-20"
        >
          <div className="bg-cyan-500/20 p-2 rounded-lg mb-2">
            <FaReact className="text-cyan-400 text-xl" />
          </div>
          <span className="text-xs font-bold text-white whitespace-nowrap">React Developer</span>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          className="absolute bottom-20 -right-6 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl z-20"
        >
          <div className="bg-orange-500/20 p-2 rounded-lg mb-2">
             <FaNodeJs className="text-orange-400 text-xl" />
          </div>
          <span className="text-xs font-bold text-white whitespace-nowrap">Node Expert</span>
        </motion.div>
      </motion.div>

      {/* Decorative Ornaments */}
      <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-cyan-500/30 rounded-tr-[50px] pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-cyan-500/30 rounded-bl-[50px] pointer-events-none" />
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */
export default function Home({ theme }) {
  const bg = theme === "dark" 
    ? "bg-[#0b1120]" 
    : "bg-white";

  return (
    <div id="home" className={`${bg} transition-colors duration-500 pt-32 pb-20 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-400/5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">Available for hire</span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            I BUILD <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              DIGITAL PRODUCTS
            </span> <br />
            THAT SCALE.
          </h1>

          <p className={`text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            I am <span className="text-cyan-400 font-bold underline decoration-cyan-400/30 underline-offset-4">Sumanth Poojary</span>, a Full-Stack MERN Specialist dedicated to creating performant web applications with cutting-edge technologies.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-16">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-cyan-500 text-white font-black text-sm uppercase tracking-widest no-underline flex items-center gap-3 transition-shadow"
            >
              View My Work <ChevronRight size={18} />
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest no-underline border transition-colors ${
                theme === "dark" 
                  ? "border-white/10 text-white hover:bg-white/5" 
                  : "border-slate-200 text-slate-900 hover:bg-slate-50"
              }`}
            >
              Contact Me
            </motion.a>
          </div>

          {/* Featured Skills Bar */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-60">
             <span className={`text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Stack:</span>
             <div className="flex flex-wrap justify-center gap-6">
                {[<SiMongodb size={24} />, <SiExpress size={24} />, <FaReact size={24} />, <FaNodeJs size={24} />, <FaAws size={24} />].map((icon, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2, opacity: 1 }} className={theme === "dark" ? "text-white" : "text-slate-900"}>{icon}</motion.div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Right: Image Content */}
        <div className="order-1 lg:order-2">
           <HeroImage src={profile} />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className={`w-6 h-10 rounded-full border-2 p-1 ${theme === "dark" ? "border-white/20" : "border-slate-200"}`}>
           <div className="w-full h-2 bg-cyan-500 rounded-full" />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>SCROLL</span>
      </motion.div>
    </div>
  );
}