import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";
import { repositoryRoot } from "../repository-paths.js";

export function loadDatabaseEnvironment(
  environmentDirectory = repositoryRoot,
): void {
  const fileName = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  const path = resolve(environmentDirectory, fileName);

  if (!existsSync(path)) {
    if (process.env.NODE_ENV === "test") {
      delete process.env.DATABASE_URL;
      throw new Error(
        `Missing ${fileName}. Copy .env.test.example to ${fileName} before running test database operations.`,
      );
    }
    return;
  }

  const result = loadDotenv({
    path,
    override: process.env.NODE_ENV === "test",
  });

  if (process.env.NODE_ENV === "test" && !result.parsed?.DATABASE_URL) {
    delete process.env.DATABASE_URL;
    throw new Error(
      `${fileName} must define DATABASE_URL for test operations.`,
    );
  }
}

export function requireDatabaseUrl(): string {
  const value = process.env.DATABASE_URL;

  if (!value) {
    throw new Error(
      "Missing DATABASE_URL. Copy .env.example to .env or set it in the shell.",
    );
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "postgresql:" && parsed.protocol !== "postgres:") {
      throw new Error("unsupported protocol");
    }
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL.");
  }

  return value;
}

export function assertTestDatabaseUrl(url: string): void {
  const parsed = new URL(url);
  const databaseName = parsed.pathname.replace(/^\//, "");
  const allowedHosts = new Set(["localhost", "127.0.0.1", "::1"]);

  if (
    databaseName !== "music_atlas_test" ||
    !allowedHosts.has(parsed.hostname)
  ) {
    throw new Error(
      `Refusing test database operation for '${databaseName}' on '${parsed.hostname}'. Expected the local music_atlas_test database.`,
    );
  }
}

export function requireTestDatabaseUrl(): string {
  const url = requireDatabaseUrl();
  assertTestDatabaseUrl(url);
  return url;
}

export function assertLocalResetAllowed(url: string): void {
  const parsed = new URL(url);
  const allowedHosts = new Set(["localhost", "127.0.0.1", "::1"]);

  if (
    !allowedHosts.has(parsed.hostname) ||
    process.env.ALLOW_DATABASE_RESET !== "true"
  ) {
    throw new Error(
      "Database reset requires a local PostgreSQL URL and ALLOW_DATABASE_RESET=true.",
    );
  }
}
