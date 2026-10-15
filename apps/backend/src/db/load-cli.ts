import { loadCatalog } from "./load.js";
import { loadDatabaseEnvironment, requireDatabaseUrl } from "./environment.js";

loadDatabaseEnvironment();

try {
  await loadCatalog(requireDatabaseUrl());
  console.log("Curated catalog loaded successfully.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
