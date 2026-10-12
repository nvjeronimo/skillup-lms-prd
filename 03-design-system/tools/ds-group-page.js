// One documentation page per component group in the SKO Design System (Figma file c7EUDrQwP8si08aPipDSIV).
// Run with the Figma plugin API (top-level await and return). Set the eight constants first:
//   GROUP         page title, e.g. 'Dashboard'
//   PRODUCT       'LMS Platform' or 'LMS ICP'
//   SOURCE_PAGE   id of the page the components are on now (the group page itself when REBUILD is true)
//   PRODUCT_PAGE  id of the parent page; the group page is placed after its last '↳' page
//   PREFIX        component-name prefix, e.g. 'LMS/Platform/Dashboard/' (or null with NAMES)
//   NAMES         exact component names (or null with PREFIX)
//   REBUILD       true to rebuild the documentation of an existing group page in place
//   INTRO         one or two sentences under the title
// Components are moved (appendChild): same nodes, same keys. Nothing is renamed.
// Needs the '.Doc/Anatomy-Marker' component on the '↳ Navigation' page.
// Template as adjusted by Nelson on 13 Oct 2026: component, properties, measures, rules, anatomy.
const srcPage = await figma.getNodeByIdAsync(SOURCE_PAGE);
await figma.setCurrentPageAsync(srcPage);
const productPage = await figma.getNodeByIdAsync(PRODUCT_PAGE);
const root = figma.root; const tn = p => p.name.trim();
let existing = null; let at = root.children.indexOf(productPage) + 1; while (at < root.children.length && tn(root.children[at]).startsWith('↳')) { if (tn(root.children[at]) === '↳ ' + GROUP) existing = root.children[at]; at++; }
if (existing && !REBUILD) return {error: 'page already exists', id: existing.id};
if (REBUILD && (!existing || existing.id !== srcPage.id)) return {error: 'rebuild needs SOURCE_PAGE = the existing group page'};
const isTop = c => !(c.type === 'COMPONENT' && c.parent.type === 'COMPONENT_SET');
let sets = srcPage.findAllWithCriteria({types: ['COMPONENT_SET', 'COMPONENT']}).filter(isTop).filter(c => NAMES ? NAMES.includes(c.name) : c.name.startsWith(PREFIX));
if (!sets.length) return {error: 'no components found'};
const area = s => { const v = s.type === 'COMPONENT_SET' ? (s.defaultVariant || s.children[0]) : s; return v.width * v.height; };
sets = sets.slice().sort((a, b) => area(a) - area(b));
const oldParents = REBUILD ? [] : [...new Set(sets.map(s => s.parent))];
const oldDocs = REBUILD ? srcPage.children.filter(c => c.name.startsWith('Doc · ')) : [];
let page = existing; if (!page) { page = figma.createPage(); page.name = ' '.repeat(6) + '↳ ' + GROUP; root.insertChild(at, page); }
const vars = await figma.variables.getLocalVariablesAsync('COLOR'); const V = n => { const v = vars.find(x => x.name === n); if (!v) throw new Error('no var ' + n); return v; };
const P = n => figma.variables.setBoundVariableForPaint({type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.5}}, 'color', V(n));
const styles = await figma.getLocalTextStylesAsync(); const S = n => { const s = styles.find(x => x.name === n); if (!s) throw new Error('no style ' + n); return s; };
const T = async (chars, style, color, name) => { const st = S(style); await figma.loadFontAsync(st.fontName); const t = figma.createText(); t.fontName = st.fontName; await t.setTextStyleIdAsync(st.id); t.characters = chars || ' '; t.fills = [P(color)]; if (name) t.name = name; return t; };
const AL = (dir, name, gap) => { const f = figma.createAutoLayout(dir, {name, itemSpacing: gap || 0}); f.fills = []; return f; };
const fill = c => { c.layoutSizingHorizontal = 'FILL'; };
const wrapText = t => { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; };
const clean = s => { let x = s, i = 0; while (/&amp;/.test(x) && i++ < 5) x = x.replace(/&amp;/g, '&'); return x.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' '); };
let marker = null; for (const p of root.children) { if (tn(p) === '↳ Navigation') { await p.loadAsync(); marker = p.findOne(n => n.type === 'COMPONENT' && n.name === '.Doc/Anatomy-Marker'); if (marker) break; } }
if (!marker) { if (!existing) page.remove(); return {error: 'marker component not found'}; }
const mk = Object.keys(marker.componentPropertyDefinitions).find(k => k.startsWith('Number'));
await figma.loadFontAsync(S('body-small/Semibold').fontName);
await figma.setCurrentPageAsync(page);
const widest = Math.max(...sets.map(s => s.width)); const CONTENT = Math.max(1440, Math.ceil(widest) + 66);
const doc = AL('VERTICAL', 'Doc · ' + PRODUCT + ' · ' + GROUP, 48); page.appendChild(doc); doc.x = 0; doc.y = 0; doc.paddingTop = doc.paddingBottom = doc.paddingLeft = doc.paddingRight = 64; doc.fills = [P('bg/subtle')]; doc.strokes = [P('border/default')]; doc.strokeWeight = 1; doc.counterAxisSizingMode = 'FIXED'; doc.resize(CONTENT + 128, 100); doc.primaryAxisSizingMode = 'AUTO';
const head = AL('VERTICAL', 'Page header', 12); doc.appendChild(head); fill(head);
head.appendChild(await T(PRODUCT.toUpperCase(), 'body-small/Semibold', 'text/subtle', 'Kicker'));
head.appendChild(await T(GROUP, 'display-small/Semibold', 'text/default', 'Title'));
const intro = await T(INTRO, 'title-medium/Regular', 'text/muted', 'Intro'); head.appendChild(intro); wrapText(intro);
const meta = await T(sets.length + (sets.length === 1 ? ' component.' : ' components, from the smallest to the largest.') + ' Each block: the component, its properties, its measures, what it is and its rules, and its anatomy. Decisions and open questions live in the ICP Hub.', 'body-medium/Regular', 'text/subtle', 'Meta'); head.appendChild(meta); wrapText(meta);
const cache = {}; const vname = async p => { const b = p && p.boundVariables && p.boundVariables.color; if (!b) return null; if (!cache[b.id]) { const v = await figma.variables.getVariableByIdAsync(b.id); cache[b.id] = v ? v.name : null; } return cache[b.id]; };
const chip = async (text, soft) => { const c = AL('HORIZONTAL', 'Chip', 0); c.paddingLeft = c.paddingRight = 10; c.paddingTop = c.paddingBottom = 2; c.cornerRadius = 999; c.fills = [P(soft ? 'bg/primary-soft' : 'bg/muted')]; c.appendChild(await T(text, 'body-small/Semibold', soft ? 'text/primary' : 'text/muted')); return c; };
const sub = async (parent, title) => { const f = AL('VERTICAL', title, 12); parent.appendChild(f); fill(f); f.appendChild(await T(title.toUpperCase(), 'body-small/Semibold', 'text/subtle', 'Section title')); return f; };
const visibleCount = n => n.findAll(x => { let p = x; while (p && p.id !== n.id) { if (!p.visible) return false; p = p.parent; } return true; }).length;
const out = {page: page.id, doc: null, blocks: [], errors: []};
for (const set of sets) { try { const isSet = set.type === 'COMPONENT_SET'; const variants = isSet ? set.children : [set]; const defs = set.componentPropertyDefinitions; const descLines = clean(set.description || '').split('\n'); const vline = /^Version/.test(descLines[0]) ? descLines[0] : ''; const rules = descLines.slice(vline ? 1 : 0).join('\n').trim(); const shortName = set.name.split('/').pop().trim();
  const block = AL('VERTICAL', 'Component · ' + shortName, 28); doc.appendChild(block); fill(block); block.paddingTop = block.paddingBottom = block.paddingLeft = block.paddingRight = 32; block.cornerRadius = 16; block.fills = [P('bg/page')]; block.strokes = [P('border/subtle')]; block.strokeWeight = 1;
  const titleRow = AL('HORIZONTAL', 'Title row', 12); block.appendChild(titleRow); fill(titleRow); titleRow.counterAxisAlignItems = 'CENTER';
  titleRow.appendChild(await T(shortName, 'headline-small/Semibold', 'text/default', 'Name'));
  const ver = (/v\d+\.\d+/.exec(vline) || [''])[0]; if (ver) titleRow.appendChild(await chip(ver, true)); const since = (/since (.+)$/.exec(vline) || [])[1]; if (since) titleRow.appendChild(await chip('since ' + since, false));
  block.appendChild(await T(set.name, 'body-medium/Medium', 'text/subtle', 'Path'));
  // the component
  const cs = await sub(block, isSet ? 'Variants · the component' : 'The component'); cs.appendChild(set); if (isSet) { set.strokes = [P('border/default')]; set.strokeWeight = 1; set.cornerRadius = 5; }
  // properties
  const pr = await sub(block, 'Properties'); const table = AL('VERTICAL', 'Table', 0); pr.appendChild(table); fill(table); table.cornerRadius = 8; table.strokes = [P('border/subtle')]; table.strokeWeight = 1; table.clipsContent = true;
  const COLS = [260, 150, 520, 260]; const mkRow = async (cells, header) => { const r = AL('HORIZONTAL', header ? 'Header row' : 'Row', 0); table.appendChild(r); fill(r); r.paddingLeft = r.paddingRight = 16; r.paddingTop = r.paddingBottom = 10; if (header) r.fills = [P('bg/subtle')]; else { r.strokes = [P('border/subtle')]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; } for (let i = 0; i < cells.length; i++) { const t = await T(cells[i], header ? 'body-small/Semibold' : (i === 0 ? 'body-medium/Semibold' : 'body-medium/Regular'), header ? 'text/subtle' : (i === 0 ? 'text/default' : 'text/muted')); r.appendChild(t); t.resize(COLS[i], t.height); t.textAutoResize = 'HEIGHT'; } };
  await mkRow(['PROPERTY', 'TYPE', 'VALUES', 'DEFAULT'], true); const TYPE = {VARIANT: 'Variant', BOOLEAN: 'Boolean', TEXT: 'Text', INSTANCE_SWAP: 'Instance swap', SLOT: 'Slot'};
  for (const [k, d] of Object.entries(defs)) await mkRow([k.split('#')[0].trim(), TYPE[d.type] || d.type, d.variantOptions ? d.variantOptions.join(' · ') : (d.type === 'BOOLEAN' ? 'true · false' : (d.type === 'TEXT' ? 'any text' : '—')), (d.type === 'INSTANCE_SWAP' || d.type === 'SLOT') ? '—' : String(d.defaultValue).slice(0, 60)], false);
  if (!Object.keys(defs).length) await mkRow(['—', '—', 'This component has no properties', '—'], false);
  // measures
  const sp = await sub(block, 'Measures'); const spec = await T(variants.slice(0, 24).map(v => (isSet ? v.name + ': ' : '') + Math.round(v.width) + ' × ' + Math.round(v.height) + (v.layoutMode && v.layoutMode !== 'NONE' ? ' · ' + (v.layoutMode === 'HORIZONTAL' ? 'row' : 'column') + ' · padding ' + [v.paddingTop, v.paddingRight, v.paddingBottom, v.paddingLeft].join(' / ') + ' · gap ' + v.itemSpacing : '') + (typeof v.cornerRadius === 'number' && v.cornerRadius ? ' · radius ' + v.cornerRadius : '')).join('\n') + (variants.length > 24 ? '\n… and ' + (variants.length - 24) + ' more variants' : ''), 'body-medium/Regular', 'text/muted', 'Measures'); sp.appendChild(spec); wrapText(spec);
  // rules
  if (rules) { const ru = await sub(block, 'What it is and its rules'); const rt = await T(rules, 'body-medium/Regular', 'text/muted', 'Rules'); ru.appendChild(rt); wrapText(rt); }
  // anatomy
  const an = await sub(block, 'Anatomy'); const rich = variants.slice().sort((a, b) => visibleCount(b) - visibleCount(a))[0]; const inst = rich.createInstance();
  const boolSet = {}; for (const [k, d] of Object.entries(defs)) if (d.type === 'BOOLEAN') boolSet[k] = true; if (Object.keys(boolSet).length) { try { inst.setProperties(boolSet); } catch (e) {} }
  const stage = figma.createFrame(); stage.name = 'Anatomy stage'; stage.fills = []; stage.strokes = [P('border/subtle')]; stage.strokeWeight = 1; stage.cornerRadius = 12; stage.clipsContent = false; an.appendChild(stage); stage.resize(400, 100); stage.layoutSizingHorizontal = 'FILL'; const SW = stage.width; stage.appendChild(inst); const PADX = 40, PADT = 48, PADB = 40; const maxW = SW - PADX * 2; if (inst.width > maxW) { try { inst.resize(maxW, inst.height); } catch (e) {} } inst.x = PADX; inst.y = PADT; stage.resize(SW, inst.height + PADT + PADB); stage.layoutSizingHorizontal = 'FILL';
  const parts = []; const collect = (node, depth) => { for (const c of node.children) { if (!c.visible) continue; if (c.type === 'FRAME' && c.children.length && depth < 1 && c.children.length <= 6) collect(c, depth + 1); else parts.push(c); } }; if ('children' in inst) collect(inst, 0);
  const groups = []; for (const p of parts) { let mid = null; if (p.type === 'INSTANCE') { const m = await p.getMainComponentAsync(); mid = m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.id : m.id) : null; } const last = groups[groups.length - 1]; if (last && mid && last.mid === mid) { last.n++; continue; } groups.push({node: p, mid, n: 1}); }
  const legend = AL('VERTICAL', 'Legend', 8); an.appendChild(legend); fill(legend); let num = 0;
  for (const g of groups.slice(0, 12)) { num++; const p = g.node; const ax = p.absoluteTransform[0][2] - inst.absoluteTransform[0][2], ay = p.absoluteTransform[1][2] - inst.absoluteTransform[1][2]; const m = marker.createInstance(); stage.appendChild(m); m.setProperties({[mk]: String(num)}); m.x = Math.round(Math.min(SW - 26, Math.max(4, PADX + ax - 16))); m.y = Math.round(Math.min(stage.height - 26, Math.max(4, PADT + ay - 16)));
    let detail = ''; if (p.type === 'TEXT') { const sid = p.textStyleId && p.textStyleId !== figma.mixed ? (await figma.getStyleByIdAsync(p.textStyleId)).name : 'no text style'; detail = 'Text · ' + sid + ' · ' + ((p.fills !== figma.mixed && await vname(p.fills[0])) || 'no colour token'); } else if (p.type === 'INSTANCE') { const mm = await p.getMainComponentAsync(); detail = 'Instance of ' + (mm ? (mm.parent && mm.parent.type === 'COMPONENT_SET' ? mm.parent.name : mm.name) : 'a missing component') + (g.n > 1 ? ' · ' + g.n + ' in a row' : '') + (p.isExposedInstance ? ' · exposed' : ''); } else { const fv = 'fills' in p && p.fills !== figma.mixed && p.fills.length ? await vname(p.fills[0]) : null; const sv = 'strokes' in p && p.strokes.length ? await vname(p.strokes[0]) : null; const lay = 'layoutMode' in p && p.layoutMode !== 'NONE' ? ' · ' + (p.layoutMode === 'HORIZONTAL' ? 'row' : 'column') + ', gap ' + p.itemSpacing : ''; detail = (p.type === 'FRAME' ? 'Frame' : p.type.charAt(0) + p.type.slice(1).toLowerCase().replace('_', ' ')) + ' · ' + Math.round(p.width) + ' × ' + Math.round(p.height) + lay + (fv ? ' · fill ' + fv : '') + (sv ? ' · stroke ' + sv : ''); }
    const row = AL('HORIZONTAL', 'Legend row', 12); legend.appendChild(row); fill(row); row.counterAxisAlignItems = 'CENTER'; const mi = marker.createInstance(); row.appendChild(mi); mi.setProperties({[mk]: String(num)}); row.appendChild(await T(p.name + (g.n > 1 ? ' ×' + g.n : ''), 'body-medium/Semibold', 'text/default', 'Part')); row.appendChild(await T(detail, 'body-medium/Regular', 'text/muted', 'Detail')); }
  if (!groups.length) legend.appendChild(await T('One layer, no inner parts.', 'body-medium/Regular', 'text/muted', 'Detail'));
  out.blocks.push(shortName + ' p' + groups.length + ' pr' + Object.keys(defs).length + ' v' + variants.length); } catch (e) { out.errors.push(set.name + ': ' + String(e).slice(0, 140)); } }
out.leftEmpty = []; for (const p of oldParents) { if (p && p.type !== 'PAGE' && 'children' in p && p.children.length === 0) { out.leftEmpty.push(p.type + ' ' + p.name); if (p.type === 'SECTION') p.remove(); } }
out.removedOld = 0; for (const d of oldDocs) { if (d.findAllWithCriteria({types: ['COMPONENT_SET', 'COMPONENT']}).length === 0) { d.remove(); out.removedOld++; } }
out.doc = doc.id; out.size = [Math.round(doc.width), Math.round(doc.height)]; out.n = sets.length;
return out;
