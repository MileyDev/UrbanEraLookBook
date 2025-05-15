// tailwind.config.js
module.exports = {
  content: [
    './**/*.razor',
    './**/*.html',
    './**/*.cshtml',
    './**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        urbangold: '#FFD700',
        urbanblack: '#0a0a0a',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}

