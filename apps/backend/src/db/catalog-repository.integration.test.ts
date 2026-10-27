import { describe, expect, it } from "vitest";
import {
  loadDatabaseEnvironment,
  requireTestDatabaseUrl,
} from "./environment.js";
import { withRepositoryFixture } from "./test-fixtures.js";

process.env.NODE_ENV = "test";
loadDatabaseEnvironment();
const databaseUrl = requireTestDatabaseUrl();

describe("PostgreSQL catalog repository", () => {
  it("maps Scene time periods and allows Scenes without Genres", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      const scene = await repository.findSceneById(
        "fixture-scene-without-genre",
      );

      expect(scene).toMatchObject({
        id: "fixture-scene-without-genre",
        timePeriod: "1990s to ongoing",
        isOngoing: true,
        genreIds: [],
      });
    });
  });

  it("retrieves optional and present Album-to-Scene relationships", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      const albumWithoutScene = await repository.findAlbumById(
        "fixture-album-without-scene",
      );
      const albumWithScene = await repository.findAlbumById(
        "fixture-album-with-scene",
      );

      expect(albumWithoutScene?.sceneIds).toEqual([]);
      expect(albumWithScene?.sceneIds).toEqual(["fixture-scene-with-genre"]);
      expect(
        (await repository.findAlbumsBySceneId("fixture-scene-with-genre")).map(
          (album) => album.id,
        ),
      ).toEqual(["fixture-album-with-scene"]);
    });
  });

  it("retrieves many-to-many relationships through the repository boundary", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      expect(
        (await repository.findGenresBySceneId("fixture-scene-with-genre")).map(
          (genre) => genre.id,
        ),
      ).toEqual(["fixture-post-punk"]);
      expect(
        (await repository.findArtistsByGenreId("fixture-post-punk")).map(
          (artist) => artist.id,
        ),
      ).toEqual(["fixture-artist"]);
      expect(
        (await repository.findAlbumsByArtistId("fixture-artist")).map(
          (album) => album.id,
        ),
      ).toEqual(["fixture-album-with-scene", "fixture-album-without-scene"]);
    });
  });

  it("returns null or an empty collection for missing records", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      expect(await repository.findAlbumById("missing-album")).toBeNull();
      expect(await repository.findArtistsBySceneId("missing-scene")).toEqual(
        [],
      );
      expect(await repository.findAlbumsByGenreId("missing-genre")).toEqual([]);
    });
  });
});
