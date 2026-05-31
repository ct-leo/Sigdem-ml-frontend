/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "navy-blue": "#163B70",
        "municipal-green": "#7DAA74",
        "golden-sand": "#D4AA45",
        "light-bg": "#F8FAFC",
        "card-bg": "#FFFFFF",
        "border-color": "#E5E7EB",
        "text-primary": "#1F2937",
        "text-secondary": "#6B7280",
      },
    },
  },
  plugins: [],
}
