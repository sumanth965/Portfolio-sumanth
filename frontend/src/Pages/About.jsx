import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { sectionFadeUp } from '../utils/motion';
import { GraduationCap, Briefcase, Award, MapPin, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const EDUCATION_ITEMS = [
  {
    id: 'edu-1',
    type: 'Master Degree',
    title: 'Nitte Mahalinga Adyantaya Memorial Institute of Technology (NMAMIT)',
    subtitle: "Master's Degree in Computer Applications (MCA)",
    period: '2025 - Present',
    grade: '8.34 CGPA',
    location: 'Nitte, Karnataka',
    description: "Pursuing MCA with specialization in enterprise Java architectures, advanced data structures & algorithms, MERN stack web applications, and database optimization.",
    skills: ['Java', 'DSA', 'MERN Stack', 'REST APIs', 'SQL'],
    icon: <GraduationCap size={18} className="text-cyan-400" />,
    color: '#22d3ee',
  },
  {
    id: 'edu-2',
    type: 'Bachelor Degree',
    title: 'DR NSAM First Grade College',
    subtitle: "Bachelor's Degree in Computer Applications (BCA)",
    period: '2022 - 2025',
    grade: '9.03 CGPA',
    location: 'Nitte Karkala',
    description: "Completed BCA with high academic distinction (9.03 CGPA). Built foundational strength in computer science, Object-Oriented Programming, web development, and database management systems.",
    skills: ['OOP', 'Web Development', 'DBMS', 'C Programming', 'Software Engineering'],
    icon: <GraduationCap size={18} className="text-amber-400" />,
    color: '#f59e0b',
  },
  {
    id: 'edu-3',
    type: 'Pre-University',
    title: 'DR NSAM First Grade PU College',
    subtitle: 'Pre-University Education (PCMC)',
    period: '2020 - 2022',
    grade: '92%',
    location: 'Nitte, Karnataka',
    description: "Completed Pre-University education in Science with Computer Science as a core subject, gaining solid logical reasoning and foundational programming skills.",
    skills: ['Computer Science', 'Mathematics', 'Physics', 'Problem Solving'],
    icon: <BookOpen size={18} className="text-indigo-400" />,
    color: '#818cf8',
  },
  {
    id: 'edu-4',
    type: 'Secondary School',
    title: 'Gvt. High School Sanoor',
    subtitle: 'Secondary School Leaving Certificate (SSLC)',
    period: '2018 - 2020',
    grade: '85%',
    location: 'Sanoor, Karnataka',
    description: "Completed secondary school education with strong academic performance across mathematics, science, and computer fundamentals.",
    skills: ['Mathematics', 'Science', 'Computer Basics'],
    icon: <BookOpen size={18} className="text-emerald-400" />,
    color: '#10b981',
  },
];

const EXPERIENCE_ITEMS = [
  {
    id: 'exp-1',
    type: 'Full-Stack Internship',
    title: 'Zephyr Technologies and Solutions Pvt. Ltd.',
    subtitle: 'MERN Stack Development Internship',
    period: 'Internship',
    grade: 'MERN Stack',
    location: 'Mangalore, KA',
    description: "Built full-stack MERN applications during an intensive internship. Engineered RESTful APIs, client-side routing, MongoDB schemas, and responsive UI components.",
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    icon: <Briefcase size={18} className="text-cyan-400" />,
    color: '#22d3ee',
  },
  {
    id: 'exp-2',
    type: 'Web Engineering',
    title: 'Zidio Development',
    subtitle: 'Web Development Internship',
    period: 'Internship',
    grade: 'Web Dev',
    location: 'Remote',
    description: "Developed responsive web pages, interactive frontend widgets, API data integration, and user interface components adhering to clean code principles.",
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'UI Components'],
    icon: <Briefcase size={18} className="text-blue-400" />,
    color: '#3b82f6',
  },
  {
    id: 'cert-1',
    type: 'Professional Training',
    title: 'Honeywell (ICT Academy)',
    subtitle: 'Cybersecurity Training & Certification',
    period: 'Certified',
    grade: 'Security',
    location: 'ICT Academy',
    description: "Underwent intensive training in cybersecurity fundamentals, threat detection, network security protocols, and secure coding practices for web applications.",
    skills: ['Cybersecurity', 'Network Security', 'Secure Coding'],
    icon: <Award size={18} className="text-purple-400" />,
    color: '#a855f7',
  },
  {
    id: 'cert-2',
    type: 'Data Science Course',
    title: 'Nitte (Dr. NSAM First Grade College)',
    subtitle: 'Data Analytics & Visualization using Python',
    period: 'Certified',
    grade: 'Python Analytics',
    location: 'Nitte, KA',
    description: "Mastered data cleaning, processing, exploratory analysis, and visualization using Python analytical libraries like Pandas, NumPy, and Matplotlib.",
    skills: ['Python', 'Pandas', 'NumPy', 'Visualization'],
    icon: <Award size={18} className="text-emerald-400" />,
    color: '#10b981',
  },
  {
    id: 'cert-3',
    type: 'Bootcamp',
    title: 'DLite',
    subtitle: 'Coding Bootcamp (C & Problem Solving)',
    period: 'Certified',
    grade: 'C Bootcamp',
    location: 'DLite',
    description: "Completed rigorous training in C language programming logic, pointers, dynamic memory allocation, and algorithmic problem-solving techniques.",
    skills: ['C Language', 'Pointers', 'Data Structures', 'Algorithms'],
    icon: <Award size={18} className="text-amber-400" />,
    color: '#f59e0b',
  },
];

export default function About({ theme }) {
  // Store open state for each item (by default, first of each column is open)
  const [expandedIds, setExpandedIds] = useState({
    'edu-1': true,
    'exp-1': true,
  });

  const toggleItem = (id) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all = {};
    [...EDUCATION_ITEMS, ...EXPERIENCE_ITEMS].forEach(i => all[i.id] = true);
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  return (
    <Motion.section 
      id="about" 
      {...sectionFadeUp} 
      style={{
        minHeight: '100vh',
        padding: '5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes pulse-ring { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.06)} }
        
        .abt-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          box-shadow:
            0 20px 40px -15px rgba(0,0,0,0.5),
            0 4px 12px -2px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.45),
            inset 0 -1px 0 rgba(0,0,0,0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .abt-card:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow:
            0 30px 60px -20px rgba(0,0,0,0.65),
            0 0 25px rgba(34,211,238,0.2),
            inset 0 1px 0 rgba(255,255,255,0.7);
          transform: translateY(-4px);
        }
      `}</style>

      {/* Ambient background blur blobs */}
      <div style={{
        position: 'absolute', top: '12%', left: '4%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle,#22d3ee,transparent)', opacity: .04, filter: 'blur(60px)',
        animation: 'pulse-ring 6s ease-in-out infinite', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '6%', width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle,#a855f7,transparent)', opacity: .04, filter: 'blur(60px)',
        animation: 'pulse-ring 8s ease-in-out infinite', pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1150, margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER & GLOBAL TOGGLES ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: '2.5rem' }}>
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#22d3ee', letterSpacing: '.2em', fontFamily: 'monospace' }}>
                01 // PERSONAL JOURNEY & ACADEMICS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#f1f5f9', margin: 0, lineHeight: 1.1, fontFamily: 'monospace' }}>
              About &{' '}
              <span style={{ background: 'linear-gradient(135deg,#3b9eff,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Background
              </span>
            </h2>
          </Motion.div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={expandAll}
              style={{
                background: 'rgba(6,13,26,0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '.12em',
                padding: '6px 14px',
                borderRadius: 20,
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              EXPAND ALL
            </button>
            <button
              onClick={collapseAll}
              style={{
                background: 'rgba(6,13,26,0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '.12em',
                padding: '6px 14px',
                borderRadius: 20,
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              COLLAPSE ALL
            </button>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <Motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            marginBottom: '3rem',
          }}
        >
          {[
            { label: 'Current Degree', value: 'MCA (NMAMIT)', desc: '8.34 CGPA Candidate', color: '#22d3ee', icon: <GraduationCap size={18} /> },
            { label: 'BCA Graduation', value: '9.03 CGPA', desc: 'Distinction Achieved', color: '#f59e0b', icon: <Award size={18} /> },
            { label: 'Experience & Certs', value: '5+ Programs', desc: 'MERN, Web Dev, Security', color: '#a855f7', icon: <Briefcase size={18} /> },
            { label: 'Base Location', value: 'Udupi, KA', desc: 'Open for Roles', color: '#10b981', icon: <MapPin size={18} /> },
          ].map((stat, idx) => (
            <div key={idx} className="abt-card" style={{ borderRadius: 16, padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, letterSpacing: '.12em', fontFamily: 'monospace' }}>
                  {stat.label.toUpperCase()}
                </span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#f8fafc', fontFamily: 'monospace' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: stat.color, fontWeight: 700, marginTop: 4 }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </Motion.div>

        {/* ── DUAL COLUMN TIMELINE GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>

          {/* ── LEFT COLUMN: EDUCATION ── */}
          <div>
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <div 
                style={{
                  padding: 10,
                  borderRadius: 14,
                  background: 'rgba(34,211,238,0.1)',
                  border: '1px solid rgba(34,211,238,0.3)',
                  boxShadow: '0 0 15px rgba(34,211,238,0.15)',
                  color: '#22d3ee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GraduationCap size={22} />
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#22d3ee', letterSpacing: '.15em', fontFamily: 'monospace' }}>
                  ACADEMIC TIMELINE
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc', margin: 0, fontFamily: 'monospace' }}>
                  Education
                </h3>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div 
                style={{
                  position: 'absolute',
                  top: 8,
                  bottom: 8,
                  left: 10,
                  width: 2,
                  background: 'linear-gradient(180deg, #22d3ee 0%, #f59e0b 50%, #10b981 100%)',
                  boxShadow: '0 0 8px rgba(34,211,238,0.4)',
                  borderRadius: 2,
                }} 
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {EDUCATION_ITEMS.map((item, idx) => {
                  const isExpanded = !!expandedIds[item.id];
                  return (
                    <Motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      style={{ position: 'relative' }}
                    >
                      {/* Node Dot */}
                      <div 
                        style={{
                          position: 'absolute',
                          left: -30,
                          top: 22,
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#060d1a',
                          border: `2px solid ${item.color}`,
                          boxShadow: `0 0 10px ${item.color}`,
                          zIndex: 2,
                        }}
                      />

                      {/* Card with Toggle */}
                      <div 
                        className="abt-card cursor-pointer group" 
                        onClick={() => toggleItem(item.id)}
                        style={{ borderRadius: 18, padding: '18px 20px' }}
                      >
                        {/* Header Row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                              <span 
                                style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  letterSpacing: '.12em',
                                  textTransform: 'uppercase',
                                  color: item.color,
                                  fontFamily: 'monospace'
                                }}
                              >
                                {item.type}
                              </span>
                              <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 12 }}>
                                {item.period}
                              </span>
                              <span style={{ fontSize: 10, fontWeight: 800, color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30`, padding: '2px 8px', borderRadius: 12, fontFamily: 'monospace' }}>
                                {item.grade}
                              </span>
                            </div>

                            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0, lineHeight: 1.3 }} className="group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h4>
                            <p style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', margin: '3px 0 0 0' }}>
                              {item.subtitle}
                            </p>
                          </div>

                          {/* Down/Up Arrow Toggle Button */}
                          <button
                            type="button"
                            aria-label="Toggle details"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: isExpanded ? `${item.color}25` : 'rgba(255,255,255,0.06)',
                              border: `1px solid ${isExpanded ? item.color : 'rgba(255,255,255,0.15)'}`,
                              color: isExpanded ? item.color : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              cursor: 'pointer',
                              transition: 'all 0.25s ease',
                            }}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>

                        {/* Collapsible Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <Motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ paddingTop: 14, marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                                  {item.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                  {item.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      style={{
                                        fontSize: 9,
                                        fontWeight: 700,
                                        color: '#cbd5e1',
                                        background: 'rgba(15,23,42,0.6)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        padding: '2px 8px',
                                        borderRadius: 6,
                                      }}
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </Motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: EXPERIENCE & CERTIFICATIONS ── */}
          <div>
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <div 
                style={{
                  padding: 10,
                  borderRadius: 14,
                  background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  boxShadow: '0 0 15px rgba(168,85,247,0.15)',
                  color: '#a855f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Briefcase size={22} />
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#a855f7', letterSpacing: '.15em', fontFamily: 'monospace' }}>
                  CAREER & CREDENTIALS
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc', margin: 0, fontFamily: 'monospace' }}>
                  Experience & Certifications
                </h3>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div 
                style={{
                  position: 'absolute',
                  top: 8,
                  bottom: 8,
                  left: 10,
                  width: 2,
                  background: 'linear-gradient(180deg, #a855f7 0%, #3b82f6 50%, #f59e0b 100%)',
                  boxShadow: '0 0 8px rgba(168,85,247,0.4)',
                  borderRadius: 2,
                }} 
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {EXPERIENCE_ITEMS.map((item, idx) => {
                  const isExpanded = !!expandedIds[item.id];
                  return (
                    <Motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      style={{ position: 'relative' }}
                    >
                      {/* Node Dot */}
                      <div 
                        style={{
                          position: 'absolute',
                          left: -30,
                          top: 22,
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#060d1a',
                          border: `2px solid ${item.color}`,
                          boxShadow: `0 0 10px ${item.color}`,
                          zIndex: 2,
                        }}
                      />

                      {/* Card with Toggle */}
                      <div 
                        className="abt-card cursor-pointer group" 
                        onClick={() => toggleItem(item.id)}
                        style={{ borderRadius: 18, padding: '18px 20px' }}
                      >
                        {/* Header Row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                              <span 
                                style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  letterSpacing: '.12em',
                                  textTransform: 'uppercase',
                                  color: item.color,
                                  fontFamily: 'monospace'
                                }}
                              >
                                {item.type}
                              </span>
                              <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 12 }}>
                                {item.period}
                              </span>
                              <span style={{ fontSize: 10, fontWeight: 800, color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30`, padding: '2px 8px', borderRadius: 12, fontFamily: 'monospace' }}>
                                {item.grade}
                              </span>
                            </div>

                            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0, lineHeight: 1.3 }} className="group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h4>
                            <p style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', margin: '3px 0 0 0' }}>
                              {item.subtitle}
                            </p>
                          </div>

                          {/* Down/Up Arrow Toggle Button */}
                          <button
                            type="button"
                            aria-label="Toggle details"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: isExpanded ? `${item.color}25` : 'rgba(255,255,255,0.06)',
                              border: `1px solid ${isExpanded ? item.color : 'rgba(255,255,255,0.15)'}`,
                              color: isExpanded ? item.color : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              cursor: 'pointer',
                              transition: 'all 0.25s ease',
                            }}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>

                        {/* Collapsible Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <Motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ paddingTop: 14, marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                                  {item.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                  {item.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      style={{
                                        fontSize: 9,
                                        fontWeight: 700,
                                        color: '#cbd5e1',
                                        background: 'rgba(15,23,42,0.6)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        padding: '2px 8px',
                                        borderRadius: 6,
                                      }}
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </Motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>

    </Motion.section>
  );
}
