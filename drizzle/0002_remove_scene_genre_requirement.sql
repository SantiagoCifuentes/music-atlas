-- Remove the previously introduced, unapproved minimum Scene-to-Genre rule.
DROP TRIGGER IF EXISTS scene_requires_genre_on_scene ON scenes;
DROP TRIGGER IF EXISTS scene_requires_genre_on_association ON scene_genres;
DROP FUNCTION IF EXISTS music_atlas_assert_scene_has_genre();
