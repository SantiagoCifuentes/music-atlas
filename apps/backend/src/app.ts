import Fastify from "fastify";
import { createDatabase, type Database } from "./db/client.js";
import { createCatalogRepository } from "./db/catalog-repository.js";
import type { CatalogRepository } from "./domain/repositories.js";
import { ApiError, registerDiscoveryRoutes } from "./api/discovery-routes.js";

export function buildApp(
  options: {
    repository?: CatalogRepository;
    databaseUrl?: string;
  } = {},
) {
  const app = Fastify({ logger: true });
  let database: { db: Database; pool: { end(): Promise<void> } } | undefined;
  const repository =
    options.repository ??
    (() => {
      if (!options.databaseUrl) {
        throw new Error("A database URL or CatalogRepository is required.");
      }
      database = createDatabase(options.databaseUrl);
      return createCatalogRepository(database.db);
    })();

  app.get("/health", async () => ({ status: "ok" }));
  registerDiscoveryRoutes(app, repository);

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({
        error: { code: error.code, message: error.message },
      });
    }

    request.log.error(error);
    return reply.code(500).send({
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred.",
      },
    });
  });

  app.addHook("onClose", async () => {
    await database?.pool.end();
  });

  return app;
}
