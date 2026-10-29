import { z } from "zod";
import type { FastifyInstance } from "fastify";
import { createDiscoveryService } from "../application/discovery-service.js";
import type { CatalogRepository } from "../domain/repositories.js";
import type {
  Album,
  Artist,
  Country,
  Genre,
  Scene,
} from "../domain/catalog.js";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const paramsSchema = z.object({ id: idSchema });

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: "INVALID_PARAMETER" | "NOT_FOUND",
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function parseId(params: unknown): string {
  const result = paramsSchema.safeParse(params);
  if (!result.success) {
    throw new ApiError(
      400,
      "INVALID_PARAMETER",
      "The resource identifier must be a lowercase kebab-case value.",
    );
  }
  return result.data.id;
}

function countryResponse(country: Country) {
  return {
    id: country.id,
    slug: country.slug,
    name: country.name,
    description: country.description,
  };
}

function genreResponse(genre: Genre) {
  return {
    id: genre.id,
    countryId: genre.countryId,
    slug: genre.slug,
    name: genre.name,
    description: genre.description,
  };
}

function sceneResponse(scene: Scene) {
  return {
    id: scene.id,
    countryId: scene.countryId,
    slug: scene.slug,
    name: scene.name,
    description: scene.description,
    timePeriod: scene.timePeriod,
    isOngoing: scene.isOngoing,
    genreIds: scene.genreIds,
  };
}

function artistResponse(artist: Artist) {
  return {
    id: artist.id,
    countryId: artist.countryId,
    slug: artist.slug,
    name: artist.name,
    description: artist.description,
    genreIds: artist.genreIds,
    sceneIds: artist.sceneIds,
  };
}

function albumResponse(album: Album) {
  return {
    id: album.id,
    countryId: album.countryId,
    slug: album.slug,
    title: album.title,
    description: album.description,
    releaseType: album.releaseType,
    artistIds: album.artistIds,
    genreIds: album.genreIds,
    sceneIds: album.sceneIds,
  };
}

export function registerDiscoveryRoutes(
  app: FastifyInstance,
  repository: CatalogRepository,
): void {
  const service = createDiscoveryService(repository);

  app.get("/api/countries/:id", async (request) => {
    const id = parseId(request.params);
    const discovery = await service.getCountryDiscovery(id);
    if (!discovery) {
      throw new ApiError(404, "NOT_FOUND", `Country '${id}' was not found.`);
    }

    return {
      data: {
        country: countryResponse(discovery.country),
        genres: discovery.genres.map(genreResponse),
        scenes: discovery.scenes.map(sceneResponse),
      },
    };
  });

  app.get("/api/genres/:id", async (request) => {
    const id = parseId(request.params);
    const discovery = await service.getGenreDiscovery(id);
    if (!discovery) {
      throw new ApiError(404, "NOT_FOUND", `Genre '${id}' was not found.`);
    }

    return {
      data: {
        genre: genreResponse(discovery.genre),
        artists: discovery.artists.map(artistResponse),
      },
    };
  });

  app.get("/api/artists/:id", async (request) => {
    const id = parseId(request.params);
    const discovery = await service.getArtistDiscovery(id);
    if (!discovery) {
      throw new ApiError(404, "NOT_FOUND", `Artist '${id}' was not found.`);
    }

    return {
      data: {
        artist: artistResponse(discovery.artist),
        albums: discovery.albums.map(albumResponse),
      },
    };
  });
}
