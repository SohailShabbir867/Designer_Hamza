/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          50: '#141414',
          100: '#1A1A1A',
          200: '#252525',
          300: '#333333',
          400: '#444444',
        },
        accent: {
          DEFAULT: '#FF6600',
          light: '#FF8533',
          lighter: '#FFB366',
          dark: '#E65100',
          glow: 'rgba(255, 102, 0, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', fontWeight: '800' }],
        'section': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.15', fontWeight: '800' }],
        'subtitle': ['clamp(1.1rem, 2.5vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
      },
      keyframes: {
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(20px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,102,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,102,0,0.6)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.02' },
          '50%': { opacity: '0.06' },
        },
        orbitSlow: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
      },
      animation: {
        'scroll-dot': 'scrollDot 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse_glow 2s ease-in-out infinite',
        'grid-pulse': 'gridPulse 6s ease-in-out infinite',
        'orbit-slow': 'orbitSlow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
