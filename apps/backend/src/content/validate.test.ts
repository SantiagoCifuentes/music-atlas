import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ContentValidationError,
  validateCatalogObject,
  validateContentFiles,
  validateResearchNotesObject,
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

  it("allows a Scene without a Genre association", async () => {
    const { catalog } = await validateContentFiles();
    const invalidCatalog = structuredClone(catalog);
    invalidCatalog.scenes[0]!.genreIds = [];

    expect(() => validateCatalogObject(invalidCatalog)).not.toThrow();
  });

  it("requires each research entry to identify at least one source", async () => {
    const { catalog, researchNotes } = await validateContentFiles();
    const invalidNotes = structuredClone(researchNotes);
    invalidNotes.entries[0]!.sourceIds = [];

    expect(() => validateResearchNotesObject(invalidNotes, catalog)).toThrow(
      "entries.0.sourceIds: Too small",
    );
  });

  it("allows a research source URL to be unavailable", async () => {
    const { catalog, researchNotes } = await validateContentFiles();
    const notesWithoutUrl = structuredClone(researchNotes);
    delete notesWithoutUrl.sources[0]!.url;

    expect(() =>
      validateResearchNotesObject(notesWithoutUrl, catalog),
    ).not.toThrow();
  });

  it("rejects malformed JSON through the file-loading path", async () => {
    const directory = mkdtempSync(join(tmpdir(), "music-atlas-content-"));
    const malformedPath = join(directory, "catalog.json");
    writeFileSync(malformedPath, "{ malformed");

    try {
      await expect(validateContentFiles(malformedPath)).rejects.toThrow(
        `Invalid JSON in ${malformedPath}`,
      );
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
