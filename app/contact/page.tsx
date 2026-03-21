'use client'

import { useState } from 'react'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SectionHeading from '@/components/SectionHeading'
import { profile } from '@/lib/site-data'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_right,rgba(168,85,247,0.12),transparent_25%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(56,189,248,0.7)_1px,transparent_0)] [background-size:36px_36px]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-10 pt-4">
            <SectionHeading
              eyebrow="Contact"
              title="Get in Touch"
              description="I&apos;m always open to discussing new projects, creative ideas, and opportunities to build meaningful digital products."
            />

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><Mail className="h-6 w-6 text-white" /></div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-xl text-white transition hover:text-cyan-300">{profile.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><MapPin className="h-6 w-6 text-white" /></div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-xl text-white">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4"><Phone className="h-6 w-6 text-white" /></div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-xl text-white transition hover:text-cyan-300">{profile.phone}</a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-semibold text-white">Socials</h3>
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full bg-white p-4 text-slate-900 shadow-[0_0_30px_rgba(125,211,252,0.45)] transition hover:scale-105"><Linkedin className="h-6 w-6" /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full bg-white p-4 text-slate-900 shadow-[0_0_30px_rgba(125,211,252,0.45)] transition hover:scale-105"><Github className="h-6 w-6" /></a>
                <a href={`mailto:${profile.email}`} className="rounded-full bg-white p-4 text-slate-900 shadow-[0_0_30px_rgba(125,211,252,0.45)] transition hover:scale-105"><Mail className="h-6 w-6" /></a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/25 bg-white/10 p-6 shadow-[0_0_70px_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Send a Message</h2>

              {[
                { label: 'Name', name: 'name', type: 'text', placeholder: 'Your Name' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Subject', name: 'subject', type: 'text', placeholder: 'Project Title' },
              ].map((field) => (
                <label key={field.name} className="block space-y-2">
                  <span className="text-lg font-medium text-white">{field.label}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-sky-400/60 bg-[#102038]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                  />
                </label>
              ))}

              <label className="block space-y-2">
                <span className="text-lg font-medium text-white">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  className="w-full rounded-2xl border border-sky-400/60 bg-[#102038]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-[0_0_35px_rgba(14,165,233,0.4)] transition hover:translate-y-[-2px]"
              >
                Send Message
              </button>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  Thanks for your message! I&apos;ll get back to you soon.
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
