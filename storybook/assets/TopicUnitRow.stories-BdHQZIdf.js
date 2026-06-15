import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{T as t}from"./TopicUnitRow-BrGAYUOX.js";import"./index-yBjzXJbu.js";import"./StatusIcon-vNtwE9Zs.js";import"./TopicTypeIcon-TfZdbq-5.js";import"./Bookmark-DoHxPvQz.js";const E={title:"Molecules/TopicUnitRow",component:t,tags:["autodocs"],decorators:[Q=>e.jsx("div",{style:{width:256,padding:12,background:"var(--bg)"},children:e.jsx(Q,{})})],args:{title:"Product lifecycle with AI",duration:"3 min 20 s",type:"video",state:"notStarted"},argTypes:{state:{control:"inline-radio",options:["success","active","notStarted","locked"]},type:{control:"inline-radio",options:["video","quiz","practice","lab","reading","live","recording"]}}},r={},s={args:{state:"active"}},i={args:{state:"success"}},a={args:{state:"locked",title:"Practice Quiz: Analyze a launch plan"}},o={args:{type:"live",state:"active",title:"Q&A with the instructor",meta:"Live session · 11:30 PM Apr 18, 2025"}},c={args:{type:"recording",state:"success",title:"Q&A with the instructor",meta:"Recording · Live Session · Apr 18, 2025"}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[e.jsx(t,{title:"Defining AI in product context",duration:"4 min",type:"video",state:"success"}),e.jsx(t,{title:"The product manager's AI toolkit",duration:"6 min",type:"video",state:"success"}),e.jsx(t,{title:"Product lifecycle with AI",duration:"3 min 20 s",type:"video",state:"active",bookmarked:!0}),e.jsx(t,{title:"Module 2 quiz",duration:"10 min",type:"quiz",state:"notStarted"}),e.jsx(t,{title:"Practice Quiz: Analyze a launch plan",duration:"20 min",type:"practice",state:"locked"})]})};var d,p,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,m,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    state: "active"
  }
}`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var v,y,A;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    state: "success"
  }
}`,...(A=(y=i.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var h,x,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    state: "locked",
    title: "Practice Quiz: Analyze a launch plan"
  }
}`,...(S=(x=a.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var w,k,z;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    type: "live",
    state: "active",
    title: "Q&A with the instructor",
    meta: "Live session · 11:30 PM Apr 18, 2025"
  }
}`,...(z=(k=o.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var f,R,T;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    type: "recording",
    state: "success",
    title: "Q&A with the instructor",
    meta: "Recording · Live Session · Apr 18, 2025"
  }
}`,...(T=(R=c.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var j,L,P;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 2
  }}>
      <TopicUnitRow title="Defining AI in product context" duration="4 min" type="video" state="success" />
      <TopicUnitRow title="The product manager's AI toolkit" duration="6 min" type="video" state="success" />
      <TopicUnitRow title="Product lifecycle with AI" duration="3 min 20 s" type="video" state="active" bookmarked />
      <TopicUnitRow title="Module 2 quiz" duration="10 min" type="quiz" state="notStarted" />
      <TopicUnitRow title="Practice Quiz: Analyze a launch plan" duration="20 min" type="practice" state="locked" />
    </div>
}`,...(P=(L=n.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};const C=["NotStarted","Active","Completed","Locked","LiveSession","Recording","ListExample"];export{s as Active,i as Completed,n as ListExample,o as LiveSession,a as Locked,r as NotStarted,c as Recording,C as __namedExportsOrder,E as default};
