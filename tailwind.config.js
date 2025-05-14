/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.razor",
    "./wwwroot/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        urbanblack: "#0a0a0a",
        urbangold: "#FFD700",
      },
    },
  },
  plugins: [],
}

