import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as r}from"./Badge-ehOg1QO1.js";import"./index-yBjzXJbu.js";const V={title:"Atoms/Badge",component:r,tags:["autodocs"],args:{children:"MODULE 02",tone:"neutral"},argTypes:{tone:{control:"inline-radio",options:["neutral","accent","success","amber","red","live"]},withDot:{control:"boolean"}}},s={},n={args:{tone:"accent",children:"PROGRAM"}},a={args:{tone:"success",children:"COMPLETED"}},o={args:{tone:"amber",children:"DUE SOON"}},t={args:{tone:"red",children:"OVERDUE"}},c={args:{tone:"live",withDot:!0,children:"LIVE NOW"},parameters:{docs:{description:{story:"Use only when a live session is currently in progress. The pulsing dot is reserved for this state."}}}},d={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(r,{tone:"neutral",children:"UNIT 5 / 11"}),e.jsx(r,{tone:"accent",children:"XBLOCK"}),e.jsx(r,{tone:"success",children:"COMPLETED"}),e.jsx(r,{tone:"amber",children:"DUE WED"}),e.jsx(r,{tone:"red",children:"OVERDUE"}),e.jsx(r,{tone:"live",withDot:!0,children:"LIVE NOW"})]})};var i,l,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var m,u,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    tone: "accent",
    children: "PROGRAM"
  }
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,E,O;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    tone: "success",
    children: "COMPLETED"
  }
}`,...(O=(E=a.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var D,B,x;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    tone: "amber",
    children: "DUE SOON"
  }
}`,...(x=(B=o.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};var v,y,L;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    tone: "red",
    children: "OVERDUE"
  }
}`,...(L=(y=t.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var U,N,w;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    tone: "live",
    withDot: true,
    children: "LIVE NOW"
  },
  parameters: {
    docs: {
      description: {
        story: "Use only when a live session is currently in progress. The pulsing dot is reserved for this state."
      }
    }
  }
}`,...(w=(N=c.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var R,S,f;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  }}>
      <Badge tone="neutral">UNIT 5 / 11</Badge>
      <Badge tone="accent">XBLOCK</Badge>
      <Badge tone="success">COMPLETED</Badge>
      <Badge tone="amber">DUE WED</Badge>
      <Badge tone="red">OVERDUE</Badge>
      <Badge tone="live" withDot>LIVE NOW</Badge>
    </div>
}`,...(f=(S=d.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};const W=["Neutral","Accent","Success","Amber","Red","LiveNow","Gallery"];export{n as Accent,o as Amber,d as Gallery,c as LiveNow,s as Neutral,t as Red,a as Success,W as __namedExportsOrder,V as default};
