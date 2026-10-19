import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { repositoryRoot } from "../repository-paths.js";
import {
  catalogSchema,
  researchNotesSchema,
  type Catalog,
  type ResearchNotes,
} from "./schema.js";

export const defaultCatalogPath = resolve(
  repositoryRoot,
  "content/catalog.json",
);
export const defaultResearchNotesPath = resolve(
  repositoryRoot,
  "content/research-notes.json",
);

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentValidationError";
  }
}

async function readJsonFile(path: string): Promise<unknown> {
  let text: string;

  try {
    text = await readFile(path, "utf8");
  } catch (error) {
    throw new ContentValidationError(
      `Unable to read content file ${path}: ${String(error)}`,
    );
  }

  try {
    return JSON.parse(text) as unknown;
  } catch (error) {
    throw new ContentValidationError(
      `Invalid JSON in ${path}: ${String(error)}`,
    );
  }
}

function uniqueIds(
  values: readonly { id: string }[],
  label: string,
  issues: string[],
): Set<string> {
  const ids = new Set<string>();

  for (const value of values) {
    if (ids.has(value.id)) {
      issues.push(`${label} contains duplicate id '${value.id}'`);
    }
    ids.add(value.id);
  }

  return ids;
}

function checkReferences(
  values: readonly {
    id: string;
    countryId: string;
    genreIds?: string[];
    sceneIds?: string[];
  }[],
  label: string,
  countryIds: Set<string>,
  genreIds: Set<string>,
  sceneIds: Set<string>,
  issues: string[],
): void {
  values.forEach((value) => {
    if (!countryIds.has(value.countryId)) {
      issues.push(
        `${label} '${value.id}' references missing country '${value.countryId}'`,
      );
    }
    value.genreIds?.forEach((genreId) => {
      if (!genreIds.has(genreId)) {
        issues.push(
          `${label} '${value.id}' references missing genre '${genreId}'`,
        );
      }
    });
    value.sceneIds?.forEach((sceneId) => {
      if (!sceneIds.has(sceneId)) {
        issues.push(
          `${label} '${value.id}' references missing scene '${sceneId}'`,
        );
      }
    });
  });
}

export function validateCatalogObject(
  value: unknown,
  filePath = "content/catalog.json",
): Catalog {
  const parsed = catalogSchema.safeParse(value);

  if (!parsed.success) {
    throw new ContentValidationError(
      `${filePath} has invalid structure:\n${parsed.error.issues.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`).join("\n")}`,
    );
  }

  const catalog = parsed.data;
  const issues: string[] = [];
  const countryIds = uniqueIds(catalog.countries, "countries", issues);
  const genreIds = uniqueIds(catalog.genres, "genres", issues);
  const sceneIds = uniqueIds(catalog.scenes, "scenes", issues);
  const artistIds = uniqueIds(catalog.artists, "artists", issues);
  uniqueIds(catalog.albums, "albums", issues);

  if (catalog.countries.length !== 1 || !countryIds.has("england")) {
    issues.push(
      "MVP catalog must contain exactly one country with id 'england'",
    );
  }

  checkReferences(
    catalog.genres,
    "genre",
    countryIds,
    genreIds,
    sceneIds,
    issues,
  );
  checkReferences(
    catalog.scenes,
    "scene",
    countryIds,
    genreIds,
    sceneIds,
    issues,
  );
  checkReferences(
    catalog.artists,
    "artist",
    countryIds,
    genreIds,
    sceneIds,
    issues,
  );
  checkReferences(
    catalog.albums,
    "album",
    countryIds,
    genreIds,
    sceneIds,
    issues,
  );

  catalog.albums.forEach((album) => {
    album.artistIds.forEach((artistId) => {
      if (!artistIds.has(artistId)) {
        issues.push(
          `album '${album.id}' references missing artist '${artistId}'`,
        );
      }
    });
    if (album.artistIds.length === 0) {
      issues.push(`album '${album.id}' must have at least one artist`);
    }
    if (album.genreIds.length === 0) {
      issues.push(`album '${album.id}' must have at least one genre`);
    }
  });

  catalog.artists.forEach((artist) => {
    const hasAlbum = catalog.albums.some((album) =>
      album.artistIds.includes(artist.id),
    );
    if (!hasAlbum) {
      issues.push(`artist '${artist.id}' must have at least one album`);
    }
  });

  if (issues.length > 0) {
    throw new ContentValidationError(
      `${filePath} has invalid references or domain constraints:\n${issues.map((issue) => `- ${issue}`).join("\n")}`,
    );
  }

  return catalog;
}

export function validateResearchNotesObject(
  value: unknown,
  catalog: Catalog,
  filePath = "content/research-notes.json",
): ResearchNotes {
  const parsed = researchNotesSchema.safeParse(value);

  if (!parsed.success) {
    throw new ContentValidationError(
      `${filePath} has invalid structure:\n${parsed.error.issues.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`).join("\n")}`,
    );
  }

  const notes = parsed.data;
  const issues: string[] = [];
  const sourceIds = uniqueIds(notes.sources, "research sources", issues);
  const expectedEntries = new Set([
    ...catalog.countries.map((entry) => `country:${entry.id}`),
    ...catalog.genres.map((entry) => `genre:${entry.id}`),
    ...catalog.scenes.map((entry) => `scene:${entry.id}`),
    ...catalog.artists.map((entry) => `artist:${entry.id}`),
    ...catalog.albums.map((entry) => `album:${entry.id}`),
  ]);
  const noteKeys = new Set<string>();

  notes.entries.forEach((entry) => {
    const key = `${entry.entryType}:${entry.entryId}`;
    if (noteKeys.has(key)) {
      issues.push(`research notes contain duplicate entry '${key}'`);
    }
    noteKeys.add(key);
    if (!expectedEntries.has(key)) {
      issues.push(`research note references missing catalog entry '${key}'`);
    }
    entry.sourceIds.forEach((sourceId) => {
      if (!sourceIds.has(sourceId)) {
        issues.push(
          `research note '${key}' references missing source '${sourceId}'`,
        );
      }
    });
  });

  expectedEntries.forEach((key) => {
    if (!noteKeys.has(key)) {
      issues.push(
        `catalog entry '${key}' is missing an internal research note`,
      );
    }
  });

  if (issues.length > 0) {
    throw new ContentValidationError(
      `${filePath} has invalid references:\n${issues.map((issue) => `- ${issue}`).join("\n")}`,
    );
  }

  return notes;
}

export async function validateContentFiles(
  catalogPath = defaultCatalogPath,
  researchNotesPath = defaultResearchNotesPath,
): Promise<{ catalog: Catalog; researchNotes: ResearchNotes }> {
  const catalog = validateCatalogObject(
    await readJsonFile(catalogPath),
    catalogPath,
  );
  const researchNotes = validateResearchNotesObject(
    await readJsonFile(researchNotesPath),
    catalog,
    researchNotesPath,
  );

  return { catalog, researchNotes };
}
