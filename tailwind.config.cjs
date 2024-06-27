import path from "node:path"
import orbitComponentsPreset from "@kiwicom/orbit-tailwind-preset"

const orbitComponentsPath = require
  .resolve("@kiwicom/orbit-components")
  .replace("/lib/index.js", "")

/** @type {import('tailwindcss').Config} */
export default {
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
