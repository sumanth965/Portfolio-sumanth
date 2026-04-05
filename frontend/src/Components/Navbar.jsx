import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon, Sparkles, ChevronRight } from "lucide-react";

/**
 * Premium Glassmorphic Navbar Redesign
 * Focus: High-end aesthetics, sophisticated animations, and professional micro-interactions.
 */

const NAV_LINKS = [
  { name: "Home", href: "#home", icon: Home },
  // { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll activity for glassy effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Update active tab based on scroll position
      const scrollPos = window.scrollY + 100;
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

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      {/* Top Scroll Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 origin-left z-[1001]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO - Premium Branding */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 no-underline group"
        >
          <div className="relative">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 overflow-hidden ${
              theme === "dark" ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
            } border shadow-cyan-500/10`}>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Sparkles className="text-cyan-400 w-5 h-5" />
              </motion.div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className={`text-xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            SUMANTH<span className="text-cyan-500">.</span>
          </span>
        </motion.a>

        {/* DESKTOP NAVIGATION - Floating Pill Design */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 ${
            scrolled
              ? (theme === "dark" ? "bg-slate-950/40 border-white/10 backdrop-blur-3xl shadow-2xl" : "bg-white/40 border-slate-200 backdrop-blur-3xl shadow-xl")
              : "bg-transparent border-transparent"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`relative px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 no-underline flex items-center gap-2 group ${
                activeTab === link.name
                  ? (theme === "dark" ? "text-cyan-400" : "text-cyan-600")
                  : (theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
              }`}
            >
              {/* Hover Background */}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="nav-hover"
                  className={`absolute inset-0 rounded-full ${theme === "dark" ? "bg-white/5" : "bg-slate-100"}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
              
              {/* Active Indicator */}
              {activeTab === link.name && (
                <motion.div
                  layoutId="nav-active"
                  className={`absolute inset-0 rounded-full ${theme === "dark" ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-cyan-50 border border-cyan-200"}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </motion.div>

        {/* ACTION BUTTONS: Theme + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all duration-300 border ${
              theme === "dark"
                ? "bg-slate-900/50 border-white/10 text-yellow-500 hover:border-yellow-500/40 shadow-lg shadow-black/20"
                : "bg-white border-slate-200 text-slate-500 hover:border-cyan-200 shadow-sm"
            }`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-xl border transition-all duration-300 ${
              theme === "dark" ? "bg-slate-900/50 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-full left-0 right-0 mx-6 mt-4 pointer-events-auto"
          >
            <div className={`p-4 rounded-[2rem] border shadow-2xl backdrop-blur-3xl overflow-hidden ${
              theme === "dark" ? "bg-slate-900/90 border-white/10" : "bg-white/90 border-slate-200"
            }`}>
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl no-underline transition-all ${
                      activeTab === link.name
                        ? (theme === "dark" ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-50 text-cyan-600")
                        : (theme === "dark" ? "text-slate-400 hover:bg-white/5" : "text-slate-500 hover:bg-slate-50")
                    }`}
                  >
                    <div className="flex items-center gap-4">
                       <link.icon size={18} className={activeTab === link.name ? "text-cyan-500" : "text-slate-500"} />
                       <span className="font-black uppercase tracking-widest text-xs">{link.name}</span>
                    </div>
                    <ChevronRight size={16} className="opacity-30" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
