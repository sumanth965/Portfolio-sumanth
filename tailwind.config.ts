import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        'primary-dark': '#0284C7',
        accent: '#A855F7',
        orange: '#F97316',
      },
      backgroundImage: {
        'gradient-cyan-purple': 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
      },
    },
  },
  plugins: [],
}
export default config
