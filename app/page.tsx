import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const featuredProjects = [
  {
    title: 'E-commerce Platform',
    description:
      'I\'m a self motivated developer capable scaling scalable, high-performance web applications using MongoDB, Express, React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Task Management App',
    description:
      'Task Management app is an unassuming performance is a cleaner, measurable software system implementation.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Social Media Dashboard',
    description:
      'Insole your loving with respenie, and social media dashboard, she alco new',
    technologies: ['React', 'Node.js', 'MongoDB', 'AI', 'Redux', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'React CSS Ihdocument',
    description:
      'Welcome React CSS Document for your frontend projects and styling.',
    technologies: ['React', 'CSS', 'JavaScript'],
    githubLink: '#',
    liveLink: '#',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold">Featured Projects</h2>
            <div className="flex gap-2 sm:gap-4">
              <button className="p-2 rounded-full hover:bg-slate-800 transition-all text-gray-400 hover:text-gray-200" aria-label="Previous">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-slate-800 transition-all text-gray-400 hover:text-gray-200" aria-label="Next">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="flex justify-center">
            <Link
              href="/projects"
              className="text-center text-gray-400 hover:text-blue-400 transition-colors font-medium"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
