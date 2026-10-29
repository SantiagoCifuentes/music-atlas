import type { Album, Artist, Country, Genre, Scene } from "./catalog.js";

export interface CatalogRepository {
  findCountryById(id: string): Promise<Country | null>;
  findGenresByCountryId(countryId: string): Promise<Genre[]>;
  findScenesByCountryId(countryId: string): Promise<Scene[]>;
  findGenreById(id: string): Promise<Genre | null>;
  findSceneById(id: string): Promise<Scene | null>;
  findArtistById(id: string): Promise<Artist | null>;
  findAlbumById(id: string): Promise<Album | null>;
  findGenresBySceneId(sceneId: string): Promise<Genre[]>;
  findArtistsByGenreId(genreId: string): Promise<Artist[]>;
  findArtistsBySceneId(sceneId: string): Promise<Artist[]>;
  findAlbumsByArtistId(artistId: string): Promise<Album[]>;
  findAlbumsByGenreId(genreId: string): Promise<Album[]>;
  findAlbumsBySceneId(sceneId: string): Promise<Album[]>;
}
