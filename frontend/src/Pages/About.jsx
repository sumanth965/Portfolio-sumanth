import React, { useState } from "react";
import { Code, Server, Globe, Download, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import img3 from "../assets/img3.jpg";

export default function About({ theme }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("All");

  // Skills with categories
  const skills = [
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "HTML/CSS", level: 92, category: "Frontend" },
    { name: "JavaScript", level: 88, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Express.js", level: 82, category: "Backend" },
    { name: "MongoDB", level: 87, category: "Database" },
    { name: "MySQL", level: 80, category: "Database" },
    { name: "Git & GitHub", level: 90, category: "Tools" },
    { name: "VS Code", level: 85, category: "Tools" },
  ];

  const timeline = [
    {
      year: "2022",
      text: "Started Bachelor of Computer Applications (BCA) at DR NSAM First Grade College, Nitte.",
      details:
        "Achieved 9.03 CGPA while balancing academic learning with personal projects in HTML, CSS, JavaScript, and Python.",
    },
    {
      year: "2023",
      text: "Built initial personal and academic projects using HTML, CSS, JavaScript, and Python.",
      details:
        "Created mini-projects like calculators, portfolio websites, and CRUD apps to strengthen foundational programming skills.",
    },
    {
      year: "2024",
      text: "Internship at Zephyr Technologies — Developed Restaurant Management System & E-commerce Platform using MERN.",
      details:
        "• Restaurant Management System with menu handling, order processing, and real-time updates.\n• TST Ele Gadget — 8-page e-commerce platform with secure login, product management, and admin dashboard.\nTechnologies: MongoDB, Express.js, React.js, Node.js.",
    },
    {
      year: "2024",
      text: "Frontend Developer Internship at MotionCut — Created responsive UI components & layouts.",
      details:
        "Designed and developed reusable components like homepage, cart page, product slider, and image carousel using React and responsive design principles.",
    },
    {
      year: "2024",
      text: "Completed C Programming Bootcamp at DLite — Enhanced algorithmic problem-solving skills.",
      details:
        "Solved various C problems on HackerRank and custom challenges, improving logic building and problem-solving ability.",
    },
  ];

  // Apply filter
  const filteredSkills =
    filter === "All"
      ? skills
      : skills.filter((skill) => skill.category === filter);

  return (
    <section
      id="about"
      className={`relative px-6 py-20 overflow-hidden transition-all duration-500 ease-in-out 
        ${theme === "dark" ? "bg-[#0f172a] text-white" : "bg-white text-black"}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/5 pointer-events-none"></div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Services */}
        <motion.div
          className="space-y-10"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: <Code />, title: "Full-Stack Web Development" },
            { icon: <Server />, title: "Backend API Development" },
            { icon: <Globe />, title: "Responsive UI Design" },
          ].map((service, i) => (
            <motion.div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-lg backdrop-blur-md transition-all duration-500 ease-in-out 
                hover:scale-105 hover:shadow-lg 
                ${theme === "dark"
                  ? "bg-white/5 hover:shadow-orange-500/20"
                  : "bg-black/5 hover:shadow-orange-300/40"}`}
              whileHover={{ y: -4 }}
            >
              <div
                className={`p-4 rounded-full animate-pulse-slow 
                ${theme === "dark" ? "bg-orange-500/20" : "bg-orange-400/20"}`}
              >
                {React.cloneElement(service.icon, {
                  className: "text-orange-500 w-8 h-8",
                })}
              </div>
              <h4 className="text-lg font-semibold">{service.title}</h4>
            </motion.div>
          ))}
        </motion.div>

        {/* Right - About */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Profile */}
          <div
            className={`flex items-center gap-4 backdrop-blur-md p-4 rounded-xl 
            ${theme === "dark" ? "bg-white/5" : "bg-black/5"}`}
          >
            <img
              src={img3}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
            />
            <div>
              <h3 className="text-xl font-bold">Sumanth</h3>
              <p className="text-orange-400">
                Full-Stack Developer | BCA Student
              </p>
              <p
                className={`flex items-center text-sm 
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                <MapPin className="w-4 h-4 mr-1" /> Karnataka, India - 574110
              </p>
            </div>
            <a
              href="/Resume_2k25.pdf"
              download
              className="ml-auto flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
            >
              <Download className="w-4 h-4" /> CV
            </a>
          </div>

          {/* About Text */}
          <div>
            <h2 className="text-3xl font-bold mb-4 border-b border-orange-500 pb-2 inline-block">
              About Me
            </h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } mb-6 leading-relaxed`}
            >
              I am a self-motivated and result-oriented 1st-year MCA student
              with hands-on experience in building scalable, user-friendly web
              applications using the MERN stack. I have completed internships at
              Zephyr Technologies and MotionCut, where I developed full-stack
              projects, responsive UI components, and improved backend
              performance. I am passionate about problem-solving, teamwork, and
              continuous learning, and I enjoy exploring new technologies to
              stay ahead in the industry.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: 6, suffix: "+", label: "Completed Projects" },
              { value: 3, suffix: "", label: "Internships & Bootcamps" },
              { value: 9.03, suffix: " CGPA", label: "Current Academic Score" },
            ].map((stat, index) => (
              <div key={index}>
                <span className="text-3xl font-bold text-orange-500">
                  <CountUp end={stat.value} duration={3} />
                  {stat.suffix}
                </span>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } text-sm`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div
        className="mt-20 max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="flex justify-center mb-10">
          <h3 className="text-3xl font-extrabold tracking-wide">
            My <span className="text-orange-500">Skills</span>
          </h3>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent pb-2">
          {["All", "Frontend", "Backend", "Database", "Tools"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition 
                ${
                  filter === cat
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards with Scrollbar */}
        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent pr-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`relative group backdrop-blur-xl p-6 rounded-2xl shadow-xl transition-all 
                  ${theme === "dark" ? "bg-white/10" : "bg-black/5"} 
                  hover:shadow-orange-500/40`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-lg">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <motion.div
                  className={`relative w-full h-3 rounded-full overflow-hidden 
                    ${theme === "dark" ? "bg-gray-700/70" : "bg-gray-300/70"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                </motion.div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition bg-black/80 text-white text-xs p-2 rounded-lg mt-2 w-max">
                  {skill.name} used in {Math.floor(skill.level / 10)}+ projects
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8">My Journey</h3>
        <div className="border-l-2 border-orange-500 space-y-8 pl-6">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer hover:text-orange-400"
              onClick={() => setSelectedItem(item)}
            >
              <span className="text-orange-400 font-bold">{item.year}</span>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`max-w-lg w-full p-6 rounded-lg shadow-lg ${
                theme === "dark"
                  ? "bg-[#0f172a] text-white"
                  : "bg-white text-black"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedItem.year}</h3>
                <button onClick={() => setSelectedItem(null)}>
                  <X className="w-6 h-6 text-gray-400 hover:text-orange-500" />
                </button>
              </div>
              <p className="whitespace-pre-line">{selectedItem.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
