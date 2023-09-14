/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.js'],
  content:  ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{

      },
      backgroundColor: {
        'section-a': '#3498db', // Blue color for section A
        'section-b': '#e74c3c', // Red color for section B
      },
      translate: {
        '2': '10px',
      },
    },
  },
  plugins: [],
}