import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{A as p}from"./AIPanel-0eDwZ2cL.js";import"./index-yBjzXJbu.js";import"./Badge-ehOg1QO1.js";const g={title:"Organisms/AIPanel",component:p,tags:["autodocs"],decorators:[m=>t.jsx("div",{style:{height:720,display:"flex",justifyContent:"flex-end",background:"var(--bg)"},children:t.jsx(m,{})})],args:{showTakeaways:!0,showAsk:!0,showRelated:!0,showConversation:!1}},e={},s={args:{showAsk:!1,showRelated:!1}},r={args:{showConversation:!0,messages:[{from:"user",text:"What's the difference between discovery and delivery here?"},{from:"ai",text:"Discovery answers 'should we build this'. Delivery answers 'how do we ship it well'. AI changes both — but the evidence bar is higher in discovery."},{from:"user",text:"Give me an example?"},{from:"ai",text:"In discovery: AI helps generate option space, but a real-user interview is still the validation. In delivery: AI helps draft tests, code, copy — and you still need QA on the output."}]}};var a,o,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var n,l,d;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    showAsk: false,
    showRelated: false
  }
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,h,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    showConversation: true,
    messages: [{
      from: "user",
      text: "What's the difference between discovery and delivery here?"
    }, {
      from: "ai",
      text: "Discovery answers 'should we build this'. Delivery answers 'how do we ship it well'. AI changes both — but the evidence bar is higher in discovery."
    }, {
      from: "user",
      text: "Give me an example?"
    }, {
      from: "ai",
      text: "In discovery: AI helps generate option space, but a real-user interview is still the validation. In delivery: AI helps draft tests, code, copy — and you still need QA on the output."
    }]
  }
}`,...(u=(h=r.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};const x=["Default","TakeawaysOnly","WithConversation"];export{e as Default,s as TakeawaysOnly,r as WithConversation,x as __namedExportsOrder,g as default};
