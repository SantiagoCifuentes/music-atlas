import { assertTestDatabaseUrl } from "./environment.js";
import { createDatabase } from "./client.js";
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
import { createCatalogRepository } from "./catalog-repository.js";
import type { CatalogRepository } from "../domain/repositories.js";

const fixture = {
  country: {
    id: "fixture-england",
    slug: "fixture-england",
    name: "Fixture England",
    description: "Isolated repository-test country.",
  },
  genre: {
    id: "fixture-post-punk",
    countryId: "fixture-england",
    slug: "fixture-post-punk",
    name: "Fixture Post-Punk",
    description: "Isolated repository-test genre.",
  },
  sceneWithGenre: {
    id: "fixture-scene-with-genre",
    countryId: "fixture-england",
    slug: "fixture-scene-with-genre",
    name: "Fixture Scene With Genre",
    description: "A scene with an explicit genre association.",
    timePeriod: "1980s",
    isOngoing: false,
  },
  sceneWithoutGenre: {
    id: "fixture-scene-without-genre",
    countryId: "fixture-england",
    slug: "fixture-scene-without-genre",
    name: "Fixture Scene Without Genre",
    description: "A valid scene with no forced genre association.",
    timePeriod: "1990s to ongoing",
    isOngoing: true,
  },
  artist: {
    id: "fixture-artist",
    countryId: "fixture-england",
    slug: "fixture-artist",
    name: "Fixture Artist",
    description: "Isolated repository-test artist.",
  },
  albumWithoutScene: {
    id: "fixture-album-without-scene",
    countryId: "fixture-england",
    slug: "fixture-album-without-scene",
    title: "Fixture Album Without Scene",
    description: "An album with no Scene association.",
    releaseType: "studio_album" as const,
  },
  albumWithScene: {
    id: "fixture-album-with-scene",
    countryId: "fixture-england",
    slug: "fixture-album-with-scene",
    title: "Fixture Album With Scene",
    description: "An album with a Scene association.",
    releaseType: "ep" as const,
  },
};

async function clearCatalog(db: ReturnType<typeof createDatabase>["db"]) {
  await db.transaction(async (tx) => {
    await tx.delete(albumScenes);
    await tx.delete(albumGenres);
    await tx.delete(albumArtists);
    await tx.delete(artistScenes);
    await tx.delete(artistGenres);
    await tx.delete(sceneGenres);
    await tx.delete(albums);
    await tx.delete(artists);
    await tx.delete(scenes);
    await tx.delete(genres);
    await tx.delete(countries);
  });
}

async function insertFixture(db: ReturnType<typeof createDatabase>["db"]) {
  await db.transaction(async (tx) => {
    await tx.insert(countries).values(fixture.country);
    await tx.insert(genres).values(fixture.genre);
    await tx
      .insert(scenes)
      .values([fixture.sceneWithGenre, fixture.sceneWithoutGenre]);
    await tx.insert(artists).values(fixture.artist);
    await tx
      .insert(albums)
      .values([fixture.albumWithoutScene, fixture.albumWithScene]);
    await tx.insert(sceneGenres).values({
      sceneId: fixture.sceneWithGenre.id,
      genreId: fixture.genre.id,
    });
    await tx.insert(artistGenres).values({
      artistId: fixture.artist.id,
      genreId: fixture.genre.id,
    });
    await tx.insert(artistScenes).values({
      artistId: fixture.artist.id,
      sceneId: fixture.sceneWithGenre.id,
    });
    await tx.insert(albumArtists).values([
      { albumId: fixture.albumWithoutScene.id, artistId: fixture.artist.id },
      { albumId: fixture.albumWithScene.id, artistId: fixture.artist.id },
    ]);
    await tx.insert(albumGenres).values([
      { albumId: fixture.albumWithoutScene.id, genreId: fixture.genre.id },
      { albumId: fixture.albumWithScene.id, genreId: fixture.genre.id },
    ]);
    await tx.insert(albumScenes).values({
      albumId: fixture.albumWithScene.id,
      sceneId: fixture.sceneWithGenre.id,
    });
  });
}

export async function withRepositoryFixture<T>(
  databaseUrl: string,
  callback: (repository: CatalogRepository) => Promise<T>,
): Promise<T> {
  assertTestDatabaseUrl(databaseUrl);
  const { db, pool } = createDatabase(databaseUrl);

  try {
    await clearCatalog(db);
    await insertFixture(db);
    return await callback(createCatalogRepository(db));
  } finally {
    await clearCatalog(db);
    await pool.end();
  }
}
