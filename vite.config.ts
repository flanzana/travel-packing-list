import react from "@vitejs/plugin-react"
/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/travel-packing-list",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@chakra-ui") || id.includes("chakra-ui")) {
              return "chakra-ui"
            }
            if (id.includes("@emotion")) {
              return "emotion"
            }
            if (id.includes("react-icons")) {
              return "react-icons"
            }
            if (id.includes("i18next") || id.includes("react-i18next")) {
              return "i18n"
            }
            return "vendor"
          }
        },
      },
    },
  },
})
