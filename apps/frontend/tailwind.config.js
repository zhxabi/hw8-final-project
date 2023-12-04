const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", 
              "./src/*.{js,jsx,ts,tsx}",
              "./src/components/*.{js,jsx,ts,tsx}",
              "./index.html"
            ],
  theme: {
    extend: {
    },
  },
  plugins: [],
}
