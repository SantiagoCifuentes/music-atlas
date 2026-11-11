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

export class CatalogApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "CatalogApiError";
  }
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new CatalogApiError(
      0,
      "Music Atlas could not reach the catalog service. Please try again.",
    );
  }

  const body = (await response.json().catch(() => undefined)) as
    { error?: { message?: string } } | undefined;

  if (!response.ok) {
    throw new CatalogApiError(
      response.status,
      body?.error?.message ?? "Music Atlas could not load this catalog entry.",
    );
  }

  return body as T;
}

export interface CountryDiscoveryResponse {
  data: { country: Country; genres: Genre[]; scenes: Scene[] };
}

export interface GenreDiscoveryResponse {
  data: { genre: Genre; artists: Artist[] };
}

export interface ArtistDiscoveryResponse {
  data: { artist: Artist; albums: Album[] };
}

export interface AlbumDiscoveryResponse {
  data: { album: Album; artists: Artist[] };
}

export function getCountry(id: string, signal?: AbortSignal) {
  return get<CountryDiscoveryResponse>(`/api/countries/${id}`, signal);
}

export function getGenre(id: string, signal?: AbortSignal) {
  return get<GenreDiscoveryResponse>(`/api/genres/${id}`, signal);
}

export function getArtist(id: string, signal?: AbortSignal) {
  return get<ArtistDiscoveryResponse>(`/api/artists/${id}`, signal);
}

export function getAlbum(id: string, signal?: AbortSignal) {
  return get<AlbumDiscoveryResponse>(`/api/albums/${id}`, signal);
}
