import { loadCatalog } from "./load.js";
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

try {
  await loadCatalog(databaseUrl);
  console.log("Curated catalog loaded successfully.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
