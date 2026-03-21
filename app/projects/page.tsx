'use client'

import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import { Search, ChevronDown } from 'lucide-react'
import { useState, useMemo } from 'react'

const allProjects = [
  {
    title: 'E-commerce Platform',
    description: 'I\'m a self motivated developer capable scaling scalable, high-performance web applications using MongoDB, Express, React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Task Management App',
    description: 'Task Management app is an unassuming performance is a cleaner, measurable software system implementation.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'E-commerce West App',
    description: 'A ecommercial developer caerble as withaker holtiocoo/atorium web application using MongoDB, Express.js, React.js, and continuous learning.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Entrances App',
    description: 'A accostal developer eraisham application using asli inkfor with modern water flow and noitio, performaning web applications, and reasserve about problem solving',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Wolding Start App',
    description: 'I\'m a junior developer warehoused with prerequisite or using online creation drosping and remarkend immobilization and anevece.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'React CSS Ihdocument',
    description: 'Create a React and CSS Document for your frontend projects.',
    technologies: ['React', 'CSS', 'JavaScript'],
    githubLink: '#',
    liveLink: '#',
  },
]

const categories = ['All', 'Frontend', 'Full Stack']

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-2">My Projects</h1>
          <div className="w-32 h-1 bg-orange-500 mb-8"></div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {['All', 'Frontend', 'Full Stack'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No projects found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
