/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        clip: {
          base: '#0a0a0c',
          bg: '#111114',
          panel: '#16161b',
          'panel-2': '#1c1c22',
          'panel-3': '#24242c',
          border: 'rgba(255,255,255,0.06)',
          'border-2': 'rgba(255,255,255,0.10)',
          'border-3': 'rgba(255,255,255,0.16)',
          fg: '#fafafa',
          'fg-2': '#e4e4e7',
          muted: '#71717a',
          'muted-2': '#a1a1aa',
          accent: '#ff2d6f',
          'accent-2': '#ff6b9d',
          'accent-3': '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
      },
      boxShadow: {
        'accent-sm': '0 4px 16px -4px rgba(255,45,111,0.5)',
        'accent-md': '0 8px 24px -4px rgba(255,45,111,0.6)',
        'accent-glow': '0 0 0 4px rgba(255,45,111,0.08)',
        'card': '0 20px 60px -20px rgba(0,0,0,0.6)',
        'card-hover': '0 24px 48px -12px rgba(0,0,0,0.6)',
        'logo': '0 8px 24px -6px rgba(255,45,111,0.5)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #ff2d6f, #8b5cf6)',
        'accent-gradient-soft': 'linear-gradient(135deg, rgba(255,45,111,0.15), rgba(139,92,246,0.15))',
        'hero-text': 'linear-gradient(135deg, #ff2d6f, #8b5cf6)',
        'card-overlay': 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
        'stats-bg': 'linear-gradient(135deg, rgba(255,45,111,0.04), rgba(139,92,246,0.04))',
        'logo-gradient': 'linear-gradient(135deg, #ff2d6f, #8b5cf6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out backwards',
        'pulse-soft': 'pulseSoft 1.5s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
