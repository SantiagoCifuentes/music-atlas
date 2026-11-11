import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";

const repositoryRoot = process.cwd();
const testEnvironmentPath = resolve(repositoryRoot, ".env.test");

function run(command: string, args: string[]) {
  return new Promise<void>((resolveRun, reject) => {
    const child = spawn(command, args, {
      cwd: repositoryRoot,
      env: { ...process.env, NODE_ENV: "test" },
      shell: process.platform === "win32",
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
      } else {
        reject(
          new Error(`Database initialization failed with exit code ${code}.`),
        );
      }
    });
  });
}

export default async function globalSetup() {
  if (!existsSync(testEnvironmentPath)) {
    throw new Error(
      "Missing .env.test. Copy .env.test.example to .env.test before running E2E tests.",
    );
  }

  const result = loadDotenv({ path: testEnvironmentPath, override: true });
  const databaseUrl = result.parsed?.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(".env.test must define DATABASE_URL for E2E tests.");
  }

  await run(process.platform === "win32" ? "npm.cmd" : "npm", [
    "run",
    "db:init",
    "--workspace",
    "@music-atlas/backend",
  ]);
}
