import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as i}from"./index-CxbY7dAs.js";import{M as s}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function t(n){const r={code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Engineering/Responsive Tiers"}),`
`,e.jsx(r.h1,{id:"responsive-tiers",children:"Responsive tiers"}),`
`,e.jsx(r.p,{children:`| Breakpoint | Layout                                                                               |
|------------|--------------------------------------------------------------------------------------|
| ≥ 1100 px  | Full three-column: Sidebar 256 / Content / AIPanel 272                               |
| 960–1100   | Sidebar + Content (AIPanel hideable)                                                 |
| 768–960    | Sidebar + Content. Topbar hides Course crumb + AI toggle. AIPanel hidden by default. |
| 480–768    | Sidebar becomes a slide-over drawer. AIPanel hidden.                                 |
| ≤ 480      | Drawer sidebar. Topbar shows brandmark only + active crumb. No AIPanel.              |`}),`
`,e.jsx(r.h2,{id:"what-hides-at-each-tier",children:"What hides at each tier"}),`
`,e.jsxs(r.p,{children:["The Topbar and Breadcrumb expose explicit boolean props (",e.jsx(r.code,{children:"showCourseCrumb"}),", ",e.jsx(r.code,{children:"showModuleCrumb"}),", ",e.jsx(r.code,{children:"showWordmark"}),", ",e.jsx(r.code,{children:"showAIToggle"}),") that mirror the Figma component variants. Use them with media-query-driven logic in production rather than separate components."]}),`
`,e.jsx(r.h2,{id:"sidebar-drawer-behavior",children:"Sidebar drawer behavior"}),`
`,e.jsxs(r.p,{children:["On ≤ 768 px the sidebar becomes a slide-over drawer. ",e.jsxs(r.strong,{children:["Use ",e.jsx(r.code,{children:"position: fixed; transform: translateX(-100%)"})]})," for the closed state. Don't use a zero-width grid column — the column collapses but the children still take width and break layout."]}),`
`,e.jsx(r.p,{children:"This Storybook ships the inline desktop sidebar only. Wire the drawer in the MFE shell."}),`
`,e.jsx(r.h2,{id:"breadcrumb-truncation",children:"Breadcrumb truncation"}),`
`,e.jsx(r.p,{children:'The active leaf truncates with ellipsis. Ancestors hide at breakpoints rather than ellipsis-truncating, because ellipsizing course names produces useless "Generative…" snippets. Keep the full leaf visible whenever it fits; hide ancestors before truncating the leaf.'})]})}function x(n={}){const{wrapper:r}={...i(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(t,{...n})}):t(n)}export{x as default};
