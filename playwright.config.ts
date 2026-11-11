import { defineConfig } from "@playwright/test";
import { config as loadDotenv } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const repositoryRoot = process.cwd();
const testEnvironmentPath = resolve(repositoryRoot, ".env.test");

if (!existsSync(testEnvironmentPath)) {
  throw new Error(
    "Missing .env.test. Copy .env.test.example to .env.test before running E2E tests.",
  );
}

loadDotenv({ path: testEnvironmentPath, override: true });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(".env.test must define DATABASE_URL for E2E tests.");
}
const backendPort = process.env.PORT ?? "3002";

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm run dev --workspace @music-atlas/backend",
      url: `http://127.0.0.1:${backendPort}/health`,
      reuseExistingServer: false,
      env: {
        ...process.env,
        NODE_ENV: "test",
        DATABASE_URL: databaseUrl,
        PORT: backendPort,
      },
    },
    {
      command:
        "npm run dev --workspace @music-atlas/frontend -- --host 127.0.0.1 --port 5173",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: false,
      env: {
        ...process.env,
        VITE_API_PROXY_TARGET: `http://127.0.0.1:${backendPort}`,
      },
    },
  ],
});
