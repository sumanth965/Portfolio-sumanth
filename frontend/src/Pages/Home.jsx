import React, { useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import profile from "../assets/IMG.png";

export default function Hero({ theme }) {
  useEffect(() => {
    // Smooth distortion animation (fade out on load)
    anime({
      targets: [
        "#displacementFilter feTurbulence",
        "#displacementFilter feDisplacementMap",
      ],
      baseFrequency: [{ value: 0.06 }, { value: 0 }],
      scale: [{ value: 20 }, { value: 0 }],
      easing: "easeOutCubic",
      duration: 6000,
    });
  }, []);

  return (
    <section
      id="home"
      className={`relative px-6 sm:px-10 lg:px-16 py-20 md:py-28 overflow-hidden transition-all duration-500 
        ${theme === "dark" ? "bg-[#0f172a] text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-lg sm:text-xl font-medium mb-2 tracking-wide">
            <span
              className={`bg-gradient-to-r ${
                theme === "dark"
                  ? "from-orange-400 to-pink-400"
                  : "from-orange-600 to-pink-500"
              } text-transparent bg-clip-text`}
            >
              Hello<span className="text-red-500">.</span>
            </span>
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            I’m{" "}
            <span
              className={`bg-gradient-to-r ${
                theme === "dark"
                  ? "from-orange-400 via-orange-500 to-pink-500"
                  : "from-orange-600 via-orange-500 to-pink-600"
              } text-transparent bg-clip-text`}
            >
              Sumanth
            </span>
          </h1>

          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-6 
              ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Full Stack Developer | MERN Specialist
          </h2>

          <p
            className={`text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            I’m a <span className="font-semibold text-orange-500">self-motivated</span> 
            1st-year MCA student with hands-on experience building scalable, 
            user-friendly applications. Skilled in{" "}
            <span className="font-semibold">MongoDB, Express.js, React.js, and Node.js</span>.  
            I’ve developed real-world projects like a restaurant management system and an e-commerce platform.  
            Passionate about <span className="font-semibold text-orange-500">problem-solving</span>, teamwork, and continuous learning.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className={`px-7 py-3 rounded-xl text-base font-medium transition-all duration-300 relative overflow-hidden
                ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:scale-105"
                    : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg hover:translate-y-[-2px]"
                }`}
            >
              View My Projects
            </a>

            <a
              href="#contact"
              className={`px-7 py-3 rounded-xl text-base font-medium border transition duration-300
                ${
                  theme === "dark"
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
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 flex justify-center items-center relative"
        >
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl overflow-hidden shadow-2xl group">
            {/* Glow background */}
            <div
              className={`absolute -inset-3 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-700 z-0
                ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-orange-600/20"
                    : "bg-gradient-to-br from-orange-400/30 via-pink-400/30 to-orange-500/30"
                }`}
            />

            {/* Distorted image */}
            <svg
              viewBox="0 0 500 500"
              className="relative z-10 w-full h-full object-cover rounded-2xl border border-orange-500/20"
            >
              <defs>
                <filter
                  id="displacementFilter"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feTurbulence
                    type="turbulence"
                    numOctaves="3"
                    baseFrequency="0"
                    result="turbulence"
                  />
                  <feDisplacementMap
                    in2="turbulence"
                    in="SourceGraphic"
                    scale="1"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
              <image
                href={profile}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                filter="url(#displacementFilter)"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
