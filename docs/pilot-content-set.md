# Music Atlas Pilot Curated Content Set

This pilot content set applies the approved MVP requirements, curation brief, and domain decisions. It is a proposal for validating the domain rules before technical architecture, database design, API design, or implementation.

The set deliberately includes straightforward cases and borderline cases so Music Atlas can test its rules for England attribution, Genre versus Scene, Album scope, curated associations, and source traceability.

Consulted date for all source notes: 2026-09-22.

## Pilot Shape

- Country: 1
- Genres: 10
- Scenes: 7
- Artists: 18
- Albums: 18

## Country

### England

**Inclusion rationale:** England is the sole MVP country focus. It acts as the broad editorial context for music scenes, artists, genres, and albums with meaningful historical, cultural, geographical, or artistic connections to England.

**Source notes:** Existing project requirements and domain decisions.

## Genres

| Genre | Inclusion rationale | England connection | Borderline notes | Sources |
| --- | --- | --- | --- | --- |
| Merseybeat | Provides a foundational 1960s entry point into Liverpool guitar-pop and the British Invasion. | Strong geographical and historical connection through Liverpool and the Cavern-era beat scene. | Could also describe a scene; in this pilot, the Genre covers the musical style, while the Liverpool Merseybeat Scene covers place and context. | S07, S08 |
| Punk rock | Core musical style for the London punk scene and late-1970s English youth culture. | Strong historical and cultural connection through London punk and English punk bands. | Punk is transatlantic; inclusion is justified by England's substantial role, not origin exclusivity. | S01, S02, S12 |
| Heavy metal | Essential genre for the Birmingham/West Midlands story and foundational English rock history. | Strong geographical and artistic connection through Birmingham and Black Sabbath. | Heavy metal is global; inclusion is based on England's role in its development. | S03, S04 |
| Post-punk | Helps represent the transition from punk into experimental rock, especially Manchester and Factory Records. | Strong historical and artistic connection through Manchester, Joy Division, and related artists. | Broad genre; use curated associations rather than exhaustive tagging. | S09, S10 |
| Synth-pop | Connects Sheffield's electronic music history with accessible pop forms. | Strong geographical and artistic connection through Sheffield, the Human League, Heaven 17, ABC, and Cabaret Voltaire. | Overlaps with electronic, new wave, and industrial; keep the Genre focused on musical characteristics. | S05, S06 |
| Shoegaze | Represents a distinctive late-1980s/early-1990s English alternative rock style. | Strong geographical and artistic connection through Oxford, Reading, London, and the Thames Valley context. | The "scene that celebrates itself" is scene-like but remains descriptive context unless represented as a Scene. | S16, S17 |
| Trip hop | Provides a gateway into the Bristol Sound and 1990s English electronic/hip-hop/dub fusion. | Strong geographical and artistic connection through Bristol, Massive Attack, Portishead, and Tricky. | Some artists reject or complicate the label; use as a discovery term, not a rigid identity. | S13, S14, S15 |
| Grime | Essential early-2000s England-connected genre with strong links to East London. | Strong geographical, cultural, and artistic connection through East London, pirate radio, and artists such as Dizzee Rascal and Wiley. | Grime is both a Genre and part of a Scene; content must explain which sense is being used. | S18, S19 |
| UK garage | Important predecessor and parallel context for grime and London dance music. | Strong cultural and artistic connection to London club, radio, and dance music culture. | "UK" label is broader than England; include only where England-focused context is clear. | S20, S21 |
| Dubstep | Useful for testing album-to-scene optionality through London-rooted electronic music that may not require a Scene entry in this pilot. | Meaningful artistic and geographical connection through South London development and artists such as Burial. | Borderline for MVP because it could justify its own Scene later; keep descriptive unless needed for navigation. | S21, S22 |

## Scenes

| Scene | Time period | Inclusion rationale | Related genres | Borderline notes | Sources |
| --- | --- | --- | --- | --- | --- |
| Liverpool Merseybeat Scene | Early 1960s | Clear place/time/community context around Liverpool clubs, beat groups, and the Cavern Club. | Merseybeat | Straightforward Scene. The same label can also appear as a Genre because the page focus differs. | S07, S08 |
| London Punk Scene | Mid-1970s to late 1970s | Clear scene context around London venues, fashion, media attention, and bands such as Sex Pistols and The Clash. | Punk rock | Straightforward Scene with strong England connection. | S01, S02, S12 |
| Birmingham Heavy Metal Scene | Late 1960s to early 1970s | Clear place/history context for heavy metal's early development, especially Black Sabbath and Birmingham's industrial identity. | Heavy metal | Straightforward Scene, though the broader West Midlands metal story could expand later. | S03, S04 |
| Manchester Post-Punk / Factory Context | Late 1970s to early 1980s | Captures Manchester's post-punk development around Joy Division, Factory Records, and the city's post-industrial context. | Post-punk | Scene title intentionally avoids overclaiming all Manchester music. Madchester remains descriptive context, not a separate MVP entity. | S09, S10 |
| Sheffield Electronic / Synth-Pop Scene | Late 1970s to early 1980s | Clear city-based context for Sheffield electronic music, synth-pop, and related experimental groups. | Synth-pop, post-punk | Useful borderline: includes industrial/electronic roots without making Industrial a required MVP Genre. | S05, S06 |
| Bristol Sound / Trip Hop Scene | Late 1980s to mid-1990s | Captures Bristol's local creative context around Wild Bunch, Massive Attack, Portishead, Tricky, dub, hip-hop, and sound-system influence. | Trip hop | Scene label "Bristol Sound" may be more accurate than forcing everything into "trip hop." | S13, S14, S15 |
| East London Grime Scene | Early 2000s to ongoing | Strong place/time/community context around East London, pirate radio, crews, youth culture, and early grime records. | Grime, UK garage | Clear test of same/similar label as Genre and Scene. | S18, S19, S20 |

## Artists and Albums

| Artist | Curated album | Release type | Inclusion rationale | Associations | Borderline notes | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| The Beatles | *Please Please Me* | Studio album | Foundational Liverpool group and accessible entry into Merseybeat and early 1960s English pop history. | Genres: Merseybeat. Scenes: Liverpool Merseybeat Scene. | Straightforward inclusion through Liverpool, Cavern history, and historical significance. | S07, S08 |
| Gerry and the Pacemakers | *How Do You Like It?* | Studio album | Gives the Merseybeat pilot more than one artist and shows the scene was not reducible to The Beatles. | Genres: Merseybeat. Scenes: Liverpool Merseybeat Scene. | Album is useful primarily as scene context rather than a modern canonical recommendation. | S07, S08 |
| Black Sabbath | *Paranoid* | Studio album | Essential gateway into heavy metal and Birmingham's role in the genre's development. | Genres: Heavy metal. Scenes: Birmingham Heavy Metal Scene. | Straightforward inclusion. | S03, S04 |
| Judas Priest | *British Steel* | Studio album | Represents the later consolidation of English heavy metal beyond Black Sabbath. | Genres: Heavy metal. Scenes: Birmingham Heavy Metal Scene. | Borderline scene association: use Birmingham/West Midlands context carefully rather than implying the same moment as Sabbath. | S03, S04 |
| Sex Pistols | *Never Mind the Bollocks, Here's the Sex Pistols* | Studio album | Direct entry into London punk's sound, attitude, and cultural impact. | Genres: Punk rock. Scenes: London Punk Scene. | Straightforward inclusion. | S01, S02, S12 |
| The Clash | *London Calling* | Studio album | Shows London punk expanding beyond first-wave punk into reggae, ska, rockabilly, and broader urban commentary. | Genres: Punk rock, post-punk. Scenes: London Punk Scene. | Borderline album-to-scene case: the band is scene-central, but the album is broader than punk and should be described as expansion rather than pure scene document. | S12, S23 |
| Joy Division | *Unknown Pleasures* | Studio album | Core post-punk album and key entry into Manchester/Factory context. | Genres: Post-punk. Scenes: Manchester Post-Punk / Factory Context. | Straightforward inclusion. | S09, S10 |
| New Order | *Power, Corruption & Lies* | Studio album | Demonstrates continuity from Manchester post-punk into electronic dance-oriented music. | Genres: Post-punk, synth-pop. Scenes: Manchester Post-Punk / Factory Context. | Borderline association: useful for showing scene evolution, but not a pure post-punk album. | S09 |
| The Human League | *Dare* | Studio album | Accessible synth-pop entry and key album for Sheffield electronic music reaching mainstream pop. | Genres: Synth-pop. Scenes: Sheffield Electronic / Synth-Pop Scene. | Straightforward inclusion. | S05, S06, S24 |
| Cabaret Voltaire | *Mix-Up* | Studio album | Represents Sheffield's experimental electronic roots behind later synth-pop visibility. | Genres: Synth-pop, post-punk. Scenes: Sheffield Electronic / Synth-Pop Scene. | Borderline genre association: industrial/electronic context is important, but Industrial need not become an MVP Genre yet. | S05, S06 |
| Ride | *Nowhere* | Studio album | Strong entry into English shoegaze through Oxford and the early 1990s guitar sound. | Genres: Shoegaze. Scenes: none proposed. | Tests optional Album-to-Scene association: the album can be Genre-led without forcing a Thames Valley Scene into the MVP. | S16 |
| Slowdive | *Souvlaki* | Studio album | Important shoegaze/dream-pop entry from Reading, useful for texture and contrast within shoegaze. | Genres: Shoegaze. Scenes: none proposed. | Borderline between shoegaze and dream pop; keep association curated, not exhaustive. | S17 |
| Massive Attack | *Blue Lines* | Studio album | Core Bristol Sound/trip hop entry and strong bridge between dub, hip-hop, soul, and electronic music. | Genres: Trip hop. Scenes: Bristol Sound / Trip Hop Scene. | Straightforward for the Bristol pilot, while acknowledging the genre label can be contested. | S13, S14 |
| Portishead | *Dummy* | Studio album | Accessible and historically significant entry into Bristol trip hop's darker, cinematic side. | Genres: Trip hop. Scenes: Bristol Sound / Trip Hop Scene. | Straightforward inclusion. | S13, S15, S25 |
| Tricky | *Maxinquaye* | Studio album | Represents a more personal, fractured Bristol trip hop path connected to Massive Attack and the Bristol Sound. | Genres: Trip hop. Scenes: Bristol Sound / Trip Hop Scene. | Borderline artist-scene association: important to Bristol context, but the album's identity should not be reduced to scene membership. | S13 |
| Dizzee Rascal | *Boy in da Corner* | Studio album | Essential early grime album and clear East London gateway. | Genres: Grime. Scenes: East London Grime Scene. | Strong test case for Genre versus Scene: grime should appear in both senses with clear editorial distinction. | S18, S19 |
| Wiley | *Treddin' on Thin Ice* | Studio album | Helps represent early grime and the naming/categorization debate around grime/eski-beat. | Genres: Grime. Scenes: East London Grime Scene. | Borderline terminology case because Wiley's framing of the sound can differ from the broader grime label. | S18, S26 |
| Burial | *Untrue* | Studio album | Useful contemporary-adjacent England-connected electronic entry rooted in London and UK garage/dubstep aftermath. | Genres: UK garage, dubstep. Scenes: none proposed. | Deliberate borderline inclusion: meaningful England connection and genre relevance, but no Scene association is forced. | S21, S22 |

## Deliberate Borderline Validation Cases

### Same Label, Different Concepts: Grime

Grime appears as both a Genre and part of the East London Grime Scene. This validates the rule that identical or similar labels can exist across concepts when definitions and editorial context make the distinction clear.

- Genre framing: sound, production, MCing, tempo, and musical lineage.
- Scene framing: East London, early 2000s, pirate radio, crews, youth culture, and informal networks.

### Scene Optionality: Ride, Slowdive, and Burial

Ride's *Nowhere*, Slowdive's *Souvlaki*, and Burial's *Untrue* test the rule that every Album needs at least one Genre, but not every Album needs a Scene.

These albums have meaningful England connections and strong Genre value, but forcing a Scene association may create unnecessary MVP complexity.

### Movement Not First-Class: Britpop, Madchester, and New Romantic

The pilot does not create Movement as a first-class concept.

- Britpop can be referenced later as historical/cultural context for 1990s English guitar music.
- Madchester can be referenced as context when discussing Manchester's later scene history.
- New Romantic can be referenced as context near synth-pop and early 1980s style culture.

This validates the decision to keep movements descriptive unless a concept is accurately represented by an existing Genre or Scene entry.

### Broader UK Context Is Supporting Context Only

Entries such as UK garage and dubstep have UK-wide labels and broader networks, but the pilot includes them only where the England/London connection is meaningful. UK-wide context should help explain entries, not independently justify inclusion.

### Album as Editorial Product Concept

This pilot uses studio albums only, but it preserves the approved rule that EPs, mixtapes, compilations, and live albums may be included later when they have clear curatorial value.

## Source Register

S01. London Museum, "Sex Pistols: London's resident punk rebels", https://www.londonmuseum.org.uk/collections/london-stories/sex-pistols-londons-resident-punk-rebels/

S02. British Library, "Punk 1976-78", https://bl.iro.bl.uk/entities/product/2a755e98-d3cf-427b-b8ec-248e52b2aec4

S03. Birmingham City Council, "Black Sabbath awarded the Freedom of the City of Birmingham", https://www.birmingham.gov.uk/news/article/1591/

S04. Rock & Roll Hall of Fame, "Black Sabbath", https://rockhall.com/inductees/black-sabbath/

S05. Sheffield City Council, "Music in Sheffield research guide", https://www.sheffield.gov.uk/libraries-archives/access-archives-local-studies-library/research-guides/music-in-sheffield

S06. British Council, "Made In Sheffield: The Birth of Electronic Pop", https://www.britishcouncil.org.il/en/Rewind_Sheffield_story

S07. Cavern Club, "1960s", https://www.cavernclub.com/history/1960s/

S08. Cavern Club, "The Cavern Club Liverpool", https://www.cavernclub.com/the-cavern-club-liverpool/

S09. Rock & Roll Hall of Fame, "Joy Division/New Order", https://rockhall.com/inductees/joy-division-new-order/

S10. Official Charts, "Joy Division songs and albums", https://www.officialcharts.com/artist/18566/joy-division/

S11. British Library, "Beyond the Bassline opens", https://www.bl.uk/about/press/releases/beyond-the-bassline-500-years-of-black-british-music-opens-at-the-british-library

S12. Rock & Roll Hall of Fame, "The Clash", https://rockhall.com/inductees/clash/

S13. British Council, "The story of the Bristol Sound", https://www.britishcouncil.org.il/en/rewind-bristol

S14. Capitol Records, "Massive Attack, 1991", https://www.capitolrecords.com/massive-attack/

S15. Apple Music, "Portishead", https://music.apple.com/us/artist/portishead/853090

S16. Rhino, "Nowhere | Ride", https://www.rhino.com/aod/nowhere-ride

S17. Apple Music, "Slowdive", https://music.apple.com/us/artist/slowdive/528315

S18. London Museum, "London's grime stars", https://www.londonmuseum.org.uk/collections/london-stories/londons-grime-stars/

S19. The Guardian, "I've been through madnesses", https://www.theguardian.com/music/2003/sep/12/mercuryprize2003.popandrock

S20. Greater London Authority, "The London Curriculum: Music, Sounds of the City", https://www.london.gov.uk/media/1195/download

S21. British Library, "Beyond the Bassline opens", https://www.bl.uk/about/press/releases/beyond-the-bassline-500-years-of-black-british-music-opens-at-the-british-library

S22. Apple Music, "Untrue - Burial", https://music.apple.com/us/album/untrue/714367714

S23. Rock & Roll Hall of Fame catalog, "London Calling", https://catalog.rockhall.com/rrhof-ais/Details/fullCatalogue/200006589

S24. Official Charts, "Dare - Human League", https://www.officialcharts.com/albums/human-league-dare/

S25. Official Charts, "Dummy - Portishead", https://www.officialcharts.com/albums/portishead-dummy/

S26. Apple Music, "Treddin' on Thin Ice - Wiley", https://music.apple.com/us/album/treddin-on-thin-ice/1136792572

## Notes for Next Review

- The pilot intentionally reaches the maximum Genre count for the MVP range. A later content review may reduce Genres if the navigation feels too broad.
- The pilot includes several albums without Scene associations to validate the rule that Scene is optional for Albums.
- The pilot uses a few commercial music-platform sources where more authoritative public sources were limited. These should be replaced or supplemented during deeper content research.
- Britpop, Madchester, New Romantic, Industrial, Dream pop, and Dubstep could all pressure the MVP boundaries. The pilot keeps most of them descriptive except Dubstep, which is included as a Genre only to support the Burial test case.
