---
id: 033
title: Running text stops at its own token, Container/text-max-width, for now the 1200 of the content column
date: 2026-10-27
status: accepted
audience: [designer, dev]
track: Foundations
phase: 1
---
**Decision** — Running text in a topic (the Reading lede, paragraphs and pull quote; the paragraphs of HTML lesson
blocks) fills the content column, up to a new token, `Container/text-max-width`, in `2. Responsive 📐`. For now it is
an alias of `Container/content-max-width` (decision 031) in every mode, so the text runs the full 1200, the same width
as the platform pages. Blocks, tables and media keep the full column, as before.

**Why**
- Nelson, 27 Oct 2026: the Reading did not use the max width (the text stopped at about 640–670 px inside the 1200
  column) and should match the platform pages. He asked for a token of its own for running text, at 1200 for now, so
  the measure can change later without touching the column.
- It replaces the 56ch cap (about 75 characters) set in the prototype after the 25 Oct line-length audit; that cap
  was never in the DS or the ICP.

**Design** — DS variable `Container/text-max-width` (alias of `Container/content-max-width`), scope Width/height, web
code syntax `var(--sk-container-text-max-width)`. ICP: the Ready for Dev Reading screens already run the text the
full column (1056 on the 1504 desktop screens), so nothing moves; the text can be bound to the token once it is
published.

**Dev impact** — Tailwind `max-w-text` = `var(--sk-container-text-max-width, 1200px)` on the running text
(prototype PRs 393 and 394). The Publish tokens export adds `--sk-container-text-max-width` to
`tokens/generated/spacing.css` with the other `Container/*` variables.

**Trade-off** — At 1200 a body line runs about 140–150 characters, past the usual 65–75 for comfortable reading. If
that reads too long, set a shorter value on `Container/text-max-width` (for example 720) and publish; nothing else
changes.

**Alternatives rejected** — Keeping the 56ch cap in code only (not a DS value, invisible in Figma); a literal 1200 on
the text (no way to tune the measure apart from the column).
