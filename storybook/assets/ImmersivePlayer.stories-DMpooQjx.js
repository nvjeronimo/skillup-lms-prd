import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as Y}from"./index-G8LIXM5I.js";import{T as X}from"./Topbar-Da_xtRHB.js";import{S as $}from"./Sidebar-BaYekiOA.js";import{A as ee}from"./AIPanel-0eDwZ2cL.js";import{F as te}from"./FooterNav-DKvgodS7.js";import{V as se}from"./VideoPlayer-DOicFYkc.js";import{T as ie,a as ae}from"./Tab-CHtZUzAW.js";import{T as ne}from"./TranscriptLine-BI858F6Y.js";import{N as re}from"./NoteCard-EwuVgb5X.js";import{Q as m}from"./Quiz-CyfAPao9.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Breadcrumb-DOqH990z.js";import"./ProgressBar-DwJjfbXI.js";import"./ModuleAccordionHeader-C3q0GB5O.js";import"./ModuleNumberLabel-DvZ5_eZp.js";import"./TopicUnitRow-BrGAYUOX.js";import"./StatusIcon-vNtwE9Zs.js";import"./TopicTypeIcon-TfZdbq-5.js";import"./Bookmark-DoHxPvQz.js";import"./Badge-ehOg1QO1.js";import"./StepDot-DFQzN7Mg.js";import"./QuizOption-4Yf7C3Nv.js";import"./Button-abr5vWsf.js";function W({modules:h,course:i,module:b,active:t,activeUnitId:s,unitNumber:y,unitTotal:G,progress:Z,content:J,showAIPanel:x=!0,showSidebar:g=!0}){const K=["v7-app",!g&&"v7-app--no-sidebar",!x&&"v7-app--no-ai"].filter(Boolean).join(" ");return e.jsxs("div",{className:K,children:[e.jsx("header",{className:"v7-app__topbar",children:e.jsx(X,{course:i,module:b,active:t,progress:Z,showAIToggle:x})}),g&&e.jsx("div",{className:"v7-app__sidebar",children:e.jsx($,{courseEyebrow:"Course",courseName:i,modules:h,activeUnitId:s})}),e.jsxs("main",{className:"v7-app__content",children:[J,e.jsx(te,{unitNumber:y,unitTotal:G,unitName:t})]}),x&&e.jsx("div",{className:"v7-app__ai",children:e.jsx(ee,{})})]})}W.__docgenInfo={description:`ImmersivePlayer — page template.
Three-column grid: Sidebar (256) / Content / AIPanel (272), with Topbar above and FooterNav below.`,methods:[],displayName:"ImmersivePlayer",props:{modules:{required:!0,tsType:{name:"Array",elements:[{name:"SidebarModule"}],raw:"SidebarModule[]"},description:"Course outline for the sidebar."},course:{required:!0,tsType:{name:"string"},description:""},module:{required:!0,tsType:{name:"string"},description:""},active:{required:!0,tsType:{name:"string"},description:""},activeUnitId:{required:!0,tsType:{name:"string"},description:""},unitNumber:{required:!0,tsType:{name:"number"},description:""},unitTotal:{required:!0,tsType:{name:"number"},description:""},progress:{required:!0,tsType:{name:"number"},description:""},content:{required:!0,tsType:{name:"ReactNode"},description:"Center column content — VideoPlayer + tabs, or Quiz, etc."},showAIPanel:{required:!1,tsType:{name:"boolean"},description:"Hide AI panel (e.g. in quiz screens).",defaultValue:{value:"true",computed:!1}},showSidebar:{required:!1,tsType:{name:"boolean"},description:"Hide sidebar (e.g. focus mode or mobile).",defaultValue:{value:"true",computed:!1}}}};const oe=[{id:"m1",number:1,title:"Defining AI in product context",units:[{id:"u1",title:"Course welcome and goals",duration:"2 min",type:"video",state:"success"},{id:"u2",title:"What we mean by AI today",duration:"5 min",type:"video",state:"success"},{id:"u3",title:"Module 1 quiz",duration:"8 min",type:"quiz",state:"success"}]},{id:"m2",number:2,title:"AI in the product lifecycle",units:[{id:"u4",title:"AI in discovery",duration:"4 min",type:"video",state:"success"},{id:"u5",title:"The PM's AI toolkit",duration:"6 min",type:"video",state:"success"},{id:"u6",title:"Product lifecycle with AI",duration:"3 min 20 s",type:"video",bookmarked:!0},{id:"u7",title:"Live Q&A with the instructor",type:"live",meta:"Live · 11:30 PM Apr 18, 2025"},{id:"u8",title:"Module 2 quiz",duration:"10 min",type:"quiz"}]},{id:"m3",number:3,title:"Operating AI features in production",units:[{id:"u9",title:"Monitoring & feedback loops",duration:"7 min",type:"video",state:"locked"},{id:"u10",title:"Guardrails practice",duration:"20 min",type:"practice",state:"locked"},{id:"u11",title:"Final assessment",duration:"30 min",type:"quiz",state:"locked"}]}],de=[{ts:"00:00",text:"So far we've covered defining AI in product context.",state:"past"},{ts:"00:24",text:"Welcome back. In this video we'll walk through the AI-augmented product lifecycle.",state:"active"},{ts:"00:48",text:"Let's start with discovery — where AI changes the kind of questions you can answer.",state:"upcoming"},{ts:"01:12",text:"Discovery used to be bottlenecked by interview throughput. AI doesn't replace interviews.",state:"upcoming"},{ts:"01:36",text:"But it can help you generate hypotheses and synthesize patterns across what you've already heard.",state:"upcoming"}],ce=[{ts:"01:42",body:"Distinguish discovery vs delivery — different evidence bars."},{ts:"02:18",body:"AI expands option space, doesn't replace validation."},{ts:"02:55",body:"Production guardrails > model choice."}],le=[{name:"Slides — Product lifecycle with AI.pdf",size:"1.4 MB"},{name:"Worksheet — Map your funnel.docx",size:"84 KB"},{name:"Reading list — Validation evidence bar.md",size:"12 KB"}],f=[{who:"JP",name:"Janelle P.",time:"Yesterday",text:"The discovery vs delivery framing finally clicked. Going to use this in our next sprint planning."},{who:"AM",name:"Amir M.",time:"2 days ago",text:"Question on validation: how do you handle synthetic-user generation when you don't have access to real users yet?"}],a={modules:oe,course:"Generative AI for Product Managers",module:"Module 2 — AI in the product lifecycle",active:"Product lifecycle with AI",activeUnitId:"u6",unitNumber:5,unitTotal:11,progress:45},Re={title:"Pages/ImmersivePlayer",component:W,parameters:{layout:"fullscreen"}},ue=[{id:"transcript",label:"Transcript"},{id:"notes",label:"Notes"},{id:"downloads",label:"Downloads"},{id:"discussion",label:"Discussion"}],v=({initial:h})=>{const[i,b]=Y.useState(h);return e.jsxs(e.Fragment,{children:[e.jsx(se,{title:"Product lifecycle with AI",position:80,duration:200}),e.jsxs("div",{className:"v7-content-tabs",children:[e.jsx(ie,{children:ue.map(t=>e.jsx(ae,{active:i===t.id,onClick:()=>b(t.id),children:t.label},t.id))}),i==="transcript"&&e.jsx("div",{className:"v7-content-pane",children:de.map((t,s)=>e.jsx(ne,{timestamp:t.ts,text:t.text,state:t.state},s))}),i==="notes"&&e.jsxs("div",{className:"v7-content-pane v7-content-pane--two-col",children:[e.jsxs("div",{children:[e.jsx("div",{className:"v7-pane-label",style:{marginBottom:8},children:"YOUR NOTES"}),e.jsx("p",{style:{color:"var(--text2)",fontSize:"var(--text-sm)",lineHeight:1.6},children:"Capture timestamps and ideas as you watch. Notes here are tied to the current unit and visible only to you."})]}),e.jsxs("aside",{className:"v7-content-pane__notes",children:[e.jsx("div",{className:"v7-pane-label",children:"SAVED"}),ce.map((t,s)=>e.jsx(re,{timestamp:t.ts,body:t.body},s))]})]}),i==="downloads"&&e.jsxs("div",{className:"v7-content-pane",children:[e.jsx("div",{className:"v7-pane-label",children:"DOWNLOADS"}),e.jsx("div",{className:"v7-dl",children:le.map((t,s)=>e.jsxs("a",{className:"v7-dl__item",href:"#",onClick:y=>y.preventDefault(),children:[e.jsx("span",{className:"v7-dl__icon",children:e.jsx("svg",{viewBox:"0 0 16 16",width:"14",height:"14",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",children:e.jsx("path",{d:"M8 2v9M4 7l4 4 4-4M3 14h10"})})}),e.jsx("span",{className:"v7-dl__name",children:t.name}),e.jsx("span",{className:"v7-dl__size num-tabular",children:t.size})]},s))})]}),i==="discussion"&&e.jsxs("div",{className:"v7-content-pane",children:[e.jsxs("div",{className:"v7-pane-label",children:["DISCUSSION · ",f.length," POSTS"]}),e.jsx("div",{className:"v7-disc",children:f.map((t,s)=>e.jsxs("div",{className:"v7-disc__row",children:[e.jsx("span",{className:"v7-disc__av",children:t.who}),e.jsxs("div",{className:"v7-disc__bubble",children:[e.jsxs("div",{className:"v7-disc__meta",children:[t.name," · ",t.time]}),e.jsx("div",{className:"v7-disc__text",children:t.text})]})]},s))})]})]})]})},n={args:{...a,content:e.jsx(v,{initial:"transcript"})}},r={args:{...a,content:e.jsx(v,{initial:"notes"})}},o={args:{...a,content:e.jsx(v,{initial:"downloads"})}},d={args:{...a,content:e.jsx(v,{initial:"discussion"})}},F={prompt:"When using AI in product discovery, which statement is most accurate?",options:[{letter:"A",label:"AI replaces user research — generated personas are sufficient evidence."},{letter:"B",label:"AI expands the option space, but user evidence still validates decisions.",correct:!0},{letter:"C",label:"AI is only useful in delivery, not discovery."},{letter:"D",label:"AI removes the need for product strategy entirely."}],explanation:"Generative AI is best used to broaden hypotheses and synthesize patterns. Validation should still rely on real-user evidence."},c={args:{...a,active:"Module 2 quiz",activeUnitId:"u8",unitNumber:9,showAIPanel:!1,content:e.jsx(m,{phase:"start",total:5,title:"Module 2 quiz"})}},l={args:{...a,active:"Module 2 quiz",activeUnitId:"u8",unitNumber:9,showAIPanel:!1,content:e.jsx(m,{phase:"question",total:5,current:3,stepStates:["done","done","current","default","default"],question:F})}},u={args:{...a,active:"Module 2 quiz",activeUnitId:"u8",unitNumber:9,showAIPanel:!1,content:e.jsx(m,{phase:"revealed",total:5,current:3,stepStates:["done","done","done","default","default"],question:{...F,selectedIndex:1}})}},p={args:{...a,active:"Module 2 quiz",activeUnitId:"u8",unitNumber:9,showAIPanel:!1,content:e.jsx(m,{phase:"results",total:5,results:{correct:4,passed:!0}})}};var A,I,N;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    content: <TabbedContent initial="transcript" />
  }
}`,...(N=(I=n.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var S,j,w;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    content: <TabbedContent initial="notes" />
  }
}`,...(w=(j=r.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var _,T,z;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    content: <TabbedContent initial="downloads" />
  }
}`,...(z=(T=o.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var q,P,M;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    content: <TabbedContent initial="discussion" />
  }
}`,...(M=(P=d.parameters)==null?void 0:P.docs)==null?void 0:M.source}}};var D,Q,E;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: <Quiz phase="start" total={5} title="Module 2 quiz" />
  }
}`,...(E=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:E.source}}};var C,R,k;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: <Quiz phase="question" total={5} current={3} stepStates={["done", "done", "current", "default", "default"]} question={QUIZ_Q} />
  }
}`,...(k=(R=l.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};var U,V,O;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: <Quiz phase="revealed" total={5} current={3} stepStates={["done", "done", "done", "default", "default"]} question={{
      ...QUIZ_Q,
      selectedIndex: 1
    }} />
  }
}`,...(O=(V=u.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};var H,L,B;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: <Quiz phase="results" total={5} results={{
      correct: 4,
      passed: true
    }} />
  }
}`,...(B=(L=p.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};const ke=["VideoTranscript","VideoNotes","VideoDownloads","VideoDiscussion","QuizStart","QuizQuestion","QuizRevealed","QuizResults"];export{l as QuizQuestion,p as QuizResults,u as QuizRevealed,c as QuizStart,d as VideoDiscussion,o as VideoDownloads,r as VideoNotes,n as VideoTranscript,ke as __namedExportsOrder,Re as default};
