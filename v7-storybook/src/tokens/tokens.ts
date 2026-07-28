/**
 * Token references for use in TypeScript / inline styles.
 * Always prefer var(--token-name) in CSS — these constants are
 * for places where CSS variables aren't reachable (e.g. inline SVG fills
 * computed in JS, animation deltas).
 */

export const fonts = {
  ui: "var(--font-ui)",
  display: "var(--font-display)",
  label: "var(--font-label)",
} as const;

export const text = {
  xs: "var(--text-xs)",
  sm: "var(--text-sm)",
  base: "var(--text-base)",
  md: "var(--text-md)",
  lg: "var(--text-lg)",
  xl: "var(--text-xl)",
  "2xl": "var(--text-2xl)",
  "3xl": "var(--text-3xl)",
  "4xl": "var(--text-4xl)",
  "5xl": "var(--text-5xl)",
  labelSm: "var(--label-sm)",
  labelBase: "var(--label-base)",
} as const;

export const space = {
  1: "var(--sp-1)", 2: "var(--sp-2)", 3: "var(--sp-3)",
  4: "var(--sp-4)", 5: "var(--sp-5)", 6: "var(--sp-6)",
  8: "var(--sp-8)", 10: "var(--sp-10)", 12: "var(--sp-12)",
} as const;

export const radius = {
  sm: "var(--r-sm)", md: "var(--r-md)", lg: "var(--r-lg)", full: "var(--r-full)",
} as const;

export const color = {
  bg: "var(--bg)", bg2: "var(--bg2)", bg3: "var(--bg3)", bg4: "var(--bg4)",
  surface: "var(--surface)", surface2: "var(--surface2)",
  border: "var(--border)", border2: "var(--border2)",
  text: "var(--text)", text2: "var(--text2)", text3: "var(--text3)",
  accent: "var(--accent)", accent2: "var(--accent2)",
  accentDim: "var(--accent-dim)", accentGlow: "var(--accent-glow)",
  amber: "var(--amber)", amberDim: "var(--amber-dim)",
  blue: "var(--blue)", blueDim: "var(--blue-dim)",
  red: "var(--red)", redDim: "var(--red-dim)",
  success: "var(--success)", successDim: "var(--success-dim)",
  staticWhite: "var(--static-white)",
  staticBlack: "var(--static-black)",
} as const;

export const layout = {
  sidebarW: "var(--sidebar-w)",
  aiW: "var(--ai-w)",
  topbarH: "var(--topbar-h)",
} as const;
