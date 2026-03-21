import { Github, PlayCircle } from 'lucide-react'

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
    <div className="card-border rounded-xl overflow-hidden bg-slate-900 bg-opacity-40 group hover:bg-opacity-60 transition-all duration-300 flex flex-col h-full" style={{
      border: '2px solid rgba(249, 115, 22, 0.5)',
      boxShadow: '0 0 20px rgba(249, 115, 22, 0.15)'
    }}>
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group-hover:shadow-lg transition-all duration-300">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
            <div className="text-6xl opacity-50">📱</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-slate-800 bg-opacity-60 text-gray-300 rounded-full hover:bg-opacity-100 transition-all"
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
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-semibold transition-all duration-200"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-semibold transition-all duration-200"
            >
              <PlayCircle size={18} />
              <span className="hidden sm:inline">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
