/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'primary-color': "var(--primary-color)",
        'secondary-color': "var(--secondary-color)",
        "white-color":"var(--white-color)"
      },
    },
  },
  plugins: [require("tailgrids/plugin")],
};
