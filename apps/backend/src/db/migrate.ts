import { resolve } from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { repositoryRoot } from "../repository-paths.js";
import { createDatabase } from "./client.js";
import {
  loadDatabaseEnvironment,
  requireDatabaseUrl,
  requireTestDatabaseUrl,
} from "./environment.js";

loadDatabaseEnvironment();
const databaseUrl =
  process.env.NODE_ENV === "test"
    ? requireTestDatabaseUrl()
    : requireDatabaseUrl();
const { db, pool } = createDatabase(databaseUrl);

try {
  await migrate(db, { migrationsFolder: resolve(repositoryRoot, "drizzle") });
  console.log("Database migrations applied.");
} finally {
  await pool.end();
}
