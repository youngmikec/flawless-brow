import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
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
        "montserrat": ["Montserrat", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
        "style-script": ["Style-Script", "sans-serif"],
        "source-sans": ["Source-Sans", "sans-serif"],
        "source-serif": ["Source-Serif", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
