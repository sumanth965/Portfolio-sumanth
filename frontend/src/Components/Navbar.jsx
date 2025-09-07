import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Zap,
  User,
  Mail,
  Briefcase,
  Home,
} from "lucide-react";

export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Briefcase, hasDropdown: true },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const projectDropdown = [
    { name: "Web Apps", href: "#webapps" },
    { name: "Mobile Apps", href: "#mobileapps" },
    { name: "AI Projects", href: "#aiprojects" },
    { name: "Open Source", href: "#opensource" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Particle effect
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-1 h-1 rounded-full animate-pulse transition-colors duration-1000 ${
        theme === "dark" ? "bg-orange-400/30" : "bg-orange-500/20"
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    />
  ));

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-700 transform
        ${scrolled ? "backdrop-blur-xl shadow-2xl py-2" : "backdrop-blur-lg py-4"}
        ${
          theme === "dark"
            ? `bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 ${
                scrolled ? "shadow-orange-500/20" : ""
              }`
            : `bg-gradient-to-r from-white/90 via-gray-50/90 to-white/90 ${
                scrolled ? "shadow-orange-500/10" : ""
              }`
        }`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles}
      </div>

      {/* Border line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r
        ${
          theme === "dark"
            ? "from-transparent via-orange-400 to-transparent"
            : "from-transparent via-orange-500 to-transparent"
        }`}
      />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 relative">
        {/* Logo */}
        <div className="relative group">
          <div
            className={`text-3xl font-black tracking-wider transition-all duration-500 transform group-hover:scale-110 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            onMouseEnter={() => setIsHovered("logo")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className="relative inline-block">
              S
              <Sparkles
                className={`absolute -top-2 -right-2 w-4 h-4 transition-all duration-300 ${
                  isHovered === "logo"
                    ? "text-orange-400 animate-spin"
                    : "text-transparent"
                }`}
              />
            </span>
            <span
              className={`bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent ${
                isHovered === "logo" ? "animate-pulse" : ""
              }`}
            >
              umanth
            </span>
          </div>

          {/* Glow */}
          <div
            className={`absolute inset-0 rounded-lg blur-xl transition-opacity duration-500 ${
              isHovered === "logo" ? "bg-orange-500/20 opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-1 font-semibold">
          {navLinks.map((item) => (
            <li key={item.name} className="relative group">
              {item.hasDropdown ? (
                <div
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  className="relative"
                >
                  <button
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                      ${
                        theme === "dark"
                          ? "text-white hover:text-orange-400"
                          : "text-gray-800 hover:text-orange-600"
                      }`}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl transition-all duration-300 transform origin-top
                      ${
                        showDropdown
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }
                      ${
                        theme === "dark"
                          ? "bg-slate-800/95 border-slate-700"
                          : "bg-white/95 border-gray-200"
                      } backdrop-blur-xl border`}
                  >
                    {projectDropdown.map((dropItem) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className={`block px-4 py-3 text-sm transition-all duration-200 hover:scale-105 transform ${
                          theme === "dark"
                            ? "text-gray-300 hover:text-orange-400 hover:bg-orange-500/10"
                            : "text-gray-700 hover:text-orange-600 hover:bg-orange-500/5"
                        }`}
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                    ${
                      theme === "dark"
                        ? "text-white hover:text-orange-400"
                        : "text-gray-800 hover:text-orange-600"
                    }`}
                  onMouseEnter={() => setIsHovered(item.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <item.icon
                    size={18}
                    className={`transition-transform duration-300 ${
                      isHovered === item.name ? "rotate-12" : ""
                    }`}
                  />
                  <span>{item.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Theme Toggle + Mobile Menu Btn */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`relative p-3 rounded-full transition-all duration-500 transform hover:scale-110 group overflow-hidden
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-slate-800 to-slate-700 hover:from-orange-600 hover:to-orange-500 shadow-lg"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-orange-500 hover:to-orange-400 shadow-lg"
              }`}
          >
            <div
              className={`relative z-10 transition-colors duration-300 ${
                theme === "dark"
                  ? "text-orange-400 group-hover:text-white"
                  : "text-gray-700 group-hover:text-white"
              }`}
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </div>
          </button>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-3 rounded-full transition-all duration-500 transform hover:scale-110 group
                ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-orange-600"
                    : "bg-gray-100 hover:bg-orange-500"
                } ${isOpen ? "rotate-180" : ""}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-700 transform origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`mx-4 mt-4 rounded-2xl shadow-2xl backdrop-blur-xl border overflow-hidden
            ${
              theme === "dark"
                ? "bg-slate-900/95 border-slate-700"
                : "bg-white/95 border-gray-200"
            }`}
        >
          {/* Mobile header */}
          <div
            className={`px-6 py-4 border-b ${
              theme === "dark" ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Zap className="text-orange-500" size={20} />
              <span
                className={`font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Navigation
              </span>
            </div>
          </div>

          {/* Mobile Items */}
          <div className="py-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-4 px-6 py-4 transition-all duration-300 transform hover:scale-105
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400 hover:bg-orange-500/10"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-500/5"
                  }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    theme === "dark" ? "bg-slate-800" : "bg-gray-100"
                  }`}
                >
                  <item.icon size={18} />
                </div>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
