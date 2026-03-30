import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Skills from './Pages/Skills'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Footer from './Components/Footer'
import './index.css'

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#060d1a] text-slate-100' : 'bg-white text-slate-900'}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Home theme={theme} />
        <Skills theme={theme} />
        <Projects theme={theme} />
        <Contact theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  )
}