/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth:{
      DEFAULT: '0px',
      '1': '1px',
      '2': '2px', 
      '3': '3px'
    },
    extend: {
      fontFamily: {
        'ibm-plex-sans': ['IBMPlexSans', 'sans-serif'],
      },
      fontWeight: {
        light: 200,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        'reddit-orange': 'rgb(252, 71, 30)',
        'user-link-color': 'rgb(55, 120, 204)',
        'comment-body-color':'rgb(245, 248, 252)',
        'comment-bubble-color': 'rgb(136, 138, 140)',
        'reddit-border-orange': 'rgb(252, 71, 30)',
        'reddit-text-orange': 'rgb(252, 71, 30)',
        'panel-border-color': 'rgb(204, 204, 204)',
        'panel-bg-color': 'rgb(255, 255, 255)'
      }
    },
  },
  plugins: [],
}