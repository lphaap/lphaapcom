const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
      }
    }
  },

  plugins: [
    require("daisyui")
  ],
};

module.exports = config;
