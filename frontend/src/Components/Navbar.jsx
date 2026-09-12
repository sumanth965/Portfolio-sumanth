import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail, Sparkles, ChevronRight } from "lucide-react";

/**
 * Minimal Cyber Navbar
 * Matches the exact design:
 * - Logo on far left: Icon box + SUMANTH.
 * - Navigation links centered: HOME, SKILLS, PROJECTS, CONTACT
 * - Active link pill: Glowing cyan pill
 * - Transparent background showing 3D scale texture
 */

const NAV_LINKS = [
  { name: "HOME", href: "#home", icon: Home },
  { name: "SKILLS", href: "#skills", icon: User },
  { name: "PROJECTS", href: "#projects", icon: Briefcase },
  { name: "CONTACT", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("HOME");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = NAV_LINKS.map(link => document.querySelector(link.href));

      sections.forEach((section, index) => {
        if (section && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          setActiveTab(NAV_LINKS[index].name);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] py-5 px-6 sm:px-12 bg-transparent pointer-events-none">
      {/* Top Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 origin-left z-[1001]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* LOGO: SUMANTH. */}
        <a href="#home" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 rounded-xl bg-[#091528] border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-colors">
            <Sparkles className="text-cyan-400 w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-wider text-white">
            SUMANTH<span className="text-cyan-400">.</span>
          </span>
        </a>

        {/* CENTERED NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-5 py-1.5 rounded-full text-xs font-black tracking-[0.2em] transition-all duration-300 no-underline ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 pointer-events-auto"
          >
            <div className="p-4 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeTab === link.name;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl no-underline transition-all ${
                        isActive
                          ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="font-black uppercase tracking-widest text-xs">{link.name}</span>
                      <ChevronRight size={16} className={isActive ? "text-cyan-400" : "opacity-30"} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
