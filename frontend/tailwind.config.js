/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Medical Color Palette
        'primary': '#059669', // Emerald-600 - Main brand color
        'primary-dark': '#047857', // Emerald-700 - Hover states
        'primary-light': '#10b981', // Emerald-500 - Light accents
        'secondary': '#f97316', // Orange-500 - Accent color
        'secondary-dark': '#ea580c', // Orange-600 - Hover
        'accent': '#06b6d4', // Cyan-500 - Info/highlights
        'success': '#22c55e', // Green-500 - Success states
        'warning': '#fbbf24', // Amber-400 - Warnings
        'danger': '#ef4444', // Red-500 - Errors
        'light-bg': '#f0fdfa', // Teal-50 - Light backgrounds
        'card-bg': '#ffffff', // White cards
        'text-dark': '#0f172a', // Slate-900 - Primary text
        'text-medium': '#475569', // Slate-600 - Secondary text
        'text-light': '#94a3b8', // Slate-400 - Muted text
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}