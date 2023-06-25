const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      colors: {
        'lphaap-light-grey': '#1E2435',
        'lphaap-dark-grey': '#A6ADBB',
        'lphaap-dark-blue': '#050A18'
      }
    }
  },

  plugins: [
    require("daisyui")
  ],
};

module.exports = config;
