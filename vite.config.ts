import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { generateCovers } from "./scripts/generate-covers.mjs";

/** Project covers: generated at startup/build, and again when content JSON changes in dev (e.g. a git pull). */
const projectCovers = (): Plugin => ({
  name: "project-covers",
  buildStart: () => generateCovers(),
  configureServer(server) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const regenerate = (file: string) => {
      if (!/\/src\/content\/(projects|experience)\/[^/]+\.json$/.test(file.replace(/\\/g, "/"))) return;
      // Wait for a burst of writes (a git pull, an editor save) to settle; never let a cover error stop the server
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          generateCovers();
        } catch (error) {
          server.config.logger.error(`covers: ${(error as Error).message}`);
        }
      }, 300);
    };
    server.watcher.on("add", regenerate);
    server.watcher.on("change", regenerate);
    server.watcher.on("unlink", regenerate);
  },
});

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
  plugins: [react(), projectCovers(), mode === "development" && componentTagger()].filter(
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
