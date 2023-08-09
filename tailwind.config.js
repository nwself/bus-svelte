/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        theme: {
          50: "#f0f5e1",
          400: "#b4cb6b",
          700: "#50623a",
        },
        yellow: {
          400: "yellow"
        },
        red: {
          400: "#ff0000"
        }
      },
      fontFamily: {
        'sans': ['"Quattrocento Sans"', ...defaultTheme.fontFamily.sans],
        'display': ['Allura', 'cursive'],
      },
    }
  },
  plugins: []
};
