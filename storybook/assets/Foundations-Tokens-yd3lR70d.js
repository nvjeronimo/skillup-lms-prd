import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as c}from"./index-CxbY7dAs.js";import{M as r}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function d(n){const s={code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...c(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundations/Design Tokens"}),`
`,e.jsx(s.h1,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsxs(s.p,{children:["All tokens are exposed as CSS custom properties (",e.jsx(s.code,{children:"var(--token-name)"}),") on ",e.jsx(s.code,{children:":root"})," and overridden under ",e.jsx(s.code,{children:'[data-theme="light"]'}),". The Storybook toolbar's theme switch toggles ",e.jsx(s.code,{children:"data-theme"})," on ",e.jsx(s.code,{children:"<html>"})," — the same hook the production app uses."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Source of truth:"})," ",e.jsx(s.code,{children:"src/tokens/tokens.css"}),". TypeScript references in ",e.jsx(s.code,{children:"src/tokens/tokens.ts"}),"."]}),`
`,e.jsx(s.h2,{id:"type-tokens",children:"Type tokens"}),`
`,e.jsxs(s.p,{children:[`| Token            | Value                                          | Use                              |
|------------------|------------------------------------------------|----------------------------------|
| `,e.jsx(s.code,{children:"--font-ui"}),`      | Montserrat, system-ui, sans-serif              | All UI ≤ 24px                    |
| `,e.jsx(s.code,{children:"--font-display"}),` | Playfair Display, Georgia, serif               | Display moments ≥ 28px           |
| `,e.jsx(s.code,{children:"--font-label"}),"   | Outfit, Montserrat, system-ui, sans-serif      | Small-caps eyebrows + tabular nums |"]}),`
`,e.jsx(s.h2,{id:"type-scale",children:"Type scale"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"text-xs 10"})," · ",e.jsx(s.code,{children:"text-sm 12"})," · ",e.jsx(s.code,{children:"text-base 14*"})," · ",e.jsx(s.code,{children:"text-md 16"})," · ",e.jsx(s.code,{children:"text-lg 20"})," · ",e.jsx(s.code,{children:"text-xl 24"})," · ",e.jsx(s.code,{children:"text-2xl 28"})," · ",e.jsx(s.code,{children:"text-3xl 32"})," · ",e.jsx(s.code,{children:"text-4xl 40"})," · ",e.jsx(s.code,{children:"text-5xl 48"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"label-sm 11"})," · ",e.jsx(s.code,{children:"label-base 13"})]}),`
`,e.jsxs(s.p,{children:["* 14 px is the ",e.jsx(s.strong,{children:"single allowed exception"})," to the multiples-of-4 rule (UI body workhorse)."]}),`
`,e.jsx(s.h2,{id:"spacing--8pt-grid",children:"Spacing — 8pt grid"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"sp-1 4"})," · ",e.jsx(s.code,{children:"sp-2 8"})," · ",e.jsx(s.code,{children:"sp-3 12"})," · ",e.jsx(s.code,{children:"sp-4 16"})," · ",e.jsx(s.code,{children:"sp-5 20"})," · ",e.jsx(s.code,{children:"sp-6 24"})," · ",e.jsx(s.code,{children:"sp-8 32"})," · ",e.jsx(s.code,{children:"sp-10 40"})," · ",e.jsx(s.code,{children:"sp-12 48"})]}),`
`,e.jsx(s.h2,{id:"radius",children:"Radius"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"r-sm 6"})," · ",e.jsx(s.code,{children:"r-md 10"})," · ",e.jsx(s.code,{children:"r-lg 14"})," · ",e.jsx(s.code,{children:"r-full 9999"})]}),`
`,e.jsx(s.h2,{id:"layout",children:"Layout"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"sidebar-w 256"})," · ",e.jsx(s.code,{children:"ai-w 272"})," · ",e.jsx(s.code,{children:"topbar-h 52"})]}),`
`,e.jsx(s.h2,{id:"motion",children:"Motion"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"ease cubic-bezier(0.4, 0, 0.2, 1)"})," · ",e.jsx(s.code,{children:"dur 0.22s"})]}),`
`,e.jsx(s.h2,{id:"brand-primitives-mode-agnostic",children:"Brand primitives (mode-agnostic)"}),`
`,e.jsxs(s.p,{children:["Used as the reference values that semantic tokens compose from. Don't apply directly in components — use the semantic token (e.g. ",e.jsx(s.code,{children:"--accent"}),") so dark/light switching works."]}),`
`,e.jsxs(s.p,{children:[`| Token            | Hex       |
|------------------|-----------|
| `,e.jsx(s.code,{children:"--brand-navy"}),"   | ",e.jsx(s.code,{children:"#1B3D4F"}),` |
| `,e.jsx(s.code,{children:"--brand-teal"}),"   | ",e.jsx(s.code,{children:"#0F5C74"}),` |
| `,e.jsx(s.code,{children:"--brand-cyan"}),"   | ",e.jsx(s.code,{children:"#0096C7"}),` |
| `,e.jsx(s.code,{children:"--brand-sky"}),"    | ",e.jsx(s.code,{children:"#51BFFC"}),` |
| `,e.jsx(s.code,{children:"--brand-light"}),"  | ",e.jsx(s.code,{children:"#CAF0F8"})," |"]})]})}function u(n={}){const{wrapper:s}={...c(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(d,{...n})}):d(n)}export{u as default};
