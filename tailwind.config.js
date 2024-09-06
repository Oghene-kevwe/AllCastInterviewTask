/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexendDeca: ["Lexend Deca", "sans-serif"],
      },
      colors: {
        primaryBlack: "#000000FF",
        purple500: "#6D31EDFF",
      },
    },
  },
  plugins: [],
};
