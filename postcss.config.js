export default {
    plugins: {
        "postcss-advanced-variables": {},
        "postcss-each": {},     // must come before Tailwind
        "@tailwindcss/postcss": {},
    },
};