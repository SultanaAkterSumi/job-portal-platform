
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0d0d1a",
          800: "#1a1a2e",
          700: "#16213e",
          600: "#0f3460",
        },
        brand: {
          500: "#f97316",
          600: "#ea6c0a",
        }
      }
    },
  },
  plugins: [],
}