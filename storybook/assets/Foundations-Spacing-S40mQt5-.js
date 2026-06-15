import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as d}from"./index-CxbY7dAs.js";import{M as t}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...d(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Foundations/Spacing & Radius"}),`
`,e.jsx(n.h1,{id:"spacing--8pt-grid",children:"Spacing — 8pt grid"}),`
`,e.jsxs(n.p,{children:["The V7 grid is base-8 with 4px steps allowed (so the ",e.jsx(n.code,{children:"sp-1"}),"–",e.jsx(n.code,{children:"sp-12"})," scale is effectively a base-4 superset). Stick to these values for padding, gap, and margin. Off-grid values cause the whole interface to feel imprecise; the grid-audit skill will catch them."]}),`
`,e.jsxs(n.p,{children:[`| Token    | Value | Common use                                  |
|----------|-------|---------------------------------------------|
| `,e.jsx(n.code,{children:"sp-1"}),`   | 4 px  | Inline gap between icon and label inside a chip |
| `,e.jsx(n.code,{children:"sp-2"}),`   | 8 px  | Gap inside a row, between siblings          |
| `,e.jsx(n.code,{children:"sp-3"}),`   | 12 px | Card padding (small), button gap            |
| `,e.jsx(n.code,{children:"sp-4"}),`   | 16 px | Standard padding (cards, modules)           |
| `,e.jsx(n.code,{children:"sp-5"}),`   | 20 px | Section gap, generous gutter                |
| `,e.jsx(n.code,{children:"sp-6"}),`   | 24 px | Page gutters, section padding               |
| `,e.jsx(n.code,{children:"sp-8"}),`   | 32 px | Hero padding                                |
| `,e.jsx(n.code,{children:"sp-10"}),`  | 40 px |                                             |
| `,e.jsx(n.code,{children:"sp-12"}),"  | 48 px | Quiz hero vertical padding                  |"]}),`
`,e.jsx(n.h2,{id:"accepted-exceptions",children:"Accepted exceptions"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"1 px borders."}),`
`,e.jsx(n.li,{children:"2 px focus-ring outlines / accent bars on active rows."}),`
`,e.jsx(n.li,{children:"Icon sizes that don't follow the grid (14, 18, 22) when they need to optically balance against text — common for status icons."}),`
`]}),`
`,e.jsx(n.h2,{id:"radius",children:"Radius"}),`
`,e.jsxs(n.p,{children:[`| Token     | Value | Use                                       |
|-----------|-------|-------------------------------------------|
| `,e.jsx(n.code,{children:"r-sm"}),`    | 6 px  | Buttons, badges, inputs, small cards     |
| `,e.jsx(n.code,{children:"r-md"}),`    | 10 px | AI cards, quiz options                   |
| `,e.jsx(n.code,{children:"r-lg"}),`    | 14 px | Hero / display surfaces                  |
| `,e.jsx(n.code,{children:"r-full"}),"  | 9999  | Pills (theme toggle, chips)              |"]})]})}function m(s={}){const{wrapper:n}={...d(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{m as default};
