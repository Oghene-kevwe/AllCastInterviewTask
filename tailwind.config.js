/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunitoFont: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
