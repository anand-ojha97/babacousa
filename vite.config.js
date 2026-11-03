import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local development uses Vite's default ports: 5173 (dev), 4173 (preview).
// Keep base "/" when publishing at the root of your domain.
export default defineConfig({ plugins: [react()], base: "/" });
