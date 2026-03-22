import { useEffect, useState } from 'react';
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
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-slate-950 text-slate-50'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[28rem] bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.14),_transparent_55%)]" />
      </div>

      <Navbar theme={theme} setTheme={setTheme} />

      <main className="relative">
        <Home theme={theme} />
        <About theme={theme} />
        <Projects theme={theme} />
        <Contact theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

export default App;
