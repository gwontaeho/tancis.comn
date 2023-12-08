/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      blue: "#2c7be5",
      invalid: "#e63757",
      disabled: "#4d5969",

      text: "var(--tancis-text)",
      card: "var(--tancis-card)",
      border: "var(--tancis-border)",
      header: "var(--tancis-header)",
      background: "var(--tancis-background)",
    },
    fontSize: {
      sm: "0.7rem",
      base: "0.75rem",
      lg: "0.9rem",
      xl: "1rem",
      "2xl": "1.2rem",
    },
    extend: {},
  },
  plugins: [],
};
