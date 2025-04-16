/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9AA00",
      },
      dropShadow: {
        'product': '-3px 5px 14px #ffffff',
      },
      boxShadow: {
        'footer': '0 -20px 25px 5px rgb(0 0 0 / 0.1), 0 8px 10px 6px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
};
