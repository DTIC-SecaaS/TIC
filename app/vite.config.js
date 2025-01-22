import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar "describe", "test", "expect" globalmente.
    environment: "jsdom", // Simula el DOM para las pruebas.
    setupFiles: "./src/setupTests.js", // Configuración adicional (opcional).
  },
});
