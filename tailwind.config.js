/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'odd-row': '#f2eeeebe', // Custom class for odd rows
        'even-row': '#ffffff',   // Custom class for even rows
      },
    },
  },
  plugins: [],
}
