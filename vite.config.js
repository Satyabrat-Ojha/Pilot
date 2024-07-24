import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/solve": {
        target: "https://tour-finder.onrender.com",
        changeOrigin: true,
        secure: false, // if the target server is using self-signed SSL certificate
        rewrite: (path) => path.replace(/^\/solve/, "/solve"),
      },
    },
    cors: false,
  },
});
