import{j as s}from"./jsx-runtime-Cf8x2fCZ.js";import{S as e}from"./StatusIcon-vNtwE9Zs.js";import"./index-yBjzXJbu.js";const R={title:"Atoms/StatusIcon",component:e,tags:["autodocs"],args:{kind:"active",size:24},argTypes:{kind:{control:"inline-radio",options:["success","active","notStarted","locked"]},size:{control:{type:"number",min:12,max:48}}}},r={args:{kind:"success"}},t={args:{kind:"active"}},a={args:{kind:"notStarted"}},o={args:{kind:"locked"}},n={render:()=>s.jsxs("div",{style:{display:"flex",gap:12},children:[s.jsx(e,{kind:"success",size:24}),s.jsx(e,{kind:"active",size:24}),s.jsx(e,{kind:"notStarted",size:24}),s.jsx(e,{kind:"locked",size:24})]})};var c,i,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    kind: "success"
  }
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var p,m,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    kind: "active"
  }
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var k,l,S;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    kind: "notStarted"
  }
}`,...(S=(l=a.parameters)==null?void 0:l.docs)==null?void 0:S.source}}};var g,x,v;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    kind: "locked"
  }
}`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var z,j,y;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12
  }}>
      <StatusIcon kind="success" size={24} />
      <StatusIcon kind="active" size={24} />
      <StatusIcon kind="notStarted" size={24} />
      <StatusIcon kind="locked" size={24} />
    </div>
}`,...(y=(j=n.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};const w=["Success","Active","NotStarted","Locked","Row"];export{t as Active,o as Locked,a as NotStarted,n as Row,r as Success,w as __namedExportsOrder,R as default};
