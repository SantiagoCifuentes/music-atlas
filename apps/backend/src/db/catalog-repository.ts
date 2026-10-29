import { asc, eq, inArray } from "drizzle-orm";
import type { Database } from "./client.js";
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
import type {
  Album,
  Artist,
  Country,
  Genre,
  Scene,
  ReleaseType,
} from "../domain/catalog.js";
import type { CatalogRepository } from "../domain/repositories.js";

export function createCatalogRepository(db: Database): CatalogRepository {
  const getGenreIdsForScene = async (sceneId: string): Promise<string[]> => {
    const rows = await db
      .select({ genreId: sceneGenres.genreId })
      .from(sceneGenres)
      .where(eq(sceneGenres.sceneId, sceneId))
      .orderBy(asc(sceneGenres.genreId));
    return rows.map((row) => row.genreId);
  };

  const getGenreIdsForArtist = async (artistId: string): Promise<string[]> => {
    const rows = await db
      .select({ genreId: artistGenres.genreId })
      .from(artistGenres)
      .where(eq(artistGenres.artistId, artistId))
      .orderBy(asc(artistGenres.genreId));
    return rows.map((row) => row.genreId);
  };

  const getSceneIdsForArtist = async (artistId: string): Promise<string[]> => {
    const rows = await db
      .select({ sceneId: artistScenes.sceneId })
      .from(artistScenes)
      .where(eq(artistScenes.artistId, artistId))
      .orderBy(asc(artistScenes.sceneId));
    return rows.map((row) => row.sceneId);
  };

  const getArtistIdsForAlbum = async (albumId: string): Promise<string[]> => {
    const rows = await db
      .select({ artistId: albumArtists.artistId })
      .from(albumArtists)
      .where(eq(albumArtists.albumId, albumId))
      .orderBy(asc(albumArtists.artistId));
    return rows.map((row) => row.artistId);
  };

  const getGenreIdsForAlbum = async (albumId: string): Promise<string[]> => {
    const rows = await db
      .select({ genreId: albumGenres.genreId })
      .from(albumGenres)
      .where(eq(albumGenres.albumId, albumId))
      .orderBy(asc(albumGenres.genreId));
    return rows.map((row) => row.genreId);
  };

  const getSceneIdsForAlbum = async (albumId: string): Promise<string[]> => {
    const rows = await db
      .select({ sceneId: albumScenes.sceneId })
      .from(albumScenes)
      .where(eq(albumScenes.albumId, albumId))
      .orderBy(asc(albumScenes.sceneId));
    return rows.map((row) => row.sceneId);
  };

  const mapCountry = (row: typeof countries.$inferSelect): Country => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
  });

  const mapGenre = (row: typeof genres.$inferSelect): Genre => ({
    id: row.id,
    countryId: row.countryId,
    slug: row.slug,
    name: row.name,
    description: row.description,
  });

  const mapScene = async (row: typeof scenes.$inferSelect): Promise<Scene> => ({
    id: row.id,
    countryId: row.countryId,
    slug: row.slug,
    name: row.name,
    description: row.description,
    timePeriod: row.timePeriod,
    isOngoing: row.isOngoing,
    genreIds: await getGenreIdsForScene(row.id),
  });

  const mapArtist = async (
    row: typeof artists.$inferSelect,
  ): Promise<Artist> => ({
    id: row.id,
    countryId: row.countryId,
    slug: row.slug,
    name: row.name,
    description: row.description,
    genreIds: await getGenreIdsForArtist(row.id),
    sceneIds: await getSceneIdsForArtist(row.id),
  });

  const mapAlbum = async (row: typeof albums.$inferSelect): Promise<Album> => ({
    id: row.id,
    countryId: row.countryId,
    slug: row.slug,
    title: row.title,
    description: row.description,
    releaseType: row.releaseType as ReleaseType,
    artistIds: await getArtistIdsForAlbum(row.id),
    genreIds: await getGenreIdsForAlbum(row.id),
    sceneIds: await getSceneIdsForAlbum(row.id),
  });

  const findGenresByIds = async (ids: string[]): Promise<Genre[]> => {
    if (ids.length === 0) return [];
    const rows = await db.select().from(genres).where(inArray(genres.id, ids));
    const byId = new Map(rows.map((row) => [row.id, mapGenre(row)]));
    return ids.flatMap((id) => {
      const genre = byId.get(id);
      return genre ? [genre] : [];
    });
  };

  const findArtistsByIds = async (ids: string[]): Promise<Artist[]> => {
    if (ids.length === 0) return [];
    const rows = await db
      .select()
      .from(artists)
      .where(inArray(artists.id, ids));
    const byId = new Map<string, Artist>();
    for (const row of rows) byId.set(row.id, await mapArtist(row));
    return ids.flatMap((id) => {
      const artist = byId.get(id);
      return artist ? [artist] : [];
    });
  };

  const findAlbumsByIds = async (ids: string[]): Promise<Album[]> => {
    if (ids.length === 0) return [];
    const rows = await db.select().from(albums).where(inArray(albums.id, ids));
    const byId = new Map<string, Album>();
    for (const row of rows) byId.set(row.id, await mapAlbum(row));
    return ids.flatMap((id) => {
      const album = byId.get(id);
      return album ? [album] : [];
    });
  };

  return {
    async findCountryById(id) {
      const rows = await db
        .select()
        .from(countries)
        .where(eq(countries.id, id))
        .limit(1);
      return rows[0] ? mapCountry(rows[0]) : null;
    },

    async findGenresByCountryId(countryId) {
      const rows = await db
        .select()
        .from(genres)
        .where(eq(genres.countryId, countryId))
        .orderBy(asc(genres.id));
      return rows.map(mapGenre);
    },

    async findScenesByCountryId(countryId) {
      const rows = await db
        .select()
        .from(scenes)
        .where(eq(scenes.countryId, countryId))
        .orderBy(asc(scenes.id));
      return Promise.all(rows.map(mapScene));
    },

    async findGenreById(id) {
      const rows = await db
        .select()
        .from(genres)
        .where(eq(genres.id, id))
        .limit(1);
      return rows[0] ? mapGenre(rows[0]) : null;
    },

    async findSceneById(id) {
      const rows = await db
        .select()
        .from(scenes)
        .where(eq(scenes.id, id))
        .limit(1);
      return rows[0] ? mapScene(rows[0]) : null;
    },

    async findArtistById(id) {
      const rows = await db
        .select()
        .from(artists)
        .where(eq(artists.id, id))
        .limit(1);
      return rows[0] ? mapArtist(rows[0]) : null;
    },

    async findAlbumById(id) {
      const rows = await db
        .select()
        .from(albums)
        .where(eq(albums.id, id))
        .limit(1);
      return rows[0] ? mapAlbum(rows[0]) : null;
    },

    async findGenresBySceneId(sceneId) {
      return findGenresByIds(await getGenreIdsForScene(sceneId));
    },

    async findArtistsByGenreId(genreId) {
      const rows = await db
        .select({ artistId: artistGenres.artistId })
        .from(artistGenres)
        .where(eq(artistGenres.genreId, genreId))
        .orderBy(asc(artistGenres.artistId));
      return findArtistsByIds(rows.map((row) => row.artistId));
    },

    async findArtistsBySceneId(sceneId) {
      const rows = await db
        .select({ artistId: artistScenes.artistId })
        .from(artistScenes)
        .where(eq(artistScenes.sceneId, sceneId))
        .orderBy(asc(artistScenes.artistId));
      return findArtistsByIds(rows.map((row) => row.artistId));
    },

    async findAlbumsByArtistId(artistId) {
      const rows = await db
        .select({ albumId: albumArtists.albumId })
        .from(albumArtists)
        .where(eq(albumArtists.artistId, artistId))
        .orderBy(asc(albumArtists.albumId));
      return findAlbumsByIds(rows.map((row) => row.albumId));
    },

    async findAlbumsByGenreId(genreId) {
      const rows = await db
        .select({ albumId: albumGenres.albumId })
        .from(albumGenres)
        .where(eq(albumGenres.genreId, genreId))
        .orderBy(asc(albumGenres.albumId));
      return findAlbumsByIds(rows.map((row) => row.albumId));
    },

    async findAlbumsBySceneId(sceneId) {
      const rows = await db
        .select({ albumId: albumScenes.albumId })
        .from(albumScenes)
        .where(eq(albumScenes.sceneId, sceneId))
        .orderBy(asc(albumScenes.albumId));
      return findAlbumsByIds(rows.map((row) => row.albumId));
    },
  };
}
