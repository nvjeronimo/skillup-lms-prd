import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{useMDXComponents as i}from"./index-CxbY7dAs.js";import{M as s}from"./index-DMFwU1RX.js";import"./index-yBjzXJbu.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MW6P_hKy.js";import"./index-BLHw34Di.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function t(o){const n={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Engineering/OpenEdX Integration"}),`
`,e.jsx(n.h1,{id:"openedx-integration-notes",children:"OpenEdX integration notes"}),`
`,e.jsxs(n.p,{children:["The V7 ICP is designed to live inside ",e.jsx(n.code,{children:"frontend-app-learning"})," (the OpenEdX Learning MFE) using the ",e.jsx(n.strong,{children:"Frontend Plugin Framework"})," — no fork."]}),`
`,e.jsx(n.h2,{id:"three-open-implementation-options-for-the-ai-panel",children:"Three open implementation options for the AI panel"}),`
`,e.jsxs(n.p,{children:[`| Option        | Pros                                                                   | Cons                                                                             |
|---------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| `,e.jsx(n.strong,{children:"MFE Plugin"})," ",e.jsx(n.em,{children:"(leaning)"}),` | Native React inside the MFE. Shares context, theming, auth.        | Tight coupling to MFE upgrades.                                                  |
| `,e.jsx(n.strong,{children:"XBlock"}),`    | Authored once, available anywhere XBlocks render. Standard auth flow.   | Visual integration is harder (iframe boundary).                                  |
| `,e.jsx(n.strong,{children:"iframe"}),"    | Strongest isolation, simplest deploy.                                  | No shared context. Auth & theming must be re-bridged. Not great UX.              |"]}),`
`,e.jsxs(n.p,{children:["The current Storybook + prototype label the AI panel as ",e.jsx(n.code,{children:"XBLOCK"})," because the demo runs against an XBlock for now. That's not the recommendation — when you start integrating, evaluate Plugin first."]}),`
`,e.jsx(n.h2,{id:"what-to-wire-first",children:"What to wire first"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sidebar outline"})," — backed by Course outline API. The ",e.jsx(n.code,{children:"Sidebar"})," component takes a ",e.jsx(n.code,{children:"modules"})," prop matching the shape of OpenEdX's outline response (with one normalization step)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"VideoPlayer"})," — replace the visual shell with the existing OpenEdX video XBlock. Keep the ",e.jsx(n.code,{children:"VideoPlayer"})," chrome (eyebrow, title, controls overlay) on top — only the stage interior is replaced."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"TabStrip + content panes"})," — Notes and Discussion already exist as MFE features. Mount them inside the tab bodies; don't reimplement."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"AIPanel"})," — initially mock. Once the integration option is decided, wire the conversation thread to the real backend."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Quiz"})," — backed by an XBlock problem block. The state machine here (start → question → revealed → results) maps to the underlying XBlock transitions."]}),`
`]}),`
`,e.jsx(n.h2,{id:"theming-inside-the-mfe",children:"Theming inside the MFE"}),`
`,e.jsxs(n.p,{children:["V7 tokens are CSS custom properties scoped to ",e.jsx(n.code,{children:":root"})," and ",e.jsx(n.code,{children:'[data-theme="light"]'}),". Apply ",e.jsx(n.code,{children:"data-theme"})," to the MFE root once on load (read user preference). Components in this Storybook will Just Work inside the MFE if the same root variables are present."]}),`
`,e.jsxs(n.p,{children:["If the MFE uses Paragon (OpenEdX's design system), wrap V7 components in a ",e.jsx(n.code,{children:"data-theme"}),"-providing div and let Paragon's tokens coexist — they don't share names."]}),`
`,e.jsx(n.h2,{id:"build--deploy",children:"Build & deploy"}),`
`,e.jsxs(n.p,{children:["This Storybook builds static HTML to ",e.jsx(n.code,{children:"../storybook"})," (sibling of ",e.jsx(n.code,{children:"v7-storybook/"}),"). The hub deploy script copies that folder into the GitHub Pages site at ",e.jsx(n.code,{children:"/storybook/"}),". Engineering teams can clone the repo and ",e.jsx(n.code,{children:"npm run storybook"})," to develop locally."]}),`
`,e.jsx(n.h2,{id:"known-component-gaps-vs-prototype",children:"Known component gaps vs prototype"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Icons use unlabeled SVGs in this Storybook. Production should swap to ",e.jsx(n.strong,{children:"Untitled UI"})," (already planned by design)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Topbar"})," brand is text-rendered in CSS. Production should mount the real SVG logos (",e.jsx(n.code,{children:"skillup-logo-dark.svg"})," / ",e.jsx(n.code,{children:"skillup-logo-light.svg"}),")."]}),`
`,e.jsxs(n.li,{children:["Mobile drawer behavior isn't implemented in ",e.jsx(n.code,{children:"Sidebar"})," — it's currently always inline. Add ",e.jsx(n.code,{children:"position: fixed; transform"})," for ≤768px in production."]}),`
`,e.jsx(n.li,{children:"VideoPlayer is a visual placeholder; the real OpenEdX video XBlock replaces the stage."}),`
`]})]})}function u(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{u as default};
