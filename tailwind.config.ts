import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ebe7df',
          300: '#e1dbcf',
        },
        ink: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
        },
        olive: {
          600: '#6b7456',
          500: '#7d8668',
          400: '#9ba284',
        },
        warm: {
          white: '#fefdfb',
          beige: '#f0ebe3',
        },
        burgundy: {
          700: '#5a3a3a',
          600: '#6d4c4c',
        },
      },
      fontFamily: {
        display: ['Copperplate', 'Copperplate Gothic Light', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.15em',
        editorial: '0.05em',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
export default config
