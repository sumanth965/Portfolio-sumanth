import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import profile from "../assets/IMG.png";

export default function Hero({ theme }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth reveal animation when image loads
  useEffect(() => {
    if (imageLoaded) {
      anime({
        targets: ".reveal-image",
        scale: [1.08, 1],
        opacity: [0, 1],
        filter: ["blur(8px)", "blur(0px)"],
        easing: "easeOutExpo",
        duration: 1200,
      });
    }
  }, [imageLoaded]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <section
        id="home"
        className={`relative px-6 sm:px-10 lg:px-16 py-20 md:py-28 overflow-hidden transition-all duration-500
    ${theme === "dark" ? "bg-[#0f172a] text-white" : "bg-white text-black"}`}
      >
        {/* --- NEW BACKGROUND LINES --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Top Horizontal Accent Line (Orange) */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent pointer-events-none" />

          {/* Left Vertical Structural Line */}
          <div
            className={`absolute left-[8%] top-0 bottom-0 w-[1px] hidden lg:block
            ${theme === "dark"
                ? "bg-gradient-to-b from-transparent via-white/5 to-transparent"
                : "bg-gradient-to-b from-transparent via-black/5 to-transparent"
              }`}
          />

          {/* Right Vertical Structural Line */}
          <div
            className={`absolute right-[8%] top-0 bottom-0 w-[1px] hidden lg:block
            ${theme === "dark"
                ? "bg-gradient-to-b from-transparent via-white/5 to-transparent"
                : "bg-gradient-to-b from-transparent via-black/5 to-transparent"
              }`}
          />

          {/* Bottom Horizontal Structural Line */}
          <div
            className={`absolute bottom-20 left-[8%] right-[8%] h-[1px] hidden sm:block
            ${theme === "dark"
                ? "bg-gradient-to-r from-transparent via-white/5 to-transparent"
                : "bg-gradient-to-r from-transparent via-black/5 to-transparent"
              }`}
          />
        </div>

        {/* Ambient background glow */}
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none
      ${theme === "dark" ? "bg-orange-500" : "bg-orange-200"}`}
        />

        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">

          {/* TEXT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className={`text-xs font-semibold uppercase tracking-wider
              ${theme === "dark" ? "text-orange-300" : "text-orange-600"}`}>
                Available for hire
              </span>
            </div>

            <p className="text-lg sm:text-xl font-medium mb-2 tracking-wide">
              <span
                className={`bg-gradient-to-r ${theme === "dark"
                  ? "from-orange-400 to-pink-400"
                  : "from-orange-600 to-pink-500"
                  } text-transparent bg-clip-text`}
              >
                Hello<span className="text-red-500">.</span>
              </span>
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              I’m{" "}
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${theme === "dark"
                  ? "from-orange-400 via-orange-500 to-pink-500"
                  : "from-orange-600 via-orange-500 to-pink-600"
                  }`}
              >
                Sumanth
              </span>
            </h1>

            <h2
              className={`text-xl sm:text-2xl font-semibold mb-8
              ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Full Stack Developer | MERN Specialist
            </h2>

            <p
              className={`text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              I’m a{" "}
              <span className="font-semibold text-orange-500">self-motivated</span>{" "}
              developer crafting scalable, high-performance web applications using{" "}
              <span className="font-semibold">
                MongoDB, Express.js, React.js, and Node.js
              </span>. Passionate about{" "}
              <span className="font-semibold text-orange-500">problem-solving</span>,
              clean UI, and continuous learning.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3.5 rounded-xl text-base font-medium transition-all duration-300
                ${theme === "dark"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_0_20px_rgba(251,146,60,0.4)]"
                    : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  }`}
              >
                View My Projects
              </motion.a>

              <a
                href="#contact"
                className={`px-8 py-3.5 rounded-xl text-base font-medium border transition duration-300 hover:-translate-y-1
                ${theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400"
                    : "border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600"
                  }`}
              >
                Want a project?
              </a>
            </div>
          </motion.div>

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 flex justify-center items-center relative"
          >
            {/* Image glow */}
            <div
              className={`absolute inset-0 rounded-full blur-[100px] opacity-40
              ${theme === "dark"
                  ? "bg-gradient-to-tr from-orange-500 to-pink-500"
                  : "bg-gradient-to-tr from-orange-400 to-pink-400"
                }`}
            />

            <div
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group"
            >
              {/* Border + spotlight */}
              <div
                className={`absolute inset-0 rounded-3xl border pointer-events-none
                ${theme === "dark"
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-gray-100/50"
                  }`}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`,
                  }}
                />
              </div>

              {/* Loader + Image */}
              <div
                className={`relative w-full h-full transition-colors duration-500 ${theme === "dark" ? "bg-[#0f172a]" : "bg-gray-100"}`}
              >
                {!imageLoaded && (
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center animate-pulse
    ${theme === "dark" ? "bg-[#0f172a]" : "bg-gray-100"}`}
                  >
                    <div className="w-14 h-14 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                    <span className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                      Loading...
                    </span>
                  </div>

                )}

                <img
                  src={profile}
                  alt="Sumanth Profile"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover reveal-image transition-opacity duration-700
                  ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}