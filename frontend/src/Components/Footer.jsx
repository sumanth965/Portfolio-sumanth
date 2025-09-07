// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-white">Sumanth Poojary</h2>
          <p className="mt-4 text-sm text-gray-400">
            A passionate developer building modern and responsive web applications.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="#about" className="hover:text-orange-500 transition">About</a></li>
            <li><a href="#projects" className="hover:text-orange-500 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p>Email: <a href="mailto:sumanthpoojary965@example.com" className="hover:text-orange-500">sumanthpoojary965@example.com</a></p>
          <p>Phone: +91 9113201800</p>
          <p>Location: Udupi, India</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/sumanth965" target="_blank" rel="noreferrer" className="text-2xl hover:text-orange-500 transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/sumanth965" target="_blank" rel="noreferrer" className="text-2xl hover:text-orange-500 transition">
              <FaLinkedin />
            </a>
            <a href="mailto:sumanthpoojary965@example.com" className="text-2xl hover:text-orange-500 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sumanth Poojary. All Rights Reserved.
      </div>
    </footer>
  );
}
