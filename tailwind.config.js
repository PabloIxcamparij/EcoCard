const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    screens: {
      'xs': '370px',
    },
    
    extend: {
      colors: {
        'custom-green': '#6A994E',
        'custom-green-dark': '#386641',
        'custom-green-light': '#A7C957',
        'custom-red': '#BC4749',
        'custom-white': '#F2E8CF',
        'custom-gray': '#454955',
        'custom-green-light-alternative': '#72B01D',
        'custom-green-dark-alternative': '#3F7D20',
      },

      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },

    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
