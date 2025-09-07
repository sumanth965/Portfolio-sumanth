import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Contact({ theme }) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    // Basic validation
    const validateForm = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast.error("Please fill in all fields.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to send message.");
        }
        setLoading(false);
    };

    return (
        <section
            id="contact"
            className={`px-6 py-20 transition-colors duration-500 ${
                theme === "dark"
                    ? "bg-[#0f172a] text-white"
                    : "bg-gray-50 text-black"
            }`}
        >
            <Toaster position="top-right" reverseOrder={false} />
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <motion.h2
                    className={`text-3xl font-bold text-center mb-4 border-b inline-block pb-2 ${
                        theme === "dark"
                            ? "border-orange-500"
                            : "border-orange-400"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Contact Me
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className={`text-center max-w-lg mx-auto mb-12 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Have a project in mind or just want to say hi? Fill out the
                    form below or connect with me through my socials.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className={`backdrop-blur-lg rounded-lg p-6 shadow-lg transition-colors duration-500 ${
                            theme === "dark"
                                ? "bg-white/5"
                                : "bg-white border border-gray-200"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Floating Label Inputs */}
                        {["name", "email", "message"].map((field) => (
                            <div key={field} className="relative mb-6">
                                {field !== "message" ? (
                                    <input
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        value={formData[field]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [field]: e.target.value,
                                            })
                                        }
                                        className={`peer w-full px-4 py-3 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 ${
                                            theme === "dark"
                                                ? "bg-white/10 text-white"
                                                : "bg-gray-100 text-black"
                                        }`}
                                        placeholder={field}
                                    />
                                ) : (
                                    <textarea
                                        name={field}
                                        rows="4"
                                        value={formData[field]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [field]: e.target.value,
                                            })
                                        }
                                        className={`peer w-full px-4 pt-5 pb-2 rounded-lg placeholder-transparent border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 ${
                                            theme === "dark"
                                                ? "bg-white/10 text-white border-gray-500"
                                                : "bg-gray-100 text-black border-gray-300"
                                        }`}
                                        placeholder={field}
                                    ></textarea>
                                )}
                                <label
                                    className={`absolute left-3 -top-3 text-sm px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-orange-500 ${
                                        theme === "dark"
                                            ? "bg-[#0f172a] text-gray-400 peer-placeholder-shown:text-gray-500"
                                            : "bg-gray-50 text-gray-600 peer-placeholder-shown:text-gray-500"
                                    }`}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </motion.form>

                    {/* Social Media + Map */}
                    <motion.div
                        className="flex flex-col items-center justify-center gap-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            Connect With Me
                        </h3>
                        <p
                            className={`text-center ${
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }`}
                        >
                            I’m always open to networking and collaboration.
                            Let’s connect on these platforms:
                        </p>

                        <div className="flex gap-6 mt-4">
                            {[
                                {
                                    icon: FaGithub,
                                    link: "https://github.com/sumanth965",
                                },
                                {
                                    icon: FaLinkedin,
                                    link: "https://www.linkedin.com/in/sumanth-poojary-2a1052246/",
                                },
                                {
                                    icon: FaEnvelope,
                                    link: "mailto:sumanthpoojary965@gmail.com",
                                },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-full transition-colors duration-300 ${
                                        theme === "dark"
                                            ? "bg-white/10 hover:bg-orange-500 text-white"
                                            : "bg-black/10 hover:bg-orange-500 text-black hover:text-white"
                                    }`}
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon size={24} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Google Map */}
                        <div className="mt-8 w-full h-64 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                title="Google Map"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src="https://maps.app.goo.gl/YwsfRxj4BA9m3Mcq8"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
