/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#e18b43',         // Gold color
        puce: '#65393a',         // Puce color
        ivory: '#f0efe0',        // Ivory color
        charcoal: '#414a45',     // Charcoal color
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

