import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const contactCards = [
  { icon: Mail, label: 'Email', value: 'sumanthpoojary965@gmail.com', href: 'mailto:sumanthpoojary965@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9113201800', href: 'tel:+919113201800' },
  { icon: MapPin, label: 'Location', value: 'Udupi, Karnataka, India' },
];

function ContactItem(props) {
  const { icon: Icon, label, value, href, theme } = props;

  const content = (
    <div className={`surface-card rounded-[1.75rem] border p-6 transition ${theme === 'dark' ? 'border-white/10 bg-white/5 hover:bg-white/8' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
        <Icon size={20} />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold break-words">{value}</p>
    </div>
  );

  return href ? (
    <a href={href} className="no-underline text-inherit">
      {content}
    </a>
  ) : (
    content
  );
}

export default function Contact({ theme }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error('Please complete all fields before sending your message.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('https://su-manth09-signin-signup-page.onrender.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Request failed');

      toast.success('Thanks for reaching out. Your message has been sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Unable to send the message right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell px-6 py-24">
      <Toaster position="top-right" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.48fr_0.52fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-500">Contact</p>
          <h2 className={`text-4xl font-semibold sm:text-5xl ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Let&apos;s build something thoughtful and well-crafted.
          </h2>
          <p className={`max-w-xl text-lg leading-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            I&apos;m open to internships, freelance projects, and collaborative product work. Share the context, goals, and timeline,
            and I&apos;ll get back to you.
          </p>

          <div className="grid gap-4">
            {contactCards.map((item) => (
              <ContactItem key={item.label} {...item} theme={theme} />
            ))}
          </div>
        </div>

        <Motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className={`surface-card rounded-[2rem] border p-8 sm:p-10 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/85'}`}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              <span>Name</span>
              <input name="name" value={formData.name} onChange={handleChange} className={`w-full rounded-2xl border px-4 py-3 outline-none ${theme === 'dark' ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`} placeholder="Your name" />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Email</span>
              <input name="email" value={formData.email} onChange={handleChange} className={`w-full rounded-2xl border px-4 py-3 outline-none ${theme === 'dark' ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`} placeholder="your@email.com" />
            </label>
          </div>

          <label className="mt-5 block space-y-2 text-sm font-medium">
            <span>Subject</span>
            <input name="subject" value={formData.subject} onChange={handleChange} className={`w-full rounded-2xl border px-4 py-3 outline-none ${theme === 'dark' ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`} placeholder="Project inquiry" />
          </label>

          <label className="mt-5 block space-y-2 text-sm font-medium">
            <span>Message</span>
            <textarea name="message" rows="6" value={formData.message} onChange={handleChange} className={`w-full rounded-2xl border px-4 py-3 outline-none ${theme === 'dark' ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`} placeholder="Tell me about the role, project, or problem you are solving." />
          </label>

          <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Sending...' : 'Send message'}
            <Send size={16} />
          </button>
        </Motion.form>
      </div>
    </section>
  );
}
