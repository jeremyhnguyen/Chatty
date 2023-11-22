/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
      colors: {
        "t-black": "rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
