-- Custom SQL migration file, put your code below! --
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
$$ LANGUAGE plpgsql;
--> statement-breakpoint
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
$$ LANGUAGE plpgsql;
--> statement-breakpoint
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
$$ LANGUAGE plpgsql;
--> statement-breakpoint
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
$$ LANGUAGE plpgsql;
