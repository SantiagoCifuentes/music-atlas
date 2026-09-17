---
name: domain-analysis
description: Analyze and clarify the domain model of a product before database design, API design, architecture, or implementation. Use to identify domain concepts, relationships, boundaries, rules, classifications, ambiguities, and domain assumptions.
---

# Domain Analysis

Use this skill after requirements analysis and requirements review, and before database design, API design, architecture, or implementation.

The goal is to establish a clear and coherent conceptual understanding of the product domain.

The analysis should identify the important domain concepts, their meanings, relationships, boundaries, rules, and unresolved questions without turning the analysis into a technical design.

## Analysis Focus

Look for:

- Core domain concepts
- Definitions and boundaries of each concept
- Relationships between domain concepts
- Important domain rules and constraints
- Classification and categorization rules
- Ownership or association relationships
- Cardinality questions when they are relevant to the domain
- Domain-specific terminology that may be ambiguous
- Concepts that could be confused with one another
- Important domain states or lifecycle concepts
- Domain assumptions that have not yet been explicitly established
- Examples and counterexamples that help clarify the domain
- Edge cases that could affect the conceptual model
- Questions that should be resolved before technical modeling

## Important Principle

Distinguish between:

- What the product conceptually means
- What rules the domain follows
- How those concepts might later be represented technically

Do not confuse domain modeling with database schema design, API design, or application architecture.

## Music Atlas Context

When analyzing Music Atlas, pay particular attention to:

- Country
- Genre
- Scene
- Artist
- Album
- Relationships between these concepts
- England attribution
- Genre versus Scene classification
- Artists associated with multiple genres or scenes
- Albums associated with artists, genres, scenes, or historical contexts
- Historical, geographical, cultural, and artistic relationships
- The distinction between a musical style and a musical scene
- Whether concepts such as movements, subgenres, eras, or regional identities need to be represented explicitly or can remain descriptive for the MVP

Do not assume that every music concept must become a first-class product entity. Evaluate whether a concept is necessary for the current MVP.

## Output Format

Structure the analysis with these sections:

### Core Domain Concepts

For each important concept, include:

- Concept name
- Definition
- Why it matters to the product
- Important boundaries or distinctions
- Example from the current MVP when possible

### Domain Relationships

Describe the meaningful relationships between concepts.

For each relationship, include:

- Concepts involved
- Nature of the relationship
- Important rules or constraints
- Example when useful

Do not express these relationships as database tables, foreign keys, API endpoints, or implementation structures.

### Domain Rules

List rules that should be consistently true within the product domain.

Prioritize rules that affect content consistency, classification, navigation, or future testability.

### Ambiguities and Edge Cases

Identify concepts or situations where the current requirements do not provide enough clarity.

For each item, include:

- The ambiguity
- Why it matters
- A concrete example
- Whether it needs to be resolved now or can be deferred

### Recommended Domain Decisions

Identify decisions that would improve consistency before technical modeling.

For each decision:

- State the decision
- Explain why it matters
- Give a recommended approach
- Clearly distinguish the recommendation from an already-agreed product requirement

Do not silently turn recommendations into requirements.

### Safe Domain Assumptions

List assumptions that are reasonable for the current MVP and unlikely to cause significant rework.

For each assumption, explain what would cause it to be revisited.

### Domain Examples

Provide a small set of concrete examples using Music Atlas content.

Use examples to demonstrate how the proposed domain rules would work.

Include borderline examples when useful, especially for Genre versus Scene.

### Questions Before Technical Modeling

List the remaining domain questions that should be answered before database design or API design.

Prioritize them by their potential impact on rework.

## Constraints

- Do not design the database.
- Do not design database tables, columns, primary keys, or foreign keys.
- Do not design APIs or endpoints.
- Do not design application architecture.
- Do not propose frameworks, libraries, programming languages, or infrastructure.
- Do not write implementation code.
- Do not expand the MVP scope unless identifying a domain risk.
- Do not introduce new product features as domain requirements.
- Preserve the user's stated product direction.
- Distinguish agreed requirements from recommendations and assumptions.
- Do not attempt to model every possible music-industry concept.
- Prefer the simplest domain model that adequately represents the current MVP.
- Use concrete examples to validate conceptual decisions.
- Prioritize issues based on their impact on the current lifecycle stage.
- Not every ambiguity requires an immediate decision. Clearly distinguish blocking domain decisions from issues that can safely be deferred.
