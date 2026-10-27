export type ReleaseType =
  "studio_album" | "ep" | "mixtape" | "compilation" | "live_album";

export interface Country {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface Genre {
  id: string;
  countryId: string;
  slug: string;
  name: string;
  description: string;
}

export interface Scene {
  id: string;
  countryId: string;
  slug: string;
  name: string;
  description: string;
  timePeriod: string;
  isOngoing: boolean;
  genreIds: string[];
}

export interface Artist {
  id: string;
  countryId: string;
  slug: string;
  name: string;
  description: string;
  genreIds: string[];
  sceneIds: string[];
}

export interface Album {
  id: string;
  countryId: string;
  slug: string;
  title: string;
  description: string;
  releaseType: ReleaseType;
  artistIds: string[];
  genreIds: string[];
  sceneIds: string[];
}

export interface DomainCatalog {
  countries: Country[];
  genres: Genre[];
  scenes: Scene[];
  artists: Artist[];
  albums: Album[];
}

export class DomainValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(issues.join("\n"));
    this.name = "DomainValidationError";
  }
}

function uniqueIds(
  values: readonly { id: string }[],
  label: string,
  issues: string[],
) {
  const ids = new Set<string>();

  for (const value of values) {
    if (ids.has(value.id))
      issues.push(`${label} contains duplicate id '${value.id}'`);
    ids.add(value.id);
  }

  return ids;
}

function checkCountryReference(
  entry: { id: string; countryId: string },
  label: string,
  countryIds: Set<string>,
  issues: string[],
) {
  if (!countryIds.has(entry.countryId)) {
    issues.push(
      `${label} '${entry.id}' references missing country '${entry.countryId}'`,
    );
  }
}

export function validateDomainCatalog(catalog: DomainCatalog): void {
  const issues: string[] = [];
  const countryIds = uniqueIds(catalog.countries, "countries", issues);
  const genreIds = uniqueIds(catalog.genres, "genres", issues);
  const sceneIds = uniqueIds(catalog.scenes, "scenes", issues);
  const artistIds = uniqueIds(catalog.artists, "artists", issues);
  uniqueIds(catalog.albums, "albums", issues);

  for (const genre of catalog.genres) {
    checkCountryReference(genre, "genre", countryIds, issues);
  }

  for (const scene of catalog.scenes) {
    checkCountryReference(scene, "scene", countryIds, issues);
    if (scene.timePeriod.trim().length === 0) {
      issues.push(`scene '${scene.id}' must have a time period`);
    }
    for (const genreId of scene.genreIds) {
      if (!genreIds.has(genreId)) {
        issues.push(
          `scene '${scene.id}' references missing genre '${genreId}'`,
        );
      }
    }
  }

  for (const artist of catalog.artists) {
    checkCountryReference(artist, "artist", countryIds, issues);
    for (const genreId of artist.genreIds) {
      if (!genreIds.has(genreId)) {
        issues.push(
          `artist '${artist.id}' references missing genre '${genreId}'`,
        );
      }
    }
    for (const sceneId of artist.sceneIds) {
      if (!sceneIds.has(sceneId)) {
        issues.push(
          `artist '${artist.id}' references missing scene '${sceneId}'`,
        );
      }
    }
  }

  for (const album of catalog.albums) {
    checkCountryReference(album, "album", countryIds, issues);
    if (album.artistIds.length === 0) {
      issues.push(`album '${album.id}' must have at least one artist`);
    }
    if (album.genreIds.length === 0) {
      issues.push(`album '${album.id}' must have at least one genre`);
    }
    for (const artistId of album.artistIds) {
      if (!artistIds.has(artistId)) {
        issues.push(
          `album '${album.id}' references missing artist '${artistId}'`,
        );
      }
    }
    for (const genreId of album.genreIds) {
      if (!genreIds.has(genreId)) {
        issues.push(
          `album '${album.id}' references missing genre '${genreId}'`,
        );
      }
    }
    for (const sceneId of album.sceneIds) {
      if (!sceneIds.has(sceneId)) {
        issues.push(
          `album '${album.id}' references missing scene '${sceneId}'`,
        );
      }
    }
  }

  for (const artist of catalog.artists) {
    if (!catalog.albums.some((album) => album.artistIds.includes(artist.id))) {
      issues.push(`artist '${artist.id}' must have at least one album`);
    }
  }

  if (issues.length > 0) throw new DomainValidationError(issues);
}
