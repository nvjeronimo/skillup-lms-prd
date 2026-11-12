# Dev token package (exported 11 Nov 2026)

The SKO Design System tokens as they are in Figma today, for the dev team's Storybook and components. Read it with
the [code → Figma token mapping](../code-token-mapping.md), which says which Figma token replaces each `--sko-*` token
in code.

## What is in it

| Path | What it is |
|---|---|
| `figma/variables.json` | Every published Figma variable and text style, with resolved values per mode. Format `skillup-figma-tokens/1`, written by the *Publish tokens* plugin's export (prototype repo, `figma-plugin/code.js`). |
| `css/colors.css` | Colour tokens `--color-*`: SKO light in `:root`, dark in `[data-theme="dark"]`, the other skins in `[data-skin="gold"]`, `"harbor"`, `"fluent"`, `"teal"`, and Studio in `[data-direction="studio"]`. |
| `css/typography.css` | `--sk-type-*` sizes and line heights, and the `.sk-text-<style>-<weight>` classes (e.g. `.sk-text-body-medium-semibold`). |
| `css/spacing.css` | `--sk-space-*`, `--sk-container-*`, `--sk-layout-*`. |
| `css/radius.css` | `--sk-radius-*` (the role radii: inner, control, card-inset, track, card, surface, pill), and the same roles per brand skin from `4. Skin shape`: `[data-skin="harbor"]`, `"fluent"`, `[data-direction="studio"]`, `[data-square-corners]`. Gold has SKO's radii, so it has no block. |
| `css/motion.css` | `--motion-*` durations and easings. |
| `scripts/build.mjs` | The script that turns `figma/variables.json` into `css/`. |

## How the names map

A Figma variable becomes a CSS custom property with the slashes turned into dashes: `bg/page` → `--color-bg-page`,
`text/default` → `--color-text-default`, `Spacing/3xl` → `--sk-space-3xl`, `Radius/control` → `--sk-radius-control`.
If you keep the `--sko-` prefix, keep the rest of the name as in Figma: `--sko-bg-page`, `--sko-text-default`. Do not
reuse an old `--sko-*` name for a different role (the mapping lists the twelve that clash, e.g. `--sko-bg-primary`).

## Breakpoints

Spacing, layout and type values change by breakpoint (Figma modes Desktop, Tablet, Mobile), and `[data-device]`
forces one (the prototype's device preview). The agreed breakpoints are **phone < 768, tablet 768–1023,
desktop ≥ 1024**, and the CSS switches exactly there: Tablet under `max-width: 1023px`, Mobile under
`max-width: 767px` (fixed 12 Nov 2026; until then a window exactly 1024 or 768 wide got the smaller mode).

## Regenerate

```bash
node scripts/build.mjs
```

Node 18 or later, no dependencies. A value is changed in Figma, never in the CSS: export the JSON again (the
*Publish tokens* plugin in the DS file) and rerun the script.

## Not in the CSS

- **`5. Scope`** (Open edX only / Beyond Open edX) is a switch for design reviews in Figma: it hides or shows what goes
  beyond Open edX on the screens. It is not a token for code, which builds the Open edX scope only.
- `[data-square-corners]` squares every role, buttons included. The prototype keeps the button's own corners inside
  it (`tokens/square-corners.css`); that rule is CSS, not a token.
- `_Primitives` is not published: components use the role tokens only.

## Source

Figma file `c7EUDrQwP8si08aPipDSIV` (SKO Design System), exported read-only on 11 Nov 2026. Collections: `1.
SKO-Semantics` (123 variables; SKO, Gold, Studio, Harbor, Fluent × light/dark), `2. Responsive` (87), `3. Motion`
(13), `4. Skin shape` (8), `5. Scope` (2); 47 text styles.
