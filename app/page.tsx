import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const featuredProjects = [
  {
    title: 'E-commerce Platform',
    description:
      'Expertly your conversion large without enc ensure profession with E-commerce platform.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Task Management App',
    description:
      'Develop a robust agile design, Task Management App, and create a work.',
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
    title: 'Social Media',
    description:
      'Develop a modern and minimal, minimine, the',
    technologies: ['React', 'Node.js', 'MongoDB'],
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
            <div className="flex gap-4">
              <button className="p-2 rounded-full hover:bg-slate-800 transition-all">
                <ChevronLeft className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-slate-800 transition-all">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
