import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Sparkles, ArrowUp } from "lucide-react";

export default function Footer({ theme }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className={`relative pt-20 pb-10 border-t ${
        theme === "dark" 
          ? "bg-[#0b1120] border-white/5 text-slate-400" 
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      {/* Background glow for footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Sparkles size={22} className="text-white" />
              </div>
              <span className={`text-2xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                SUMANTH<span className="text-cyan-500">.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Crafting high-performance, visually stunning web experiences through a deep understanding of MERN stack and modern UI principles.
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/sumanth965" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/sumanth-poojary-2a1052246/" },
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaEnvelope, href: "mailto:sumanthpoojary965@gmail.com" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    theme === "dark" 
                      ? "bg-slate-800 text-white hover:bg-cyan-500 shadow-lg shadow-black/20" 
                      : "bg-slate-100 text-slate-600 hover:bg-cyan-600 hover:text-white"
                  }`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-bold mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Navigation</h4>
            <ul className="space-y-4 list-none p-0">
              {["Home", "About", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm no-underline hover:text-cyan-400 transition-colors flex items-center gap-2 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-lg font-bold mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Contact Info</h4>
            <div className="space-y-4">
              {[
                { icon: FaEnvelope, text: "sumanthpoojary965@gmail.com" },
                { icon: FaPhoneAlt, text: "+91 9113201800" },
                { icon: FaMapMarkerAlt, text: "Udupi, Karnataka, India" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    theme === "dark" ? "bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20" : "bg-white text-cyan-600 border border-slate-200"
                  }`}>
                    <item.icon size={14} />
                  </div>
                  <span className="text-sm truncate">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="relative">
             <h4 className={`text-lg font-bold mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Newsletter</h4>
             <p className="text-sm mb-6">Stay updated with my latest projects and tech blogs.</p>
             <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${
                    theme === "dark" 
                      ? "bg-slate-800 border-white/5 text-white focus:ring-2 focus:ring-cyan-500/50" 
                      : "bg-white border-slate-200 text-slate-900 focus:ring-2 focus:ring-cyan-600/20"
                  } border`}
                />
                <button className="absolute right-2 top-2 px-4 py-1 rounded-lg bg-cyan-500 text-white text-xs font-bold hover:bg-cyan-600 transition-all">
                  Join
                </button>
             </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${
          theme === "dark" ? "border-white/5" : "border-slate-200"
        }`}>
          <p className="text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Sumanth Poojary. Designed with passion for performance.
          </p>
          
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className={`flex items-center gap-2 group text-xs font-bold uppercase tracking-widest ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Back to Top
            <div className={`w-8 h-8 rounded-full border border-cyan-500 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all`}>
              <ArrowUp size={14} />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
