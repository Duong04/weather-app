/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668a',
        'weather-secondary': '#004e71'
      },
    },
    fontFamily: {
      Roboto: ['Roboto, sans-serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
    }
  },
  plugins: [],
}

