import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-2">About Me</h1>
          <div className="w-32 h-1 bg-orange-500 mb-12"></div>

          <div className="space-y-8 text-gray-400 text-lg leading-relaxed">
            <p>
              I'm a passionate Full Stack Developer with expertise in the MERN stack. I specialize in building scalable, high-performance web applications using MongoDB, Express.js, React, and Node.js.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
              <p>
                With several years of experience in web development, I've worked on diverse projects ranging from e-commerce platforms to real-time collaboration tools. I'm committed to writing clean, maintainable code and following best practices in software development.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Skills & Expertise</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Frontend: React, JavaScript, CSS, Tailwind CSS</li>
                <li>Backend: Node.js, Express, MongoDB</li>
                <li>Tools: Git, Docker, AWS, Linux</li>
                <li>Database: MongoDB, MySQL, PostgreSQL</li>
                <li>Other: RESTful APIs, JWT Authentication, Real-time applications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Philosophy</h2>
              <p>
                I believe in writing code that's not just functional, but also readable and maintainable. I'm always eager to learn new technologies and best practices to stay updated with the ever-evolving web development landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
