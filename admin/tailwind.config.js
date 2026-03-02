/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        primary: '#00d4aa',
        'primary-dim': 'rgba(0,212,170,0.12)',
        'primary-border': 'rgba(0,212,170,0.3)',
        dark: {
          base: '#080d1a',
          card: '#0e1525',
          elevated: '#131d2e',
          hover: '#172136',
          border: 'rgba(255,255,255,0.07)',
        },
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          amber: '#f59e0b',
          red: '#ef4444',
          green: '#10b981',
        },
        ink: {
          bright: '#f1f5f9',
          mid: '#94a3b8',
          dim: '#475569',
        }
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        'glow-teal': '0 0 20px rgba(0,212,170,0.15)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.15)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}