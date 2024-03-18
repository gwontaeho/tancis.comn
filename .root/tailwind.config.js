/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            black: "black",
            white: "white",

            "uf-gray": "var(--uf-gray)",
            "uf-darkgray": "var(--uf-darkgray)",
            "uf-lightgray": "var(--uf-lightgray)",
            "uf-success": "var(--uf-success)",
            "uf-warning": "var(--uf-warning)",
            "uf-error": "rgb(var(--uf-error) / <alpha-value>)",
            "uf-info": "var(--uf-info)",

            "uf-layout-header": "var(--uf-layout-header)",
            "uf-navigation": "var(--uf-navigation)",
            "uf-main": "var(--uf-main)",
            "uf-sub": "var(--uf-sub)",
            "uf-background": "var(--uf-background)",

            "uf-black": "var(--uf-black)",
            "uf-white": "var(--uf-white)",
            "uf-blue": "rgb(var(--uf-blue) / <alpha-value>)",
            "uf-border": "var(--uf-border)",
            "uf-logo": "var(--uf-logo)",
            "uf-text": "var(--uf-text)",

            "uf-auth": "var(--uf-auth)",
            "uf-card-header": "var(--uf-card-header)",
            "uf-card-background": "var(--uf-card-background)",
            "uf-input-background": "var(--uf-input-background)",
            "uf-button-outlined-background": "var(--uf-button-outlined-background)",
            "uf-button-outlined-border": "var(--uf-button-outlined-border)",
            "uf-button-outlined-color": "var(--uf-button-outlined-color)",

            "uf-sign-out-background": "var(--uf-sign-out-background)",
            "uf-sign-out-fill": "var(--uf-sign-out-fill)",
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
