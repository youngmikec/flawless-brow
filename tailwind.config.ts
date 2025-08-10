import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        primary: '#5A4A3F',
        secondary: '#8D7B68',
        warning: '#F48804',
        textBlue: {
          DEFAULT: '#4763E4',
          light: '#5C73DB',
          dark: '#1E3A8A',
        },
        black: {
          DEFAULT: '#18181B',
          gray: '#070400'
        },
        gray: {
          dark: "#140A00",
          light: "#BFC9C9",
          lightest: "#888888",
          DEFAULT: '#52525B',
        },
        accent: '#10b981',
        danger: '#ef4444',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'style-script': ['Style-Script', 'cursive'],
        'source-sans': ['Source-Sans', 'sans-serif'],
        'source-serif': ['Source-Serif', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
