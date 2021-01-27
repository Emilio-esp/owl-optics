module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      times: ["Times New Roman", "Times", "serif"],
      arial: ["arial"],
    },
    letterSpacing: {
      widest: "0.15em",
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
