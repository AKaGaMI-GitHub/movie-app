/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white' : '#FAFAFA',
      'dark' : '#0B0B0B',
      'textDark' : '#F5F5F5',
      'bgDark' : '#212326',
      'componentDark' : '#2F3236',
      'yellow' : '#FFC85E',
      'shadow-dark' : '#535353',
      'shadow-light' : '#919191',
      'blue' : '#007AFF',
    },
    extend: {

    },
  },
  plugins: [],
  darkMode: 'class',
}

