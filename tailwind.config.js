/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- ESSA LINHA É CRUCIAL
  ],
  theme: {
    extend: {
      colors: {
        quintal: {
          dark: '#3E2723',
          main: '#5D4037',
          accent: '#8D6E63',
          light: '#D7CCC8',
          bg: '#F5F5DC',
          alert: '#C62828',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}