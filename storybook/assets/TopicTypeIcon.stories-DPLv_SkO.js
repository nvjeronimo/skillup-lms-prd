import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{T as P}from"./TopicTypeIcon-TfZdbq-5.js";import"./index-yBjzXJbu.js";const k={title:"Atoms/TopicTypeIcon",component:P,tags:["autodocs"],args:{type:"video",size:18},argTypes:{type:{control:"inline-radio",options:["video","quiz","practice","lab","reading","live","recording"]},size:{control:{type:"number",min:12,max:48}}}},r={args:{type:"video"}},a={args:{type:"quiz"}},s={args:{type:"practice"}},n={args:{type:"lab"}},o={args:{type:"reading"}},t={args:{type:"live"}},i={args:{type:"recording"}},c={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:16,alignItems:"center"},children:["video","quiz","practice","lab","reading","live","recording"].map(p=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx(P,{type:p,size:24}),e.jsx("span",{style:{fontSize:11,color:"var(--text3)",fontFamily:"var(--font-label)",textTransform:"uppercase",letterSpacing:"0.1em"},children:p})]},p))})};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: "video"
  }
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var g,u,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: "quiz"
  }
}`,...(y=(u=a.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var v,f,x;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: "practice"
  }
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var T,z,S;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: "lab"
  }
}`,...(S=(z=n.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var b,I,j;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    type: "reading"
  }
}`,...(j=(I=o.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var q,R,L;t.parameters={...t.parameters,docs:{...(q=t.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    type: "live"
  }
}`,...(L=(R=t.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var h,A,C;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: "recording"
  }
}`,...(C=(A=i.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var D,E,F;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 16,
    alignItems: "center"
  }}>
      {(["video", "quiz", "practice", "lab", "reading", "live", "recording"] as TopicType[]).map(t => <div key={t} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }}>
          <TopicTypeIcon type={t} size={24} />
          <span style={{
        fontSize: 11,
        color: "var(--text3)",
        fontFamily: "var(--font-label)",
        textTransform: "uppercase",
        letterSpacing: "0.1em"
      }}>{t}</span>
        </div>)}
    </div>
}`,...(F=(E=c.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};const O=["Video","Quiz","Practice","Lab","Reading","Live","Recording","All"];export{c as All,n as Lab,t as Live,s as Practice,a as Quiz,o as Reading,i as Recording,r as Video,O as __namedExportsOrder,k as default};
