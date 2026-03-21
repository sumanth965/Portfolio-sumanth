import SectionHeading from '@/components/SectionHeading'
import { skills } from '@/lib/site-data'

export default function SkillsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I use to build modern products"
          description="A focused stack for shipping responsive interfaces, scalable backend systems, and polished user experiences."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_40px_rgba(2,8,23,0.35)] transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${skill.accent} p-[1px]`}>
                  <div className="rounded-2xl bg-[#08111f] p-4 text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
