# 00-decisions — Decision Records

This folder holds the **Architecture / Design Decision Records (ADRs)** for the SkillUp LMS: one Markdown file per decision, plus a filterable [`INDEX.md`](INDEX.md).

Each record captures a single decision that was made — the choice, the actual reasoning, where it came from, the edX capability behind it, the Figma design it lives in, the dev impact, and the alternatives that were rejected. Decisions are **dated and sourced**; nothing is asserted without a link back to the meeting, doc, or Figma node that produced it.

## Three audiences, one record

Each ADR is written to serve all three at once — read the section that matters to you:

- **Stakeholder** → **Decision** + **Why** + **status**. What was decided, why, and whether it's locked.
- **Designer** → **Design** (Figma page + node-id deep link) + the tokens/components named in **Dev impact**.
- **Dev** → **Decision** + **Dev impact** (components / tokens / Business Rules) + **edX basis** (the platform capability that supports or constrains the build).

## How to read

- Start with [`INDEX.md`](INDEX.md) — a sortable table (ID · Title · Track · Phase · Status · Audience · link), plus filters by track and audience.
- **Tracks:** **ICP** = immersive player & content types · **LMS** = platform pages · **Foundations** = design system / tokens / accessibility (serves both). The project's two big tasks are **ICP** and **LMS**; Foundations underpins both.
- Status is `accepted`, `proposed` (unresolved — surfaced but not decided), or `superseded-by-NNN`.

## Two things to confirm

`INDEX.md` ends with two reconciliation flags kept deliberately visible: **BR-02a** (a rule that exists only in Figma, not in the BA business-rules doc) and the **5 open product questions** from the BA exec summary (recorded as `proposed`, not accepted). Both need Nelson's call — see the NOTE in `INDEX.md`.

## Conventions

- Filename: `NNN-short-slug.md`.
- Product/UX decisions (001–013) carry the discovery framing: *push back now — mid-build reversal is 10x more expensive.*
- Figma references use only the canonical node-ids; where an exact node is unknown the record says `node-id unknown` rather than guessing.
