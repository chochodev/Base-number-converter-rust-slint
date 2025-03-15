import { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    './src/**/*.css',
  ],
  theme: {
    extend: {
      fontSize: {
        "xsm": "0.75rem",
        "md": "0.9375rem",
        "2xl": "1.5rem",
      },
      screens: {
        "xsm": "480px",
        "2xl": "1400px",
        "mdx": "900px",
      },
    },
  },
  darkMode: "class",
};

export default config;