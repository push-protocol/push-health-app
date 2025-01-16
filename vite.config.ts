import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignoreß
import { resolve } from "path";

// @ts-ignore
const root = resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      blocks: resolve(root, "blocks"),
      common: resolve(root, "common"),
    },
  },
});
