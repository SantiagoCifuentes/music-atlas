import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";

export function loadDatabaseEnvironment(): void {
  const fileName = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  const path = resolve(process.cwd(), fileName);

  if (existsSync(path)) {
    loadDotenv({ path });
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
  const databaseName = new URL(url).pathname.replace(/^\//, "");

  if (!databaseName.endsWith("_test")) {
    throw new Error(
      `Refusing test database operation for '${databaseName}'. Test databases must end with '_test'.`,
    );
  }
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
