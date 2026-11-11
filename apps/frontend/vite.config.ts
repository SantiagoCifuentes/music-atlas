import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const repositoryRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, repositoryRoot, "VITE_");

  return {
    envDir: repositoryRoot,
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: environment.VITE_API_PROXY_TARGET ?? "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  };
});
