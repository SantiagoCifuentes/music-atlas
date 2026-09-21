# Music Atlas Curation Brief

## Purpose and Status

This brief guides selection, research, and writing for the initial Music Atlas dataset. It is an editorial document, not a technical design or a content dataset.

The **Agreed decisions** below restate decisions already made in the MVP requirements and domain decisions. The **Proposed editorial guidelines** are recommended working defaults for the first curation pass; they require approval before being treated as settled project policy. **Open decisions** remain explicitly unresolved.

## Agreed Decisions That Govern Curation

- Music Atlas is a curated discovery guide to music scenes, artists, and albums connected to England; it is not an exhaustive encyclopedia or streaming service.
- England is the sole country focus. An entry needs a substantial historical, cultural, geographical, or artistic connection to England. Popularity, commercial presence, or influence in England alone is insufficient.
- Genre describes musical style; Scene describes a social, geographical, historical, or cultural formation. They remain distinct, even if their labels overlap.
- The initial dataset is real, intentionally small, and within the MVP target ranges: 6-10 genres, 5-8 scenes, and 15-30 artists and albums.
- Every Artist has at least one curated Album; every Album has at least one Genre. Album-to-Scene associations are optional and must be meaningful. Every Scene has a defined, possibly ongoing, period.
- Movements and related ideas may be descriptive context but are not first-class MVP concepts.
- Descriptions are generally one or two short paragraphs. Sources support internal research traceability and are not a user-facing feature.

## Proposed Editorial Guidelines

### 1. Editorial Voice

Write for curious listeners with little prior knowledge, without speaking down to more experienced readers. The voice should be confident, warm, specific, and curator-led: explain why an entry matters and give the reader a useful way in.

Prefer plain language, concrete musical or cultural detail, and short sentences where possible. Define specialist terms when they are needed. Avoid ranking language presented as fact, promotional copy, unsupported superlatives, and unnecessarily academic or encyclopedic summaries. A description should make a focused editorial case rather than retell a complete history.

### 2. Historical and Contemporary Balance

The selection should make England's musical history legible while leaving room for contemporary discovery. Include entries from different periods when they improve the discovery paths and clarify relationships between styles, places, and artists.

Do not impose numerical quotas for eras, decades, or "heritage" versus current entries. Instead, use the initial content set as a coherent set of entry points: historical entries should explain foundations or turning points; newer entries should earn inclusion through a clear England connection and discovery value. Revisit the balance once a candidate set exists and check that it does not unintentionally make the guide feel confined to one period.

### 3. England and Broader UK Context

Apply the agreed England connection test to every proposed Genre, Scene, Artist, and Album. Assess the connection of the specific entry, not nationality alone.

Broader UK and international context is acceptable when it accurately explains an England-connected phenomenon--for example, migration, touring networks, shared media, artistic collaboration, or influence across borders. It should add explanatory context, not become the basis for including an entry with only an incidental England connection.

Keep the editorial centre of gravity in England: scenes should be anchored in England when included as Scenes, and descriptions should make the England-specific relevance clear. Do not broaden country browsing or select entries principally to represent Scotland, Wales, Northern Ireland, or the UK as a whole. Where attribution is genuinely mixed, state the relationship precisely rather than presenting it as exclusively English.

### 4. Source and Research Convention

For each candidate or selected entry, keep a lightweight internal research note containing:

- the entry name and type;
- the factual or historical claims that require support;
- one or more reliable supporting sources, with enough citation detail or a stable link to find them again; and
- a short note explaining the England connection and any material attribution uncertainty.

Use sources appropriate to the claim, prioritising reliable primary material, respected music journalism, books, archives, labels, institutions, and specialist publications where relevant. Cross-check consequential or disputed claims where practical. The note supports editorial review; it is not a public bibliography, source-management product, or requirement to cite every sentence.

### 5. Content Selection Principles

Select entries that form clear, useful discovery paths across Genre, Scene, Artist, and Album. A representative entry can be an established reference point, but less obvious entries are welcome when they reveal a meaningful connection, perspective, or route through the guide.

Avoid duplication: do not include several entries that offer essentially the same explanatory role unless their differences materially improve coverage or navigation. Prefer a small number of well-connected entries over a broad list of isolated names.

Apply the England connection test before considering prominence. For a borderline case, record the uncertainty, test whether the entry has a substantial England-specific role, and include it only if that role can be explained and supported. If the classification as Genre or Scene is unclear, do not force it into either category; use descriptive context where that is more accurate.

### 6. Description Guidelines

Descriptions should normally be one or two short paragraphs and answer the reader's practical question: "Why should I understand or explore this here?" Adapt the shape of the writing to the entry rather than enforcing a rigid template.

- **Genre:** identify recognizable musical characteristics and explain its relevance to the England-focused guide.
- **Scene:** explain what it was, where and when it developed, who or what shaped it, and why it mattered.
- **Artist:** explain the artist's relevance and meaningful relationship to the connected Genre, Scene, or Album.
- **Album:** explain why this release is a helpful entry point for its artist, genre, scene, or historical context. State its release type when that context matters.

Use only the context needed to support discovery. Do not turn entries into full biographies, discographies, or exhaustive histories.

### 7. Quality and Consistency Check

Before including an entry, a curator should be able to answer yes to the following questions:

- Is the entry real, factually supportable, and internally traceable to appropriate sources?
- Can its substantial connection to England be stated clearly without relying on mere popularity or nationality?
- Is it accurately classified as a Genre, Scene, Artist, or Album, with uncertain classifications handled as context rather than forced categories?
- Does it add a distinct discovery value or relationship to the small initial set?
- Does its description explain relevance concisely and in accessible language?
- Are required associations present: an Artist has a curated Album, an Album has a Genre, and a Scene has a period? Are optional Scene associations genuinely meaningful?
- Does its inclusion preserve Genre-Scene distinction and avoid creating a de facto Movement category?

## MVP Boundaries

This brief does not authorise expansion beyond the intentionally small England-focused dataset. It does not add country coverage, accounts, integrations, public submissions, full discographies, track-level data, advanced discovery features, or a new first-class concept such as Movement.

It also does not define a database, API, application architecture, implementation plan, or source-management system. Actual candidate selection and entry writing are subsequent work.

## Open Decisions Requiring Approval

The following questions remain open from the MVP requirements. The proposed guidance above offers working defaults but does not settle them:

1. **Editorial voice:** Should the final voice lean more beginner-friendly, more critic-curated, or deliberately sit between them?
2. **Period balance:** Should the initial set have any explicit preference for historical foundations or contemporary discovery beyond the flexible balance proposed here?
3. **Broader UK context:** Is the proposed rule--context is welcome, but England must remain the specific editorial focus--acceptable for mixed-attribution entries?
4. **Source tracking:** Is the proposed per-entry research note sufficient, and what citation detail should be consistently retained?
5. **"Start here" paths:** Should explicitly labelled starter recommendations be part of the initial editorial content, or should discovery remain solely relationship-led for the MVP?
