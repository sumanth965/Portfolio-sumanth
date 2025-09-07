import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    name: "MERN Excel Analytics",
    description: "Upload, analyze, and visualize Excel files with authentication & charts.",
    link: "https://github.com/sumanth965/MERN-Excel-Analytics-Project-",
    demo: "",
    image: "/images/excel-analytics.jpg",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    category: "Full Stack",
  },
  {
    name: "Foodify",
    description: "A full-stack restaurant platform (frontend + backend).",
    link: "https://github.com/sumanth965/Foodify",
    demo: "",
    image: "/images/foodify.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    category: "Full Stack",
  },
  {
    name: "Image Slider",
    description: "Responsive JS-based image gallery slider.",
    link: "https://github.com/sumanth965/Image_Slider",
    demo: "https://sumanth09-image-slider.netlify.app/",
    image: "/images/image-slider.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
  },
  {
    name: "Cart Page",
    description: "Interactive shopping cart experience built with HTML/CSS/JS.",
    link: "https://github.com/sumanth965/Cart_page",
    demo: "https://sumanth09-cartpage.netlify.app/#",
    image: "/images/cart-page.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
  },
  {
    name: "Bucket List",
    description: "Personalized to-do list application.",
    link: "https://github.com/sumanth965/Buket_List",
    demo: "https://sumanth09-bucketlist.netlify.app/",
    image: "/images/bucket-list.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
  },
  {
    name: "Sign-In / Sign-Up Page",
    description: "Stylish auth form templates using frontend stack.",
    link: "https://github.com/sumanth965/signin-signup-page",
    demo: "https://su-manth09-signin-signup-page-frontend.onrender.com/",
    image: "/images/signin-signup.jpg",
    tech: ["React", "TailwindCSS"],
    category: "Frontend",
  },
];

export default function Projects({ theme }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = filter === "All" || proj.category === filter;
    const matchesSearch = proj.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className={`px-6 py-20 transition-all duration-500 ease-in-out ${
        theme === "dark" ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-10 border-b inline-block pb-2 transition-colors duration-500 ${
            theme === "dark" ? "border-orange-500" : "border-orange-600"
          }`}
        >
          My Projects
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <input
            type="text"
            placeholder="Search projects..."
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-500 ${
              theme === "dark"
                ? "bg-white/10 text-white placeholder-gray-400"
                : "bg-white text-black placeholder-gray-500 border border-gray-300"
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-3 flex-wrap">
            {["All", "Frontend", "Full Stack"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  filter === cat
                    ? "bg-orange-500 text-white"
                    : theme === "dark"
                    ? "bg-white/10 text-gray-300 hover:bg-orange-400 hover:text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-orange-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={idx}
              className={`relative backdrop-blur-md rounded-lg shadow-lg overflow-hidden group transition-colors duration-500 ${
                theme === "dark" ? "bg-white/5" : "bg-white"
              }`}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Project Image with Overlay */}
              <div className="relative">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="rounded-t-lg h-40 w-full object-cover"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    theme === "dark" ? "bg-black/70" : "bg-black/50"
                  }`}
                >
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-orange-500 rounded-full hover:bg-orange-600 transition"
                  >
                    <FaGithub size={18} />
                  </a>
                  {proj.demo ? (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition"
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  ) : (
                    <span
                      className={`text-sm italic ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{proj.name}</h3>
                <p
                  className={`mb-4 transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {proj.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-orange-500/20 text-orange-500 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
