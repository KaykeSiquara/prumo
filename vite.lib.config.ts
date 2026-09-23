import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/lib",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: "src/lib.ts", formats: ["es"], fileName: () => "prumo.js", cssFileName: "prumo" },
    rollupOptions: { external: [/^react($|\/)/, /^react-dom($|\/)/, /^@radix-ui\//] },
  },
});
