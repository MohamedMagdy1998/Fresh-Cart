/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts}",
      "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
        container: {
            center: true
        },
        screens: {
            'xl': '1240px',
        }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

