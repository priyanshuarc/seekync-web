// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import animatePlugin from "tailwindcss-animate"; // only if installed

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // add custom theme tokens if needed
    },
  },
  plugins: [
    // add plugin only if installed
    // (If you didn't install tailwindcss-animate, remove the next line)
    animatePlugin,
  ].filter(Boolean),
};
