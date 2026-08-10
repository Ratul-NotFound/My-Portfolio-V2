/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "var(--bg-deep)",
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        "surface-hover": "var(--bg-surface-hover)",
        sand: "var(--text-primary)",
        skyblue: {
          500: "var(--accent-skyblue)",
          600: "var(--accent-skyblue-hover)",
          400: "#7dd3fc"
        },
        "secondary-text": "var(--text-secondary)",
        "muted-text": "var(--text-muted)"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
};
