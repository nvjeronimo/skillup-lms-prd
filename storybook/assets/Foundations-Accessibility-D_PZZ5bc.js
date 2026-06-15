import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as o}from"./index-CxbY7dAs.js";import{M as t}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Foundations/Accessibility"}),`
`,e.jsx(n.h1,{id:"accessibility-rules",children:"Accessibility rules"}),`
`,e.jsxs(n.p,{children:["Target: ",e.jsx(n.strong,{children:"WCAG 2.1 AA in both themes."})," A11y addon is enabled on every story — flag any violation it surfaces and fix at the component level, not story level."]}),`
`,e.jsx(n.h2,{id:"contrast--the-cyan-rule",children:"Contrast — the cyan rule"}),`
`,e.jsxs(n.p,{children:["White text on cyan: ",e.jsx(n.strong,{children:"7.2:1 (AAA)"}),`.
Black text on cyan: `,e.jsx(n.strong,{children:"2.9:1 (fail)"}),"."]}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"--static-white"})," for text on filled cyan, green, or red surfaces. Never assume the theme accent is a dark color — ",e.jsx(n.code,{children:"--accent"})," is dark on light theme, but ",e.jsx(n.code,{children:"--static-white"})," stays white in both, which is what you want for text on a cyan button."]}),`
`,e.jsx(n.h2,{id:"keyboard",children:"Keyboard"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["All interactive components ship with ",e.jsx(n.code,{children:":focus-visible"})," outlines (2px solid ",e.jsx(n.code,{children:"--accent"}),", 2px offset)."]}),`
`,e.jsxs(n.li,{children:["Sidebar topic rows are ",e.jsx(n.code,{children:'role="button"'})," with ",e.jsx(n.code,{children:"tabIndex={0}"})," (or ",e.jsx(n.code,{children:"-1"})," when locked)."]}),`
`,e.jsxs(n.li,{children:["Tab strip uses ",e.jsx(n.code,{children:'role="tablist"'})," / ",e.jsx(n.code,{children:'role="tab"'})," with ",e.jsx(n.code,{children:"aria-selected"}),"."]}),`
`,e.jsxs(n.li,{children:["Quiz step rail uses ",e.jsx(n.code,{children:'role="list"'}),"."]}),`
`,e.jsxs(n.li,{children:["Topbar toggles use ",e.jsx(n.code,{children:"aria-expanded"})," and ",e.jsx(n.code,{children:"aria-pressed"})," for sidebar / AI states."]}),`
`]}),`
`,e.jsx(n.h2,{id:"screen-reader",children:"Screen reader"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Decorative SVGs use ",e.jsx(n.code,{children:"aria-hidden"}),"."]}),`
`,e.jsxs(n.li,{children:["Status icons use ",e.jsx(n.code,{children:"aria-hidden"})," on the visual layer; row state is conveyed in text (the duration / meta line) and via ",e.jsx(n.code,{children:"aria-disabled"})," on locked rows."]}),`
`,e.jsxs(n.li,{children:["Locked rows expose the unlock condition via ",e.jsx(n.code,{children:"title"})," (tooltip) — wire this to your tooltip system in production."]}),`
`,e.jsxs(n.li,{children:["Live-now badges should announce with ",e.jsx(n.code,{children:'aria-live="polite"'})," if used in alerts."]}),`
`]}),`
`,e.jsx(n.h2,{id:"reduced-motion",children:"Reduced motion"}),`
`,e.jsxs(n.p,{children:["Components use short ",e.jsx(n.code,{children:"--dur"})," (220ms) transitions. The blinking dot on ",e.jsx(n.code,{children:'Badge tone="live"'})," and the AI panel live indicator should respect ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})," — currently they don't (fix on the way)."]}),`
`,e.jsx(n.h2,{id:"touch",children:"Touch"}),`
`,e.jsx(n.p,{children:"Minimum hit area: 44×44 px. Topic-row min-height enforces this; the bookmark icon button explicitly sizes 14×16 visually but has padding that hits 44×44."}),`
`,e.jsx(n.h2,{id:"color-blindness",children:"Color blindness"}),`
`,e.jsx(n.p,{children:"Don't rely on color alone to communicate state. Quiz feedback uses both color (green/red) AND iconography (✓/✕). Topic row state combines color + icon shape (filled vs ring vs lock)."})]})}function m(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{m as default};
