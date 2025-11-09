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
        // Anthrovia HR Brand Colors (from branding.jpeg)
        primary: {
          DEFAULT: '#2E625A', // Dark teal/green
          light: '#B47F75', // Rose/terracota
          lighter: '#C79F93', // Light rose/beige
        },
        accent: {
          burgundy: '#6B2A41', // Burgundy/wine
          rose: '#C79F93', // Rose/beige
          pink: '#B47F75', // Pink/terracota
          teal: '#2E625A', // Teal
        },
        brand: {
          dark: '#6B2A41', // Dark burgundy
          medium: '#B47F75', // Medium rose
          light: '#C79F93', // Light rose
          teal: '#2E625A', // Teal
          gradient: {
            start: '#2E625A',
            middle: '#B47F75',
            end: '#C79F93',
          }
        },
        neutral: {
          white: '#FFFFFF',
          gray: '#8A8A8A',
          dark: '#2E625A',
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
