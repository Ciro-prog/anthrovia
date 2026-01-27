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
          // Anthrovia HR Brand Colors (from datos.md)
          primary: {
            DEFAULT: '#2E625A', // Verde Profundo
            light: '#66B2A1', // Soft Teal
            dark: '#2E625A', // Base
          },
          secondary: {
            DEFAULT: '#C79F93', // Durazno Suave
            light: '#E6C9A8', // Warm Sand
            dark: '#B47F75', // Terracota
          },
          accent: {
            terracotta: '#B47F75',
            wine: '#6B2A41',
            gold: '#D4A74A',
            blue: '#6EA8D8',
            lavender: '#BCA5D6',
          },
          neutral: {
            white: '#FFFFFF',
            cream: '#E9E4DB',
            gray: '#8A8A8A',
          },
          // Legacy support mappings
          brand: {
            dark: '#6B2A41',
            medium: '#B47F75',
            light: '#C79F93',
            teal: '#2E625A',
            gradient: {
                start: '#2E625A',
                middle: '#B47F75',
                end: '#C79F93',
              }
          }
        },
        fontFamily: {
          heading: ['"Playfair Display"', 'serif'],
          body: ['"Lora"', 'serif'],
          cta: ['"Montserrat"', 'sans-serif'],
          sans: ['"Montserrat"', 'ui-sans-serif', 'system-ui'],
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
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
