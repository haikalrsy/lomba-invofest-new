/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        custom: ['Chetta', 'sans-serif'],
      },
      fontFamily: {
        custom: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
