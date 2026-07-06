import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // rozdělení vendorů => lepší cache a menší initial parse
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["motion"],
        },
      },
    },
  },
});
