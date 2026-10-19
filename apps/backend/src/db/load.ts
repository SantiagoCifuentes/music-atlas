import {
  defaultCatalogPath,
  defaultResearchNotesPath,
  validateContentFiles,
} from "../content/validate.js";
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

export async function loadCatalog(
  databaseUrl: string,
  catalogPath = defaultCatalogPath,
  researchNotesPath = defaultResearchNotesPath,
): Promise<void> {
  const { catalog } = await validateContentFiles(
    catalogPath,
    researchNotesPath,
  );
  const { db, pool } = createDatabase(databaseUrl);

  try {
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

      await tx.insert(countries).values(
        catalog.countries.map((country) => ({
          id: country.id,
          slug: country.slug,
          name: country.name,
          description: country.description,
        })),
      );

      await tx.insert(genres).values(
        catalog.genres.map((genre) => ({
          id: genre.id,
          countryId: genre.countryId,
          slug: genre.slug,
          name: genre.name,
          description: genre.description,
        })),
      );

      await tx.insert(scenes).values(
        catalog.scenes.map((scene) => ({
          id: scene.id,
          countryId: scene.countryId,
          slug: scene.slug,
          name: scene.name,
          description: scene.description,
          timePeriod: scene.timePeriod,
          isOngoing: scene.isOngoing,
        })),
      );

      await tx.insert(artists).values(
        catalog.artists.map((artist) => ({
          id: artist.id,
          countryId: artist.countryId,
          slug: artist.slug,
          name: artist.name,
          description: artist.description,
        })),
      );

      await tx.insert(albums).values(
        catalog.albums.map((album) => ({
          id: album.id,
          countryId: album.countryId,
          slug: album.slug,
          title: album.title,
          description: album.description,
          releaseType: album.releaseType,
        })),
      );

      await tx.insert(sceneGenres).values(
        catalog.scenes.flatMap((scene) =>
          scene.genreIds.map((genreId) => ({
            sceneId: scene.id,
            genreId,
          })),
        ),
      );
      await tx.insert(artistGenres).values(
        catalog.artists.flatMap((artist) =>
          artist.genreIds.map((genreId) => ({
            artistId: artist.id,
            genreId,
          })),
        ),
      );
      await tx.insert(artistScenes).values(
        catalog.artists.flatMap((artist) =>
          artist.sceneIds.map((sceneId) => ({
            artistId: artist.id,
            sceneId,
          })),
        ),
      );
      await tx.insert(albumArtists).values(
        catalog.albums.flatMap((album) =>
          album.artistIds.map((artistId) => ({
            albumId: album.id,
            artistId,
          })),
        ),
      );
      await tx.insert(albumGenres).values(
        catalog.albums.flatMap((album) =>
          album.genreIds.map((genreId) => ({
            albumId: album.id,
            genreId,
          })),
        ),
      );
      await tx.insert(albumScenes).values(
        catalog.albums.flatMap((album) =>
          album.sceneIds.map((sceneId) => ({
            albumId: album.id,
            sceneId,
          })),
        ),
      );
    });
  } finally {
    await pool.end();
  }
}

export async function catalogCounts(databaseUrl: string) {
  const { db, pool } = createDatabase(databaseUrl);

  try {
    const count = async (
      table:
        | typeof countries
        | typeof genres
        | typeof scenes
        | typeof artists
        | typeof albums,
    ) => {
      const rows = await db.select({ id: table.id }).from(table);
      return rows.length;
    };

    return {
      countries: await count(countries),
      genres: await count(genres),
      scenes: await count(scenes),
      artists: await count(artists),
      albums: await count(albums),
    };
  } finally {
    await pool.end();
  }
}
