/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "atelier-paper": "#F9F7F2", // Off-white background
        "atelier-ink": "#1A1A1A", // Primary text
        "atelier-green": "#004225", // British Racing Green accent
        "atelier-tan": "#9E5B32", // Leather/Cognac accent
        "atelier-navy": "#001F3F", // Action/Button color
      },
      fontFamily: {
        // Set Adobe Garamond Pro as the primary serif
        serif: ['"Adobe Garamond Pro"', "serif"],
        sans: ["Inter", "sans-serif"], // For utility text/UI elements
      },
    },
  },
  plugins: [],
};
