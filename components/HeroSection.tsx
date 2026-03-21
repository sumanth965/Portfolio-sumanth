import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <p className="text-gray-400 text-lg mb-4">Hello, I'm Sumanth</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              Full Stack
              <br />
              <span className="gradient-text">Developer | MERN Specialist</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              I'm passion for a passion for scalable web apps using MongoDB, Express.js, React.js, or vieer using MongoDB, Express.js, React.js, and Node.js.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all hover:gap-3"
            >
              View My Projects
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg font-semibold transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right - Profile Image with Neon Border */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-80 h-96 sm:w-96 sm:h-full max-w-md">
            {/* Neon Border Box */}
            <div className="absolute inset-0 neon-glow rounded-2xl border-2 border-cyan-500 opacity-50"></div>
            
            {/* Image Container */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 flex items-center justify-center text-6xl font-bold text-transparent bg-clip-text gradient-text">
                👨‍💻
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent"></div>
    </section>
  )
}
