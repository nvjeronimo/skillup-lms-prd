# 02 · Content Types (Track A — Topic Content Types, edX parity)

The Topic Content Types currently in development. **The authoritative document is
[`../LMS-HANDOFF/topic-types-inventory.md`](../LMS-HANDOFF/topic-types-inventory.md)** — Nelson-authored,
still evolving. This folder *wires it in*; it does not replace or rewrite it.

> Status: 🟠 **in review / WIP** — never present this material as Ready-for-Dev.
> Figma page: **`4692-444` — Topic Content Types · Discovery + DS Build** (Ready for Review, validated
> 2026-07-28; sections 01→11 + ZZ) — [open in Figma](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=4692-444).
> **The page and the `.md` are a pair — never cite one without the other.**

## Three doors, same content

| You are a… | Start here |
|---|---|
| **Stakeholder** | Which types exist, what share of the course they cover, what's blocked → inventory [§2](../LMS-HANDOFF/topic-types-inventory.md) (12 types) + §3. Headline: Reading + Video + VILT = **76% of topics**; **VILT is the biggest gap (19%, nothing designed)**; Quiz is 2% by volume but **100% of the grade**; **3 blocked types** need build-or-buy. |
| **Designer** | Figma `4692-444` for per-type behaviour, end-to-end flows and the built screens → inventory §5 (5 chrome families) + [`registration-rule.md`](registration-rule.md). |
| **Developer** | The edX mapping in inventory §6, the **buildability matrix** §6b, the **composition model** §6c, and the **10-point registration rule** ([`registration-rule.md`](registration-rule.md)). |

## What's in this folder

| File | What |
|---|---|
| `README.md` | This — the three-audience index. |
| [`registration-rule.md`](registration-rule.md) | The **10-point registration rule** — a reusable design rule, not a footnote. A new Topic Content Type is only "done" when all ten entries are defined. |
| [`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md) | The 12 open questions from inventory §7, split into trackable items with owners (Rupali / Rashid / Navdeep). |

## The 5-point per-type deliverable (agreed Navdeep + Harpreet + team, 2026-07-21)

For every type we document: **1 Format · 2 Behaviour · 3 States · 4 Completion rules · 5 Assessment
logic** — plus what edX supports natively, the gap, the decision, status, and owner. See decision
[`00-decisions/020`](../00-decisions/) (terminology) and [`022`](../00-decisions/) (unit-renderer architecture).

## edX parity — sourced, not assumed

The buildability matrix (inventory §6b, mirrored on Figma `4692-444`) was cross-checked 2026-07-24
against the live official docs (`docs.openedx.org`) and [`../LMS-HANDOFF/edx-component-types-reference.md`](../LMS-HANDOFF/edx-component-types-reference.md).
Two constraints hardened from convention to **documented hard limit**:

- **SCORM** — 1 per unit · 1–15 MB · not mobile-ready (community `openedx-scorm-xblock`, not core).
- **ORA** — **multiple ORA in one unit cause submission errors** (corrected from "typically 1 per unit").

The single remaining unknown is **configuration-level, not platform-level**: whether *our* courses
stack multiple components per unit / more than one graded block. Needs a real course export
(SKOAIH01 OLX `.tar.gz`) — **[OPEN-ACTIONS](../OPEN-ACTIONS.md) #1, owner Rashid**.

## Related

- Quizzes deep-dive: [`../LMS-HANDOFF/quizzes/`](../LMS-HANDOFF/quizzes/) (edX capabilities, Coursera benchmark, current-LMS audit, experience spec, ORA explained).
- edX parity audit: [`../LMS-HANDOFF/edx-parity-audit.md`](../LMS-HANDOFF/edx-parity-audit.md).
