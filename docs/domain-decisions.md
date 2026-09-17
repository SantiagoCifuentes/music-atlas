# Music Atlas Domain Decisions

These decisions clarify the Music Atlas MVP domain after the initial requirements review and domain analysis. They are product/domain decisions only; they do not define database design, API design, application architecture, or implementation structure.

## 1. England Connection Test

A meaningful England connection exists when England played a substantial historical, cultural, geographical, or artistic role in the development, consolidation, evolution, or cultural context of the musical phenomenon being represented.

Mere popularity, commercial presence, or influence in England is not sufficient on its own.

The connection should be evaluated based on the specific genre, scene, artist, or album being included rather than by nationality alone.

## 2. Genre and Scene Labels

Genre and Scene are distinct domain concepts even when similar or identical names are used.

If the same or similar label is appropriate for both concepts, Music Atlas should distinguish them through their definitions and editorial context rather than artificially renaming them.

The distinction should be clear from the content and context presented to the user.

## 3. Movements and Related Concepts

Music Atlas will not introduce Movement as a first-class domain concept for the MVP.

Concepts such as Britpop, New Romantic, Madchester, or Merseybeat may be referenced as descriptive historical, cultural, or musical context when relevant.

They should not be forced into the Genre or Scene categories when those classifications do not accurately represent their nature.

## 4. Artist and Album Requirement

Every Artist included in the MVP must have at least one curated Album associated with them.

Artists without a suitable curated Album will not be included in the MVP.

## 5. Album Genre and Scene Associations

Every Album must be associated with at least one Genre.

Association with a Scene is optional because not every Album has a sufficiently meaningful or clear relationship with a specific Scene.

Albums should not be assigned to a Scene solely to satisfy a structural requirement.

## 6. Album as an Editorial Product Concept

"Album" is an editorial product concept rather than a strict technical classification.

Studio albums are the primary case, but EPs, mixtapes, compilations, and live albums may also be included when they have clear curatorial value for understanding an Artist, Genre, Scene, or historical context.

The type of release should remain distinguishable as descriptive information.

The MVP does not aim to provide an exhaustive discography.

## 7. Curated Associations

Artists and Albums may have multiple Genre and/or Scene associations.

Music Atlas will use a curated set of associations without defining primary and secondary associations for the MVP.

This avoids imposing an artificial hierarchy when multiple associations may be meaningful.

## 8. Scene Time Period

Every Scene in the MVP must have a defined time period representing when the Scene emerged, developed, or was particularly active.

The period does not necessarily require a defined end date. A Scene that remains active can have an open-ended or ongoing period.

Time is considered an important part of the conceptual definition of a Scene.

## 9. Sources and References

Content should be traceable to reliable sources during the research and curation process.

Sources do not need to become a user-facing feature or a first-class domain concept in the MVP.

Internal source tracking may be maintained during content creation and review so that important factual or editorial decisions can be verified later.

## 10. Curated Descriptions

A curated description should be concise, generally limited to one or two short paragraphs, and provide enough context for the user to understand why the entry is relevant to Music Atlas.

The description should adapt to the type of entry rather than follow a rigid template.

- Genre: Briefly explain its musical characteristics and relevance to the English context.
- Scene: Explain what the Scene was, where and when it developed, and why it was significant.
- Artist: Briefly explain who the Artist is, their relevance, and their relationship to the relevant Genre or Scene.
- Album: Explain what the release is and why it is relevant to understanding the Artist, Genre, Scene, or historical context.

Descriptions should provide useful context without attempting to be exhaustive historical accounts.
