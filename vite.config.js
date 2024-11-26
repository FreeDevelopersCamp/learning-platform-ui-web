import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  define: {
    "process.env": {
      REACT_APP_X_TENANT_ID: "b_1",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://localhost:3030",
        ws: true,
      },
      "/origin": {
        target: "https://localhost:3030",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
