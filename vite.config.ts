import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "localhost",
      "7625-156-197-67-195.ngrok-free.app",
      "ahmedmalmoselhy.mshome.net",
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  define: {
    // Changes on every build; appended to files that keep one URL across updates (the CV)
    __BUILD_ID__: JSON.stringify(Date.now().toString(36)),
  },
}));
