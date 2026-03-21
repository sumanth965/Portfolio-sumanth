import Image from 'next/image'
import { Github, PlayCircle } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: readonly string[]
  githubLink?: string
  liveLink?: string
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubLink,
  liveLink,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-cyan-400/30 bg-[linear-gradient(180deg,rgba(11,19,34,0.92),rgba(13,23,41,0.96))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_30px_rgba(249,115,22,0.12)] transition hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.18)]">
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-900/60">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-2 pb-2">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-sm leading-7 text-slate-300">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#111a2b] px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-[#172236]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-400/40 bg-orange-400/10 px-4 py-3 text-sm font-semibold text-orange-200 transition hover:bg-orange-400/20"
          >
            <PlayCircle className="h-4 w-4" />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  )
}
