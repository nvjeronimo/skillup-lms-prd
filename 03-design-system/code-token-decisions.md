# The "To decide" rows: proposals (12 Nov 2026)

The 29 rows marked **To decide** in the [code → Figma token mapping](code-token-mapping.md), grouped by subject, each
with a proposal. Rule behind every proposal: **no new DS token** where an existing role token or a component value
does the job (new tokens need Nelson's approval; Open edX-based only, 28 Oct).

**Where the evidence comes from:** what the prototype and the DS already do for the same case. Where each token is used
in the dev team's code was **not** checked (the Storybook shows the tokens, not where components use them).

**Status:** proposals. Three need a decision from Nelson (marked **Decide**); the rest only map to tokens that exist.

## Summary

| # | Subject | Rows | Proposal | New token? |
|---|---|---|---|---|
| 1 | Open edX colours | 2 | `bg/subtle`, `border/subtle` | No |
| 2 | Second inverse | 1 | `bg/inverse` | No |
| 3 | Video | 4 | Letterbox black stays in the video player; overlay, scrim and error use `bg/overlay` | **Decide** |
| 4 | Skeleton | 4 | `bg/muted` with a `bg/subtle` sweep; on a dark band, the dark theme | No |
| 5 | Focus on a dark band | 1 | `border/primary` + `border/focus-gap` under the dark theme | No |
| 6 | Off-scale type | 5 | Nearest DS style; nothing under 13 | No |
| 7 | Off-scale spacing | 4 | Value of the Figma component; if none, the smaller step | **Decide** |
| 8 | Steps the code lacks | 1 + 2 + 1 | `Spacing/8xl–11xl`, `Radius/inner`, `Radius/surface`, `Layout/*` from the package | No |
| 9 | Radius per skin | 1 | SKO only until a skin goes to production | **Decide** |
| 10 | Sidebar and top bar sizes | 3 | Component sizes (72, 320) and `Spacing/lg` | No |

## 1. Open edX colours

| Code | Value | Proposal | Why |
|---|---|---|---|
| `--sko-bg-edx-light` | #F2F0EF | `bg/subtle` #F3F5FA | Our screens use our tokens. An Open edX screen we do not restyle keeps its own Paragon theme, so it needs no SKO token. |
| `--sko-border-edx` | #D7D3D1 | `border/subtle` #D5DCE2 | As above. |

## 2. Second inverse

| Code | Value | Proposal | Why |
|---|---|---|---|
| `--sko-bg-inverse-deep` | #0C1C22 | `bg/inverse` #13282F | The DS has one inverse. Where a darker area sits inside a dark band, the band is a dark-theme region (`[data-theme="dark"]`) and its page colour is `bg/page` #0E1A1F, as the prototype does for header bands. |

## 3. Video (Decide)

The prototype's video player uses only DS tokens: `bg/overlay`, `bg/overlay-soft`, `bg/on-media`, `bg/on-media-soft`,
`bg/fixed`.

| Code | Value | Proposal | Why |
|---|---|---|---|
| `--sko-bg-video` | #000 | Stays a value in the video player (`--sk-video-letterbox: #000`), not a DS token | The bars around a video are part of the media, black in every skin and theme. A DS role would never change value. |
| `--sko-bg-video-overlay` | #000000A6 | `bg/overlay` #0E1A1F at 70% | Same role as the modal backdrop; the prototype uses it on the video. |
| `--sko-bg-video-scrim` | #000000B8 | `bg/overlay` | As above. |
| `--sko-bg-video-error` | #0D181FD1 | `bg/overlay` | 82% vs 70%, same role. Check the error message stays readable on 70%. |

**Decide:** keep the letterbox as a video-player value (proposed), or add a DS token `bg/media` (a new token).

## 4. Skeleton

The prototype's skeleton (`components/atoms/Skeleton.tsx`, `.sk-skeleton` in `app/globals.css`) uses two existing tokens.

| Code | Value | Proposal | Why |
|---|---|---|---|
| `--sko-bg-skeleton` | #E4EAEE | `bg/muted` #E1E7EC | The bar. |
| `--sko-bg-skeleton-highlight` | #F4F7F9 | `bg/subtle` #F3F5FA | The sweep across the bar. |
| `--sko-bg-skeleton-inverse` | #1D3A44 | `bg/muted` under the dark theme (#25383F) | A dark band is a dark-theme region, so the same two tokens give the dark values. |
| `--sko-bg-skeleton-inverse-highlight` | #2A4D58 | `bg/subtle` under the dark theme | As above. |

## 5. Focus on a dark band

| Code | Value | Proposal | Why |
|---|---|---|---|
| `--sko-fg-focus-on-dark` | #7EC8E3 | `border/primary` under the dark theme (#4AA3C7), with the `border/focus-gap` gap (#062C41) | The DS focus ring is `border/primary` with a 2 px gap in `border/focus-gap` (effect style *Focus rings/focus-ring*). In a dark-theme region both resolve to their dark values. |

## 6. Off-scale type

Nothing below 13 on any screen (decision of 29 Oct: body-small and label-small are 13/18).

| Code class | Size | Proposal |
|---|---|---|
| `3xl-bold` | 32/40 | `headline-medium/Bold` 30/38. A page title takes `headline-large/Bold` 36/44. |
| `2xl-semibold` | 28/35 | `headline-medium/Semibold` 30/38 |
| `15-semibold` | 15/20 | `body-medium/Semibold` 14/20 (body-large 16/24 where it is a card title) |
| `11-semibold / 11-bold` | 11/13 | `body-small` 13/18, Semibold or Bold |
| `2xs-bold` (no uppercase) | 10 | `body-small/Bold` 13/18; uppercase eyebrows use `label-small` |

## 7. Off-scale spacing (Decide)

Each value is exactly between two DS steps.

| Code | Proposal |
|---|---|
| `space-10` | The Figma component's value; if the component is not in Figma, 8 (`Spacing/md`) |
| `space-14` | As above; default 12 (`Spacing/lg`) |
| `space-18` | As above; default 16 (`Spacing/xl`) |
| `space-28` | As above; default 24 (`Spacing/3xl`) |

**Decide:** the default when no component says otherwise: the smaller step (proposed, keeps components from growing)
or the larger one.

## 8. Steps the code lacks

Take them from the [dev token package](dev-token-package/README.md); nothing to decide.

| Figma | Package |
|---|---|
| `Spacing/8xl … 11xl` | `--sk-space-8xl … 11xl` in `css/spacing.css` (smaller on tablet and phone) |
| `Radius/inner` 2 | `--sk-radius-inner` in `css/radius.css` (inner + padding = outer, decision 028) |
| `Radius/surface` 16 | `--sk-radius-surface` (sheets, modals) |
| `Layout/band-x, column-gap, stack-gap, side-gap, grid-gap` | `--sk-layout-*` in `css/spacing.css` (decision 032) |

## 9. Radius per skin (Decide)

`4. Skin shape` gives each brand skin its own radii (SKO 6/12/16, Studio 20/36/40, Harbor 10/16/20, Fluent 4/8/12).
Since 12 Nov the package writes them in `css/radius.css`, so the code gets them with no extra work.

**Decide:** does any skin other than SKO go to production? If not, the code uses the SKO values only (proposed) and
ignores the skin blocks.

## 10. Sidebar and top bar sizes

| Code | Value | Proposal | Why |
|---|---|---|---|
| `outline-width-collapsed` | 72 | A size of the Sidebar component, not a token | The prototype's collapsed rail is 72 too. |
| `outline-drawer-max` | 320 | A size of the Sidebar component, not a token | The prototype's drawer is 320. |
| `topbar-gap` | 12 | `Spacing/lg` 12 | Already a spacing step. |
