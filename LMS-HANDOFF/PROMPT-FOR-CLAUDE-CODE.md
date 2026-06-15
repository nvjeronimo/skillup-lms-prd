# Prompt for Claude Code

Copy-paste this prompt to Claude Code when you start the prototype + Storybook session.

---

## Context

I want to build a small **Next.js 14 + React + Tailwind + Storybook 8** prototype of an LMS Video lesson flow, plus a mini Storybook documenting ~30 reusable components.

Everything you need is in `./LMS-HANDOFF/`:

- `README.md` — overview, tech stack, project structure
- `tokens/colors.css` — all LMS color tokens as CSS variables (28 colors, source of truth, never hardcode hex)
- `tokens/typography.css` — text style ramp (Inter body + Montserrat display) with utility classes
- `components-inventory.md` — 30 components catalog: Figma IDs, variants, properties, anatomy, tokens used
- `screens-spec.md` — the 7 screens to build (Video lesson with Transcript / Notes / Downloads tabs + responsive)
- `overlay-panels-spec.md` — Notifications + Saved (Bookmarks + Notes) right-overlay panels triggered from Topbar
- `prototype-flows.md` — routes, client state shape, every interaction
- `data-model.json` — mock course content (Six Sigma course with one Active video topic + 7 transcript lines + 2 notes)
- `storybook-coverage.md` — what stories to write per component (atoms / molecules / organisms + Foundations)

## Task

1. **Scaffold** a Next.js 14 (App Router) project in `lms-prototype/`. Add Tailwind, Storybook 8 (`@storybook/nextjs` framework), TypeScript, ESLint, Prettier.
2. **Wire tokens**: import `tokens/colors.css` + `tokens/typography.css` in `app/layout.tsx`. Extend Tailwind config with `lms` color scale referencing the CSS variables (see colors.css comments at bottom).
3. **Build the prototype** as specified in `screens-spec.md` + `prototype-flows.md`. Pages:
   - `/` redirects to `/course/six-sigma/topic/m3-t1`
   - `/course/[courseSlug]/topic/[topicId]` (Transcript tab default)
   - `/course/[courseSlug]/topic/[topicId]/notes`
   - `/course/[courseSlug]/topic/[topicId]/downloads`
4. **Build the LMS components** (~30) as listed in `components-inventory.md`. Group as `components/atoms/`, `components/molecules/`, `components/organisms/`.
5. **Write Storybook stories** for every component per `storybook-coverage.md`. Plus 3 Foundations stories (Colors / Typography / Spacing).
6. **Use the mock data** in `data-model.json`. Load via `lib/data.ts`. Client state with Zustand (or React Context if simpler).
7. **Responsive**: Desktop / Tablet / Mobile breakpoints as defined in `prototype-flows.md`.

## Critical rules

- **Never hardcode hex colors.** Use CSS variables from `tokens/colors.css` only. Even backdrops bind: `rgba()` becomes `color-mix(in srgb, var(--lms-text-primary) 60%, transparent)` or apply opacity via CSS opacity property. Failing this = handoff rejected.
- **Never use raw `font-size` / `font-weight`.** Use the `.lms-text-*` utility classes from `tokens/typography.css`.
- **Icon stroke weight**: icons rendered at <24px use `stroke-width: 1.5`. Icons ≥24px use `stroke-width: 2`. Applies to every SVG (Heroicons / Untitled UI / custom). If using lucide-react, pass `strokeWidth={1.5}` to small icons.
- **Notes are anchored to transcript lines**, not raw timestamps. See `prototype-flows.md` for the editor flow.
- **Topic Footer Nav is sacred**: Previous · Unit Info / Title · Next topic. No middle action chip. Predictability beats variation.
- **`approx.` prefix** on Duration is required for Reading/Lab/Activity/Project/Practice/Graded/Peer-graded/Peer Review. Never on Video/Recording/Live/timed Quiz.
- **Module Header completed state**: when `isCompleted=true`, show green check + bind eyebrow text to `--lms-text-success-primary`. Three sidebar variants use this for fully-complete modules.
- **Right-overlay panels** (Notifications + Saved): mutually exclusive. Esc closes. Backdrop click closes. Focus trap inside. See `overlay-panels-spec.md`.

## Quality bar

- All Storybook stories must render with no errors and pass a11y addon (no critical violations).
- Prototype must work at 375 / 768 / 1440 widths.
- Lighthouse a11y ≥ 90.
- No console errors in dev mode.

## Out of scope

- Real backend / API
- Auth
- Real video playback (a single MP4 placeholder + scrubber is fine)
- Dark mode
- Other lesson types (Reading, Lab, VILT, etc.)
- Tests (Storybook story snapshots are nice-to-have, not required)

## Deliverables

1. Running `pnpm dev` shows the prototype at localhost:3000
2. Running `pnpm storybook` shows the Storybook at localhost:6006
3. README.md in `lms-prototype/` with run instructions
4. Clean commit history (one commit per logical chunk: scaffold, tokens, atoms, molecules, organisms, pages, stories)

Ready when you are.
