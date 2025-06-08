/** @type {import('tailwindcss').Config} */

const nativewind = require("nativewind/tailwind/preset"); // 🔥 FIXED

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [nativewind],
}

