const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultColors,
      google: {
        blue: "#4285f4",
        blue_hover: "#1669f2",
        dark: "#009eeb",
      },
    },
    fontFamily: {
      times: ["Times New Roman", "Times", "serif"],
      arial: ["arial"],
    },
    letterSpacing: {
      widest: "0.15em",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
