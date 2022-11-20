/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Helvetica Neue"],
    },
    extend: {},
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],
  },
  plugins: [require("tw-elements/dist/plugin")],
}
