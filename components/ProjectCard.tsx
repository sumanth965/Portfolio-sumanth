import { Github, Play } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  technologies: string[]
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
    <div className="card-border rounded-xl overflow-hidden hover-lift bg-slate-900 bg-opacity-50 group">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl">📱</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs sm:text-sm bg-slate-800 text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 flex-1 px-4 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-semibold transition-all justify-center"
            >
              <Github size={18} />
              GitHub
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 flex-1 px-4 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-semibold transition-all justify-center"
            >
              <Play size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
