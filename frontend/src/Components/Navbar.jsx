import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active tab based on scroll position
      const sections = NAV_LINKS.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 100;

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-3 px-4 sm:px-8 border-b border-white/10" 
          : "py-6 px-4 sm:px-12"
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled 
            ? "bg-slate-900/80 backdrop-blur-xl rounded-full px-6 py-2 shadow-2xl shadow-cyan-900/20" 
            : ""
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-2 no-underline group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Sparkles className="text-white w-6 h-6 group-hover:rotate-12 transition-transform" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            SUMANTH<span className="text-cyan-500">.</span>
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 no-underline flex items-center gap-2 ${
                activeTab === link.name
                  ? (theme === "dark" ? "text-white" : "text-slate-950")
                  : (theme === "dark" ? "text-slate-400 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-600")
              }`}
            >
              {activeTab === link.name && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-cyan-500/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <link.icon size={16} />
              {link.name}
              {activeTab === link.name && (
                <motion.div 
                  layoutId="active-line"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-500 rounded-full"
                />
              )}
            </a>
          ))}
          
          <div className="w-px h-6 bg-white/10 mx-2" />
          
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              theme === "dark" 
                ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
           <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark" ? "bg-slate-800 text-yellow-400" : "bg-slate-100 text-slate-600"
            }`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl transition-all ${
              theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-900"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-4 right-4 mt-4 p-4 rounded-3xl shadow-2xl border backdrop-blur-2xl md:hidden ${
              theme === "dark" 
                ? "bg-slate-900/95 border-white/10" 
                : "bg-white/95 border-slate-200"
            }`}
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl no-underline transition-all ${
                    activeTab === link.name
                      ? "bg-cyan-500/10 text-cyan-400"
                      : (theme === "dark" ? "text-slate-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50")
                  }`}
                >
                  <link.icon size={20} />
                  <span className="font-bold">{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
