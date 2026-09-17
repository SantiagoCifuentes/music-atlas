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

Settled domain decisions are tracked in [domain-decisions.md](domain-decisions.md). The notes below summarize the product concepts that matter for the MVP.

### Country

For the MVP, England is the only country focus.

The country acts as the broad organizing context for discovery. It does not require every entry to be exclusively English, only that the entry has a meaningful historical, cultural, geographical, or artistic connection to England.

A meaningful England connection exists when England played a substantial historical, cultural, geographical, or artistic role in the development, consolidation, evolution, or cultural context of the entry. Mere popularity, commercial presence, or influence in England is not sufficient on its own.

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

Genre and Scene are distinct concepts even when similar or identical labels are used. The distinction should be clear from the editorial context rather than forced through artificial renaming.

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

Every Scene in the MVP should have a defined time period representing when it emerged, developed, or was particularly active. A Scene can have an ongoing or open-ended period.

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

Movements, subgenres, eras, and regional identities should remain descriptive context for the MVP unless they are accurately represented by an existing Genre or Scene entry.

### Artist

An artist is a person or group connected to one or more genres, scenes, and albums.

For the MVP, an artist should be included when there is a meaningful connection to England and the artist helps users understand one or more selected genres, scenes, or albums.

The MVP should not attempt to represent full biographies or complete discographies.

Every Artist included in the MVP should have at least one curated Album associated with them.

### Album

An album is a curated listening entry connected to an artist.

For the MVP, albums should be selected because they help users enter or understand a genre, scene, artist, or historical moment connected to England.

The MVP should not include full discographies or track-level detail.

Every Album should be associated with at least one Genre. Scene association is optional and should be used only when the Album has a meaningful relationship with a specific Scene.

"Album" is an editorial product concept for the MVP. Studio albums are the primary case, but EPs, mixtapes, compilations, and live albums may also be included when they have clear curatorial value.

## Curation Notes

Curated content means selected intentionally for discovery value, clarity, and relevance. It does not mean exhaustive, canonical, or universally definitive.

Curated descriptions should be concise, generally one or two short paragraphs, and should explain why the entry is relevant to Music Atlas. Descriptions should adapt to the entry type rather than follow a rigid template.

Content should be traceable to reliable sources during research and curation, but sources do not need to be user-facing or first-class product concepts in the MVP.

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
- Should the MVP include explicit "start here" recommendations, such as a short listening path or essential albums list?
- How much broader UK context should be allowed when explaining entries connected to England?
- How should the product handle artists or albums with meaningful connections to multiple countries?
- What lightweight internal source-tracking approach should be used during content creation and review?

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
- Every Artist has at least one curated Album.
- Every Album has at least one Genre.
- Album-to-Scene association is optional and used only when meaningful.
- Every Scene has a defined time period, including open-ended or ongoing periods when appropriate.
- The content dataset is intentionally small and real.
- Content follows the principle: "For MVP purposes, content should have a meaningful historical, cultural, geographical, or artistic connection to England."
- The MVP excludes integrations, accounts, public submissions, full discographies, database design, API design, application architecture, and implementation planning.
- Open product questions are documented before later architecture or implementation work begins.
