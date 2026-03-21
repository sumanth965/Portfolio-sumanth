import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <p className="text-gray-400 text-lg mb-4">Hello, I'm Sumanth</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Full Stack
              <br />
              <span className="gradient-text">Developer | MERN Specialist</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              I'm passionate for scalable web apps using MongoDB, Express.js, React.js, and Node.js.
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
          <div className="relative w-72 h-80 sm:w-80 sm:h-96">
            {/* Neon Glow Box - Cyan and Purple */}
            <div className="absolute inset-0 rounded-3xl opacity-50" style={{
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(6, 182, 212, 0.1)'
            }}></div>
            
            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border-2" style={{
              borderColor: 'rgba(6, 182, 212, 0.8)',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
            }}></div>
            
            {/* Image Container */}
            <div className="absolute inset-2 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Sumanth"
                width={320}
                height={380}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent"></div>
    </section>
  )
}
