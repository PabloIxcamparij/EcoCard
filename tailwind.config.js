/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-dark': '#386641',
        'custom-green-light': '#A7C957',

      },
    },
  },
  plugins: [],
}
