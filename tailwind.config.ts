import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          rust: '#d45d48',
          orange: '#d94645',
          gold: '#c3a36d',
        },
        neutral: {
          cream: '#FAF9F6',
          'cream-dark': '#F8F6F3',
          gray: '#F5F5F5',
          charcoal: '#333',
          'charcoal-dark': '#202020',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '991px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
