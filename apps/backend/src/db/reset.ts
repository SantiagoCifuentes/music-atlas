import { sql } from "drizzle-orm";
import { loadCatalog } from "./load.js";
import { createDatabase } from "./client.js";
import {
  assertLocalResetAllowed,
  loadDatabaseEnvironment,
  requireDatabaseUrl,
  requireTestDatabaseUrl,
} from "./environment.js";

loadDatabaseEnvironment();
const databaseUrl =
  process.env.NODE_ENV === "test"
    ? requireTestDatabaseUrl()
    : requireDatabaseUrl();
assertLocalResetAllowed(databaseUrl);
const { db, pool } = createDatabase(databaseUrl);

try {
  await db.execute(
    sql.raw(
      'TRUNCATE "album_scenes", "album_genres", "album_artists", "artist_scenes", "artist_genres", "scene_genres", "albums", "artists", "scenes", "genres", "countries" CASCADE',
    ),
  );
} finally {
  await pool.end();
}

await loadCatalog(databaseUrl);
console.log("Local catalog reset and reloaded.");
