/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#15130f', 900: '#1c1a15', 800: '#26231c', 700: '#332e24' },
        steel: { 100: '#eceae4', 300: '#c9c3b4', 500: '#8a8272' },
        rust: { 400: '#f0a53c', 500: '#e08a1f', 600: '#c76f14', 700: '#9c5610' },
      },
      fontFamily: { display: ['var(--font-display)'], body: ['var(--font-body)'] },
    },
  },
  plugins: [],
};
