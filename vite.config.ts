import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/HA-public-charge-estimator/",
  server: {
    port: 5173
  }
});
