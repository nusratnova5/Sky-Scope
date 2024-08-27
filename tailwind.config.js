/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4E6E4',   // Beige
        accent: '#AF8260',    // Warm brown
        secondary: '#803D3B', // Deep red-brown
        dark: '#322C2B',      // Dark brown
        gray: '#F1F4F1',      // Light gray
      },
    },
  },
  plugins: [require('daisyui'),],
}

