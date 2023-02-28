/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'lily_white': {  DEFAULT: '#E5F8FF',  50: '#FFFFFF',  100: '#FFFFFF',  200: '#FFFFFF',  300: '#FFFFFF',  400: '#FFFFFF',  500: '#E5F8FF',  600: '#ADE9FF',  700: '#75DAFF',  800: '#3DCBFF',  900: '#05BCFF'},
        },
      },
    },
    variants: {},
    plugins: [],
    corePlugins: {
      preflight: false,
    },
  };
  