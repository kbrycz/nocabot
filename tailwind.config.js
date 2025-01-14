/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Next.js 13 app router
    "./src/app/**/*.{js,jsx,ts,tsx}",
    // If you have other pages or components outside app
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
