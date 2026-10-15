import { validateContentFiles } from "./validate.js";

try {
  const { catalog, researchNotes } = await validateContentFiles();
  console.log(
    `Validated ${catalog.countries.length} country, ${catalog.genres.length} genres, ${catalog.scenes.length} scenes, ${catalog.artists.length} artists, ${catalog.albums.length} albums, and ${researchNotes.entries.length} research notes.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
