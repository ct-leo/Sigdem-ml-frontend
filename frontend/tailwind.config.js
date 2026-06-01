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
        // Main colors
        "navy-blue": "#163B70",
        "municipal-green": "#7DAA74",
        "dashboard-green": "#749763",
        "golden-sand": "#D4AA45",
        
        // Backgrounds & Borders
        "light-bg": "#F8FAFC",
        "card-bg": "#FFFFFF",
        "border-color": "#E5E7EB",
        
        // Text
        "text-primary": "#1F2937",
        "text-secondary": "#6B7280",
        
        // States
        "success": "#749763",
        "warning": "#D4AA45",
        "danger": "#DC2626",
        "info": "#163B70",
      },
    },
  },
  plugins: [],
}
