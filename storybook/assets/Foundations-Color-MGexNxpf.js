import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as d}from"./index-CxbY7dAs.js";import{M as o}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function r(c){const n={code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...d(),...c.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Foundations/Color"}),`
`,e.jsx(n.h1,{id:"color-tokens",children:"Color tokens"}),`
`,e.jsx(n.p,{children:"Each row pairs the dark and light values for the same semantic token. Use the toolbar to switch theme — every component below auto-rebinds via CSS variables."}),`
`,e.jsx(n.h2,{id:"surfaces",children:"Surfaces"}),`
`,e.jsxs(n.p,{children:[`| Token        | Dark      | Light     | Use                                     |
|--------------|-----------|-----------|-----------------------------------------|
| `,e.jsx(n.code,{children:"--bg"}),"       | ",e.jsx(n.code,{children:"#090D12"})," | ",e.jsx(n.code,{children:"#F0F6F9"}),` | App canvas                              |
| `,e.jsx(n.code,{children:"--bg2"}),"      | ",e.jsx(n.code,{children:"#0D1520"})," | ",e.jsx(n.code,{children:"#FFFFFF"}),` | Topbar, sidebar, AI panel               |
| `,e.jsx(n.code,{children:"--bg3"}),"      | ",e.jsx(n.code,{children:"#121D2C"})," | ",e.jsx(n.code,{children:"#F5FAFB"}),` | Cards (notes, AI cards)                 |
| `,e.jsx(n.code,{children:"--bg4"}),"      | ",e.jsx(n.code,{children:"#172434"})," | ",e.jsx(n.code,{children:"#E8F4F8"}),` | Tertiary surface                        |
| `,e.jsx(n.code,{children:"--surface"}),"  | ",e.jsx(n.code,{children:"#1B3D4F"})," | ",e.jsx(n.code,{children:"#D5EBF2"}),` | Hover wash, button track                |
| `,e.jsx(n.code,{children:"--surface2"})," | ",e.jsx(n.code,{children:"#224D62"})," | ",e.jsx(n.code,{children:"#B8D8E6"})," | Scrollbar thumb, deeper hover           |"]}),`
`,e.jsx(n.h2,{id:"text",children:"Text"}),`
`,e.jsxs(n.p,{children:[`| Token     | Dark      | Light     | Use                            |
|-----------|-----------|-----------|--------------------------------|
| `,e.jsx(n.code,{children:"--text"}),"  | ",e.jsx(n.code,{children:"#E8F0F5"})," | ",e.jsx(n.code,{children:"#1B3D4F"}),` | Primary copy, active items     |
| `,e.jsx(n.code,{children:"--text2"})," | ",e.jsx(n.code,{children:"#7D9BAD"})," | ",e.jsx(n.code,{children:"#2E5468"}),` | Secondary copy                 |
| `,e.jsx(n.code,{children:"--text3"})," | ",e.jsx(n.code,{children:"#5E8A9E"})," | ",e.jsx(n.code,{children:"#4A7A90"})," | Tertiary, eyebrows, meta       |"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--text2"})," and ",e.jsx(n.code,{children:"--text3"})," were both adjusted from the v6 baseline to clear WCAG AA. Don't darken them further without re-checking."]}),`
`,e.jsx(n.h2,{id:"accent-interactive",children:"Accent (interactive)"}),`
`,e.jsxs(n.p,{children:[`| Token            | Dark                       | Light                      |
|------------------|----------------------------|----------------------------|
| `,e.jsx(n.code,{children:"--accent"}),"       | ",e.jsx(n.code,{children:"#0096C7"}),"                  | ",e.jsx(n.code,{children:"#005A82"}),`                  |
| `,e.jsx(n.code,{children:"--accent2"}),"      | ",e.jsx(n.code,{children:"#007DAA"}),"                  | ",e.jsx(n.code,{children:"#004268"}),`                  |
| `,e.jsx(n.code,{children:"--accent-dim"}),"   | ",e.jsx(n.code,{children:"rgba(0,150,199,0.13)"}),"     | ",e.jsx(n.code,{children:"rgba(0,90,130,0.10)"}),`      |
| `,e.jsx(n.code,{children:"--accent-glow"}),"  | ",e.jsx(n.code,{children:"rgba(0,150,199,0.28)"}),"     | ",e.jsx(n.code,{children:"rgba(0,90,130,0.20)"}),"      |"]}),`
`,e.jsxs(n.p,{children:["Light-mode accent is darkened to ",e.jsx(n.code,{children:"#005A82"})," to clear 4.5:1 contrast on white. Never use ",e.jsx(n.code,{children:"#0096C7"})," on white — it fails."]}),`
`,e.jsx(n.h2,{id:"semantic",children:"Semantic"}),`
`,e.jsxs(n.p,{children:[`| Token       | Dark      | Light     | Use                                   |
|-------------|-----------|-----------|---------------------------------------|
| `,e.jsx(n.code,{children:"--success"})," | ",e.jsx(n.code,{children:"#27A96E"})," | ",e.jsx(n.code,{children:"#0A7656"}),` | Completion, correct answers, LIVE NOW |
| `,e.jsx(n.code,{children:"--amber"}),"   | ",e.jsx(n.code,{children:"#F5A623"})," | ",e.jsx(n.code,{children:"#C97C10"}),` | Warning, due-soon                     |
| `,e.jsx(n.code,{children:"--red"}),"     | ",e.jsx(n.code,{children:"#E24B4A"})," | ",e.jsx(n.code,{children:"#C23B3A"}),` | Wrong answer, error, overdue          |
| `,e.jsx(n.code,{children:"--blue"}),"    | ",e.jsx(n.code,{children:"#48CAE4"})," | ",e.jsx(n.code,{children:"#0F5C74"})," | Info accent (rare)                    |"]}),`
`,e.jsx(n.h2,{id:"static-colors",children:"Static colors"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"--static-white"})," and ",e.jsx(n.code,{children:"--static-black"})," keep the same value in both modes. Used for text on cyan / green / red filled backgrounds where contrast must be theme-independent."]}),`
`,e.jsx(n.h2,{id:"rule-of-thumb",children:"Rule of thumb"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Cyan = interactive. Green = completion or live availability. Red = error."}),` Don't use cyan on a completion icon, and don't use green on an "Add note" button.`]})]})}function u(c={}){const{wrapper:n}={...d(),...c.components};return n?e.jsx(n,{...c,children:e.jsx(r,{...c})}):r(c)}export{u as default};
