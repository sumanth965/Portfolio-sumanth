import { useState } from 'react';

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
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: 'clamp(1rem, 3vw, 1.5rem)',
      transition: 'all 0.3s ease',
      cursor: href ? 'pointer' : 'default',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(59, 158, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(59, 158, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        background: 'rgba(59, 158, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '1rem',
      }}>
        {icon}
      </div>
      <p style={{
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.15em',
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        {label}
      </p>
      <p style={{
        fontSize: 'clamp(13px, 2vw, 15px)',
        fontWeight: 600,
        color: '#e2e8f0',
        wordBreak: 'break-word',
      }}>
        {value}
      </p>
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
        background: 'linear-gradient(180deg, #070d1b 0%, #060c19 100%)',
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
          background: rgba(255, 255, 255, 0.04);
          padding: 12px 16px;
          color: #e2e8f0;
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

        {/* Ambient blobs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #3b9eff, transparent)',
          opacity: 0.04,
          filter: 'blur(60px)',
          animation: 'pulse-ring 6s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #a855f7, transparent)',
          opacity: 0.04,
          filter: 'blur(60px)',
          animation: 'pulse-ring 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

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
            <div style={{ animation: 'fade-up 0.7s ease both' }}>
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

              <p style={{
                color: '#94a3b8',
                fontSize: 'clamp(14px, 2vw, 16px)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '500px',
              }}>
                I'm open to internships, freelance projects, and collaborative work.
                Share your ideas, and I'll get back to you soon.
              </p>

              <div style={{
                display: 'grid',
                gap: '1rem',
              }}>
                {contactCards.map((item) => (
                  <ContactItem key={item.label} {...item} />
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '28px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                animation: 'fade-up 0.7s ease 0.2s both',
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
                  borderRadius: '16px',
                  border: 'none',
                  background: loading
                    ? 'rgba(100, 116, 139, 0.5)'
                    : 'linear-gradient(135deg, #3b9eff, #06b6d4)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(59, 158, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 158, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 158, 255, 0.3)';
                  }
                }}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
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
