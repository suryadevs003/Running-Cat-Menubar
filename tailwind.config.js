/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./preload.js",
    "./styles/**/*.{css,js,html}",
    "./**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
  },
  plugins: [],
  }
};
