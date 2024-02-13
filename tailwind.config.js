/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.js'],
  content:  ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'phone': '640px',
      'tablet': '768px',
      'laptop': '1024px',
      'monitor': '1280px',
      'monitorbig': '1536px',
    },
    extend: {
      
      fontFamily: {
        momcake: ['Momcake', 'sans-serif'],
      },
      colors: {
        'lcream':'#b8ada3',
        'lcream1':'#937a52',
        'dcream':'#675c54',
        'dark':'#1c1717',
        'offwhite':'#F5F5F5',
        'white':'#FFFFFF',
        'searchbardown' : '#055578',
        'searchbarup' : '#03334A',
        'queryview' : '#7190A1',
        'white' : '#ECEDED'
      },
      backgroundColor: {
        'section-a': '#3498db', // Blue color for section A
        'section-b': '#e74c3c', // Red color for section B
      },
    },
  },
  plugins: [],
}