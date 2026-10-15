import { z } from "zod";

const id = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be a kebab-case stable id");
const sourceId = z
  .string()
  .regex(/^S\d{2}$/, "must use the source register format S##");

const editorialEntry = {
  id,
  name: z.string().trim().min(1),
  slug: id,
  description: z.string().trim().min(1),
  countryId: id,
};

export const catalogSchema = z.strictObject({
  schemaVersion: z.literal(1),
  countries: z
    .array(
      z.strictObject({
        id,
        name: z.string().trim().min(1),
        slug: id,
        description: z.string().trim().min(1),
      }),
    )
    .min(1),
  genres: z
    .array(
      z.strictObject({
        ...editorialEntry,
      }),
    )
    .min(1),
  scenes: z
    .array(
      z.strictObject({
        ...editorialEntry,
        timePeriod: z.string().trim().min(1),
        isOngoing: z.boolean(),
        genreIds: z.array(id).min(1),
      }),
    )
    .min(1),
  artists: z
    .array(
      z.strictObject({
        ...editorialEntry,
        genreIds: z.array(id).min(1),
        sceneIds: z.array(id),
      }),
    )
    .min(1),
  albums: z
    .array(
      z.strictObject({
        id,
        title: z.string().trim().min(1),
        slug: id,
        description: z.string().trim().min(1),
        releaseType: z.enum([
          "studio_album",
          "ep",
          "mixtape",
          "compilation",
          "live_album",
        ]),
        countryId: id,
        artistIds: z.array(id).min(1),
        genreIds: z.array(id).min(1),
        sceneIds: z.array(id),
      }),
    )
    .min(1),
});

export const researchNotesSchema = z.strictObject({
  schemaVersion: z.literal(1),
  consultedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sources: z
    .array(
      z.strictObject({
        id: sourceId,
        title: z.string().trim().min(1),
        url: z.string().url(),
      }),
    )
    .min(1),
  entries: z
    .array(
      z.strictObject({
        entryType: z.enum(["country", "genre", "scene", "artist", "album"]),
        entryId: id,
        sourceIds: z.array(sourceId),
        englandConnectionNote: z.string().trim().min(1),
      }),
    )
    .min(1),
});

export type Catalog = z.infer<typeof catalogSchema>;
export type ResearchNotes = z.infer<typeof researchNotesSchema>;
