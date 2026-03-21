import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SectionHeading from '@/components/SectionHeading'
import { profile, skills } from '@/lib/site-data'

const highlights = [
  'Build responsive, component-driven interfaces with Next.js and Tailwind CSS.',
  'Design backend systems and APIs for scalable full stack applications.',
  'Refactor codebases into reusable, maintainable structures for long-term growth.',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <section className="px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <SectionHeading eyebrow="About" title="About Me" description={profile.about} />
            <div className="grid gap-4">
              {highlights.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(2,8,23,0.35)]">
            <h2 className="mb-6 text-2xl font-semibold text-white">Core Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill.name} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
