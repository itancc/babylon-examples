import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/babylon-examples/",
  server: {
    host: "0.0.0.0",
  },
  plugins: [UnoCSS(), React()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
