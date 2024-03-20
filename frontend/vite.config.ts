import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_URL = "http://0.0.0.0:3333/tasks"; // Remplacez l'URL par l'URL de votre API

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": API_URL,
    },
    host: "0.0.0.0",
  },
});