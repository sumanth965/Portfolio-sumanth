import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sumanth Poojary | Full Stack Developer',
  description: 'Full Stack Developer | MERN Specialist - Building scalable web applications with MongoDB, Express, React, and Node.js',
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  )
}
