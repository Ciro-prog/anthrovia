/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Anthrovia HR Brand Colors
        primary: {
          DEFAULT: '#1A4C40', // Dark teal/green
          light: '#9E5E57', // Rose/coral
          lighter: '#E5B6A8', // Light peach
        },
        accent: {
          burgundy: '#E55E47', // Burgundy/maroon
          rose: '#E5B8A8', // Rose
          pink: '#E55E47', // Pink accent
          teal: '#9E5E57', // Teal
        },
        brand: {
          dark: '#751AD', // Dark burgundy
          medium: '#751A3D', // Medium burgundy
          gradient: {
            start: '#9E5E57',
            middle: '#9E5657',
            end: '#E5B6A8',
          }
        },
        neutral: {
          white: '#FFFFFF',
          offwhite: '#FFFFFFF',
          dark: '#1A4C4',
        }
      },
      fontFamily: {
        // Based on the brand board typography
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
