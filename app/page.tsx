import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import SkillsSection from '@/components/SkillsSection'
import { projects } from '@/lib/site-data'

const featuredProjects = projects.slice(0, 4)

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Navbar />
      <HeroSection />
      <SkillsSection />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Portfolio"
              title="Featured Projects"
              description="Selected work that blends polished interface design, strong product thinking, and full stack implementation."
            />
            <div className="flex gap-3 self-start sm:self-auto">
              <button className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400/40 hover:text-white" aria-label="Previous featured projects">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400/40 hover:text-white" aria-label="Next featured projects">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/projects"
              className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
