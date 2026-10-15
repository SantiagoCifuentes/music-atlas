import { describe, expect, it } from "vitest";
import {
  ContentValidationError,
  validateCatalogObject,
  validateContentFiles,
} from "./validate.js";

describe("curated content validation", () => {
  it("validates the approved pilot catalog and research notes", async () => {
    const result = await validateContentFiles();

    expect(result.catalog.countries).toHaveLength(1);
    expect(result.catalog.genres).toHaveLength(10);
    expect(result.catalog.scenes).toHaveLength(7);
    expect(result.catalog.artists).toHaveLength(18);
    expect(result.catalog.albums).toHaveLength(18);
    expect(result.researchNotes.entries).toHaveLength(54);
  });

  it("rejects an album without a Genre before loading", async () => {
    const { catalog } = await validateContentFiles();
    const invalidCatalog = structuredClone(catalog);
    invalidCatalog.albums[0]!.genreIds = [];

    expect(() => validateCatalogObject(invalidCatalog)).toThrowError(
      ContentValidationError,
    );
    expect(() => validateCatalogObject(invalidCatalog)).toThrow(
      "albums.0.genreIds: Too small",
    );
  });

  it("rejects an invalid relationship reference", async () => {
    const { catalog } = await validateContentFiles();
    const invalidCatalog = structuredClone(catalog);
    invalidCatalog.artists[0]!.sceneIds = ["missing-scene"];

    expect(() => validateCatalogObject(invalidCatalog)).toThrow(
      "artist 'the-beatles' references missing scene 'missing-scene'",
    );
  });
});
