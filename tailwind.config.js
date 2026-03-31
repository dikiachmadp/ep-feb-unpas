/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f3f7e8',
          100: '#e4efc8',
          200: '#c9de94',
          300: '#a8c95a',
          400: '#8bb530',
          500: '#567418',
          600: '#4a6414',
          700: '#3c5110',
          800: '#2f400d',
          900: '#1e2a08',
        },
        gold: {
          50:  '#fdf8ec',
          100: '#faefd0',
          200: '#f5dd9f',
          300: '#efc868',
          400: '#e4a930',
          500: '#d4901a',
          600: '#b67614',
          700: '#935e11',
          800: '#6f480e',
          900: '#4a2f09',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(86, 116, 24, 0.12)',
        'card-hover': '0 12px 40px -8px rgba(86, 116, 24, 0.24)',
        'gold': '0 4px 24px -4px rgba(228, 169, 48, 0.3)',
      },
    },
  },
  plugins: [],
}
