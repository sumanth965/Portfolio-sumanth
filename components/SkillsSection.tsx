'use client'

import { useState } from 'react'

const skillsData = [
  { name: 'MERN stack', icon: '🔴', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'Java', icon: '☕', category: 'backend' },
  { name: 'AWS', icon: '☁️', category: 'devops' },
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'React.js', icon: '⚛️', category: 'frontend' },
  { name: 'JavaScript', icon: '📝', category: 'frontend' },
  { name: 'Express', icon: '🔧', category: 'backend' },
  { name: 'AI', icon: '🤖', category: 'devops' },
  { name: 'Other', icon: '✨', category: 'other' },
]

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredSkills =
    selectedCategory === null
      ? skillsData
      : skillsData.filter((skill) => skill.category === selectedCategory)

  const categories = [
    { id: 'backend', label: 'Backend' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'devops', label: 'DevOps' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          Skills
          <div className="w-20 h-1 bg-orange-500 mt-4"></div>
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-slate-800 bg-opacity-50 transition-all hover-lift"
            >
              <div className="text-5xl sm:text-6xl">{skill.icon}</div>
              <div className="text-center">
                <p className="text-sm sm:text-base font-semibold text-gray-300">
                  {skill.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          <div className="w-3 h-3 rounded-full bg-gray-600"></div>
        </div>
      </div>
    </section>
  )
}
