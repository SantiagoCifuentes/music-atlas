import { describe, expect, it } from "vitest";
import {
  DomainValidationError,
  type DomainCatalog,
  validateDomainCatalog,
} from "./catalog.js";

const validCatalog = (): DomainCatalog => ({
  countries: [
    {
      id: "england",
      slug: "england",
      name: "England",
      description: "A country context.",
    },
  ],
  genres: [
    {
      id: "post-punk",
      countryId: "england",
      slug: "post-punk",
      name: "Post-Punk",
      description: "A genre.",
    },
  ],
  scenes: [
    {
      id: "local-scene",
      countryId: "england",
      slug: "local-scene",
      name: "Local Scene",
      description: "A scene.",
      timePeriod: "1980s",
      isOngoing: false,
      genreIds: [],
    },
  ],
  artists: [
    {
      id: "local-artist",
      countryId: "england",
      slug: "local-artist",
      name: "Local Artist",
      description: "An artist.",
      genreIds: ["post-punk"],
      sceneIds: [],
    },
  ],
  albums: [
    {
      id: "local-album",
      countryId: "england",
      slug: "local-album",
      title: "Local Album",
      description: "An album.",
      releaseType: "studio_album",
      artistIds: ["local-artist"],
      genreIds: ["post-punk"],
      sceneIds: [],
    },
  ],
});

describe("domain catalog rules", () => {
  it("validates approved relationships without requiring a Scene Genre", () => {
    expect(() => validateDomainCatalog(validCatalog())).not.toThrow();
  });

  it("requires Albums to have a Genre", () => {
    const catalog = validCatalog();
    catalog.albums[0]!.genreIds = [];

    expect(() => validateDomainCatalog(catalog)).toThrow(
      "album 'local-album' must have at least one genre",
    );
  });

  it("requires Artists to have an Album", () => {
    const catalog = validCatalog();
    catalog.albums = [];

    expect(() => validateDomainCatalog(catalog)).toThrow(
      "artist 'local-artist' must have at least one album",
    );
  });

  it("reports invalid references as domain errors", () => {
    const catalog = validCatalog();
    catalog.albums[0]!.sceneIds = ["missing-scene"];

    try {
      validateDomainCatalog(catalog);
      throw new Error("expected domain validation to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(DomainValidationError);
      expect((error as DomainValidationError).issues).toContain(
        "album 'local-album' references missing scene 'missing-scene'",
      );
    }
  });
});
