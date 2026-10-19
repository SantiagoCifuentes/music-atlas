import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sql } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import { createDatabase } from "./client.js";
import {
  loadDatabaseEnvironment,
  requireTestDatabaseUrl,
} from "./environment.js";
import {
  defaultCatalogPath,
  defaultResearchNotesPath,
} from "../content/validate.js";
import { catalogCounts, loadCatalog } from "./load.js";
import {
  albumArtists,
  albumGenres,
  albumScenes,
  albums,
  artistGenres,
  artistScenes,
  artists,
  countries,
  genres,
  sceneGenres,
  scenes,
} from "./schema.js";

process.env.NODE_ENV = "test";
loadDatabaseEnvironment();
const databaseUrl = requireTestDatabaseUrl();

async function catalogSnapshot(url: string): Promise<string> {
  const { db, pool } = createDatabase(url);

  try {
    return JSON.stringify({
      countries: await db.select().from(countries),
      genres: await db.select().from(genres),
      scenes: await db.select().from(scenes),
      artists: await db.select().from(artists),
      albums: await db.select().from(albums),
      sceneGenres: await db.select().from(sceneGenres),
      artistGenres: await db.select().from(artistGenres),
      artistScenes: await db.select().from(artistScenes),
      albumArtists: await db.select().from(albumArtists),
      albumGenres: await db.select().from(albumGenres),
      albumScenes: await db.select().from(albumScenes),
    });
  } finally {
    await pool.end();
  }
}

describe("PostgreSQL catalog loading", () => {
  beforeAll(async () => {
    await loadCatalog(databaseUrl);
    await loadCatalog(databaseUrl);
  });

  it("produces the same catalog counts after repeated loading", async () => {
    const counts = await catalogCounts(databaseUrl!);

    expect(counts).toEqual({
      countries: 1,
      genres: 10,
      scenes: 7,
      artists: 18,
      albums: 18,
    });

    const before = await catalogSnapshot(databaseUrl!);
    await loadCatalog(databaseUrl!);
    const after = await catalogSnapshot(databaseUrl!);
    expect(after).toBe(before);
  });

  it("loads every album with at least one Genre association", async () => {
    const { db, pool } = createDatabase(databaseUrl!);

    try {
      const loadedAlbums = await db.select({ id: albums.id }).from(albums);
      const genreAssociations = await db
        .select({ albumId: albumGenres.albumId })
        .from(albumGenres);
      const albumIds = new Set(
        genreAssociations.map((association) => association.albumId),
      );

      expect(loadedAlbums.every((album) => albumIds.has(album.id))).toBe(true);
    } finally {
      await pool.end();
    }
  });

  it("rejects a database insert that leaves an Album without a Genre", async () => {
    const { db, pool } = createDatabase(databaseUrl!);

    try {
      const error = await db
        .transaction(async (tx) => {
          await tx.insert(albums).values({
            id: "constraint-test-album",
            countryId: "england",
            slug: "constraint-test-album",
            title: "Constraint Test Album",
            description: "Temporary integrity test data.",
            releaseType: "studio_album",
          });
          await tx.insert(albumArtists).values({
            albumId: "constraint-test-album",
            artistId: "the-beatles",
          });
        })
        .then(() => undefined)
        .catch((caught: unknown) => caught);

      expect(error).toBeDefined();
      expect(
        (error as { cause?: { message?: string } }).cause?.message,
      ).toContain("must have at least one Genre");
    } finally {
      await pool.end();
    }
  });

  it("leaves the existing catalog unchanged when content validation fails", async () => {
    const directory = await mkdtemp(join(tmpdir(), "music-atlas-invalid-"));
    const invalidCatalogPath = join(directory, "catalog.json");
    const catalog = JSON.parse(await readFile(defaultCatalogPath, "utf8")) as {
      albums: Array<{ genreIds: string[] }>;
    };
    catalog.albums[0]!.genreIds = [];
    await writeFile(invalidCatalogPath, JSON.stringify(catalog));

    try {
      const before = await catalogSnapshot(databaseUrl!);
      await expect(
        loadCatalog(databaseUrl!, invalidCatalogPath, defaultResearchNotesPath),
      ).rejects.toThrow();
      expect(await catalogSnapshot(databaseUrl!)).toBe(before);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("rolls back partial database writes when the transaction fails", async () => {
    const { db, pool } = createDatabase(databaseUrl!);
    const triggerName = "phase2_test_fail_catalog_load";
    const functionName = "phase2_test_fail_catalog_load_function";

    try {
      const before = await catalogSnapshot(databaseUrl!);
      await db.execute(
        sql.raw(`
          CREATE OR REPLACE FUNCTION ${functionName}() RETURNS trigger AS $$
          BEGIN
            RAISE EXCEPTION 'forced Phase 2 rollback';
          END;
          $$ LANGUAGE plpgsql;
        `),
      );
      await db.execute(
        sql.raw(
          `CREATE TRIGGER ${triggerName} AFTER INSERT ON countries FOR EACH ROW EXECUTE FUNCTION ${functionName}();`,
        ),
      );

      const error = await loadCatalog(databaseUrl!)
        .then(() => undefined)
        .catch((caught: unknown) => caught);
      expect(error).toBeDefined();
      expect(
        (error as { cause?: { message?: string } }).cause?.message,
      ).toContain("forced Phase 2 rollback");
      expect(await catalogSnapshot(databaseUrl!)).toBe(before);
    } finally {
      await db.execute(
        sql.raw(`DROP TRIGGER IF EXISTS ${triggerName} ON countries`),
      );
      await db.execute(sql.raw(`DROP FUNCTION IF EXISTS ${functionName}()`));
      await pool.end();
    }
  });
});
