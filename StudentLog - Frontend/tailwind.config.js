/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#ec4899",
        dark: "#1f2937",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        card: "0 10px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },

  plugins: [],
};