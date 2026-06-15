import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as r}from"./index-CxbY7dAs.js";import{M as t}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"skillup-v7--component-library",children:"SkillUp V7 — Component Library"}),`
`,e.jsxs(n.p,{children:["This Storybook is the engineering reference for the ",e.jsx(n.strong,{children:"V7 Immersive Course Player (ICP)"})," — the post-enrollment learner experience for the SkillUp LMS, designed to live inside ",e.jsx(n.code,{children:"frontend-app-learning"})," (the OpenEdX Learning MFE) via the Frontend Plugin Framework."]}),`
`,e.jsx(n.h2,{id:"what-this-is--and-isnt",children:"What this is — and isn't"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"This is"})," a reference implementation. Each component is a faithful translation of the V7 design from the prototype HTML (",e.jsx(n.code,{children:"v7-hk/SkillUp_ICP_v7.html"}),") and Figma file (",e.jsx(n.code,{children:"Wz2TCYFVr0hD8tJNiLajLt"}),", page V7-HK + V7 Design System). Use it to ground prop shapes, state permutations, accessibility behavior, and visual fidelity."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"This is not"})," a finalized published library. The dev team should expect to:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Adapt the file structure to match its own conventions (e.g. moving CSS to CSS Modules, Tailwind, or a CSS-in-JS solution)."}),`
`,e.jsx(n.li,{children:"Replace placeholder icons with the production icon set (Untitled UI, currently planned)."}),`
`,e.jsxs(n.li,{children:["Wire components to real data sources and the OpenEdX XBlock player (the ",e.jsx(n.code,{children:"VideoPlayer"})," here is a visual shell only)."]}),`
`,e.jsx(n.li,{children:"Adjust responsive breakpoints based on real device QA."}),`
`]}),`
`,e.jsx(n.h2,{id:"how-its-organized",children:"How it's organized"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Foundations"})," — design tokens, typography, color, spacing, accessibility rules."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atoms"})," — single-purpose primitives (Button, Badge, ProgressBar, StatusIcon, TopicTypeIcon, Bookmark, StepDot, ModuleNumberLabel)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Molecules"})," — small composites (Tab, Breadcrumb, TopicUnitRow, ModuleAccordionHeader, QuizOption, TranscriptLine, NoteCard)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Organisms"})," — composed regions (Topbar, Sidebar, AIPanel, FooterNav, VideoPlayer, Quiz)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pages"})," — full ICP layout with the 8 canonical state variants."]}),`
`]}),`
`,e.jsx(n.h2,{id:"key-architectural-decisions-to-respect",children:"Key architectural decisions to respect"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Built inside ",e.jsx(n.code,{children:"frontend-app-learning"})," via Plugin Framework."]})," No MFE fork."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"AI panel"})," options on the table: XBlock, MFE Plugin (leaning), iFrame."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cyan = interactive"})," / ",e.jsx(n.strong,{children:"Green = completion"}),`. Keep these semantically separate. The single exception is "LIVE NOW" — it uses green because it's a positive availability signal, not interaction.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mobile sidebar = slide-over drawer"}),", never zero-width grid column."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Three-tier breadcrumb truncation:"})," ≥960 / 640–960 / ≤640."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"WCAG 2.1 AA across both themes."})," White on cyan, never black (white = 7.2:1 AAA, black = 2.9:1 fail)."]}),`
`]}),`
`,e.jsx(n.h2,{id:"how-to-run-locally",children:"How to run locally"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`cd v7-storybook
npm install
npm run storybook       # dev server at http://localhost:6006
npm run build-storybook # static build → ../storybook (consumed by hub deploy)
`})}),`
`,e.jsx(n.h2,{id:"related-artifacts",children:"Related artifacts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"v7-hk/SkillUp_ICP_v7.html"})," — the canonical interactive prototype (single file, no build step)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"v7-hk/PROJECT_MEMORY.md"})," — short-form context for designers."]}),`
`,e.jsx(n.li,{children:"Hub > Build > Storybook (this site)."}),`
`,e.jsxs(n.li,{children:["Figma file ",e.jsx(n.code,{children:"Wz2TCYFVr0hD8tJNiLajLt"}),", pages V7-HK and ↳ V7 - Design System."]}),`
`]})]})}function m(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{m as default};
