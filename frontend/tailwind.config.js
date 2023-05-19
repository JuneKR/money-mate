/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode support
  theme: {
    extend: {
      colors: {
        "custom-body": "#E7F0C3",
        "custom-nav": "#F0CF85",
        "custom-card": "#A4D4AE",
        "custom-innercard": "#E7F0C3",
        "custom-toppicHeadder": "#32AFA9",
        "custom-toppicPlain": "#F0CF85",
        "custom-banner": "#D2DAFF",

        "custom-darkCard": "#1D1D41",
        "custom-darkInnercard": "#27264E",
        "custom-darkBody": "#141332",
        "custom-darkNav": "#1D1D41",

        "custom-darkProgress": "#64D0F7",
        "custom-darkProgressBg": "#3A3B5A",

        "custom-emergencyPlanHeader": "#FEA5AD",
        "custom-goalBasedPlanHeader": "#BE8ABF",
        "custom-retirementPlanHeader": "#829460",

        "custom-cards": "#E7F0C3",
      },
    },
  },
  plugins: [],
};
