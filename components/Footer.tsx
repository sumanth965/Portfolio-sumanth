import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-orange-500 border-opacity-20 bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Sumanth Poojary</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A passionate developer building modern and responsive web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                Email:{' '}
                <a
                  href="mailto:sumanth@example.com"
                  className="text-blue-500 hover:text-blue-400"
                >
                  sumanthpoojary965@example.com
                </a>
              </li>
              <li>Phone: +91 9113201800</li>
              <li>Location: Udupi, India</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Me</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:sumanth@example.com"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-500 border-opacity-20 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Sumanth Poojary. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
