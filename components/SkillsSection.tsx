'use client'

import { useState } from 'react'

const skillsData = [
  { name: 'MERN stack', icon: 'M', color: 'from-green-400 to-green-600' },
  { name: 'Python', icon: '🐍', color: 'from-blue-400 to-blue-600' },
  { name: 'Java', icon: '☕', color: 'from-orange-400 to-orange-600' },
  { name: 'AWS', icon: '☁️', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
  { name: 'React.js', icon: '⚛️', color: 'from-cyan-400 to-cyan-600' },
  { name: 'JouL', icon: 'J', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Express', icon: '🔧', color: 'from-gray-400 to-gray-600' },
  { name: 'AI', icon: '🤖', color: 'from-purple-400 to-purple-600' },
  { name: 'Other', icon: 'C', color: 'from-purple-400 to-purple-600' },
]

export default function SkillsSection() {
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 10
  const pages = Math.ceil(skillsData.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const displayedSkills = skillsData.slice(startIdx, startIdx + itemsPerPage)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 bg-opacity-30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-2">Skills</h2>
        <div className="w-20 h-1 bg-orange-500 mb-16"></div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {displayedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 cursor-pointer group"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                {skill.icon}
              </div>
              {/* Skill Name */}
              <p className="text-xs sm:text-sm font-semibold text-gray-300 text-center line-clamp-2">
                {skill.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: pages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentPage ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
