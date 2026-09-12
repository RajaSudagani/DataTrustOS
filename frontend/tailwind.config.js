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
        brand: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c0dbff',
          300: '#90c0ff',
          400: '#589bfb',
          500: '#3277f5',
          600: '#1d5ae8',
          700: '#1745d4',
          800: '#1939ac',
          900: '#193387',
          950: '#102052',
        },
        navy: {
          800: '#0f172a',
          900: '#0b0f19',
          950: '#05070d',
        },
        surface: {
          dark: '#111827',
          card: '#1f2937',
          border: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-brand': '0 0 20px rgba(50, 119, 245, 0.25)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.25)',
      }
    },
  },
  plugins: [],
};
