/*
 * ICP layout audit: binds every current platform screen of one page to the DS Layout/* tokens
 * (decision 032 and its title-gap amendment, Nelson 25 Oct 2026). Run with use_figma in the ICP
 * file (Wz2TCYFVr0hD8tJNiLajLt), one call per page; declare PAGE_ID above this script. Rerunning is
 * safe: it reports valueChanged 0 and heads 0 when a page is already done.
 *
 * Screens: frames holding a platform Topbar instance. Skipped (history): SUPERSEDED, ARCHIVE,
 * DISCOVERY, V7, Complementary, frames 12-15, "sources (in progress)", ★ ENTRY, ⚙ TECHNICAL,
 * proposals, Reference. A screen without the Responsive mode of its width gets it.
 * Roles: section pages: Main/Content padding x page-x, top page-top, gap section-gap (or the single
 * Form-like child when it is the real page stack); two-column rows column-gap; Collection / Dates
 * stack-gap; Aside side-gap; card grids and lists grid-gap; title + first section in a "Head" frame
 * on stack-gap (desktop and tablet). Course / Program: Tabs row + Tab content x band-x, top 40/32/24
 * (course) or 40/32/32 (program) on Spacing steps, Tab content column-gap (stack-gap when one column),
 * Main column stack-gap, Sidebar side-gap. Certificate page: Main x band-x, top 24, Content
 * stack-gap, Body column-gap. Never inside an instance.
 */
const LK={"page-x":"c1c2ab42b102c4a176af10eb30a1570415893f0e","page-top":"321f62d1280cc23a3dce7074caefb495eb2b71f3","band-x":"e8ff17bb396e93445b0c2cb2a8c5b5c5cea0da4e","section-gap":"f24773dcc671f8601a82797f77f58868cd49ddcb","column-gap":"75a10ee25554b7e7b21d25abe5d5d17c79ced137","stack-gap":"cb125b4f7f1acc973e8007dca0bc52cea7b73e33","side-gap":"4f14920c09296fbb29a5eecb6b6b81acb80be9bf","grid-gap":"e1a91809f6380d1db5161928dd357e0bb842aec0"};
const SK={xl:"508509379ff20f9aec481f5a70154839bd09585f","3xl":"d8841afb5625adeaff6b64dc28789d3b67b2a62c","4xl":"fad0dd070de231637e4d566527018d84ba23a2ac","5xl":"ebcace205742f98ff6d757d817b936e556387f95","6xl":"dd087cfbb1d236800c039933899ba4187d3312f5","7xl":"6a01b81ee1fd086b9277fe492e7e9599aba6dbb0","8xl":"b8244da79ac97896855177b7044eea071735ebfd"};
const R={'page-x':[48,40,24],'page-top':[48,40,32],'band-x':[48,32,16],'section-gap':[48,40,32],'column-gap':[48,40,40],'stack-gap':[32,32,32],'side-gap':[24,24,32],'grid-gap':[32,24,24],'fixed-24':[24,24,24],'course-top':[40,32,24],'program-top':[40,32,32]};
const MODE_IDS=['6298:2','20135:5','20135:6'];
const page=await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(page);
const V={}; const lv=async r=>{ if(!V['L'+r]) V['L'+r]=await figma.variables.importVariableByKeyAsync(LK[r]); return V['L'+r]; };
const sv=async k=>{ if(!V[k]) V[k]=await figma.variables.importVariableByKeyAsync(SK[k]); return V[k]; };
const respCol=await figma.variables.getVariableCollectionByIdAsync((await lv('page-x')).variableCollectionId);
const inInst=(n,stop)=>{ for(let q=n.parent;q&&q!==stop;q=q.parent){ if(q.type==='INSTANCE') return true;} return false; };
const HIST=/SUPERSEDED|ARCHIVE|DISCOVERY|^V7|Complementary|^1[2345] ·|sources \(in progress\)|★ ENTRY|⚙|proposal|Reference/i;
const bad=(n)=>{ for(let q=n;q&&q.type!=='PAGE';q=q.parent){ if(HIST.test(q.name)||q.id==='7802:92815') return q.name.slice(0,50); } return null; };
const W=[1440,1280,1024,960,834,768,390,375];
const tops=page.findAllWithCriteria({types:['INSTANCE']}).filter(i=>/(Platform\/Navigation\/Topbar|^Topbar$)/.test(i.name) && !inInst(i));
const screens=new Map(); const histSkipped={};
for(const t of tops){ let s=null; for(let q=t.parent;q&&q.type!=='PAGE';q=q.parent){ if(q.type==='FRAME'&&W.includes(Math.round(q.width))&&q.name!=='Page'){ s=q; break; } }
  if(!s) continue; const b=bad(s); if(b){ histSkipped[b]=(histSkipped[b]||0)+1; continue; } screens.set(s.id,s); }
const stats={screens:0,bindings:0,layout:0,spacing:0,valueChanged:0,heads:0,modeSet:[],unmapped:[],listed:[],mismatch:[]};
const isTitle=n=>n&&(n.type==='TEXT'||/^(Greeting|Header|Heading|Intro|Title)/.test(n.name));
async function loadFonts(s){ const fs=new Map(); for(const t of s.findAllWithCriteria({types:['TEXT']})) for(const seg of t.getStyledTextSegments(['fontName'])) fs.set(JSON.stringify(seg.fontName),seg.fontName); for(const f of fs.values()){ try{await figma.loadFontAsync(f);}catch(e){} } }
for(const s of screens.values()){
  stats.screens++;
  const mode=s.width>=1280?0:(s.width>=768?1:2);
  if(s.resolvedVariableModes[respCol.id]!==MODE_IDS[mode]){ await loadFonts(s); s.setExplicitVariableModeForCollection(respCol, MODE_IDS[mode]); stats.modeSet.push(s.id+' '+s.name.slice(0,40)); }
  const isCertPage=/^Certificate · /.test(s.name);
  const full=isCertPage||/CourseDetail|Program-|Program Detail/.test(s.name);
  const isProgram=/Program-/.test(s.name); const isDisc=/Discussion/.test(s.name); const isCerts=/^Certificates/.test(s.name);
  const frames=s.findAllWithCriteria({types:['FRAME']}).filter(f=>!inInst(f,s) && f.layoutMode && f.layoutMode!=='NONE');
  const jobs=[]; const add=(f,props,role)=>jobs.push({f,props,role}); const assigned=new Set();
  let pageC=null, stack=null;
  if(isCertPage){ const m=frames.find(f=>f.name==='Main'&&f.paddingLeft>0);
    if(m){ add(m,['paddingLeft','paddingRight'],'band-x'); add(m,['paddingTop'],'fixed-24'); assigned.add(m);
      const c=m.children.find(x=>x.type==='FRAME'&&x.name==='Content'); if(c){ add(c,['itemSpacing'],'stack-gap'); assigned.add(c);
        const body=c.children.find(x=>x.type==='FRAME'&&x.name==='Body'); if(body){ add(body,['itemSpacing'],'column-gap'); assigned.add(body);} } }
    else stats.listed.push(s.id+' '+s.name.slice(0,40)+': no Main'); }
  else if(!full){
    pageC=frames.find(f=>/^(Main|Content)$/.test(f.name) && f.paddingLeft>0 && f.paddingBottom>=48);
    if(!pageC){ stats.listed.push(s.id+' '+s.name.slice(0,40)+': no page container'); }
    else { add(pageC,['paddingLeft','paddingRight'],'page-x'); add(pageC,['paddingTop'],'page-top'); add(pageC,['itemSpacing'],'section-gap'); assigned.add(pageC);
      stack=pageC;
      const kids=pageC.children.filter(c=>c.layoutPositioning!=='ABSOLUTE');
      if(kids.length===1 && kids[0].type==='FRAME' && kids[0].name!=='Head' && kids[0].layoutMode==='VERTICAL' && kids[0].children.length>=2 && (isTitle(kids[0].children[0])||kids[0].children[0].name==='Head')){ stack=kids[0]; add(stack,['itemSpacing'],'section-gap'); assigned.add(stack); }
      for(const f of frames){ if(assigned.has(f)) continue; const n=f.name, pn=f.parent&&f.parent.name;
        const gp = f.layoutMode==='GRID' ? ['gridRowGap','gridColumnGap'] : (f.layoutWrap==='WRAP'?['itemSpacing','counterAxisSpacing']:['itemSpacing']);
        if(n==='Due and resume'||n==='Help now'){ add(f,['itemSpacing'],'column-gap'); assigned.add(f); continue; }
        if(n==='Body' && (f.parent===stack||f.parent===pageC||(f.parent&&f.parent.name==='Head'))){ add(f,['itemSpacing'], isDisc?'fixed-24':'column-gap'); assigned.add(f); continue; }
        if(n==='Collection'){ add(f,['itemSpacing'],'stack-gap'); assigned.add(f); continue; }
        if(n==='Dates' && pn==='Body'){ add(f,['itemSpacing'],'stack-gap'); assigned.add(f); continue; }
        if(/^Aside/.test(n)){ add(f,['itemSpacing'],'side-gap'); assigned.add(f); continue; }
        if(/^(Course|Program) (grid|list)/.test(n)||n==='Included cards'||(isCerts && (n==='Program certificates'||(f.layoutMode==='GRID'&&pn==='Course certificates')))){ add(f,gp,'grid-gap'); assigned.add(f); continue; }
        if(isCerts && n==='Earned'){ add(f,['itemSpacing'],'section-gap'); assigned.add(f); continue; }
        if(n==='Head'){ add(f,['itemSpacing'],'stack-gap'); assigned.add(f); continue; }
      } } }
  else {
    for(const f of frames){ const n=f.name; const gp = f.layoutMode==='GRID' ? ['gridRowGap','gridColumnGap'] : (f.layoutWrap==='WRAP'?['itemSpacing','counterAxisSpacing']:['itemSpacing']);
      if(/^Tabs \(/.test(n)){ add(f, f.paddingRight>0?['paddingLeft','paddingRight']:['paddingLeft'],'band-x'); assigned.add(f); continue; }
      if(n==='Tab content' || (n==='Content' && f.parent===s)){ add(f,['paddingLeft','paddingRight'],'band-x'); add(f,['paddingTop'],isProgram?'program-top':'course-top');
        if(n==='Content'||f.layoutMode==='VERTICAL') add(f,['itemSpacing'],'stack-gap'); else add(f,[f.layoutMode==='GRID'?'gridColumnGap':'itemSpacing'],'column-gap'); assigned.add(f); continue; }
      if(n==='Main column'){ add(f,['itemSpacing'],'stack-gap'); assigned.add(f); continue; }
      if(n==='Sidebar' && f.parent && f.parent.name==='Tab content'){ add(f,['itemSpacing'],'side-gap'); assigned.add(f); continue; }
      if(n==='Course certificates'){ add(f,gp,'grid-gap'); assigned.add(f); continue; }
    } }
  for(const j of jobs){ const val=R[j.role][mode];
    for(const p of j.props){ const before=j.f[p]; if(before!==val) stats.valueChanged++; stats.bindings++;
      if(LK[j.role]){ j.f.setBoundVariable(p, await lv(j.role)); stats.layout++; if(j.f[p]!==val) stats.mismatch.push(`${s.id} ${j.f.name}.${p} ${j.f[p]}≠${val}`); }
      else { let ok=false; for(const k of Object.keys(SK)){ j.f.setBoundVariable(p,await sv(k)); if(j.f[p]===val){ ok=true; break; } } if(!ok){ j.f.setBoundVariable(p,null); j.f[p]=val; } stats.spacing++; } } }
  // Head wrap (desktop/tablet) on the real page stack
  if(stack && mode<2){ const [a,b]=stack.children;
    if(a && a.name!=='Head'){
      if(isTitle(a) && b && a.layoutPositioning!=='ABSOLUTE' && b.layoutPositioning!=='ABSOLUTE'){
        if(a.type==='TEXT') for(const seg of a.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName);
        const sa=a.layoutSizingHorizontal, sb=b.layoutSizingHorizontal;
        const head=figma.createAutoLayout('VERTICAL',{name:'Head'}); head.fills=[]; head.clipsContent=false; head.paddingTop=head.paddingBottom=head.paddingLeft=head.paddingRight=0;
        stack.insertChild(stack.children.indexOf(a),head); head.appendChild(a); head.appendChild(b);
        head.layoutSizingHorizontal='FILL'; head.layoutSizingVertical='HUG'; try{a.layoutSizingHorizontal=sa;}catch(e){} try{b.layoutSizingHorizontal=sb;}catch(e){}
        head.setBoundVariable('itemSpacing',await lv('stack-gap')); stats.heads++;
        const g=Math.round(b.absoluteBoundingBox.y-(a.absoluteBoundingBox.y+a.absoluteBoundingBox.height)); if(g!==32) stats.mismatch.push(s.id+' head gap '+g);
      } else stats.listed.push(`${s.id} ${s.name.slice(0,40)}: page stack first child ${a.type} "${a.name}" is not a title`); } }
  // unmapped raw gaps among page-level children
  const scope = stack ? stack.children.flatMap(c=>c.name==='Head'?c.children:[c]) : frames.filter(f=>f.parent&&/^(Tab content|Main column|Content)$/.test(f.parent.name));
  for(const f of scope){ if(f.type!=='FRAME'||assigned.has(f)||!f.layoutMode||f.layoutMode==='NONE') continue; const bv=f.boundVariables||{};
    if(!bv.itemSpacing && f.itemSpacing>=16 && f.children.length>1) stats.unmapped.push(`${s.id} ${s.name.slice(0,30)} › ${f.name.slice(0,30)} gap ${f.itemSpacing}`); }
  // full-bleed bands
  const sx=s.absoluteTransform[0][2];
  for(const a of s.findAll(n=>n.layoutPositioning==='ABSOLUTE' && n.type==='INSTANCE' && !inInst(n,s) && n.x<0)){ const rel=a.absoluteTransform[0][2]-sx;
    if(Math.round(rel)!==0 && Math.abs(rel)<=16 && Math.abs(a.width+2*rel-s.width)<2){ a.x=a.x-rel; a.resize(s.width,a.height); } }
}
stats.histSkipped=histSkipped;
return stats;
