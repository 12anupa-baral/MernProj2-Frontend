/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        softPrimary: "#84D187",
        primary: "#00B207",
        hardPrimary: "#2C742F",
        warning: "#FF8A00",
        danger: "#EA4B48",
        white: "#FFFFFF",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
