# Music Atlas Agent Instructions

## Project Purpose

Music Atlas is a curated discovery guide to music scenes, artists, and albums connected to England.

For MVP purposes, content should have a meaningful historical, cultural, geographical, or artistic connection to England.

## Dual Goal

This repository is both a product project and a practice space for a complete AI-assisted development lifecycle, including requirements analysis, architecture, implementation, review, testing, QA automation, and CI/CD.

Treat lifecycle artifacts as part of the work, but keep them useful, lightweight, and tied to current project needs.

## Workflow Principles

- Understand the relevant product requirement or existing project document before proposing architecture or implementation.
- Do not jump from requirements directly into code when the user is still asking for product, domain, or planning work.
- Ask for approval before creating or modifying files when the user has explicitly requested a review-first step.
- Keep changes focused on the current lifecycle stage.
- Prefer incremental decisions over broad upfront design.

## Documentation Principles

- Store durable project documents in `docs/`.
- Keep documents concise, decision-oriented, and easy to revise.
- Document open questions explicitly instead of hiding assumptions.
- Avoid duplicating detailed product requirements in `AGENTS.md`; link or refer to project documents when needed.

## Engineering Principles

- Follow the existing repository structure and conventions before introducing new ones.
- Prefer simple, maintainable solutions over premature abstractions.
- Do not design database, API, or application architecture until the relevant requirements are agreed.
- Keep implementation changes small enough to review and test clearly.

## Quality Expectations

- Treat ambiguity, scope creep, and weak acceptance criteria as risks to call out early.
- Include verification appropriate to the stage of work.
- For code changes, prefer focused tests that cover meaningful behavior.
- For documentation changes, check that the document matches the agreed scope and does not introduce unapproved implementation decisions.

