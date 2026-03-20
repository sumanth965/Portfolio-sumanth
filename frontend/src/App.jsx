import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Projects from './Pages/Projects';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0b1120] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      
      <main className="relative">
        <Home theme={theme} />
        <About theme={theme} />
        <Projects theme={theme} />
        <Contact theme={theme} />
      </main>

      <Footer theme={theme} />
      
      {/* Decorative accent lines */}
      <div className={`fixed inset-0 pointer-events-none z-[99] border-x transition-colors duration-500 opacity-10 ${theme === 'dark' ? 'border-white/10' : 'border-slate-900/10'}`} />
    </div>
  );
}

export default App;
