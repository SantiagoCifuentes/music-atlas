import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const countries = pgTable(
  "countries",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
  },
  (table) => [uniqueIndex("countries_slug_unique").on(table.slug)],
);

export const genres = pgTable(
  "genres",
  {
    id: text("id").primaryKey(),
    countryId: text("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
  },
  (table) => [uniqueIndex("genres_slug_unique").on(table.slug)],
);

export const scenes = pgTable(
  "scenes",
  {
    id: text("id").primaryKey(),
    countryId: text("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    timePeriod: text("time_period").notNull(),
    isOngoing: boolean("is_ongoing").notNull().default(false),
  },
  (table) => [
    uniqueIndex("scenes_slug_unique").on(table.slug),
    check(
      "scenes_time_period_not_empty",
      sql`length(trim(${table.timePeriod})) > 0`,
    ),
  ],
);

export const artists = pgTable(
  "artists",
  {
    id: text("id").primaryKey(),
    countryId: text("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
  },
  (table) => [uniqueIndex("artists_slug_unique").on(table.slug)],
);

export const albums = pgTable(
  "albums",
  {
    id: text("id").primaryKey(),
    countryId: text("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    releaseType: text("release_type").notNull(),
  },
  (table) => [
    uniqueIndex("albums_slug_unique").on(table.slug),
    check(
      "albums_release_type_check",
      sql`${table.releaseType} in ('studio_album', 'ep', 'mixtape', 'compilation', 'live_album')`,
    ),
  ],
);

export const sceneGenres = pgTable(
  "scene_genres",
  {
    sceneId: text("scene_id")
      .notNull()
      .references(() => scenes.id, { onDelete: "cascade" }),
    genreId: text("genre_id")
      .notNull()
      .references(() => genres.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.sceneId, table.genreId] })],
);

export const artistGenres = pgTable(
  "artist_genres",
  {
    artistId: text("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    genreId: text("genre_id")
      .notNull()
      .references(() => genres.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.artistId, table.genreId] })],
);

export const artistScenes = pgTable(
  "artist_scenes",
  {
    artistId: text("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    sceneId: text("scene_id")
      .notNull()
      .references(() => scenes.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.artistId, table.sceneId] })],
);

export const albumArtists = pgTable(
  "album_artists",
  {
    albumId: text("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    artistId: text("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.albumId, table.artistId] })],
);

export const albumGenres = pgTable(
  "album_genres",
  {
    albumId: text("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    genreId: text("genre_id")
      .notNull()
      .references(() => genres.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.albumId, table.genreId] })],
);

export const albumScenes = pgTable(
  "album_scenes",
  {
    albumId: text("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    sceneId: text("scene_id")
      .notNull()
      .references(() => scenes.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.albumId, table.sceneId] })],
);

export const catalogTables = [
  albumScenes,
  albumGenres,
  albumArtists,
  artistScenes,
  artistGenres,
  sceneGenres,
  albums,
  artists,
  scenes,
  genres,
  countries,
] as const;
