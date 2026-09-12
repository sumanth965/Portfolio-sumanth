import React, { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Skills from './Pages/Skills'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Footer from './Components/Footer'
import ProceduralScaleFluidBackground from './Components/ProceduralScaleFluidBackground'
import './index.css'

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Synchronize anchor links (#home, #skills, #projects, #contact) with Lenis smooth scroll
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const id = target.getAttribute('href');
        if (id && id.length > 1) {
          const element = document.querySelector(id);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: -60, duration: 1.2 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060d1a]/20 text-slate-100">
      <ProceduralScaleFluidBackground />
      <Navbar theme="dark" />
      <main>
        <Home theme="dark" />
        <Skills theme="dark" />
        <Projects theme="dark" />
        <Contact theme="dark" />
      </main>
      <Footer theme="dark" />
    </div>
  )
}