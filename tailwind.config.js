/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // JAVELS brand palette: crimson red + black from the mark,
        // warm gold/tan for the "LIFE · BUSINESS · EDUCATION" tagline.
        navy: {
          900: '#1B1B1B',
          700: '#2E2E2E',
          500: '#4A4A4A',
        },
        paper: {
          DEFAULT: '#FAFAFA',
          dim: '#F0EFEA',
        },
        brass: {
          DEFAULT: '#B4182A',
          light: '#D33648',
        },
        gold: {
          DEFAULT: '#A9782F',
          light: '#C9A15C',
        },
        ink: {
          DEFAULT: '#1E1E1E',
          soft: '#5B5B5B',
        },
        line: '#E0DED5',
        success: '#3E7A4F',
        danger: '#A23B33',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1120px',
      },
    },
  },
  plugins: [],
}
