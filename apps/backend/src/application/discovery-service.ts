import type {
  Album,
  Artist,
  Country,
  Genre,
  Scene,
} from "../domain/catalog.js";
import type { CatalogRepository } from "../domain/repositories.js";

export interface EnglandDiscovery {
  country: Country;
  genres: Genre[];
  scenes: Scene[];
}

export interface GenreDiscovery {
  genre: Genre;
  artists: Artist[];
}

export interface ArtistDiscovery {
  artist: Artist;
  albums: Album[];
}

export function createDiscoveryService(repository: CatalogRepository) {
  return {
    async getCountryDiscovery(id: string): Promise<EnglandDiscovery | null> {
      const country = await repository.findCountryById(id);
      if (!country) return null;

      const [genres, scenes] = await Promise.all([
        repository.findGenresByCountryId(id),
        repository.findScenesByCountryId(id),
      ]);

      return { country, genres, scenes };
    },

    async getGenreDiscovery(id: string): Promise<GenreDiscovery | null> {
      const genre = await repository.findGenreById(id);
      if (!genre) return null;

      return {
        genre,
        artists: await repository.findArtistsByGenreId(id),
      };
    },

    async getArtistDiscovery(id: string): Promise<ArtistDiscovery | null> {
      const artist = await repository.findArtistById(id);
      if (!artist) return null;

      return {
        artist,
        albums: await repository.findAlbumsByArtistId(id),
      };
    },
  };
}
