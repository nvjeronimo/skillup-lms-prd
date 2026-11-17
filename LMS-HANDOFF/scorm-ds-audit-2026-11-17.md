# SCORM Ready for Dev: DS and token audit vs fixes (17 Nov 2026)

ICP file *LMS ICP Phase 1*, page *Phase 1 · Activity · SCORM - Ready for Dev* ([7428-1069](https://www.figma.com/design/Wz2TCYFVr0hD8tJNiLajLt/LMS-ICP-Phase-1?node-id=7428-1069)).
Frames: 01 A `7428:1070`, 02 B `8515:17228`, 03 C `8515:17234`, 04 E `8515:17240`. 50 screens audited: 21 A, 12 B, 5 C, 12 E.
Out of scope: *Archived · SUPERSEDED* (`8494:47886`) and the archived copy (`8514:21571`).

The audit was read-only. The fixes went into the ICP the same day. The DS file was not changed.

## Summary

| | Count |
|---|---|
| Fixed | 146 properties: 48 text styles, 72 spacings, 8 radii, 18 strokes |
| Waiting for a design decision | 13 points |
| Cannot be fixed by script | ~190 overrides whose value equals the component's |
| Detached instances, local copies of DS components, hex colours inside the screens | 0 |

## Fixed

| Finding | Where | Found | Fix | Status |
|---|---|---|---|---|
| Texts without a text style | 04 E: E2, E2.2, E2.3, E3, E3.2, E3.3 | 48 | All 48 now use DS styles: 14 → `body-medium/Regular`; 12 and 13 → `body-small/*`; 16 → `body-large/Semibold`; 18 → `title-medium/Semibold`; 22 → `headline-small/Semibold`. Sizes that changed: 12 → 13 in 21 texts (DS minimum); the title went from 22 to 24 on desktop and tablet and to 20 on phone; in phone mode 3 texts grow (14 → 16, 16 → 18). | Fixed |
| Spacing without a token | 04 E: E2, E3 (6 screens) | 80 | 60 bound to `Spacing/xs · sm · md · lg · xl · 3xl · 4xl`, only where the variable resolves to the current value, so nothing moved. | 60 fixed |
| Spacing without a token, simulated package content | 01 A: A3, A3.2, A3.3 | 45 | 12 bound (12, 16 and 32 px). | 12 fixed |
| Radius without a token | 04 E: cards and course photos | 10 | 6 cards at 12 px → `Radius/card`; 2 E3 photos at 8 px (inside the card) → `Radius/card-inset`. | 8 fixed |
| Override: progress-ring stroke 3 px (component: 4) | Phone player Topbar: A ×7, B ×4, C ×3, E4.3 | 18 | All 18 back to 4 px. | Fixed |
| Changelog | Cards E2, E2.2, E2.3, E3, E3.2, E3.3 | 6 | 17 Nov entry describing the style and size changes. | Done |

Checked by screenshot before and after on E2, E3, E3.3 and the A5.3 phone Topbar: no overlap and no clipped text.

## Waiting for a design decision (Nelson)

| Finding | Nodes | Why it was not fixed | Options |
|---|---|---|---|
| E2 status card and hero without a component | `8505:17671`, `8445:15910`, `8445:15984` | Progress-Card and Course-Header show a %, which decision 042 rules out | A variant without %, or a new component |
| E3 program row and E3.3 program card without a component | `8505:17693`, `8445:15943`, `8445:16009` | No DS component matches | A "package" variant of Course-Row or Program-Card |
| Off-scale spacing in E2/E3 | `8505:17659` (120 / 20), `8505:17671` (20 / 10), `8505:17692` (120), `8445:15978` (24 on phone) | No token has that value in the screen's mode | Snap to the scale, or a Layout/* token (decision 032) for 120 |
| Simulated package spacing (A3) | `7430:187438`, `7430:187449`, `7430:187451` and the tablet and phone copies | 10, 14, 20 and 40 px; this is package content, not LMS UI | Mark as out of dev scope, or use a placeholder |
| E2 photo radius (8 px) | `8505:17664`, `8445:15903` | The photo sits in the hero, not inside a card, so `card-inset` does not apply | `Radius/fixed-md` or another radius role |
| Alert at Breakpoint=Mobile on desktop and tablet | `8520:18154`, `8520:18358` | It follows the canonical model `6146:10226` | Keep Mobile, or move to Desktop here and in the model |
| 9 px text in the ring (component: 12) | `I7438:10998;23124:5687;23124:5706` (A5.3, A6.3, B4.3) | "100%" at 12 px does not fit the 32 px ring. The override is needed; the problem is in the component | A text size of its own in Progress circle xxxxs |
| Topic-Footer-Nav gap 6 px on phone (component: 16) | `7437:21026`, `7438:195824`, `8505:16710` (15 screens) | The component only has State=Default | A Breakpoint=Mobile variant, or back to 16 |
| Activity-Player without radius in E1 | `I8505:16058;22847:1867` (E1 ×3) | The package is full width; it may be intentional | A "no radius" property on the component, or back to 12 |
| Modal secondary button stroke 1 px (component: 2) | `I7432:4639;4057:422036;4057:414377;21851:7616` (C ×3, E4 ×2) | Changes how the button looks; needs a check of Button 1.x | Back to the component, or fix the Button |
| `_iPhone mockup home` duplicated | 16 main components inside the screens (35 on the page), 0 instances | Needs a component published in the DS | Publish beside `_iPhone mockup status bar` and swap |
| Frame headers: phase badge, meta-strip, titles | `7428:1071`, `8515:17281`, `8515:17365`, `8515:17449` | Documentation chrome: 48 hex colours and 44 texts without a style | A "Handoff header" component in the documentation library |
| Player intro paragraph ("This activity plays below…") and separator | `7428:1107`, `7431:198534`, `8505:16550` … (39 screens) | Already on a style and tokens; only the component is missing | A slot in Topic-Header, or the DS Divider |

## Cannot be fixed by script

About 190 overrides keep the component's own value: Footer-Nav button padding, arrow and icon opacity, Topbar gap, Course Journey effect, letter spacing, Alert effect. The Plugin API has only `resetOverrides()`, which also clears texts and visibility. They change nothing on screen, but they stop future DS changes to those properties from reaching these screens. To fix them, reset each property by hand in Figma.

## Corrections to the first audit

- The meta-strip "50 SCREENS · 16 desktop · 16 tablet · 18 mobile" is right: it counts the whole SCORM set (A 21 + B 12 + C 5 + E 12). It was not changed.
- Texts without a style: the first audit said 45; the final count is 48, because E2.3 has three more.
- Modal and Breadcrumbs at Desktop on tablet are correct, since the DS has only Desktop and Mobile.
