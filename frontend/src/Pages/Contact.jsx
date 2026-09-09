import { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const contactCards = [
  {
    icon: '✉',
    label: 'Email',
    value: 'sumanthpoojary965@gmail.com',
    href: 'mailto:sumanthpoojary965@gmail.com'
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+91 9113201800',
    href: 'tel:+919113201800'
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Udupi, Karnataka, India'
  },
];

function ContactItem({ icon, label, value, href }) {
  const content = (
    <div style={{
      background: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      transition: 'all 0.2s',
      cursor: href ? 'pointer' : 'default',
    }}
      onMouseEnter={(e) => {
        if (href) e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)';
      }}
      onMouseLeave={(e) => {
        if (href) e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
      }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#cbd5e1',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>
          {label}
        </p>
        <p style={{
          fontSize: '15px',
          fontWeight: 500,
          color: '#f8fafc',
        }}>
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </a>
  ) : (
    content
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error:Please complete all fields');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error:Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('https://su-manth09-signin-signup-page.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success:Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error:Unable to send message. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <>
      <section id="contact" style={{
        minHeight: '100vh',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 1.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <style>{`
        @keyframes fade-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        @keyframes pulse-ring { 0%, 100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.06); } }
        .contact-input, .contact-textarea {
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 12px 16px;
          color: #f8fafc;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        .contact-input:focus, .contact-textarea:focus {
          border-color: rgba(59, 158, 255, 0.4);
          background: rgba(59, 158, 255, 0.05);
        }
        .contact-input::placeholder, .contact-textarea::placeholder {
          color: #475569;
        }
        .contact-textarea {
          resize: vertical;
          min-height: 140px;
          font-family: inherit;
        }
      `}</style>

        {/* Ambient blobs removed for simplicity */}

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3rem)',
            alignItems: 'start',
          }}>
            {/* Left side */}
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #3b9eff, transparent)' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#3b9eff', letterSpacing: '0.2em' }}>
                  GET IN TOUCH
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 900,
                color: '#f1f5f9',
                margin: '0 0 1rem 0',
                lineHeight: 1.1,
                fontFamily: 'monospace',
              }}>
                Let's{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #3b9eff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Connect
                </span>
              </h2>

              {/* Paragraph removed for a simpler structure */}

              <div style={{
                display: 'grid',
                gap: '1rem',
              }}>
                {contactCards.map((item) => (
                  <ContactItem key={item.label} {...item} />
                ))}
              </div>
            </Motion.div>

            {/* Right side - Form */}
            <Motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '28px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}
            >
              {status && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: status.startsWith('success')
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  color: status.startsWith('success') ? '#22c55e' : '#ef4444',
                  border: `1px solid ${status.startsWith('success') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                }}>
                  {status.split(':')[1]}
                </div>
              )}

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="Your name"
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="your@email.com"
                  />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Subject</span>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="Project inquiry"
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-textarea"
                  placeholder="Tell me about your project or idea..."
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: loading ? '#334155' : '#3b9eff',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = '#3b9eff';
                }}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </Motion.form>
          </div>
        </div>
      </section>
      {/* Glow line */}
      <div className="relative w-full overflow-hidden" style={{ height: '60px' }}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Glow blur layer */}
          <path
            d="M0,14 L350,14 L420,46 L1200,46" fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.5"
          />
          {/* Sharp line on top */}
          <path
            d="M0,14 L350,14 L420,46 L1200,46" fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
