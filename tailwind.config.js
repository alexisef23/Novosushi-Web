/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E63946',
          'red-dark': '#C1121F',
          'red-light': '#FF6B6B',
          black: '#050505',
          'black-soft': '#0D0D0D',
          'black-card': '#111111',
          'black-border': '#1A1A1A',
          white: '#FFFFFF',
          'white-soft': '#F5F5F5',
          'white-muted': '#A0A0A0',
          gold: '#D4AF37',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero/hero-bg.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(230, 57, 70, 0)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(230, 57, 70, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'red-glow': '0 0 30px rgba(230, 57, 70, 0.25)',
        'red-glow-sm': '0 0 12px rgba(230, 57, 70, 0.2)',
        'card': '0 4px 32px rgba(0,0,0,0.6)',
        'card-hover': '0 8px 48px rgba(230, 57, 70, 0.15)',
      },
    },
  },
  plugins: [],
}
