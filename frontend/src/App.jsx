import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Skills from './Pages/Skills'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'
import './index.css'
import Contact from './Pages/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#060d1a', color: '#f1f5f9' }}>
      <Navbar />
      <main>
        <Home />
        <Skills />
        <Projects />
        <Contact/>
      </main>
      <Footer />
    </div>
  )
}