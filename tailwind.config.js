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
        primary: "#3b82f6", // Vibrant blue for accent
        "background-light": "#f8fafc",
        "background-dark": "#0f172a",
        "card-dark": "#1e293b",
        // Paleta 2025: Deep Cobalt + Slate Grey + Spring Mint
        cobalt: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0047AB', // Primary Deep Cobalt
          600: '#003d91',
          700: '#003377',
          800: '#00295d',
          900: '#001f43',
        },
        slate: {
          850: '#1a2332', // Custom intermediate
          950: '#0d1117', // Darker than default
        },
        mint: {
          50: '#edfff5',
          100: '#d5ffe6',
          200: '#aeffce',
          300: '#70ffab',
          400: '#2BFF88', // Spring Mint accent
          500: '#00e676',
          600: '#00c853',
          700: '#00a844',
          800: '#008837',
          900: '#00682a',
        },
        // Accent colors
        accent: {
          lime: '#d3fd01', // Original accent (keeping for compatibility)
          purple: '#8b5cf6',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.025em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s infinite',
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
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px',
        'glow': '0 0 25px -5px',
        'glow-lg': '0 0 50px -12px',
        'inner-glow': 'inset 0 0 20px 0',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
    },
  },
  plugins: [],
}