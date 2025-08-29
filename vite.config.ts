import react from "@vitejs/plugin-react"
/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/travel-packing-list",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
})
