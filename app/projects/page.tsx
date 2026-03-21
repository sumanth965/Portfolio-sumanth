'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import { projectCategories, projects } from '@/lib/site-data'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<(typeof projectCategories)[number]>('All')

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchTerm.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))

      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <section className="px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Projects"
            title="My Projects"
            description="Explore case studies and product builds across frontend experiences and full stack applications."
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {projectCategories.map((category) => {
                const active = category === selectedCategory
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                      active
                        ? 'bg-gradient-to-r from-orange-400 to-amber-300 text-slate-950 shadow-[0_0_24px_rgba(251,146,60,0.35)]'
                        : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-16 text-center text-slate-300">
              No projects matched your search. Try another keyword or filter.
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
}
