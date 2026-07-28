# Design System Discovery — Pushback for Next Review

**Context:** Dev team's Design System Discovery demo, 16 June 2026.
**Position:** The direction is right. Storybook, tokens, Figma sync, CSS Modules, no Tailwind. I'm not relitigating any of that. These are the points where the plan is soft and will cost us if we start Phase 1 without resolving them.

Each point: what the doc says, why it worries me, what I want decided in the room.

---

## 1. Token naming will drift unless we lock the bridge now

**Doc says:** semantic CSS variables like `--sk-color-brand`, `--sk-text-primary`, `--sk-button-bg`.

**Concern:** Figma already ships these as the `LMS/*` token set, bound to every production screen. If dev codes a fresh naming scheme and Figma exports `LMS/*`, the Tokens Studio to Style Dictionary pipeline mismatches on day one. That is the exact drift this whole project exists to remove. We would be rebuilding the problem inside the solution.

**Ask:** adopt the mapping in `TOKEN-NAMING-ALIGNMENT.md`. The transform is mechanical: `LMS/{group}/{leaf}` to `--sk-{leaf}`. Decide the prefix and the primitive-layer name in this meeting, not in Phase 3.

---

## 2. Generate from the LMS subset, not the full UUI library

**Doc says:** adopt UUI as a hybrid base.

**Concern:** the UUI library is 862 variables. Production binds to a 30-token `LMS/*` semantic layer over SKO brand primitives. If the pipeline exports everything, dev gets ~800 CSS variables nobody uses, plus four color modes where two are placeholder white. That is noise that rots.

**Ask:** confirm the semantic contract is the `LMS/*` set only. Light mode SKO is the default theme. Dark mode SKO stays dormant. The two UUI modes are ignored.

---

## 3. The "1-2% page impact" number is not credible

**Doc says:** CSS migration could impact existing pages by 1-2%.

**Concern:** the same doc reports 1,200+ CSS files across the two repos and 119+ partner-specific duplicates, with most components page-specific rather than reusable. A migration of that surface does not land at 1-2%. Either that figure measures a narrow slice that has not been defined, or it is optimism that will set the wrong expectation with leadership.

**Ask:** what does 1-2% actually measure — files, components, rendered pages, or visual-regression diffs? If it is unmeasured, label it an estimate and commit to a baseline from visual-regression snapshots before Phase 3.

---

## 4. White-labeling is sequenced as a parallel win — it is not

**Doc says:** white-labeling supported via token overrides instead of separate CSS files. Listed as a benefit alongside the build.

**Concern:** token overrides only reach the UI if the component consumes tokens. The doc also says most components are page-specific and not reusable, with 119+ partner CSS files today. So token-based white-label cannot retire those files until components are tokenized and made reusable — which is Phase 2 and Phase 3 work. White-label is a downstream result, not a parallel benefit.

**Ask:** state plainly that white-label coverage equals tokenization coverage. Track it as a percentage of components migrated, and stop counting it as delivered until the underlying components consume tokens.

---

## 5. The real risk is ownership, and it is buried

**Doc says:** "Lack of dedicated Design System ownership" appears in the risk list. The governance model assigns Design and Frontend responsibilities and proposes a weekly review.

**Concern:** a weekly sync is a meeting, not ownership. The question that kills these systems is: who decides a contested token change on a Tuesday afternoon, and whose backlog absorbs the maintenance? Without a named owner with decision rights and allocated time, the 5-7 sprint estimate slips and the system rots back into per-page CSS.

**Ask:** name a DS owner with explicit decision authority and a standing time allocation. Define the escalation path for a disputed change. This is the single highest-leverage decision in the whole plan.

---

## 6. Scale check — the seed is small relative to the target

**Doc says:** ~230 reusable components across the two repos; setup estimated at 5-7 sprints.

**Concern:** the current Figma component library is a focused LMS extension set, not 230 components. The token foundation is solid and production-bound, but the gap between what exists in design and what migration requires is large. 5-7 sprints covers foundation and a core slice, not full adoption.

**Ask:** separate "foundation ready" from "platform migrated" in the roadmap. Phase 1-2 delivers the system and a pilot component family. Full migration is a longer, separately tracked effort with its own estimate. Do not let 5-7 sprints read as done.

---

## 7. Dark mode — deferred in build, already in the tokens

**Doc says:** dark mode deferred / out of scope.

**Concern:** not a problem, but worth stating so nobody re-tokenizes later. The `LMS/*` layer already carries Dark mode SKO values. Dark is a stylesheet-emit decision, not a re-tokenization effort.

**Ask:** agree to keep dark values in the token layer dormant rather than stripping them. Costs nothing now, saves the rework later.

---

## What I am asking the room to leave with

1. Naming bridge adopted (`LMS/*` to `--sk-*`), prefix and primitive name confirmed.
2. Semantic generation scoped to the LMS subset.
3. A named DS owner with decision rights and allocated time.
4. "Foundation ready" and "platform migrated" split in the roadmap, with honest estimates for each.
5. The 1-2% figure defined or relabeled.
