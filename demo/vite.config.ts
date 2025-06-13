import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      recozy: path.resolve(__dirname, "../src/index.ts"),
    },
  },
  root: "./", // 确保 Vite 使用正确的根目录
  publicDir: "public",
});
