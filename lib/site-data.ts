import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Globe,
  Layers,
  MonitorSmartphone,
  Palette,
  Server,
  ShieldCheck,
} from 'lucide-react'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
] as const

export const profile = {
  name: 'Sumanth',
  fullName: 'Sumanth Poojary',
  title: 'Full Stack Developer',
  subtitle: 'MERN Specialist',
  email: 'sumanthpoojary965@example.com',
  phone: '+91 9113201800',
  location: 'Udupi, India',
  intro:
    'I build clean, scalable, and responsive products with a strong focus on modern UI, maintainable architecture, and smooth user experiences.',
  about:
    'I am a full stack developer focused on crafting high-quality digital products with the MERN stack. I enjoy turning ideas into polished interfaces, building robust APIs, and improving codebases with reusable structure and thoughtful design systems.',
} as const

export const skills = [
  { name: 'MERN Stack', icon: Layers, accent: 'from-lime-300 to-emerald-400' },
  { name: 'Python', icon: Code2, accent: 'from-sky-300 to-blue-500' },
  { name: 'Java', icon: Globe, accent: 'from-amber-300 to-orange-500' },
  { name: 'AWS', icon: Cloud, accent: 'from-orange-300 to-yellow-400' },
  { name: 'Node.js', icon: Server, accent: 'from-emerald-300 to-green-500' },
  { name: 'React.js', icon: MonitorSmartphone, accent: 'from-cyan-300 to-sky-500' },
  { name: 'JavaScript', icon: BrainCircuit, accent: 'from-yellow-200 to-amber-400' },
  { name: 'Express', icon: Database, accent: 'from-slate-200 to-slate-400' },
  { name: 'REST APIs', icon: ShieldCheck, accent: 'from-violet-300 to-fuchsia-500' },
  { name: 'UI Systems', icon: Palette, accent: 'from-indigo-300 to-violet-500' },
] as const

export type ProjectCategory = 'All' | 'Frontend' | 'Full Stack'

export const projectCategories: ProjectCategory[] = ['All', 'Frontend', 'Full Stack']

export const projects = [
  {
    title: 'E-commerce Platform',
    description:
      'A modern shopping experience with product discovery, cart workflows, secure checkout, and a scalable admin-ready architecture.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    category: 'Full Stack',
    image: '/profile.jpg',
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Task Management App',
    description:
      'A productivity platform for creating, prioritizing, and tracking tasks with a responsive dashboard and collaborative workflow patterns.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    category: 'Full Stack',
    image: '/profile.jpg',
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Social Media Dashboard',
    description:
      'An analytics-focused interface for monitoring growth, engagement, and content performance with clean data visualization.',
    technologies: ['React', 'Chart UI', 'Tailwind CSS', 'API Integration'],
    category: 'Frontend',
    image: '/profile.jpg',
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Team Workspace Portal',
    description:
      'A business workflow portal with modules for onboarding, reporting, communication, and centralized operations management.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Role-based Access'],
    category: 'Full Stack',
    image: '/profile.jpg',
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Brand Landing Experience',
    description:
      'A polished marketing site with storytelling sections, animated highlights, and conversion-focused visual hierarchy.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'SEO'],
    category: 'Frontend',
    image: '/profile.jpg',
    githubLink: '#',
    liveLink: '#',
  },
  {
    title: 'Developer Dashboard',
    description:
      'A unified dashboard for reviewing key metrics, system health, and project updates across multiple products and services.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    category: 'Frontend',
    image: '/profile.jpg',
    githubLink: '#',
    liveLink: '#',
  },
] as const
