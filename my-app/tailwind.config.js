/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#394C8C',
        'primary-light': '#5A70B9',
        'primary-dark': '#1E2E62',
        'secondary': '#4586FF',
        'background': '#EFF5FB',
        'background-light': '#FAFCFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'large': '31px',
        'xl': '33px',
        'xxl': '40px',
        'special': '93px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
} 