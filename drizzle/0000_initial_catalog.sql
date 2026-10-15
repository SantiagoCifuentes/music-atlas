CREATE TABLE "album_artists" (
	"album_id" text NOT NULL,
	"artist_id" text NOT NULL,
	CONSTRAINT "album_artists_album_id_artist_id_pk" PRIMARY KEY("album_id","artist_id")
);
--> statement-breakpoint
CREATE TABLE "album_genres" (
	"album_id" text NOT NULL,
	"genre_id" text NOT NULL,
	CONSTRAINT "album_genres_album_id_genre_id_pk" PRIMARY KEY("album_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "album_scenes" (
	"album_id" text NOT NULL,
	"scene_id" text NOT NULL,
	CONSTRAINT "album_scenes_album_id_scene_id_pk" PRIMARY KEY("album_id","scene_id")
);
--> statement-breakpoint
CREATE TABLE "albums" (
	"id" text PRIMARY KEY NOT NULL,
	"country_id" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"release_type" text NOT NULL,
	CONSTRAINT "albums_release_type_check" CHECK ("albums"."release_type" in ('studio_album', 'ep', 'mixtape', 'compilation', 'live_album'))
);
--> statement-breakpoint
CREATE TABLE "artist_genres" (
	"artist_id" text NOT NULL,
	"genre_id" text NOT NULL,
	CONSTRAINT "artist_genres_artist_id_genre_id_pk" PRIMARY KEY("artist_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "artist_scenes" (
	"artist_id" text NOT NULL,
	"scene_id" text NOT NULL,
	CONSTRAINT "artist_scenes_artist_id_scene_id_pk" PRIMARY KEY("artist_id","scene_id")
);
--> statement-breakpoint
CREATE TABLE "artists" (
	"id" text PRIMARY KEY NOT NULL,
	"country_id" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" text PRIMARY KEY NOT NULL,
	"country_id" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scene_genres" (
	"scene_id" text NOT NULL,
	"genre_id" text NOT NULL,
	CONSTRAINT "scene_genres_scene_id_genre_id_pk" PRIMARY KEY("scene_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "scenes" (
	"id" text PRIMARY KEY NOT NULL,
	"country_id" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"time_period" text NOT NULL,
	"is_ongoing" boolean DEFAULT false NOT NULL,
	CONSTRAINT "scenes_time_period_not_empty" CHECK (length(trim("scenes"."time_period")) > 0)
);
--> statement-breakpoint
ALTER TABLE "album_artists" ADD CONSTRAINT "album_artists_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_artists" ADD CONSTRAINT "album_artists_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_genres" ADD CONSTRAINT "album_genres_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_genres" ADD CONSTRAINT "album_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_scenes" ADD CONSTRAINT "album_scenes_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_scenes" ADD CONSTRAINT "album_scenes_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artist_genres" ADD CONSTRAINT "artist_genres_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artist_genres" ADD CONSTRAINT "artist_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artist_scenes" ADD CONSTRAINT "artist_scenes_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artist_scenes" ADD CONSTRAINT "artist_scenes_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artists" ADD CONSTRAINT "artists_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genres" ADD CONSTRAINT "genres_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scene_genres" ADD CONSTRAINT "scene_genres_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scene_genres" ADD CONSTRAINT "scene_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "albums_slug_unique" ON "albums" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "artists_slug_unique" ON "artists" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "countries_slug_unique" ON "countries" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_slug_unique" ON "genres" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "scenes_slug_unique" ON "scenes" USING btree ("slug");--> statement-breakpoint
CREATE OR REPLACE FUNCTION music_atlas_assert_album_has_genre() RETURNS trigger AS $$
DECLARE
  entity_id text;
BEGIN
  entity_id := CASE WHEN TG_TABLE_NAME = 'albums' THEN to_jsonb(NEW)->>'id' WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)->>'album_id' ELSE to_jsonb(NEW)->>'album_id' END;
  IF EXISTS (SELECT 1 FROM albums WHERE id = entity_id)
     AND NOT EXISTS (SELECT 1 FROM album_genres WHERE album_id = entity_id) THEN
    RAISE EXCEPTION 'Album % must have at least one Genre', entity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
CREATE OR REPLACE FUNCTION music_atlas_assert_album_has_artist() RETURNS trigger AS $$
DECLARE
  entity_id text;
BEGIN
  entity_id := CASE WHEN TG_TABLE_NAME = 'albums' THEN to_jsonb(NEW)->>'id' WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)->>'album_id' ELSE to_jsonb(NEW)->>'album_id' END;
  IF EXISTS (SELECT 1 FROM albums WHERE id = entity_id)
     AND NOT EXISTS (SELECT 1 FROM album_artists WHERE album_id = entity_id) THEN
    RAISE EXCEPTION 'Album % must have at least one Artist', entity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
CREATE OR REPLACE FUNCTION music_atlas_assert_artist_has_album() RETURNS trigger AS $$
DECLARE
  entity_id text;
BEGIN
  entity_id := CASE WHEN TG_TABLE_NAME = 'artists' THEN to_jsonb(NEW)->>'id' WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)->>'artist_id' ELSE to_jsonb(NEW)->>'artist_id' END;
  IF EXISTS (SELECT 1 FROM artists WHERE id = entity_id)
     AND NOT EXISTS (SELECT 1 FROM album_artists WHERE artist_id = entity_id) THEN
    RAISE EXCEPTION 'Artist % must have at least one Album', entity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
CREATE OR REPLACE FUNCTION music_atlas_assert_scene_has_genre() RETURNS trigger AS $$
DECLARE
  entity_id text;
BEGIN
  entity_id := CASE WHEN TG_TABLE_NAME = 'scenes' THEN to_jsonb(NEW)->>'id' WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)->>'scene_id' ELSE to_jsonb(NEW)->>'scene_id' END;
  IF EXISTS (SELECT 1 FROM scenes WHERE id = entity_id)
     AND NOT EXISTS (SELECT 1 FROM scene_genres WHERE scene_id = entity_id) THEN
    RAISE EXCEPTION 'Scene % must have at least one Genre', entity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
CREATE CONSTRAINT TRIGGER album_requires_genre_on_album AFTER INSERT OR UPDATE ON albums DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_album_has_genre();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER album_requires_genre_on_association AFTER INSERT OR UPDATE OR DELETE ON album_genres DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_album_has_genre();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER album_requires_artist_on_album AFTER INSERT OR UPDATE ON albums DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_album_has_artist();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER album_requires_artist_on_association AFTER INSERT OR UPDATE OR DELETE ON album_artists DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_album_has_artist();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER artist_requires_album_on_artist AFTER INSERT OR UPDATE ON artists DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_artist_has_album();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER artist_requires_album_on_association AFTER INSERT OR UPDATE OR DELETE ON album_artists DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_artist_has_album();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER scene_requires_genre_on_scene AFTER INSERT OR UPDATE ON scenes DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_scene_has_genre();--> statement-breakpoint
CREATE CONSTRAINT TRIGGER scene_requires_genre_on_association AFTER INSERT OR UPDATE OR DELETE ON scene_genres DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION music_atlas_assert_scene_has_genre();
