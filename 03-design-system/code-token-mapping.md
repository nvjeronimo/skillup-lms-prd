# Code tokens → Figma tokens (11 Nov 2026)

The dev team's Storybook (`https://sumac1-apps.spinup.tech/storybook/`, *Foundations*) next to the SKO Design System
in Figma (`c7EUDrQwP8si08aPipDSIV`). For each token in code: the Figma token to use instead, and what changes.

**Figma is the source.** The goal is that the code generates its tokens from the Figma variables with the same names
(see [the dev token package](dev-token-package/README.md)). Until then this table says which Figma token replaces each
code token. The old names can stay as aliases while components move over.

**How to read the status:**
- **Same value:** rename only. Nothing changes on screen.
- **⚠ Same name, other value:** the code name exists in Figma with another colour or size. A developer who reads the
  name in Figma and uses the code token with that name gets the wrong value. Fix these first.
- **Close: use the DS token:** no exact value in the DS; the token on the right replaces it. The value changes a little,
  usually towards the DS decision (contrast, one shade instead of several).
- **To decide:** no DS equivalent. Either it becomes a DS token (new tokens need Nelson's approval) or an existing
  token replaces it.

Compared: the SKO skin, light mode, desktop values unless stated. Not compared: dark mode, the other skins (Gold,
Studio, Harbor, Fluent), shadow values.

## 1. Colours

90 colour tokens in code: **22 same value**, **12 same name with another value**, **44 close**,
**12 to decide**. Figma colours are role tokens named by element: `bg/`, `text/`, `icon/`, `border/`.

### Backgrounds

| Code token | Code value | Figma token | Figma value | Status | Note |
|---|---|---|---|---|---|
| `--sko-bg-primary` | #FFF | `bg/page` | #FFFFFF | ⚠ Same name, other value | The page background. In Figma `bg/primary` is the brand fill #26708E. |
| `--sko-bg-secondary` | #F3F5FA | `bg/subtle` | #F3F5FA | Same value |  |
| `--sko-bg-secondary-subtle` | #F8F9FA | `bg/faint` | #F8F9FA | Same value |  |
| `--sko-bg-tertiary` | #E1E7EC | `bg/muted` | #E1E7EC | Same value | Use `bg/hover` for a hover and `bg/track` for a progress track (same value, separate roles). |
| `--sko-bg-brand-primary` | #EBF8FF | `bg/primary-soft` | #EBF8FF | Same value |  |
| `--sko-bg-brand-section` | #EBF8FF | `bg/primary-soft` | #EBF8FF | Same value | Same value as bg-brand-primary: one token. |
| `--sko-bg-brand-solid` | #26708E | `bg/primary` | #26708E | Same value |  |
| `--sko-bg-brand-hover` | #F9C654 | `bg/primary-hover` | #F9C654 | Same value |  |
| `--sko-bg-success-primary` | #E4FCED | `bg/success-soft` | #E4FCED | Same value |  |
| `--sko-bg-warning-primary` | #FFF9EB | `bg/warning-soft` | #FFF2D4 | Close: use the DS token | Value moves to #FFF2D4. #FFF9EB is `bg/accent-yellow-soft`, the yellow accent, not the warning state. |
| `--sko-bg-error-primary` | #FCE8E8 | `bg/error-soft` | #FCE8E8 | Same value |  |
| `--sko-bg-accent` | #00688D | `bg/primary` | #26708E | Close: use the DS token | #00688D is the old brand teal; the brand fill is #26708E. |
| `--sko-bg-accent-hover` | #005A78 | `bg/primary-hover` | #F9C654 | Close: use the DS token | The brand hover in the DS is the yellow #F9C654, not a darker teal. |
| `--sko-bg-accent-subtle` | #E8F4F8 | `bg/primary-soft` | #EBF8FF | Close: use the DS token |  |
| `--sko-bg-accent-subtle-hover` | #D4ECF4 | `bg/hover` | #E1E7EC | Close: use the DS token |  |
| `--sko-bg-selected` | #F5FAFF | `bg/primary-soft` | #EBF8FF | Close: use the DS token | A selected row or option. |
| `--sko-bg-success-subtle` | #ECFDF3 | `bg/success-soft` | #E4FCED | Close: use the DS token | One soft green, not two. |
| `--sko-bg-error-subtle` | #FEF3F2 | `bg/error-soft` | #FCE8E8 | Close: use the DS token | One soft red, not two. |
| `--sko-bg-warning-subtle` | #FFF8E6 | `bg/warning-soft` | #FFF2D4 | Close: use the DS token | One soft yellow for warnings, not two. |
| `--sko-bg-disabled` | #F2F4F7 | `bg/subtle` | #F3F5FA | Close: use the DS token | The DS has no bg/disabled; disabled controls use bg/subtle with text/disabled. |
| `--sko-bg-hover` | #F4F7F8 | `bg/hover` | #E1E7EC | ⚠ Same name, other value | Button 1.4 / Icon Button 1.3 (20 Oct): the neutral hover is bg/hover #E1E7EC, darker than #F4F7F8. |
| `--sko-bg-hover-alt` | #F8FAFB | `bg/faint` | #F8F9FA | Close: use the DS token |  |
| `--sko-bg-panel-muted` | #F8F9FC | `bg/faint` | #F8F9FA | Close: use the DS token |  |
| `--sko-bg-placeholder` | #E8EEF3 | `bg/muted` | #E1E7EC | Close: use the DS token |  |
| `--sko-bg-edx-light` | #F2F0EF | `bg/subtle` | #F3F5FA | To decide | An Open edX colour. Use bg/subtle, or keep it as a component token where an untouched Open edX screen needs it. |
| `--sko-bg-overlay` | #13282F99 | `bg/overlay` | #0E1A1FB2 | ⚠ Same name, other value | Modal backdrop. The DS value is #0E1A1F at 70%. |
| `--sko-bg-inverse` | #13282F | `bg/inverse` | #13282F | Same value |  |
| `--sko-bg-inverse-deep` | #0C1C22 | `bg/inverse` | #13282F | To decide | No second inverse in the DS. |
| `--sko-bg-video` | #000 | — |  | To decide | Video player only. Keep as a video component token, or add to the DS (needs approval). |
| `--sko-bg-video-overlay` | #000000A6 | — |  | To decide | Video player only, as above. |
| `--sko-bg-video-scrim` | #000000B8 | — |  | To decide | Video player only, as above. |
| `--sko-bg-video-error` | #0D181FD1 | `bg/overlay` | #0E1A1FB2 | To decide | Close to bg/overlay; check the video error state. |
| `--sko-bg-glass` | #0003 | `bg/overlay-soft` | #0E1A1F33 | Close: use the DS token | The DS video action buttons: Default bg/overlay-soft. |
| `--sko-bg-glass-hover` | #0005 | `bg/on-media-soft` | #FFFFFF4D | Close: use the DS token | The DS video action buttons: Hover bg/on-media-soft. |
| `--sko-bg-skeleton` | #E4EAEE | `bg/muted` | #E1E7EC | To decide | The DS has no skeleton tokens. Use bg/muted, or add skeleton tokens (needs approval). |
| `--sko-bg-skeleton-highlight` | #F4F7F9 | `bg/faint` | #F8F9FA | To decide | As above. |
| `--sko-bg-skeleton-inverse` | #1D3A44 | — |  | To decide | Skeleton on a dark band. No DS equivalent. |
| `--sko-bg-skeleton-inverse-highlight` | #2A4D58 | — |  | To decide | As above. |

### Borders

| Code token | Code value | Figma token | Figma value | Status | Note |
|---|---|---|---|---|---|
| `--sko-border-primary` | #B9C4CE | `border/default` | #8995A6 | ⚠ Same name, other value | In Figma `border/primary` is the brand #26708E. #B9C4CE is `border/disabled`; a control outline is `border/default` (3:1, WCAG 1.4.11). |
| `--sko-border-secondary` | #E1E7EC | `border/subtle` | #D5DCE2 | Close: use the DS token |  |
| `--sko-border-brand` | #26708E | `border/primary` | #26708E | Same value |  |
| `--sko-border-accent` | #00688D | `border/primary` | #26708E | Close: use the DS token | Old brand teal. |
| `--sko-border-selected` | #2E90FA | `border/primary` | #26708E | Close: use the DS token | Focus has its own ring; a selected item uses the brand border. |
| `--sko-border-success` | #12B76A | `border/success` | #1F7643 | ⚠ Same name, other value | DS #1F7643. |
| `--sko-border-success-soft` | #AAEDC2 | `border/success-soft` | #AAEDC2 | Same value |  |
| `--sko-border-error` | #F04438 | `border/error` | #B62226 | ⚠ Same name, other value | DS #B62226. |
| `--sko-border-error-subtle` | #FECDCA | `border/error-soft` | #F3AFB0 | Close: use the DS token |  |
| `--sko-border-default` | #E0E0E0 | `border/subtle` | #D5DCE2 | ⚠ Same name, other value | #E0E0E0 is a light divider; in Figma `border/default` is the control outline #8995A6. |
| `--sko-border-input` | #D0D5DD | `border/default` | #8995A6 | Close: use the DS token | Input outline, 3:1 against the page (WCAG 1.4.11). |
| `--sko-border-subtle` | #E4E7EC | `border/subtle` | #D5DCE2 | ⚠ Same name, other value | DS #D5DCE2. |
| `--sko-border-hairline` | #F0F0F0 | `border/subtle` | #D5DCE2 | Close: use the DS token | One divider colour, not four. |
| `--sko-border-divider` | #F3F4F6 | `border/subtle` | #D5DCE2 | Close: use the DS token | As above. |
| `--sko-border-row` | #F5F5F5 | `border/subtle` | #D5DCE2 | Close: use the DS token | As above. |
| `--sko-border-hover` | #C5CED6 | `border/default` | #8995A6 | Close: use the DS token | Check where it is used. |
| `--sko-border-accent-muted` | #C5D5DB | `border/primary-soft` | #ACD5F4 | Close: use the DS token |  |
| `--sko-border-edx` | #D7D3D1 | `border/subtle` | #D5DCE2 | To decide | Open edX colour, as bg-edx-light. |

### Icons and foreground

| Code token | Code value | Figma token | Figma value | Status | Note |
|---|---|---|---|---|---|
| `--sko-fg-white` | #FFF | `icon/on-primary` | #FFFFFF | Same value | Or text/on-primary / icon/on-media, by context. |
| `--sko-fg-quaternary` | #B9C4CE | `icon/faint` | #B9C4CE | Same value |  |
| `--sko-fg-brand` | #26708E | `icon/primary` | #26708E | Same value |  |
| `--sko-fg-brand-primary` | #26708E | `icon/primary` | #26708E | Same value | Same value as fg-brand: one token. |
| `--sko-fg-progress` | #0086C9 | `bg/info` | #0086C9 | Same value | The progress fill (Progress Bar 1.1). |
| `--sko-fg-success` | #12B76A | `icon/success` | #1F7643 | Close: use the DS token | DS #1F7643; `icon/success-strong` #33A864 where a brighter check is drawn. |
| `--sko-fg-error` | #F04438 | `icon/error` | #B62226 | Close: use the DS token |  |
| `--sko-fg-error-icon` | #D92D20 | `icon/error` | #B62226 | Close: use the DS token |  |
| `--sko-fg-warning` | #F79009 | `icon/warning` | #85580E | Close: use the DS token | DS #85580E: much darker, for contrast. |
| `--sko-fg-idle` | #8995A6 | `text/disabled` | #8995A6 | Same value |  |
| `--sko-fg-focus-on-dark` | #7EC8E3 | — |  | To decide | Focus ring on a dark band: the DS has focus-ring effect styles; agree the dark variant. |
| `--sko-fg-danger-badge` | #D23228 | `bg/error` | #DA3336 | Close: use the DS token | A count badge fill. |

### Text

| Code token | Code value | Figma token | Figma value | Status | Note |
|---|---|---|---|---|---|
| `--sko-text-primary` | #13282F | `text/default` | #13282F | ⚠ Same name, other value | In Figma `text/primary` is the brand text #215477. |
| `--sko-text-secondary` | #606B7A | `text/subtle` | #4F5B69 | Close: use the DS token | Same value as text/placeholder, but secondary text is text/subtle #4F5B69. |
| `--sko-text-tertiary` | #677482 | `text/subtle` | #4F5B69 | Close: use the DS token |  |
| `--sko-text-primary-on-brand` | #FFF | `text/on-primary` | #FFFFFF | Same value |  |
| `--sko-text-brand` | #26708E | `text/primary` | #215477 | Close: use the DS token | DS brand text is #215477 (AA on white); #26708E stays for icons and fills. |
| `--sko-text-brand-primary` | #044150 | `text/on-primary-soft` | #044150 | Same value | Text on a soft brand fill. |
| `--sko-text-brand-secondary` | #26708E | `text/primary` | #215477 | Close: use the DS token |  |
| `--sko-text-success-primary` | #1F7643 | `text/success` | #1F7643 | Same value |  |
| `--sko-text-warning-primary` | #85580E | `text/warning` | #85580E | Same value |  |
| `--sko-text-error-primary` | #DA3336 | `text/error` | #B62226 | Close: use the DS token | DS #B62226 (AA on soft red). |
| `--sko-text-accent` | #00688D | `text/primary` | #215477 | Close: use the DS token | Old brand teal. |
| `--sko-text-success-strong` | #027A48 | `text/success` | #1F7643 | Close: use the DS token | One success text. |
| `--sko-text-error-strong` | #B42318 | `text/error` | #B62226 | Close: use the DS token | One error text. |
| `--sko-text-warning-strong` | #B54708 | `text/warning` | #85580E | Close: use the DS token | One warning text. |
| `--sko-text-warning-on-subtle` | #664D03 | `text/warning` | #85580E | Close: use the DS token |  |
| `--sko-text-body` | #334155 | `text/default` | #13282F | Close: use the DS token | Body copy is text/default; text/muted #39414C for secondary paragraphs. |
| `--sko-text-body-muted` | #475467 | `text/subtle` | #4F5B69 | Close: use the DS token |  |
| `--sko-text-muted` | #6C757D | `text/subtle` | #4F5B69 | ⚠ Same name, other value | In Figma `text/muted` is #39414C (darker); #6C757D is close to text/subtle's role. |
| `--sko-text-subtle` | #454545 | `text/muted` | #39414C | ⚠ Same name, other value | In Figma `text/subtle` is #4F5B69; #454545 is closer to text/muted #39414C. |
| `--sko-text-disabled` | #98A2B3 | `text/disabled` | #8995A6 | ⚠ Same name, other value | DS #8995A6. |
| `--sko-text-locked` | #9CA3AF | `text/disabled` | #8995A6 | Close: use the DS token |  |
| `--sko-text-inverse-muted` | #4B5563 | `text/subtle` | #4F5B69 | Close: use the DS token | Check the context: on a dark band use text/on-inverse. |

## 2. Typography

Figma text styles are named by role (Material scale): `display`, `headline`, `title`, `body`, `label`, each with
Regular / Medium / Semibold / Bold. Montserrat everywhere. **In Figma the scale changes by breakpoint** (Desktop ·
Tablet · Phone); the code has one value for every screen.

| Code class `.sko-text-…` | Code size/line | Figma style | Figma size/line (D · T · P) | Status | Note |
|---|---|---|---|---|---|
| `display-lg` | 48/60 | `display-small` | 48/60 · 36/44 · 30/38 | Same value | Steps down on tablet and phone. |
| `display-md-bold` | 36/44 | `headline-large/Bold` | 36/44 · 30/38 · 24/32 | Same value | Letter spacing −2% on both. |
| `display-sm-semibold` | 30/38 | `headline-medium/Semibold` | 30/38 · 30/38 · 24/32 | Same value | Figma has no letter spacing here; the code applies −2% to every display size. |
| `display-xs-semibold` | 24/32 | `headline-small/Semibold` | 24/32 · 24/32 · 20/30 | Same value |  |
| `3xl-bold` | 32/40 | `headline-medium or headline-large` | 30/38 · 36/44 | To decide | 32 is not on the DS scale. |
| `2xl-semibold` | 28/35 | `headline-medium/Semibold` | 30/38 | To decide | 28 is not on the DS scale. |
| `xl-semibold / xl-bold` | 20/27 | `title-large` | 20/30 · 20/30 · 18/28 | Close: use the DS token | Line height 27 → 30. |
| `lg-semibold / lg-medium` | 18/24 | `title-medium` | 18/24 | Same value |  |
| `md-*` | 16/24 | `body-large` | 16/24 · 16/24 · 18/26 | Same value | 18/26 on a phone (29 Oct). |
| `15-semibold` | 15/20 | `body-medium or body-large` | 14/20 · 16/24 | To decide | 15 is not on the DS scale (4-pt grid). |
| `sm-*` | 14/20 | `body-medium` | 14/20 · 14/20 · 16/24 | Same value | 16/24 on a phone (27 Oct). |
| `13-medium` | 13/20 | `body-small/Medium` | 13/18 | Close: use the DS token | Line height 20 → 18. |
| `xs-*` | 12/18 | `body-small` | 13/18 | ⚠ Same name, other value | DS minimum is 13 (29 Oct): `text-xs` is 13 in Figma. |
| `11-semibold / 11-bold` | 11/13 | `body-small` | 13/18 | To decide | 11 is below the DS minimum. |
| `2xs-* (uppercase +4%)` | 10/14 | `label-small` | 13/18, uppercase, +4% | ⚠ Same name, other value | The DS label is 13/18; `text-2xs` in Figma is 12/18. |
| `2xs-bold (no uppercase)` | 10/1? | `body-small/Bold` | 13/18 | To decide | The Storybook page prints line height 1. |

## 3. Spacing

Same names and desktop values. **In Figma the larger steps get smaller on tablet and phone**; in code they are fixed.

| Code `--sko-spacing-…` | Code | Figma variable | Figma (D · T · P) | Status |
|---|---|---|---|---|
| `none` | 0 | `Spacing/none` | 0 · 0 · 0 | Same value |
| `xxs` | 2 | `Spacing/xxs` | 2 · 2 · 2 | Same value |
| `xs` | 4 | `Spacing/xs` | 4 · 4 · 4 | Same value |
| `sm` | 6 | `Spacing/sm` | 6 · 6 · 6 | Same value |
| `md` | 8 | `Spacing/md` | 8 · 8 · 8 | Same value |
| `lg` | 12 | `Spacing/lg` | 12 · 12 · 12 | Same value |
| `xl` | 16 | `Spacing/xl` | 16 · 16 · 16 | Same value |
| `2xl` | 20 | `Spacing/2xl` | 20 · 20 · 16 | Close: use the DS token |
| `3xl` | 24 | `Spacing/3xl` | 24 · 20 · 16 | Close: use the DS token |
| `4xl` | 32 | `Spacing/4xl` | 32 · 24 · 20 | Close: use the DS token |
| `5xl` | 40 | `Spacing/5xl` | 40 · 32 · 24 | Close: use the DS token |
| `6xl` | 48 | `Spacing/6xl` | 48 · 40 · 32 | Close: use the DS token |
| `7xl` | 64 | `Spacing/7xl` | 64 · 48 · 40 | Close: use the DS token |
| `—` | — | `Spacing/8xl … 11xl` | 80 … 160 (desktop) | To decide |
| `space-10` | 10 | `—` | use 8 or 12 | To decide |
| `space-14` | 14 | `—` | use 12 or 16 | To decide |
| `space-18` | 18 | `—` | use 16 or 20 | To decide |
| `space-28` | 28 | `—` | use 24 or 32 | To decide |

## 4. Radius

Figma names the radius by role (decision 028: inner radius + padding = outer radius). The Batch 1 components already
use 6 for controls and 12 for cards.

| Code `--sko-…` | Code | Figma variable | Figma | Status | Note |
|---|---|---|---|---|---|
| `radius-none` | 0 | `Radius/none` | 0 | Same value |  |
| `radius-xs` | 4 | `Radius/fixed-xs` | 4 | Same value |  |
| `radius-sm` | 6 | `Radius/control` | 6 | Same value | Buttons, inputs, chips (decision 028). The Storybook page says buttons and inputs use radius-md (8): that line is wrong. |
| `radius-md` | 8 | `Radius/card-inset` | 8 | Same value | A card inside a card. |
| `radius-lg` | 10 | `Radius/track` | 10 | Same value | A segmented control's track. |
| `radius-xl` | 12 | `Radius/card` | 12 | Same value |  |
| `radius-full` | 9999 | `Radius/pill` | 9999 | Same value |  |
| `rounded-control` | 6 | `Radius/control` | 6 | Same value |  |
| `rounded-card` | 12 | `Radius/card` | 12 | Same value |  |
| `—` | — | `Radius/inner` | 2 | To decide | Missing in code: the inner radius (inner + padding = outer). |
| `—` | — | `Radius/surface` | 16 | To decide | Missing in code: sheets, modals. |
| `—` | — | `4. Skin shape` | per skin: SKO 6/12/16, Studio 20/36/40, Harbor 10/16/20, Fluent 4/8/12 | To decide | Radius changes with the brand skin; the code has one set. |

## 5. Layout and breakpoints

Figma layout tokens (decision 032) and the breakpoints of the prototype (phone < 768, tablet 768–1023, desktop ≥ 1024).

| Code `--sko-…` | Code | Figma | Figma (D · T · P) | Status |
|---|---|---|---|---|
| `layout-gutter-desktop / tablet / mobile` | 150 / 64 / 20 | `Layout/page-x` | 48 / 40 / 24 | ⚠ Same name, other value |
| `layout-max-width` | 1440 | `Container/max-width · Container/content-max-width` | 1280 · 1200 | ⚠ Same name, other value |
| `layout-section-padding-y` | 40 | `Layout/section-gap · Layout/page-top` | 48/40/32 · 48/40/32 | ⚠ Same name, other value |
| `layout-catalog-max` | 1100 | `Container/content-max-width` | 1200 | ⚠ Same name, other value |
| `outline-width` | 280 | `Sidebar 3 of 12 columns` | 280–400 (decision 037) | ⚠ Same name, other value |
| `outline-width-collapsed` | 72 | — | check the DS Sidebar collapsed width | To decide |
| `outline-drawer-max` | 320 | — | check the DS drawer | To decide |
| `layout-pad / layout-pad-mobile` | 16 / 8 | `Container/content-padding` | 24 / 20 / 16 | ⚠ Same name, other value |
| `topbar-gap` | 12 | — | — | To decide |
| `—` | — | `Layout/band-x, column-gap, stack-gap, side-gap, grid-gap` | see the package (decision 032) | To decide |
| `breakpoint-xs / sm / md / lg` | 575 / 720 / 768 / 1200 | `Breakpoints` | phone < 768 · tablet 768–1023 · desktop ≥ 1024 | ⚠ Same name, other value |

## 6. Shadows and focus

Names only; values not compared yet. Figma effect styles: `Elevation/level1–5`, `Shadows/shadow-xs-skeuomorphic`,
`Shadows/shadow-card`, `Shadows/shadow-2xl`, `Shadows/shadow-3xl`, `Focus rings/*`.

| Code | Figma (to confirm) |
|---|---|
| `--sko-shadow-xs` | `Shadows/shadow-xs-skeuomorphic or Elevation/level1` |
| `--sko-shadow-skeuomorphic-inset` | `Shadows/shadow-xs-skeuomorphic` |
| `--sko-shadow-menu` | `Elevation/level2 ?` |
| `--sko-shadow-toast` | `Elevation/level3 ?` |
| `--sko-shadow-overlay` | `Elevation/level4 ?` |
| `--sko-shadow-lg` | `Elevation/level4 ?` |
| `--sko-drop-shadow-level4` | `Elevation/level4` |
| `--sko-focus-ring-width 2 / offset 2` | `Focus rings/focus-ring + border/focus-gap` |

## 7. What we need to agree

1. **Fix the ⚠ rows first**: the code names that mean something else in Figma (`bg-primary`, `text-primary`,
   `border-primary`, `border-default`, `text-muted`, `text-subtle`…).
2. **Generate tokens from Figma** with the same names and the breakpoint modes ([dev token package](dev-token-package/README.md)).
   Keep the old names as aliases during the migration.
3. **Go through the "To decide" rows together** ([proposals, 12 Nov](code-token-decisions.md)): video, skeleton, glass, Open edX colours, the off-scale type sizes
   (11, 15, 28, 32) and spacing steps (10, 14, 18, 28), the layout values. Each becomes a DS token (Nelson approves)
   or is replaced.
4. **Correct the Storybook Spacing page**: buttons and inputs use radius 6 (`Radius/control`), not 8.
