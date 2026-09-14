---
name: requirements-review
description: Review product, MVP, or requirements documents before architecture or implementation. Use to identify ambiguity, missing rules, conflicting requirements, incomplete flows, scope risks, and testability concerns.
---

# Requirements Review

Use this skill to review product and requirements documents before architecture, data modeling, API design, or implementation begins.

The goal is to improve clarity and decision quality without expanding the product scope or turning the review into a technical design.

## Review Focus

Look for:

- Ambiguous requirements
- Missing business rules
- Conflicting requirements
- Undocumented assumptions
- Incomplete user flows
- Important edge cases
- MVP scope risks
- Testability concerns
- Terms that may need clearer domain definitions
- Acceptance criteria that are missing, vague, or difficult to verify

## Output Format

Structure the review with these sections:

### Critical Decisions Required Before Proceeding

List decisions that block the next lifecycle step or could cause significant rework if left unresolved.

For each item, include:

- The issue
- Why it matters
- A concrete question or decision needed

### Important Issues That Can Be Deferred

List issues that matter but do not block the current iteration.

For each item, include:

- The issue
- Why it can wait
- When it should be revisited

### Safe Assumptions For The Current Iteration

List assumptions that are reasonable to proceed with for now.

For each item, include:

- The assumption
- Why it is safe enough
- What would cause it to be revisited

### Testability Notes

Call out requirements that may be hard to verify later.

Prefer practical acceptance criteria over abstract quality statements.

## Constraints

- Do not design the database.
- Do not design the API.
- Do not design application architecture.
- Do not propose implementation details unless the user explicitly asks.
- Do not expand MVP scope unless identifying it as a risk or optional future work.
- Preserve the user's stated product direction.
