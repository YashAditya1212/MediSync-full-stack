/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mint Green Theme
        'primary': '#059669', // Keep as base for darker elements
        'mint-light': '#E0F2F1', // Light Mint
        'mint-main': '#A7F3D0', // Main Mint
        'primary-dark': '#047857',
        'text-main': '#1e293b',
        'text-dark': '#0f172a',
        'secondary': '#10b981', // Emerald-500
        'accent': '#6ee7b7', // Emerald-300
        'background': '#f0fdfa', // Teal-50
        'surface': '#ffffff',
        'text-main': '#1e293b', // Slate-800
        'text-muted': '#64748b', // Slate-500
        // Dark mode colors
        'dark-bg': '#0f172a', // Slate-900
        'dark-surface': '#1e293b', // Slate-800
        'dark-text': '#e2e8f0', // Slate-200 - lighter for better contrast
        'dark-text-muted': '#94a3b8', // Slate-400 - lighter muted text
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'decorative': ['Cormorant Garamond', 'serif'],
        'accent': ['DM Serif Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(5, 150, 105, 0.3)',
      },
    },
  },
  plugins: [],
}
