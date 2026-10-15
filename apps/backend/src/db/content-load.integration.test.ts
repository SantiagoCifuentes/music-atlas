import { beforeAll, describe, expect, it } from "vitest";
import { createDatabase } from "./client.js";
import { assertTestDatabaseUrl } from "./environment.js";
import { catalogCounts, loadCatalog } from "./load.js";
import { albumArtists, albumGenres, albums } from "./schema.js";

const databaseUrl = process.env.DATABASE_URL;

describe("PostgreSQL catalog loading", () => {
  beforeAll(async () => {
    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is required for PostgreSQL integration tests.",
      );
    }
    assertTestDatabaseUrl(databaseUrl);
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
});
