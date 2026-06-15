import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as b}from"./index-G8LIXM5I.js";import{M as x}from"./ModuleAccordionHeader-C3q0GB5O.js";import{M as f}from"./ModuleNumberLabel-DvZ5_eZp.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";const A={title:"Molecules/ModuleAccordionHeader",component:x,tags:["autodocs"],decorators:[d=>e.jsx("div",{style:{width:256},children:e.jsx(d,{})})],args:{title:"AI in the product lifecycle",meta:"3 / 5",expanded:!0}},r={},a={args:{expanded:!1}},t={render:()=>{const[d,g]=b.useState(!0);return e.jsxs("div",{children:[e.jsx("div",{style:{padding:"8px 12px 4px"},children:e.jsx(f,{number:2})}),e.jsx(x,{title:"AI in the product lifecycle",meta:"3 / 5",expanded:d,onToggle:g})]})}};var o,s,n;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(n=(s=r.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var c,p,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    expanded: false
  }
}`,...(i=(p=a.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var l,m,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const [expanded, setExpanded] = useState(true);
    return <div>
        <div style={{
        padding: "8px 12px 4px"
      }}>
          <ModuleNumberLabel number={2} />
        </div>
        <ModuleAccordionHeader title="AI in the product lifecycle" meta="3 / 5" expanded={expanded} onToggle={setExpanded} />
      </div>;
  }
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const S=["Expanded","Collapsed","WithNumberLabel"];export{a as Collapsed,r as Expanded,t as WithNumberLabel,S as __namedExportsOrder,A as default};
