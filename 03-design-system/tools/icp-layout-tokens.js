/*
 * ICP layout rhythm: binds the page-level stacks of the platform screens to the layout values
 * (DS Layout/* tokens, decision 032, Nelson 25 Oct 2026). Run with use_figma / figma_execute in
 * the ICP file (Wz2TCYFVr0hD8tJNiLajLt), one call per page.
 *
 * Inputs (declare above this script):
 *   PAGE_ID   the page ('6207:245582' WIP, '4340:322' Ready for Dev)
 *   ROOT_IDS  the flow frames / containers to scan
 *   DRY       true = report only
 *   LAYOUT    false = bind the Spacing step with the right value in each frame's mode (the 25 Oct
 *             run, before the Layout/* tokens were published); true = bind the published Layout/*
 *             token (once Nelson has published the DS). Roles without a token stay on Spacing steps.
 *
 * Rules: section pages (Dashboard, My Learning, Certificates, Calendar, Discussion, Services,
 * Edit profile, Notifications): Main/Content padding x = page-x, top = page-top, gap = section-gap;
 * the two-column rows = column-gap; Collection / Dates = stack-gap; Aside = side-gap; card grids and
 * lists = grid-gap. Full-bleed pages (Course, Program): Tabs row + Tab content x = band-x; Tab
 * content top 40/32/24 (course) or 40/32/32 (program); Tab content gap = column-gap (stack-gap
 * when it is one column); Main column = stack-gap; Sidebar = side-gap. Never inside an instance.
 */
const LAYOUT_KEYS={"page-x":"c1c2ab42b102c4a176af10eb30a1570415893f0e","page-top":"321f62d1280cc23a3dce7074caefb495eb2b71f3","band-x":"e8ff17bb396e93445b0c2cb2a8c5b5c5cea0da4e","section-gap":"f24773dcc671f8601a82797f77f58868cd49ddcb","column-gap":"75a10ee25554b7e7b21d25abe5d5d17c79ced137","stack-gap":"cb125b4f7f1acc973e8007dca0bc52cea7b73e33","side-gap":"4f14920c09296fbb29a5eecb6b6b81acb80be9bf","grid-gap":"e1a91809f6380d1db5161928dd357e0bb842aec0"};
const KEYS={xl:"508509379ff20f9aec481f5a70154839bd09585f","3xl":"d8841afb5625adeaff6b64dc28789d3b67b2a62c","4xl":"fad0dd070de231637e4d566527018d84ba23a2ac","5xl":"ebcace205742f98ff6d757d817b936e556387f95","6xl":"dd087cfbb1d236800c039933899ba4187d3312f5","7xl":"6a01b81ee1fd086b9277fe492e7e9599aba6dbb0","8xl":"b8244da79ac97896855177b7044eea071735ebfd"};
const STEP={D:{16:'xl',24:'3xl',32:'4xl',40:'5xl',48:'6xl'},T:{16:'xl',24:'4xl',32:'5xl',40:'6xl',48:'7xl'},M:{16:'xl',24:'5xl',32:'6xl',40:'7xl',48:'8xl'}};
const R={'page-x':[48,40,24],'page-top':[48,40,32],'band-x':[48,32,16],'section-gap':[48,40,32],'column-gap':[48,40,40],'stack-gap':[32,32,32],'side-gap':[24,24,32],'grid-gap':[32,24,24],'fixed-24':[24,24,24],'course-top':[40,32,24],'program-top':[40,32,32]};
const page=await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(page);
const V={}; const getV=async s=>{ if(!V[s]) V[s]=await figma.variables.importVariableByKeyAsync(KEYS[s]); return V[s]; };
const inInst=(n,stop)=>{ for(let q=n.parent;q&&q!==stop;q=q.parent){ if(q.type==='INSTANCE') return true;} return false; };
const fallback=[]; const report=[]; const rebind=[]; let changed=0; const skipped=[];
const screens=[];
for(const id of ROOT_IDS){ const r=await figma.getNodeByIdAsync(id); if(!r) continue;
  const fr=[r,...r.findAllWithCriteria({types:['FRAME']})];
  for(const f of fr){ if(/^(LMS-|Certificates · Platform|Edit profile|Notifications)/.test(f.name) && (f.width===1280||f.width===960||f.width===375||f.width===1440||f.width===768||f.width===390) && !inInst(f,r)) {
      if(screens.some(s=>{for(let q=f.parent;q;q=q.parent) if(q===s) return true; return false;})) continue; screens.push(f);} } }
for(const s of screens){
  if(typeof SCREEN_FILTER!=='undefined' && !SCREEN_FILTER.test(s.name)) continue;
  if(/Sidebar header on scroll/.test(s.name)) continue;
  { let sup=false; for(let q=s.parent;q;q=q.parent){ if(/SUPERSEDED|ARCHIVE/i.test(q.name||'')) sup=true; } if(sup) continue; }
  const mode=s.width>=1280?0:(s.width>=768?1:2); const MK=['D','T','M'][mode];
  const full=/CourseDetail|Program-|Program Detail|Certificate-page/.test(s.name);
  const isProgram=/Program-/.test(s.name); const isDisc=/Discussion/.test(s.name); const isCert=/^Certificates/.test(s.name);
  const frames=s.findAllWithCriteria({types:['FRAME']}).filter(f=>!inInst(f,s) && f.layoutMode && f.layoutMode!=='NONE');
  const pageC=frames.find(f=>!full && /^(Main|Content)$/.test(f.name) && f.paddingLeft>0 && f.paddingBottom>=48);
  const jobs=[];
  const add=(f,props,role)=>jobs.push({f,props,role});
  for(const f of frames){ const n=f.name; const pn=f.parent&&f.parent.name;
    const gapProps = f.layoutMode==='GRID' ? ['gridRowGap','gridColumnGap'] : (f.layoutWrap==='WRAP'?['itemSpacing','counterAxisSpacing']:['itemSpacing']);
    if(!full){
      if(f===pageC){ add(f,['paddingLeft','paddingRight'],'page-x'); add(f,['paddingTop'],'page-top'); add(f,['itemSpacing'],'section-gap'); continue; }
      if(n==='Due and resume'||n==='Help now'){ add(f,['itemSpacing'],'column-gap'); continue; }
      if(n==='Body' && f.parent===pageC){ add(f,['itemSpacing'], isDisc?'fixed-24':'column-gap'); continue; }
      if(n==='Collection'){ add(f,['itemSpacing'],'stack-gap'); continue; }
      if(n==='Dates' && pn==='Body'){ add(f,['itemSpacing'],'stack-gap'); continue; }
      if(/^Aside/.test(n)){ add(f,['itemSpacing'],'side-gap'); continue; }
      if(/^(Course|Program) (grid|list)/.test(n)||n==='Included cards'||(isCert && (n==='Program certificates'||(f.layoutMode==='GRID'&&pn==='Course certificates')))){ add(f,gapProps,'grid-gap'); continue; }
      if(isCert && n==='Earned'){ add(f,['itemSpacing'],'section-gap'); continue; }
    } else {
      if(/^Tabs \(/.test(n)){ add(f, f.paddingRight>0?['paddingLeft','paddingRight']:['paddingLeft'],'band-x'); continue; }
      if(n==='Tab content' || (n==='Content' && f.parent===s)){ add(f,['paddingLeft','paddingRight'],'band-x'); add(f,['paddingTop'],isProgram?'program-top':'course-top');
        if(n==='Content'||f.layoutMode==='VERTICAL') add(f,['itemSpacing'],'stack-gap'); else add(f,[f.layoutMode==='GRID'?'gridColumnGap':'itemSpacing'],'column-gap'); continue; }
      if(n==='Main column'){ add(f,['itemSpacing'],'stack-gap'); continue; }
      if(n==='Sidebar' && f.parent && f.parent.name==='Tab content'){ add(f,['itemSpacing'],'side-gap'); continue; }
      if(n==='Course certificates'){ add(f,gapProps,'grid-gap'); continue; }
    }
  }
  const lines=[];
  for(const j of jobs){ const val=R[j.role][mode]; const step=STEP[MK][val];
    for(const p of j.props){ const old=f=>f[p]; const before=j.f[p];
      let used=step;
      if(!DRY && typeof LAYOUT!=='undefined' && LAYOUT && LAYOUT_KEYS[j.role]){
        j.f.setBoundVariable(p, await figma.variables.importVariableByKeyAsync(LAYOUT_KEYS[j.role])); used='Layout/'+j.role;
        if(j.f[p]!==val) fallback.push(`${s.id} ${s.name.slice(0,40)} ${j.f.name}.${p}: Layout/${j.role} gives ${j.f[p]}, want ${val}: set the screen's Responsive mode`);
      } else if(!DRY){ j.f.setBoundVariable(p,await getV(step));
        if(j.f[p]!==val){ used=null; for(const k of Object.keys(KEYS)){ j.f.setBoundVariable(p,await getV(k)); if(j.f[p]===val){ used=k; break; } }
          if(!used){ j.f.setBoundVariable(p,null); j.f[p]=val; used='raw'; }
          fallback.push(`${s.id} ${s.name.slice(0,40)} ${j.f.name}.${p}=${val} via ${used}`); } }
      const after=j.f[p];
      if(!DRY && !(typeof LAYOUT!=='undefined' && LAYOUT) && after!==val) skipped.push(`${s.id} ${j.f.id} ${j.f.name} ${p} wanted ${val} got ${after}`);
      if(before!==val) changed++;
      rebind.push([j.f.id,p,j.role]);
      lines.push(`${j.f.name.slice(0,22)}.${p.replace('padding','p').replace('itemSpacing','gap')} ${before}→${val}`); } }
  report.push(`${s.id} ${s.name.slice(0,48)} [${MK}${full?' full':''}] ${jobs.length?'' :'NO MATCH '}`+lines.join(', '));
}
return {fallback, screens:screens.length, changedProps:changed, bindings:rebind.length, skipped, report: DRY?report:undefined, perScreen: DRY?undefined:report.map(r=>r.split(' [')[0]).length, rebind: DRY?undefined:rebind.map(r=>r.join(',')).join(';')};
