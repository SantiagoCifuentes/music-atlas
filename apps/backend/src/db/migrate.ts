import { resolve } from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { repositoryRoot } from "../repository-paths.js";
import { createDatabase } from "./client.js";
import { loadDatabaseEnvironment, requireDatabaseUrl } from "./environment.js";

loadDatabaseEnvironment();
const { db, pool } = createDatabase(requireDatabaseUrl());

try {
  await migrate(db, { migrationsFolder: resolve(repositoryRoot, "drizzle") });
  console.log("Database migrations applied.");
} finally {
  await pool.end();
}
