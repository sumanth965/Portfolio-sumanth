import { useState, useRef, useEffect, useCallback } from 'react'

/* ─────────────────── DATA ─────────────────── */
const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Language']

const skills = [
  {
    label: 'React.js', category: 'Frontend', color: '#61dafb', proficiency: 95,
    years: 4, projects: 30, desc: 'Building complex SPAs, custom hooks, performance optimization, and state management with Context & Redux.',
    tags: ['Hooks', 'Redux', 'Next.js', 'SSR'],
    icon: (
      <svg width="34" height="34" viewBox="0 0 128 128"><g fill="#61dafb"><circle cx="64" cy="64" r="11.4" /><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13-1.2-21.2-7.7-21.2-6.2 0-13.5 7-19.6 19.3-2.3-.3-4.7-.5-7.1-.5s-4.8.2-7.1.5C54.3 21.7 46.9 14.7 40.8 14.7c-6.5 0-9.8 8.2-7.7 21.2.5 2.3 1 4.7 1.6 7.1-2.4.7-4.7 1.4-6.9 2.3C12.5 49.3 7 55.3 7 61.8c0 6.5 5.5 12.5 14.3 16.5 2.2.9 4.5 1.7 6.9 2.4-.6 2.4-1.1 4.8-1.5 7.1-2.1 13 1.2 21.2 7.7 21.2 6.2 0 13.5-7 19.6-19.3 2.3.3 4.7.5 7.1.5s4.8-.2 7.1-.5c6.1 12.3 13.5 19.3 19.6 19.3 6.5 0 9.8-8.2 7.7-21.2-.5-2.3-1-4.7-1.5-7.1 2.4-.7 4.7-1.5 6.9-2.4 8.7-4 14.2-10 14.2-16.5.1-6.5-5.4-12.5-14.2-16.6z" /></g></svg>
    ),
  },
  {
    label: 'TypeScript', category: 'Language', color: '#3178c6', proficiency: 75,
    years: 2, projects: 18, desc: 'Type-safe development with generics, decorators, and advanced TypeScript patterns for large-scale apps.',
    tags: ['Generics', 'Types', 'Decorators'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128"><path fill="#3178c6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 0 1 7.82 4.5 20.58 20.58 0 0 1 3 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 0 0-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 0 0 .54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 0 1-9.52-.1 23 23 0 0 1-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.16 9.16 0 0 1 1.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 0 0 4.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 0 0 .69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 0 1-3.43-6.25 25 25 0 0 1-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 0 1 9.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 0 1 .14-5.16c.06-.08 10-.12 22-.1l21.81.06z" /></svg>
    ),
  },
  {
    label: 'JavaScript', category: 'Language', color: '#f7df1e', proficiency: 90,
    years: 5, projects: 40, desc: 'Deep JS expertise: closures, prototypes, async/await, event loop mastery, and ES2023+ features.',
    tags: ['ES2023+', 'Async', 'DOM', 'Closures'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128"><path fill="#f7df1e" d="M1.408 1.408h125.184v125.185H1.408z" /><path d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zm-46.885-37.793H57.766c0 7.43-.012 14.86-.012 22.285 0 4.73.245 9.06-.52 10.403-1.261 2.582-4.51 2.268-5.999 1.81-1.249-.953-1.857-2.25-2.535-4.04-.191-.567-.274-.994-.354-1.094-4.285 2.604-4.285 2.604-8.583 5.169 1.345 2.678 2.689 4.521 4.769 6.026 3.632 2.834 8.977 3.39 14.188 2.213 3.061-.799 5.759-2.439 7.736-5.073 3.69-4.64 3.668-10.7 3.644-17.507.027-6.999 0-13.974 0-21.192z" /></svg>
    ),
  },
  {
    label: 'Node.js', category: 'Backend', color: '#83cd29', proficiency: 88,
    years: 4, projects: 25, desc: 'REST & GraphQL APIs, event-driven architecture, microservices, streams, and cluster management.',
    tags: ['REST', 'GraphQL', 'Streams', 'Cluster'],
    icon: (
      <svg width="34" height="34" viewBox="0 0 128 128"><path fill="#83cd29" d="M112.77 30.334L68.196 4.729c-2.617-1.511-5.88-1.511-8.504 0L15.229 30.334C12.612 31.845 11 34.63 11 37.667v50.666c0 3.037 1.612 5.822 4.229 7.333l44.575 25.605c2.616 1.511 5.888 1.511 8.504 0l44.575-25.605c2.617-1.511 4.229-4.296 4.229-7.333V37.667c-.001-3.037-1.612-5.822-4.341-7.333z" /><path fill="#404137" d="M107.599 93.47L63.028 68.938 18.399 93.47 63 119.133z" /><path fill="#35480c" d="M18.399 34.53L63 59.125l44.599-24.595L63 9.933z" /><path fill="#fff" d="M75.302 64.687c0 1.135-.613 2.195-1.597 2.764L63.003 73.87c-.493.284-1.04.425-1.589.425-.549 0-1.097-.141-1.59-.425L49.122 67.451c-.984-.569-1.597-1.629-1.597-2.764V51.42c0-1.134.613-2.195 1.597-2.764l10.702-6.417c.493-.284 1.04-.425 1.59-.425.548 0 1.096.141 1.589.425l10.702 6.417c.984.568 1.597 1.629 1.597 2.764v13.267z" /></svg>
    ),
  },
  {
    label: 'Express.js', category: 'Backend', color: '#eeeeee', proficiency: 85,
    years: 4, projects: 22, desc: 'Middleware architecture, routing, authentication flows, rate limiting, and production-hardened APIs.',
    tags: ['Middleware', 'Auth', 'Rate Limit', 'JWT'],
    icon: (
      <svg width="34" height="22" viewBox="0 0 128 82"><path fill="#fff" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45-6.23 8.51-12.34 16.63-18.33 24.85-2.61 3.58-5.23 5-9.73 3.57l26.38-35.81L69.67 33.32c4.43-1.05 7.21-.38 9.87 3.5 5.77 8.23 12 16.1 18.38 24.05L116.25 33c4.55-1.13 7.36-.4 9.8 3.6L100.67 68.79zM1.33 61.74c.72-3.51 1.28-7.08 2.19-10.54C9.56 32.55 27.37 22.01 47.3 26.72c15.05 3.51 24.39 16.94 24.1 34.02H9.38c-.15 16.99 11.11 27.2 28 24.89 6.52-.9 11.85-4.08 15.23-10.06 1.71-3.01 3.97-4.38 7.43-3.71-1.06 5.92-4.48 10.24-8.94 13.68-10.43 8.01-26.84 8.15-37.56.6C6.53 80.24 2.81 71.74 1.48 62.54c-.06-.45-.24-.88-.36-1.32zm8.23-5.11h46.88c-.33-13.34-9.01-22.67-22-22.47-13.81.2-24.01 9.78-24.88 22.47z" /></svg>
    ),
  },
  {
    label: 'Python', category: 'Language', color: '#ffd43b', proficiency: 80,
    years: 3, projects: 15, desc: 'Scripting, data processing, ML pipelines with scikit-learn, FastAPI backends, and automation workflows.',
    tags: ['FastAPI', 'ML', 'Pandas', 'Automation'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 128 128"><path fill="#3572a5" d="M49.33 62h29.17c8.2 0 9.99-4.007 9.99-8v-10.013c0-7.993-6.76-7.987-9.99-7.987h-29.17c-8.2 0-9.33-4.007-9.33-8V18c0-7.993 4.83-8 10-8h46.67C105.5 10 108 14 108 18v46c0 3.993-4 8-9.99 8H49.33z" /><path fill="#ffd43b" d="M78.67 66H49.5C41.3 66 39.5 70.007 39.5 74v10.013c0 7.993 6.76 7.987 9.99 7.987h29.17c8.2 0 9.34 4.007 9.34 8V110c0 7.993-4.84 8-10 8H31.33C22.5 118 20 114 20 110V64c0-3.993 4-8 9.99-8h48.68z" /><circle cx="63.5" cy="22.5" r="4.5" fill="#ffd43b" /><circle cx="64.5" cy="105.5" r="4.5" fill="#3572a5" /></svg>
    ),
  },
  {
    label: 'MongoDB', category: 'Database', color: '#13aa52', proficiency: 83,
    years: 3, projects: 20, desc: 'Schema design, aggregation pipelines, indexing strategies, transactions, and Mongoose ODM patterns.',
    tags: ['Aggregation', 'Indexes', 'Atlas', 'Mongoose'],
    icon: (
      <svg width="30" height="34" viewBox="0 0 128 128"><path fill="#589636" d="M89.58 22.673c-5.761-6.678-10.29-13.749-11.073-23.107-.078-.881-.169-1.763-.259-2.644L64 0l.015.003C50.856 17.156 44.3 36.29 48.038 57.89c2.063 11.799 7.638 21.738 15.647 30.158.985.998 2.049 1.881 3.11 2.871.519 2.356.921 4.693 1.094 6.958.099.894.169 1.788.228 2.682.007.078.023.214.023.214L69.3 101 64 128l14.157-10.079c.26-.099.26-.214.26-.338 1.222-14.19 6.659-26.888 12.861-38.876 7.44-14.472 10.23-29.838 7.15-45.833-1.173-6.142-3.61-11.75-8.843-17.171" /></svg>
    ),
  },
  {
    label: 'AWS', category: 'Cloud', color: '#ff9900', proficiency: 72,
    years: 2, projects: 12, desc: 'EC2, S3, Lambda serverless, RDS, CloudFront CDN, IAM policies, and CI/CD with CodePipeline.',
    tags: ['Lambda', 'S3', 'EC2', 'CloudFront'],
    icon: (
      <svg width="38" height="24" viewBox="0 0 128 80"><path fill="#f90" d="M40.7 52.3c0 1.7.2 3.1.5 4 .4.9.9 1.9 1.6 3 .3.4.4.8.4 1.1 0 .5-.3 1-.9 1.5l-3 2c-.4.3-.8.4-1.2.4-.5 0-1-.2-1.4-.6-1-1.1-1.9-2.3-2.6-3.5-1.5 1.8-3.4 3.3-5.8 4.3-1.6.7-3.4 1.1-5.4 1.1-3.2 0-5.7-.9-7.5-2.7-1.8-1.8-2.7-4.2-2.7-7.2 0-3.2 1.1-5.8 3.4-7.7 2.3-1.9 5.3-2.9 9.2-2.9 1.3 0 2.6.1 4 .3 1.4.2 2.8.5 4.3.9v-2.7c0-2.8-.6-4.8-1.7-6-1.2-1.2-3.1-1.8-5.9-1.8-1.3 0-2.6.2-3.9.5-1.4.4-2.7.9-4 1.5l-1 .3c-.2 0-.4.1-.5.1-.5 0-.7-.3-.7-1v-1.6c0-.5.1-.9.3-1.1.2-.2.6-.4 1.1-.6 1.3-.7 2.9-1.2 4.7-1.6 1.8-.4 3.8-.6 5.8-.6 4.4 0 7.6 1 9.6 3s3 5 3 9.1v12zm-11.9 4.5c1.2 0 2.5-.2 3.8-.7 1.3-.5 2.5-1.3 3.4-2.5.6-.7.9-1.4 1.1-2.3.2-.8.3-1.8.3-3v-1.5c-1.1-.3-2.3-.5-3.5-.6-1.2-.1-2.3-.2-3.5-.2-2.5 0-4.4.5-5.6 1.5-1.2 1-1.8 2.4-1.8 4.3 0 1.7.4 3 1.3 3.9.9.8 2.1 1.1 4.5 1.1zm30.2 4c-.6 0-1-.1-1.3-.4-.3-.3-.5-.7-.7-1.4L50.9 30c-.1-.4-.2-.8-.2-1 0-.4.2-.6.6-.6h2.5c.6 0 1.1.1 1.3.4.2.3.4.7.6 1.4l4.8 18.9 4.5-18.9c.1-.7.3-1.1.6-1.4.3-.3.8-.4 1.4-.4h2c.7 0 1.1.1 1.4.4.3.3.5.7.6 1.4l4.5 19.1 4.9-19.1c.1-.7.4-1.1.6-1.4.3-.3.7-.4 1.3-.4h2.4c.4 0 .7.2.7.6 0 .1 0 .3-.1.5l-.2.5-7.2 25.8c-.1.7-.4 1.1-.7 1.4-.3.3-.7.4-1.3.4h-2.2c-.7 0-1.1-.1-1.4-.4-.3-.3-.5-.7-.6-1.4l-4.5-18.6-4.4 18.6c-.1.7-.4 1.1-.6 1.4-.3.3-.8.4-1.4.4h-2.2zm38.3.8c-1.3 0-2.7-.2-4-.5-1.3-.3-2.3-.7-3-1.1-.4-.2-.7-.5-.8-.9-.1-.3-.1-.6-.1-.8v-2c0-.8.3-1.2.8-1.2.2 0 .4 0 .6.1l.6.3c.8.4 1.7.6 2.6.8.9.2 1.9.3 2.9.3 1.5 0 2.7-.3 3.5-.8.8-.5 1.3-1.3 1.3-2.3 0-.7-.2-1.2-.6-1.7-.4-.5-1.3-.9-2.5-1.3l-3.5-1.1c-1.8-.6-3.1-1.4-3.9-2.5-.8-1.1-1.2-2.3-1.2-3.6 0-1 .2-1.9.7-2.7.5-.8 1.1-1.5 1.9-2 .8-.6 1.7-1 2.8-1.3 1.1-.3 2.2-.4 3.4-.4.6 0 1.2 0 1.8.1.6.1 1.2.2 1.8.3.5.1 1 .3 1.5.5.5.2.9.4 1.2.6.4.2.7.5.8.8.2.3.2.6.2 1v1.8c0 .8-.3 1.2-.8 1.2-.3 0-.7-.1-1.2-.4-1.6-.7-3.5-1.1-5.5-1.1-1.4 0-2.5.2-3.2.7-.8.5-1.1 1.2-1.1 2.2 0 .7.2 1.3.7 1.8.5.5 1.4.9 2.8 1.3l3.4 1.1c1.8.6 3.1 1.3 3.9 2.3.8 1 1.1 2.2 1.1 3.5 0 1.1-.2 2-.7 2.9-.5.9-1.1 1.6-1.9 2.2-.8.6-1.8 1.1-2.9 1.4-1.1.3-2.3.5-3.6.5z" /></svg>
    ),
  },
  {
    label: 'Java', category: 'Language', color: '#f58219', proficiency: 78,
    years: 3, projects: 10, desc: 'OOP design patterns, Spring Boot microservices, JUnit testing, and multithreading with Java concurrency.',
    tags: ['Spring Boot', 'OOP', 'JUnit', 'Maven'],
    icon: (
      <svg width="30" height="30" viewBox="0 0 128 128"><path fill="#ea2d2e" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969" /><path fill="#ea2d2e" d="M44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336" /><path fill="#ea2d2e" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.187" /><path fill="#f58219" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468" /><path fill="#f58219" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587" /><path fill="#ea2d2e" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331" /></svg>
    ),
  },
  {
    label: 'MERN Stack', category: 'Frontend', color: '#a855f7', proficiency: 92,
    years: 4, projects: 28, desc: 'End-to-end full-stack development: MongoDB, Express, React, Node with JWT auth and deployment pipelines.',
    tags: ['Full-Stack', 'JWT', 'REST', 'Deploy'],
    icon: (
      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', lineHeight: 1.1, textAlign: 'center', display: 'block' }}>
        <span style={{ color: '#3b9eff' }}>ME</span><br />
        <span style={{ color: '#a855f7' }}>RN</span>
      </span>
    ),
  },
]

/* ─────────────────── RADAR CHART ─────────────────── */
function RadarChart({ skills: skillList }) {
  const cx = 160, cy = 160, r = 120
  const N = skillList.length
  const points = skillList.map((sk, i) => {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2
    return {
      x: cx + Math.cos(angle) * r * (sk.proficiency / 100),
      y: cy + Math.sin(angle) * r * (sk.proficiency / 100),
      lx: cx + Math.cos(angle) * (r + 28),
      ly: cy + Math.sin(angle) * (r + 28),
      label: sk.label,
      color: sk.color,
      proficiency: sk.proficiency,
    }
  })
  const levels = [0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox="0 0 320 320" style={{ width: '100%', maxWidth: 320, margin: '0 auto', display: 'block' }}>
      <defs>
        <radialGradient id="radarGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3b9eff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      {/* grid rings */}
      {levels.map((lvl, li) => {
        const ring = skillList.map((_, i) => {
          const angle = (Math.PI * 2 * i) / N - Math.PI / 2
          return `${cx + Math.cos(angle) * r * lvl},${cy + Math.sin(angle) * r * lvl}`
        }).join(' ')
        return (
          <polygon key={li} points={ring}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        )
      })}
      {/* spokes */}
      {skillList.map((_, i) => {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(angle) * r}
            y2={cy + Math.sin(angle) * r}
            stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        )
      })}
      {/* data polygon */}
      <polygon
        points={points.map(p => `${p.x},${p.y}`).join(' ')}
        fill="url(#radarGrad)"
        stroke="rgba(59,158,255,0.6)"
        strokeWidth="1.5"
      />
      {/* dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4}
          fill={p.color} stroke="#0a0f1e" strokeWidth="1.5" />
      ))}
      {/* labels */}
      {points.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fontWeight="700" fill={p.color}
          style={{ fontFamily: 'monospace' }}>
          {p.label.split('.')[0]}
        </text>
      ))}
    </svg>
  )
}

/* ─────────────────── TILT CARD ─────────────────── */
function TiltCard({ children, style, className, onMouseEnter, onMouseLeave, onClick }) {
  const ref = useRef(null)
  const animRef = useRef(null)
  const state = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, scale: 1 })

  const lerp = (a, b, t) => a + (b - a) * t

  const animate = useCallback(() => {
    const s = state.current
    if (!ref.current) return
    ref.current.style.transform =
      `perspective(800px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(${s.scale})`
    ref.current.style.setProperty('--gx', `${s.gx}%`)
    ref.current.style.setProperty('--gy', `${s.gy}%`)
    animRef.current = requestAnimationFrame(animate)
  }, [])

  const handleMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    state.current.ry = lerp(state.current.ry, (x - 0.5) * 18, 0.12)
    state.current.rx = lerp(state.current.rx, -(y - 0.5) * 18, 0.12)
    state.current.gx = lerp(state.current.gx, x * 100, 0.12)
    state.current.gy = lerp(state.current.gy, y * 100, 0.12)
  }, [])

  const handleEnter = useCallback(() => {
    state.current.scale = 1.04
    animRef.current = requestAnimationFrame(animate)
    onMouseEnter?.()
  }, [animate, onMouseEnter])

  const handleLeave = useCallback(() => {
    state.current.scale = 1
    state.current.rx = 0
    state.current.ry = 0
    state.current.gx = 50
    state.current.gy = 50
    onMouseLeave?.()
  }, [onMouseLeave])

  useEffect(() => () => cancelAnimationFrame(animRef.current), [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, willChange: 'transform', cursor: 'pointer' }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

/* ─────────────────── DETAIL PANEL ─────────────────── */
function DetailPanel({ skill, onClose }) {
  const [barWidth, setBarWidth] = useState(0)
  useEffect(() => {
    if (!skill) return
    setBarWidth(0)
    const t = setTimeout(() => setBarWidth(skill.proficiency), 80)
    return () => clearTimeout(t)
  }, [skill])

  if (!skill) return null

  const level =
    skill.proficiency >= 90 ? 'Expert' :
    skill.proficiency >= 80 ? 'Advanced' :
    skill.proficiency >= 70 ? 'Proficient' : 'Intermediate'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
      padding: '0',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 420,
          height: '100%',
          background: 'linear-gradient(160deg, #0d1424 0%, #080e1c 100%)',
          borderLeft: `1px solid ${skill.color}30`,
          padding: '2rem',
          overflowY: 'auto',
          animation: 'slideIn 0.35s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          alignSelf: 'flex-end', background: 'rgba(255,255,255,0.06)',
          border: 'none', color: '#64748b', borderRadius: '8px',
          padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
          letterSpacing: '0.1em',
        }}>ESC ✕</button>

        {/* Icon + Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '20px',
            background: `${skill.color}15`,
            border: `1px solid ${skill.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 30px ${skill.color}20`,
          }}>
            {skill.icon}
          </div>
          <div>
            <h3 style={{ color: '#f1f5f9', margin: 0, fontSize: '1.5rem', fontWeight: 800, fontFamily: 'monospace' }}>
              {skill.label}
            </h3>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                borderRadius: '20px', background: `${skill.color}20`,
                color: skill.color, border: `1px solid ${skill.color}40`,
                letterSpacing: '0.08em',
              }}>{skill.category.toUpperCase()}</span>
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                borderRadius: '20px', background: 'rgba(255,255,255,0.05)',
                color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)',
              }}>{level}</span>
            </div>
          </div>
        </div>

        {/* Proficiency */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.15em' }}>PROFICIENCY</span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: skill.color }}>{skill.proficiency}%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '6px',
              width: `${barWidth}%`,
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: `0 0 12px ${skill.color}88`,
              transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
            }} />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { label: 'Years Exp.', value: `${skill.years}+` },
            { label: 'Projects', value: `${skill.projects}+` },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: '14px', padding: '1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: skill.color, fontFamily: 'monospace' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '10px', color: '#475569', fontWeight: 700, marginTop: '2px', letterSpacing: '0.1em' }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${skill.color}20`,
          borderRadius: '14px', padding: '1.2rem',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: skill.color, letterSpacing: '0.15em', marginBottom: '8px' }}>
            ABOUT
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
            {skill.desc}
          </p>
        </div>

        {/* Tags */}
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.15em', marginBottom: '10px' }}>
            KEY AREAS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skill.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '11px', fontWeight: 700,
                padding: '5px 12px', borderRadius: '20px',
                background: `${skill.color}15`,
                border: `1px solid ${skill.color}35`,
                color: skill.color,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid') // 'grid' | 'list' | 'radar'
  const [selected, setSelected] = useState(null)
  const [sortBy, setSortBy] = useState('proficiency') // 'proficiency' | 'name' | 'years'

  const filtered = skills
    .filter(sk =>
      (activeCategory === 'All' || sk.category === activeCategory) &&
      sk.label.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => sortBy === 'name' ? a.label.localeCompare(b.label)
      : sortBy === 'years' ? b.years - a.years
      : b.proficiency - a.proficiency)

  const avgProf = Math.round(skills.reduce((s, sk) => s + sk.proficiency, 0) / skills.length)
  const topSkill = [...skills].sort((a, b) => b.proficiency - a.proficiency)[0]

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg,#060c19 0%,#070d1b 100%)',
      padding: '4rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{`
        @keyframes fade-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:none}}
        @keyframes pulse-ring{0%,100%{opacity:0.15;transform:scale(1)}50%{opacity:0.3;transform:scale(1.06)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .sk-card{
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.07);
          transition:border-color .25s,box-shadow .25s;
        }
        .sk-card:hover{border-color:rgba(255,255,255,0.15);}
        .cat-btn{
          border:1px solid rgba(255,255,255,0.08);
          background:transparent;
          color:#64748b;
          font-size:11px;font-weight:700;letter-spacing:.12em;
          padding:7px 16px;border-radius:20px;cursor:pointer;
          transition:all .2s;
        }
        .cat-btn.active{color:#fff;background:rgba(59,158,255,0.15);border-color:rgba(59,158,255,0.4);}
        .cat-btn:hover:not(.active){color:#94a3b8;background:rgba(255,255,255,0.04);}
        .view-btn{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#64748b;font-size:15px;
          width:36px;height:36px;border-radius:10px;cursor:pointer;
          transition:all .2s;display:flex;align-items:center;justify-content:center;
        }
        .view-btn.active{background:rgba(59,158,255,0.12);border-color:rgba(59,158,255,0.4);color:#3b9eff;}
        .sort-select{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#94a3b8;font-size:11px;font-weight:700;
          padding:7px 12px;border-radius:10px;cursor:pointer;outline:none;
          letter-spacing:.08em;
        }
        .search-input{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#e2e8f0;font-size:13px;font-weight:500;
          padding:9px 14px 9px 36px;border-radius:12px;outline:none;
          width:200px;transition:border-color .2s;
        }
        .search-input:focus{border-color:rgba(59,158,255,0.4);}
        .search-input::placeholder{color:#334155;}
        .marquee-track{display:flex;width:max-content;animation:marquee 28s linear infinite;}
        .prog-ring{transition:stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1);}
      `}</style>

      {/* Ambient blobs */}
      <div style={{ position:'absolute',top:'10%',left:'5%',width:400,height:400,borderRadius:'50%',
        background:'radial-gradient(circle,#3b9eff,transparent)',opacity:.04,filter:'blur(60px)',
        animation:'pulse-ring 6s ease-in-out infinite',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'15%',right:'8%',width:350,height:350,borderRadius:'50%',
        background:'radial-gradient(circle,#a855f7,transparent)',opacity:.04,filter:'blur(60px)',
        animation:'pulse-ring 8s ease-in-out infinite',pointerEvents:'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: '2.5rem', animation: 'fade-up .7s ease both' }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:8 }}>
            <div style={{ width:32,height:2,background:'linear-gradient(90deg,#3b9eff,transparent)' }} />
            <span style={{ fontSize:11,fontWeight:800,color:'#3b9eff',letterSpacing:'.2em' }}>TECH STACK</span>
          </div>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)',fontWeight:900,color:'#f1f5f9',margin:0,lineHeight:1.1,fontFamily:'monospace' }}>
            Skills &{' '}
            <span style={{ background:'linear-gradient(135deg,#3b9eff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
              Expertise
            </span>
          </h2>
          <p style={{ color:'#475569',fontSize:14,marginTop:8,maxWidth:480 }}>
            Technologies I use to build performant, scalable full-stack applications.
          </p>
        </div>

        {/* ── STATS STRIP ── */}
        <div style={{
          display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',
          gap:12, marginBottom:'2rem',
          animation:'fade-up .7s ease .1s both',
        }}>
          {[
            { label:'Technologies',value:`${skills.length}+`,color:'#3b9eff' },
            { label:'Avg Proficiency',value:`${avgProf}%`,color:'#a855f7' },
            { label:'Top Skill',value:topSkill.label,color:'#13aa52' },
            { label:'Years Coding',value:'5+',color:'#f7df1e' },
          ].map(stat => (
            <div key={stat.label} className="sk-card" style={{ borderRadius:16,padding:'14px 18px' }}>
              <div style={{ fontSize:'1.4rem',fontWeight:900,color:stat.color,fontFamily:'monospace' }}>{stat.value}</div>
              <div style={{ fontSize:10,color:'#475569',fontWeight:700,letterSpacing:'.12em',marginTop:2 }}>{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* ── CONTROLS ── */}
        <div style={{
          display:'flex',flexWrap:'wrap',gap:12,alignItems:'center',
          marginBottom:'2rem', animation:'fade-up .7s ease .15s both',
        }}>
          {/* Search */}
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#334155',fontSize:14,pointerEvents:'none' }}>⌕</span>
            <input
              className="search-input"
              placeholder="Search skills..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          {/* Category pills */}
          <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="proficiency">SORT: PROFICIENCY</option>
            <option value="name">SORT: NAME</option>
            <option value="years">SORT: EXPERIENCE</option>
          </select>

          {/* View toggle */}
          <div style={{ display:'flex',gap:4,marginLeft:'auto' }}>
            {[
              { id:'grid', icon:'⊞' },
              { id:'list', icon:'☰' },
              { id:'radar', icon:'◎' },
            ].map(v => (
              <button key={v.id} className={`view-btn ${view === v.id ? 'active' : ''}`}
                onClick={() => setView(v.id)} title={v.id}>
                {v.icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID VIEW ── */}
        {view === 'grid' && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',
            gap:14,
          }}>
            {filtered.map((sk, i) => (
              <TiltCard
                key={sk.label}
                className="sk-card"
                onClick={() => setSelected(sk)}
                style={{
                  borderRadius:20,padding:'1.2rem 1rem',
                  display:'flex',flexDirection:'column',alignItems:'center',gap:12,
                  animation:`fade-up .5s ease ${i * 0.05}s both`,
                }}
              >
                {/* shimmer glare from tilt */}
                <div style={{
                  position:'absolute',inset:0,borderRadius:20,pointerEvents:'none',
                  background:'radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.05) 0%, transparent 60%)',
                }} />

                {/* category dot */}
                <div style={{
                  alignSelf:'flex-end',width:6,height:6,borderRadius:'50%',
                  background:sk.color,boxShadow:`0 0 8px ${sk.color}`,marginBottom:-6,
                }} />

                {/* icon */}
                <div style={{
                  width:64,height:64,borderRadius:18,
                  background:`${sk.color}12`,border:`1px solid ${sk.color}30`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  boxShadow:`0 0 24px ${sk.color}18`,
                  transition:'box-shadow .3s',
                }}>
                  {sk.icon}
                </div>

                {/* label */}
                <span style={{ fontSize:12,fontWeight:800,color:'#94a3b8',textAlign:'center',fontFamily:'monospace' }}>
                  {sk.label}
                </span>

                {/* SVG ring */}
                <svg width="56" height="56" viewBox="0 0 56 56" style={{ position:'absolute',opacity:0.7 }}>
                  <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke={sk.color}
                    strokeWidth="3" strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - sk.proficiency / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 28 28)"
                    style={{ transition:'stroke-dashoffset 1s ease', filter:`drop-shadow(0 0 4px ${sk.color})` }}
                  />
                </svg>

                {/* proficiency bar */}
                <div style={{ width:'100%',height:3,background:'rgba(255,255,255,0.06)',borderRadius:3,overflow:'hidden' }}>
                  <div style={{
                    height:'100%',borderRadius:3,
                    width:`${sk.proficiency}%`,
                    background:`linear-gradient(90deg,${sk.color},${sk.color}88)`,
                    boxShadow:`0 0 8px ${sk.color}88`,
                  }} />
                </div>

                <span style={{ fontSize:10,color:'#475569',fontWeight:700 }}>
                  {sk.proficiency}% · {sk.years}yr
                </span>
              </TiltCard>
            ))}
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {view === 'list' && (
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {filtered.map((sk, i) => (
              <div
                key={sk.label}
                className="sk-card"
                onClick={() => setSelected(sk)}
                style={{
                  borderRadius:16,padding:'1rem 1.4rem',
                  display:'flex',alignItems:'center',gap:'1.2rem',
                  cursor:'pointer',
                  animation:`fade-up .4s ease ${i * 0.04}s both`,
                  transition:'all .25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${sk.color}40`
                  e.currentTarget.style.background = `${sk.color}08`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div style={{
                  width:48,height:48,borderRadius:14,flexShrink:0,
                  background:`${sk.color}12`,border:`1px solid ${sk.color}30`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                }}>
                  {sk.icon}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
                    <span style={{ fontWeight:800,color:'#e2e8f0',fontSize:14,fontFamily:'monospace' }}>{sk.label}</span>
                    <span style={{
                      fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:20,
                      background:`${sk.color}18`,color:sk.color,border:`1px solid ${sk.color}35`,
                      letterSpacing:'.08em',
                    }}>{sk.category}</span>
                  </div>
                  <div style={{ height:5,background:'rgba(255,255,255,0.05)',borderRadius:5,overflow:'hidden' }}>
                    <div style={{
                      height:'100%',borderRadius:5,
                      width:`${sk.proficiency}%`,
                      background:`linear-gradient(90deg,${sk.color},${sk.color}80)`,
                      boxShadow:`0 0 8px ${sk.color}60`,
                    }} />
                  </div>
                </div>
                <div style={{ textAlign:'right',flexShrink:0 }}>
                  <div style={{ fontSize:'1.1rem',fontWeight:900,color:sk.color,fontFamily:'monospace' }}>{sk.proficiency}%</div>
                  <div style={{ fontSize:10,color:'#475569',fontWeight:600 }}>{sk.years}yr exp</div>
                </div>
                <span style={{ color:'#334155',fontSize:16 }}>›</span>
              </div>
            ))}
          </div>
        )}

        {/* ── RADAR VIEW ── */}
        {view === 'radar' && (
          <div style={{
            display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',
            alignItems:'start',
            animation:'fade-up .5s ease both',
          }}>
            <div className="sk-card" style={{ borderRadius:24,padding:'2rem' }}>
              <div style={{ fontSize:10,fontWeight:700,color:'#64748b',letterSpacing:'.15em',marginBottom:'1.5rem' }}>
                PROFICIENCY RADAR
              </div>
              <RadarChart skills={filtered.slice(0, 8)} />
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {filtered.map((sk, i) => (
                <div key={sk.label} onClick={() => setSelected(sk)}
                  style={{
                    display:'flex',alignItems:'center',gap:12,
                    padding:'10px 14px',borderRadius:12,
                    background:'rgba(255,255,255,0.02)',
                    border:'1px solid rgba(255,255,255,0.06)',
                    cursor:'pointer',transition:'all .2s',
                    animation:`fade-up .4s ease ${i * 0.04}s both`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${sk.color}08`; e.currentTarget.style.borderColor = `${sk.color}30` }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                >
                  <div style={{ width:8,height:8,borderRadius:'50%',background:sk.color,flexShrink:0 }} />
                  <span style={{ color:'#94a3b8',fontSize:12,fontWeight:700,fontFamily:'monospace',minWidth:100 }}>{sk.label}</span>
                  <div style={{ flex:1,height:4,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden' }}>
                    <div style={{
                      height:'100%',borderRadius:4,width:`${sk.proficiency}%`,
                      background:sk.color,transition:'width 1s ease',
                    }} />
                  </div>
                  <span style={{ fontSize:11,fontWeight:800,color:sk.color,fontFamily:'monospace',minWidth:34,textAlign:'right' }}>
                    {sk.proficiency}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {filtered.length === 0 && (
          <div style={{ textAlign:'center',padding:'4rem',color:'#334155' }}>
            <div style={{ fontSize:'3rem',marginBottom:'1rem' }}>⌀</div>
            <div style={{ fontWeight:700 }}>No skills match "{query}"</div>
          </div>
        )}

        {/* ── MARQUEE ── */}
        <div style={{ marginTop:'3rem',overflow:'hidden',position:'relative' }}>
          <div style={{ position:'absolute',left:0,top:0,bottom:0,width:60,zIndex:1,
            background:'linear-gradient(90deg,#070d1b,transparent)',pointerEvents:'none' }} />
          <div style={{ position:'absolute',right:0,top:0,bottom:0,width:60,zIndex:1,
            background:'linear-gradient(-90deg,#070d1b,transparent)',pointerEvents:'none' }} />
          <div className="marquee-track">
            {[...skills,...skills].map((sk,i)=>(
              <div key={i} style={{ display:'flex',alignItems:'center',gap:8,margin:'0 24px',opacity:.25 }}>
                <div style={{ transform:'scale(0.6)',transformOrigin:'center' }}>{sk.icon}</div>
                <span style={{ fontSize:11,fontWeight:800,color:'#64748b',whiteSpace:'nowrap',fontFamily:'monospace' }}>
                  {sk.label}
                </span>
                <span style={{ color:'#1e293b',fontSize:18,marginLeft:8 }}>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DETAIL PANEL ── */}
      {selected && <DetailPanel skill={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}