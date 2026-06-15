import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as T}from"./index-G8LIXM5I.js";import{T as p,a as s}from"./Tab-CHtZUzAW.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";const j={title:"Molecules/Tab",parameters:{docs:{description:{component:"Content tab strip used below the video player. Use `Tab` items inside `TabStrip` for proper ARIA roles. Active state: cyan text + 2px cyan underline."}}}},a={render:()=>{const[b,u]=T.useState("transcript"),m=[{id:"transcript",label:"Transcript"},{id:"notes",label:"Notes"},{id:"downloads",label:"Downloads"},{id:"discussion",label:"Discussion"}];return e.jsx(p,{children:m.map(t=>e.jsx(s,{active:b===t.id,onClick:()=>u(t.id),children:t.label},t.id))})}},r={render:()=>e.jsxs(p,{children:[e.jsx(s,{children:"Transcript"}),e.jsx(s,{children:"Notes"}),e.jsx(s,{children:"Downloads"}),e.jsx(s,{pip:!0,active:!0,children:"Discussion"})]})};var n,i,o;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState("transcript");
    const tabs = [{
      id: "transcript",
      label: "Transcript"
    }, {
      id: "notes",
      label: "Notes"
    }, {
      id: "downloads",
      label: "Downloads"
    }, {
      id: "discussion",
      label: "Discussion"
    }];
    return <TabStrip>
        {tabs.map(t => <Tab key={t.id} active={active === t.id} onClick={() => setActive(t.id)}>
            {t.label}
          </Tab>)}
      </TabStrip>;
  }
}`,...(o=(i=a.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var c,d,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <TabStrip>
      <Tab>Transcript</Tab>
      <Tab>Notes</Tab>
      <Tab>Downloads</Tab>
      <Tab pip active>Discussion</Tab>
    </TabStrip>
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const f=["Default","WithPip"];export{a as Default,r as WithPip,f as __namedExportsOrder,j as default};
