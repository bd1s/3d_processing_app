/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        downy: '#65c7bf',
        catskillWhite: '#f3f9f9',
        shipGray: '#39353e',
        strikemaster: '#9a5d94',
        cascade: '#94b0b2',
        eunry: '#cca39b',
        ziggurat: '#bbe0dc',
        muddyWaters: '#b88a66',
        hampton: '#e6ccac',
        swissCoffee: '#d7d2d2',
       'custom-green': '#25cda3', 
       'grenn':'#f0f0f0',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(135deg, #65c7bf, #f3f9f9, #39353e)',
      },
      
    },
  },
  plugins: [],
}
