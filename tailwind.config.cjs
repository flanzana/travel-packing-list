const path = require("node:path")
const orbitComponentsPreset = require("@kiwicom/orbit-tailwind-preset")

const orbitComponentsPath = require
  .resolve("@kiwicom/orbit-components")
  .replace("/lib/index.js", "")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    path.join(orbitComponentsPath, "**", "*.{js,jsx,ts,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [orbitComponentsPreset()],
  corePlugins: {
    preflight: true,
  },
}
