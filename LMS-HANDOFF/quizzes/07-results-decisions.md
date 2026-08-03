# Three results-screen decisions — evidence and recommendation

*Aug 3, 2026. Researched against Coursera's Help Center and research blog, Canvas source, Moodle and Blackboard documentation, D2L Brightspace, NN/g, and Open edX primary sources.*

Three questions were blocking the results screen. They share one screen, so they are decided together.

---

## 1 · Pass mark — keep it, but stop calling it a gate

### What Coursera does

The threshold is **per assignment**, and it appears in a compact **metadata rail**, not a banner:

> **Attempts** 3 every 8 hours · **To pass** 80% or higher · **Your grade** — Not available

Three things about that are worth copying, and one is worth resisting.

- **It is a rail, not a banner.** A banner implies an event; a rail implies a fact. The threshold sits beside the attempts policy and the current grade as one more property of the assignment.
- **It persists after passing.** The results screen still reads *"TO PASS 80% or higher"* next to *"Congratulations! You passed!"*. It is a property of the assignment, not a pre-flight warning that disappears once cleared.
- **Practice items show no threshold at all.** The type label ("Practice Assignment") carries the meaning instead. A threshold with no consequence is noise.
- **Resist assuming 80% is a default.** It is a near-universal authoring convention on Coursera, documented nowhere.

Coursera's failure state is defined per assignment too: *"Didn't Pass" means your grade is "below the required passing score **for that assignment**."*

### What we can actually do

Open edX has no per-subsection pass mark — confirmed twice, from the `SequenceBlock` field list and from the Studio Configure modal. `GRADE_CUTOFFS` is course-wide. Nothing gates on a per-quiz threshold, nothing stores one, nothing records passing a single quiz.

So a "To pass: 70%" row on our screen is **presentation only**: a number from our own config, compared client-side, with no platform consequence behind it.

| Route | Cost | Honest? |
|---|---|---|
| Show no per-quiz threshold; show the score and the type label | none | fully — matches the backend |
| **Store the threshold in our layer and word it as a target, not a verdict** | small | yes, if the wording does not imply enforcement |
| Build real per-subsection pass state (plugin, recompute on score change, gating) | large, and off the upgrade path | yes, but expensive |

### ✅ Recommendation

**Route 2.** Keep the threshold, because learners genuinely need to know what they are aiming at, and every comparable platform shows it. But:

- Word it as a **target**, not a gate: *"To pass · 70%"* as a fact in a rail, never *"You must score 70% to continue"*, which promises enforcement we do not have.
- Put it in the **entry rail beside attempts**, and keep it visible in the results.
- **No threshold on practice quizzes.** Let the type label do the work.
- Record it as a **content requirement**: the pass mark becomes authored metadata the content team must supply. If they will not, route 1 is the fallback — not an invented number.

---

## 2 · Stacked alerts — the question was wrong

I asked whether to remove the red "INCORRECT" banner when a hint is showing. The research says the redundancy is not caused by having two surfaces. **It is caused by both surfaces saying the same thing.**

### Nobody labels the row "Incorrect"

Coursera marks each option with what to *do* about it:

> `Correct` · `This should not be selected` · `Un-selected is correct` · `This should be selected`

Canvas splits it differently but with the same intent — one marker denotes **ownership**, another denotes **correctness**:

> your wrong pick → `You Answered` · the option you missed → `Correct Answer` · your right pick → `Correct!`

Neither platform ever writes "Incorrect" on a row. Each label carries information the colour cannot: *you picked this and shouldn't have* is a different proposition from *you missed this one*. **Redundancy dissolves by construction**, without anyone arbitrating which surface to delete.

### The evidence on what to cut

Coursera's own published research is unusually direct:

> "Verification feedback alone (correct/incorrect) … **does not impact the learner's performance**."
> "Elaboration (detailed) feedback in response to incorrect answers **will have a positive impact**."

Text elaboration made learners **3.4×** more likely to answer the next question correctly; embedded video, **5.3×**. So when cutting surfaces, cut the **verification duplicates** and protect the **explanation**.

### These really are separate surfaces

Moodle exposes a 4 × 8 matrix where "Whether correct" is its own toggle, independent of *Specific feedback* (per chosen option), *General feedback* (per question, everyone), *Right answer* (the reveal) and *Overall feedback* (per quiz, score-banded). That is documented proof that marking a row and explaining in a block are separate decisions, not a bundle.

Open edX has four such channels — per-choice feedback, demand hints, the `<solution>` explanation, and Show Answer — with **no switchboard**. The platform will not stop us stacking five things. Canvas, which also has no such logic, routinely produces six surfaces on one wrong answer.

### Accessibility settles the rest

- **Inside a row, redundancy is required.** Colour must never carry meaning alone (WCAG 1.4.1; Moodle's and Canvas's own policies say so).
- **Across surfaces, redundancy is noise** — NN/g's "unnecessary noise", their example being a field marked with an asterisk *and* an icon *and* a red outline *and* a message.
- **De-duplicate in the accessibility tree, not on screen:** `aria-hidden` / `role="presentation"` on icons whose adjacent text already carries the meaning. Canvas ships exactly this.

### ✅ Recommendation

1. **Relabel the option rows.** Replace the generic incorrect treatment with what-to-do-about-it labels: *This should not be selected* / *This should be selected* / *Un-selected is correct*. This is the change that makes everything else fall out.
2. **Then drop the "INCORRECT" banner** — with the rows relabelled it restates what is already on screen. Keep the banner only where it carries something new: the score, or the explanation.
3. **Hint and explanation never appear together.** Hint **while attempts remain**; explanation **when attempts are exhausted or the answer is correct**. This is what the component description already says, and the research confirms it: revealing early removes the reason to try again.
4. **Withhold by question type, as Coursera does.** On multi-select, do not expose the full correct set while attempts remain — *"You didn't select all the correct answers"* preserves retry value. Single-select rows can expose their status.
5. **Icons `aria-hidden` when the adjacent label says the same thing.**

Nothing here needs backend work. It is restraint and copywriting.

---

## 3 · Retry incorrect — cheap as presentation, expensive as mechanic

### Coursera does not do it

*"Try again"* restarts the **whole** assessment. What softens it: **previous answers are pre-filled**, so the *work* concentrates on the wrong ones even though the *form* is the whole quiz. Question pools may swap questions on a retake.

Attempts are a **rolling window, not a budget** — `3 every 8 hours` — and the warning fires *before* the last attempt is spent, with a live countdown:

> "This is your last attempt for the next 22 hours and 48 minutes. Make sure you've studied the material before you start."

The **highest** score is the grade of record, and the results show **both** figures — *Grade received* (the one that counts) beside *Latest Submission Grade* — so a worse retry visibly does no harm.

### One platform does do it: D2L Brightspace

"Retake Incorrect Questions Only" exists, and its scoring rule is the part that matters:

> "A learner's score … **remains at minimum, the score they had on the previous attempt**", and correct answers on the retake **add** to it.

Without that floor, a partial retake can *lower* a grade — which is the trap. Its display rule is also worth stealing: correctly-answered questions appear as **stem only, options omitted**, preserving the shape of the quiz while making only the actionable items interactive. RIO still consumes a full attempt.

FlexiQuiz, Tovuti and LearnDash ship similar features; Canvas, Moodle and Blackboard do not.

### The uncomfortable finding

**Open edX is already natively closer to Brightspace than to Coursera.** Because attempts are counted per problem and each problem submits independently, a learner *can already* re-answer only the ones they got wrong. That is the default behaviour.

What is missing is not the mechanic — it is the **framing**. There is no quiz-level submit, so there is no *"you scored 6/10, here are the 4 to fix"* moment.

### ✅ Recommendation

**Build the presentation, not the mechanic.**

After the learner finishes the subsection, show a results view listing the incorrect questions with a "fix these" affordance that deep-links to each. This reads per-problem correctness that already exists — **no new backend state** — and delivers most of the Brightspace experience for near-zero cost.

Then resolve the labelling honestly:

- If we keep our quiz-level attempt model, **"Retry incorrect" must consume an attempt**, and the button must say so. Otherwise the limit is decorative and a learner can grind indefinitely while the counter still reads "2 attempts".
- If we adopt the floor rule, say it: *your score cannot go down.* It removes the main reason not to try.

**Also adopt Coursera's attempts wording regardless of the route** — it is free and better than most:

- Express limits as a **rolling window** where the backend allows it, not a depleting budget.
- **Warn before the last attempt is spent**, with a countdown to the minute.
- If we keep a highest-score rule, show **both figures** so a worse retry visibly does not hurt. ⚠︎ This needs our own layer — Open edX keeps the *current* score, not the highest, unless `grading_method` is set to `highest_score`.

---

## Summary

| | Decision | Backend cost |
|---|---|---|
| **Pass mark** | Keep as a target in a rail, authored metadata, none on practice | small — one authored field |
| **Stacked alerts** | Relabel rows with what-to-do; then drop the redundant banner; hint XOR explanation | none |
| **Retry incorrect** | Presentation over existing per-problem state; must consume an attempt if we keep the limit | none, if we resist building attempt aggregation |

The pattern across all three: **the expensive version is rarely the one worth building.** Two of the three cost nothing beyond copywriting and restraint, and the third needs a single authored field rather than a subsystem.
