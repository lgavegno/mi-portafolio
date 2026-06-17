/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2C3340",
        "background-light": "#F1F0E8",
        "background-dark": "#2C3340",
        "card-dark": "#EEE0C9",
        obsidian: "#2C3340",
        cobalt: {
          50: '#F1F0E8',
          100: '#EEE0C9',
          200: '#ADC4CE',
          300: '#96B6C5',
          400: '#7A9EAF',
          500: '#2C3340',
          600: '#263039',
          700: '#202832',
          800: '#1A202A',
          900: '#141820',
        },
        slate: {
          850: '#ADC4CE',
          950: '#96B6C5',
        },
        mint: {
          50: '#F1F0E8',
          100: '#EEE0C9',
          200: '#e0d4b8',
          300: '#ADC4CE',
          400: '#96B6C5',
          500: '#7A9EAF',
          600: '#6B8E9F',
          700: '#5C7E8F',
          800: '#4D6E7F',
          900: '#3E5E6F',
        },
        cyan: {
          institutional: '#96B6C5',
          glow: '#ADC4CE',
          50: '#F1F0E8',
          100: '#EEE0C9',
          200: '#e0d4b8',
          300: '#ADC4CE',
          400: '#96B6C5',
          500: '#7A9EAF',
          600: '#6B8E9F',
          700: '#5C7E8F',
          800: '#4D6E7F',
          900: '#3E5E6F',
        },
        accent: {
          lime: '#ADC4CE',
          purple: '#96B6C5',
          cyan: '#7A9EAF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'tight': '-0.025em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      backdropBlur: { xs: '2px' },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s infinite',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px',
        'glow': '0 0 25px -5px',
        'glow-lg': '0 0 50px -12px',
        'inner-glow': 'inset 0 0 20px 0',
        'cyan-glow': '0 0 20px rgba(150, 182, 197, 0.35)',
        'cyan-glow-lg': '0 0 40px rgba(150, 182, 197, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(238,224,201,0.15) 0%, rgba(238,224,201,0.05) 100%)',
      },
    },
  },
  plugins: [],
}
