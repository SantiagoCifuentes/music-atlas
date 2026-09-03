# Music Atlas MVP Requirements

## Product Vision

Music Atlas is a curated discovery guide to music scenes, artists, and albums connected to England.

The MVP should help people explore music through meaningful cultural, historical, geographical, and artistic context. It should not try to be an exhaustive encyclopedia or a streaming service. Its value should come from careful curation, clear relationships between entities, and approachable discovery paths.

For the first version, Music Atlas focuses on England only. This keeps the product scope narrow while still providing enough depth to explore the distinction between genres, scenes, artists, and albums.

## MVP Purpose

The MVP should answer:

> Can users discover meaningful music scenes, artists, and albums connected to England through a curated, country-based guide?

For MVP purposes, content should have a meaningful historical, cultural, geographical, or artistic connection to England.

## MVP Scope

The MVP includes:

- One country focus: England
- 6-10 genres
- 5-8 scenes
- 15-30 artists
- 15-30 albums
- Curated descriptions for core entries
- Basic navigation between country, genres, scenes, artists, and albums
- Real, intentionally small curated data
- No external integrations
- No user accounts
- No public submissions
- No full discographies

The MVP should prioritize clarity, usefulness, and domain learning over feature breadth.

## Out-of-Scope Features

The following are intentionally excluded from the MVP:

- Multi-country browsing
- Streaming or audio playback
- Spotify, YouTube, MusicBrainz, Discogs, Wikipedia, or other external integrations
- User accounts
- Favorites or bookmarks
- Ratings, reviews, comments, or social features
- Public content submissions
- Admin CMS or editorial workflow tooling
- Automated data ingestion
- Advanced search
- Recommendation algorithms
- Interactive map as the primary experience
- Track-level data
- Full artist discographies
- Complex genre taxonomies or parent-child genre hierarchies
- Complex scene taxonomy
- Database design
- API design
- Application architecture design
- Implementation planning

## Domain Notes

### Country

For the MVP, England is the only country focus.

The country acts as the broad organizing context for discovery. It does not require every entry to be exclusively English, only that the entry has a meaningful historical, cultural, geographical, or artistic connection to England.

### Genre

A genre is primarily a musical classification.

Genres describe recognizable musical traits such as rhythm, instrumentation, vocal style, production style, song structure, performance practice, or stylistic lineage.

Examples that may be relevant to the England MVP include:

- Punk rock
- Heavy metal
- Post-punk
- Synth-pop
- Shoegaze
- Jungle
- UK garage
- Grime
- Britpop
- Trip hop

Genres can cross places, time periods, and scenes. A genre may appear in several scenes, and a scene may contain several genres.

### Scene

A scene is primarily a social, geographical, historical, or cultural formation.

Scenes describe contexts where music is created, shared, performed, distributed, debated, or remembered. A scene may involve cities, venues, labels, studios, audiences, media channels, technology, time periods, and shared cultural identity.

Examples that may be relevant to the England MVP include:

- London punk scene
- Birmingham heavy metal scene
- Manchester post-punk / Madchester context
- Sheffield synth-pop scene
- Bristol trip hop scene
- London grime scene
- Thames Valley shoegaze scene
- Liverpool Merseybeat scene

A simple working distinction:

> Genre asks: what kind of music is this?
>
> Scene asks: where, when, and among whom did this music live?

### Genre and Scene Relationship

Genre and Scene should remain distinct domain concepts in the MVP.

The MVP should allow:

- Artists to relate to genres
- Artists to relate to scenes
- Albums to relate to genres
- Albums to relate to scenes
- Scenes to relate to one or more genres
- Genres to exist without requiring a scene
- Scenes to exist without being reduced to genres

The MVP should not introduce complex hierarchy, weighting, or taxonomy rules yet.

### Artist

An artist is a person or group connected to one or more genres, scenes, and albums.

For the MVP, an artist should be included when there is a meaningful connection to England and the artist helps users understand one or more selected genres, scenes, or albums.

The MVP should not attempt to represent full biographies or complete discographies.

### Album

An album is a curated listening entry connected to an artist.

For the MVP, albums should be selected because they help users enter or understand a genre, scene, artist, or historical moment connected to England.

The MVP should not include full discographies or track-level detail.

## Core User Journeys

### Explore the England Entry

A user arrives at Music Atlas and sees England as the initial country focus. They can understand what the guide covers and choose a path into genres, scenes, artists, or albums.

### Discover by Genre

A user selects a genre and learns what characterizes it, why it matters in the England-focused guide, and which scenes, artists, and albums provide useful entry points.

### Discover by Scene

A user selects a scene and learns where, when, and among whom it developed. They can see related genres, representative artists, and recommended albums.

### Move from Artist to Album

A user opens an artist page, reads a concise curated description, and sees one or more recommended albums connected to that artist.

### Move from Album to Context

A user opens an album page and understands why it matters. They can navigate back to related artist, genre, and scene entries.

### Follow a Curated Discovery Path

A user can move through related entries without needing prior expertise. For example:

England -> London grime scene -> Grime -> Dizzee Rascal -> Boy in da Corner

## Initial Content Boundaries

The initial dataset should be real, small, and curated.

Target content ranges:

- Countries: 1
- Genres: 6-10
- Scenes: 5-8
- Artists: 15-30
- Albums: 15-30

Content selection should favor:

- Clear connection to England
- Strong usefulness as a discovery entry point
- Representation across different periods and styles
- Clear relationships between scenes, genres, artists, and albums
- Concise explanations over exhaustive coverage

Content selection should avoid:

- Entries with only weak or incidental connection to England
- Trying to cover every important artist or album
- Treating England as culturally isolated from broader UK, Caribbean, Irish, South Asian, African, European, or global influences
- Flattening scenes into genres
- Presenting complex attribution questions as settled when they are not

## Open Questions

- Should the MVP voice be more beginner-friendly, more critic-curated, or somewhere between the two?
- Should the initial content balance historical foundations and contemporary discovery, or lean toward one?
- Should scenes always have a geographic anchor, or can they also be label-based, venue-based, media-based, or movement-based?
- Should the MVP include explicit "start here" recommendations, such as a short listening path or essential albums list?
- How much broader UK context should be allowed when explaining entries connected to England?
- How should the product handle artists or albums with meaningful connections to multiple countries?
- Should sources or references be visible to users in the MVP, or tracked only internally at first?

## Acceptance Criteria

The MVP requirements are satisfied when:

- The product clearly presents Music Atlas as a curated discovery guide to music scenes, artists, and albums connected to England.
- England is the only country focus.
- Users can navigate between country, genre, scene, artist, and album entries.
- Genre and Scene are represented as distinct concepts.
- Genre pages can connect to scenes, artists, and albums.
- Scene pages can connect to genres, artists, and albums.
- Artist pages can connect to genres, scenes, and albums.
- Album pages can connect to artists, genres, and scenes.
- The content dataset is intentionally small and real.
- Content follows the principle: "For MVP purposes, content should have a meaningful historical, cultural, geographical, or artistic connection to England."
- The MVP excludes integrations, accounts, public submissions, full discographies, database design, API design, application architecture, and implementation planning.
- Open product questions are documented before later architecture or implementation work begins.
