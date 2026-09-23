/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@prumo": fileURLToPath(new URL("./src/index.ts", import.meta.url)) } },
  build: { outDir: "dist/docs" },
  test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"], css: false, testTimeout: 15000 },
});
