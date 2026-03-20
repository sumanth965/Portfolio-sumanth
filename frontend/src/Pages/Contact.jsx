import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { Mail, MapPin, Phone, MessageSquare, Send, Sparkles, Zap, Smartphone, Server } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/* ─── ANIMATED POLYGON NETWORK CANVAS ──────────────────────────────────── */
function PolyNetBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 40;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      const MAX_DIST = 180;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${0.1 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.4)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />;
}

/* ─── CONTACT INFO ITEM ─────────────────────────────────────────────────── */
function ContactCard({ icon: Icon, label, value, href, theme }) {
  const Card = href ? motion.a : motion.div;
  
  return (
    <Card
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-10 rounded-[2.5rem] border transition-all no-underline overflow-hidden relative group ${
        theme === "dark" 
          ? "bg-slate-900 border-white/5 shadow-2xl shadow-black/40" 
          : "bg-slate-50 border-slate-200 shadow-xl"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
        theme === "dark" ? "bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white" : "bg-white text-cyan-600 border border-slate-200"
      }`}>
        <Icon size={24} />
      </div>
      <div className="mt-8 space-y-2">
         <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</h4>
         <p className={`text-xl font-bold break-all ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{value}</p>
      </div>

      <div className="absolute top-1/2 right-4 translate-y-[-50%] opacity-0 group-hover:opacity-20 group-hover:translate-x-[-10px] transition-all duration-500">
         <Icon size={80} />
      </div>
    </Card>
  );
}

/* ─── FORM FIELD ────────────────────────────────────────────────────────── */
function InputField({ label, name, type, value, onChange, placeholder, isArea, theme }) {
  const InputTag = isArea ? "textarea" : "input";
  return (
    <div className="space-y-4">
      <label className={`text-xs font-black uppercase tracking-widest ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
        {label}
      </label>
      <InputTag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={isArea ? 6 : undefined}
        className={`w-full p-4 rounded-2xl outline-none text-sm transition-all border ${
          theme === "dark" 
            ? "bg-slate-800 border-white/5 text-white focus:ring-2 focus:ring-cyan-500/50" 
            : "bg-white border-slate-200 text-slate-900 focus:ring-2 focus:ring-cyan-600/20 shadow-inner"
        }`}
      />
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────────── */
export default function Contact({ theme }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all orchestration parameters.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email architecture.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("https://su-manth09-signin-signup-page.onrender.com/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Packet received successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Server synchronization failed.");
      }
    } catch {
      toast.error("Network interface error.");
    }
    setLoading(false);
  };

  const bg = theme === "dark" ? "bg-[#0b1120]" : "bg-white";

  return (
    <section id="contact" className={`${bg} py-32 transition-colors duration-500 relative overflow-hidden`}>
      <Toaster position="top-right" />
      <PolyNetBg />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
           <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-widest"
           >
              <Zap size={14} /> Open for Collaboration
           </motion.div>
           <h2 className={`text-4xl md:text-6xl font-black ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
              GET IN <span className="text-cyan-500">TOUCH</span>
           </h2>
           <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-slate-500" : "text-slate-500"}`}>
              Let's synchronize on your next big project. I am available for internships, freelancing, or full-time architectural roles.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           {/* Left Info Columns */}
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
           >
              <ContactCard icon={Mail} label="Packet Gateway" value="sumanthpoojary965@gmail.com" href="mailto:sumanthpoojary965@gmail.com" theme={theme} />
              <ContactCard icon={Phone} label="Direct Interface" value="+91 9113201800" theme={theme} />
              <ContactCard icon={MapPin} label="Base Coordinates" value="Udupi, Karnataka, India" theme={theme} />
           </motion.div>

           {/* Right Form Card */}
           <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
           >
              <form 
                onSubmit={handleSubmit}
                className={`p-10 md:p-16 rounded-[4rem] border ${theme === "dark" ? "bg-slate-900 border-white/5 shadow-2xl" : "bg-slate-50 border-slate-200 shadow-xl"} space-y-12`}
              >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <InputField label="Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Protocol ID" theme={theme} />
                     <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Gateway URL" theme={theme} />
                  </div>
                  <InputField label="Subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="Transmission Type" theme={theme} />
                  <InputField label="Message" name="message" value={formData.message} onChange={handleChange} isArea placeholder="Payload details..." theme={theme} />

                  <motion.button 
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-[2rem] bg-cyan-500 text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
                  >
                    {loading ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                      />
                    ) : (
                      <>Push Transmission <Send size={18} /></>
                    )}
                  </motion.button>
              </form>
           </motion.div>
        </div>

      </div>
    </section>
  );
}