/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDD0',
        beige: '#F5F5DC',
        brown: {
          DEFAULT: '#8B4513',
          light: '#A0522D',
          dark: '#5C4033',
        },
        primary: '#8B4513',
      }
    },
  },
  plugins: [],
}
