import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";
import {
  loadDatabaseEnvironment,
  requireTestDatabaseUrl,
} from "../db/environment.js";
import { withRepositoryFixture } from "../db/test-fixtures.js";

process.env.NODE_ENV = "test";
loadDatabaseEnvironment();
const databaseUrl = requireTestDatabaseUrl();

describe("first discovery API journey", () => {
  it("retrieves England, a Genre, an Artist, and the Artist's Albums", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      const app = buildApp({ repository });

      try {
        const countryResponse = await app.inject("/api/countries/england");
        expect(countryResponse.statusCode).toBe(200);
        const countryBody = countryResponse.json();
        expect(countryBody.data.country.id).toBe("england");
        expect(
          countryBody.data.genres.map((genre: { id: string }) => genre.id),
        ).toContain("fixture-post-punk");

        const genreResponse = await app.inject("/api/genres/fixture-post-punk");
        expect(genreResponse.statusCode).toBe(200);
        const genreBody = genreResponse.json();
        expect(genreBody.data.genre.id).toBe("fixture-post-punk");
        expect(genreBody.data.artists).toMatchObject([
          { id: "fixture-artist", genreIds: ["fixture-post-punk"] },
        ]);

        const artistResponse = await app.inject("/api/artists/fixture-artist");
        expect(artistResponse.statusCode).toBe(200);
        const artistBody = artistResponse.json();
        expect(artistBody.data.artist.id).toBe("fixture-artist");
        expect(artistBody.data.albums).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: "fixture-album-with-scene",
              artistIds: ["fixture-artist"],
              genreIds: ["fixture-post-punk"],
              sceneIds: ["fixture-scene-with-genre"],
            }),
            expect.objectContaining({
              id: "fixture-album-without-scene",
              sceneIds: [],
            }),
          ]),
        );

        const responseText = JSON.stringify([
          countryBody,
          genreBody,
          artistBody,
        ]).toLowerCase();
        expect(responseText).not.toContain("research");
        expect(responseText).not.toContain("sourceids");
        expect(responseText).not.toContain("consulteddate");
      } finally {
        await app.close();
      }
    });
  });

  it("returns an empty collection for a Genre with no Artists", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      const app = buildApp({ repository });

      try {
        const response = await app.inject("/api/genres/fixture-orphan-genre");
        expect(response.statusCode).toBe(200);
        expect(response.json().data.artists).toEqual([]);
      } finally {
        await app.close();
      }
    });
  });

  it("returns predictable errors for missing resources and invalid IDs", async () => {
    await withRepositoryFixture(databaseUrl, async (repository) => {
      const app = buildApp({ repository });

      try {
        const missing = await app.inject("/api/artists/missing-artist");
        expect(missing.statusCode).toBe(404);
        expect(missing.json()).toEqual({
          error: {
            code: "NOT_FOUND",
            message: "Artist 'missing-artist' was not found.",
          },
        });

        const invalid = await app.inject("/api/genres/Invalid_ID");
        expect(invalid.statusCode).toBe(400);
        expect(invalid.json()).toEqual({
          error: {
            code: "INVALID_PARAMETER",
            message:
              "The resource identifier must be a lowercase kebab-case value.",
          },
        });
      } finally {
        await app.close();
      }
    });
  });
});
