import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sumanth Poojary | Full Stack Developer',
  description:
    'Full Stack Developer | MERN Specialist - Building scalable web applications with MongoDB, Express, React, and Node.js',
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">{children}</body>
    </html>
  )
}
