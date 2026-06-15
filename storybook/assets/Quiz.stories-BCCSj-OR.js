import{Q as R}from"./Quiz-CyfAPao9.js";import"./jsx-runtime-Cf8x2fCZ.js";import"./index-yBjzXJbu.js";import"./StepDot-DFQzN7Mg.js";import"./QuizOption-4Yf7C3Nv.js";import"./Button-abr5vWsf.js";import"./index-G8LIXM5I.js";import"./_commonjsHelpers-CqkleIqs.js";const o={prompt:"When using AI in product discovery, which statement is most accurate?",options:[{letter:"A",label:"AI replaces user research — generated personas are sufficient evidence."},{letter:"B",label:"AI expands the option space, but user evidence still validates decisions.",correct:!0},{letter:"C",label:"AI is only useful in delivery, not discovery."},{letter:"D",label:"AI removes the need for product strategy entirely."}],explanation:"Generative AI is best used to broaden hypotheses and synthesize patterns. Validation should still rely on real-user evidence — interviews, observation, and outcome metrics."},O={title:"Organisms/Quiz",component:R,tags:["autodocs"],parameters:{layout:"fullscreen"},args:{total:5}},e={args:{phase:"start",title:"Module 2 quiz"}},s={args:{phase:"question",current:3,stepStates:["done","done","current","default","default"],question:o}},t={args:{phase:"revealed",current:3,stepStates:["done","done","done","default","default"],question:{...o,selectedIndex:1}}},r={args:{phase:"revealed",current:3,stepStates:["done","done","wrong","default","default"],question:{...o,selectedIndex:0}}},a={args:{phase:"results",results:{correct:4,passed:!0}}},n={args:{phase:"results",total:5,results:{correct:2,passed:!1}}};var d,c,u;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    phase: "start",
    title: "Module 2 quiz"
  }
}`,...(u=(c=e.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var l,p,i;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    phase: "question",
    current: 3,
    stepStates: ["done", "done", "current", "default", "default"],
    question: SAMPLE
  }
}`,...(i=(p=s.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,g,h;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    phase: "revealed",
    current: 3,
    stepStates: ["done", "done", "done", "default", "default"],
    question: {
      ...SAMPLE,
      selectedIndex: 1
    }
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,v,S;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    phase: "revealed",
    current: 3,
    stepStates: ["done", "done", "wrong", "default", "default"],
    question: {
      ...SAMPLE,
      selectedIndex: 0
    }
  }
}`,...(S=(v=r.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var A,q,y;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    phase: "results",
    results: {
      correct: 4,
      passed: true
    }
  }
}`,...(y=(q=a.parameters)==null?void 0:q.docs)==null?void 0:y.source}}};var I,b,x;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    phase: "results",
    total: 5,
    results: {
      correct: 2,
      passed: false
    }
  }
}`,...(x=(b=n.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};const _=["Start","Question","Revealed","RevealedWrong","Results","ResultsLow"];export{s as Question,a as Results,n as ResultsLow,t as Revealed,r as RevealedWrong,e as Start,_ as __namedExportsOrder,O as default};
