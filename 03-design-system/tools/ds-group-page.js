// One documentation page per component group in the SKO Design System (Figma file c7EUDrQwP8si08aPipDSIV).
// Run with the Figma plugin API (top-level await and return). Set the ten constants first:
//   GROUP         page name after the arrow, e.g. 'Dashboard' or 'Buttons (REVIEWD)'
//   TITLE         title shown on the page when it differs from GROUP (or null)
//   ANATOMY       'default' to draw the anatomy from the default variant (or null: the fullest variant)
//   PRODUCT       'LMS Platform' or 'LMS ICP'
//   SOURCE_PAGE   id of the page the components are on now (the group page itself when REBUILD is true)
//   PRODUCT_PAGE  id of the parent page; the group page is placed after its last '↳' page
//   PREFIX        component-name prefix, e.g. 'LMS/Platform/Dashboard/' (or null with NAMES)
//   NAMES         exact component names (or null with PREFIX)
//   REBUILD       true to rebuild the documentation of an existing group page in place
//   INTRO         one or two sentences under the title
//   LEVELS        { 'Short-Name': 'A' | 'M' | 'O' } from ds-levels.json, or null to keep one frame. With it, the
//                 blocks are split into one frame per level (Atoms, Molecules, Organisms) below the page header
//                 frame, as decided by Nelson on 13 Oct 2026. A component missing from the map stops the split.
// Components are moved (appendChild): same nodes, same keys. Nothing is renamed.
// Needs the '.Doc/Anatomy-Marker' component on the '↳ Navigation' page.
// With REBUILD on a page that holds other content (the Base pages), the frame is placed to its left.
// Template as adjusted by Nelson on 13 Oct 2026: component, properties, measures, rules, anatomy.
const SIZE_ORDER = ['none', 'xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
const optKey = v => { const t = String(v).trim().toLowerCase(); const m = /^(-?\d+(?:\.\d+)?)\s*%?$/.exec(t); if (m) return parseFloat(m[1]); const i = SIZE_ORDER.indexOf(t); return i >= 0 ? 1000 + i : null; };
// Values listed in a logical order (Nelson, 14 Oct 2026): numbers and sizes ascending; other lists keep the component's order.
const ordered = opts => opts.every(o => optKey(o) !== null) ? opts.slice().sort((a, b) => optKey(a) - optKey(b)) : opts;
const srcPage = await figma.getNodeByIdAsync(SOURCE_PAGE);
await figma.setCurrentPageAsync(srcPage);
const productPage = await figma.getNodeByIdAsync(PRODUCT_PAGE);
const root = figma.root; const tn = p => p.name.trim(); const TT = TITLE || GROUP;
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
// Every component set has a 16 px padding, bound to Spacing/xl (Nelson, 15 Oct 2026). A set without auto-layout gets the same margin by hand.
const XL = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(v => v.name === 'Spacing/xl');
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
const doc = AL('VERTICAL', 'Doc · ' + PRODUCT + ' · ' + TT, 48); page.appendChild(doc); doc.x = 0; doc.y = 0; doc.paddingTop = doc.paddingBottom = doc.paddingLeft = doc.paddingRight = 64; doc.fills = [P('bg/subtle')]; doc.strokes = [P('border/default')]; doc.strokeWeight = 1; doc.counterAxisSizingMode = 'FIXED'; doc.resize(CONTENT + 128, 100); doc.primaryAxisSizingMode = 'AUTO';
const head = AL('VERTICAL', 'Page header', 12); doc.appendChild(head); fill(head);
head.appendChild(await T(PRODUCT.toUpperCase(), 'body-small/Semibold', 'text/subtle', 'Kicker'));
head.appendChild(await T(TT, 'display-small/Semibold', 'text/default', 'Title'));
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
  const cs = await sub(block, isSet ? 'Variants · the component' : 'The component'); cs.appendChild(set); if (isSet) { set.strokes = [P('border/default')]; set.strokeWeight = 1; set.cornerRadius = 5; if (set.layoutMode !== 'NONE' && XL) for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']) set.setBoundVariable(k, XL); }
  // properties
  const pr = await sub(block, 'Properties'); const table = AL('VERTICAL', 'Table', 0); pr.appendChild(table); fill(table); table.cornerRadius = 8; table.strokes = [P('border/subtle')]; table.strokeWeight = 1; table.clipsContent = true;
  const COLS = [260, 150, 520, 260]; const mkRow = async (cells, header) => { const r = AL('HORIZONTAL', header ? 'Header row' : 'Row', 0); table.appendChild(r); fill(r); r.paddingLeft = r.paddingRight = 16; r.paddingTop = r.paddingBottom = 10; if (header) r.fills = [P('bg/subtle')]; else { r.strokes = [P('border/subtle')]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; } for (let i = 0; i < cells.length; i++) { const t = await T(cells[i], header ? 'body-small/Semibold' : (i === 0 ? 'body-medium/Semibold' : 'body-medium/Regular'), header ? 'text/subtle' : (i === 0 ? 'text/default' : 'text/muted')); r.appendChild(t); t.resize(COLS[i], t.height); t.textAutoResize = 'HEIGHT'; } };
  await mkRow(['PROPERTY', 'TYPE', 'VALUES', 'DEFAULT'], true); const TYPE = {VARIANT: 'Variant', BOOLEAN: 'Boolean', TEXT: 'Text', INSTANCE_SWAP: 'Instance swap', SLOT: 'Slot'};
  for (const [k, d] of Object.entries(defs)) await mkRow([k.split('#')[0].trim(), TYPE[d.type] || d.type, d.variantOptions ? ordered(d.variantOptions).join(' · ') : (d.type === 'BOOLEAN' ? 'true · false' : (d.type === 'TEXT' ? 'any text' : '—')), (d.type === 'INSTANCE_SWAP' || d.type === 'SLOT') ? '—' : String(d.defaultValue).slice(0, 60)], false);
  const v0 = isSet ? (set.defaultVariant || variants[0]) : set; if (v0.children && v0.children.length === 1 && v0.children[0].type === 'INSTANCE') { const nm = await v0.children[0].getMainComponentAsync(); const ns = nm && nm.parent && nm.parent.type === 'COMPONENT_SET' ? nm.parent : nm; if (ns) { for (const [k, d] of Object.entries(ns.componentPropertyDefinitions)) await mkRow(['↳ ' + k.split('#')[0].trim(), (TYPE[d.type] || d.type) + ' · on the nested part', d.variantOptions ? ordered(d.variantOptions).join(' · ') : (d.type === 'BOOLEAN' ? 'true · false' : (d.type === 'TEXT' ? 'any text' : '—')), (d.type === 'INSTANCE_SWAP' || d.type === 'SLOT') ? '—' : String(d.defaultValue).slice(0, 60)], false); } }
  const exposed = v0.findAll(n => n.type === 'INSTANCE' && n.isExposedInstance); let exN = 0; for (const ex of exposed.slice(0, 4)) { for (const [k, v] of Object.entries(ex.componentProperties)) { if (v.type !== 'VARIANT' && v.type !== 'BOOLEAN') continue; exN++; await mkRow(['↳ ' + k.split('#')[0].trim(), (TYPE[v.type] || v.type) + ' · on ' + ex.name, v.type === 'BOOLEAN' ? 'true · false' : 'see ' + ex.name, String(v.value)], false); } }
  if (!Object.keys(defs).length && !exN) await mkRow(['—', '—', 'This component has no properties', '—'], false);
  // measures
  const sp = await sub(block, 'Measures'); const sigOf = v => { const inner = v.children && v.children.length === 1 && v.children[0].type === 'INSTANCE' && v.children[0].layoutMode && v.children[0].layoutMode !== 'NONE' ? v.children[0] : null; const n = inner || v; return Math.round(v.width) + ' × ' + Math.round(v.height) + (n.layoutMode && n.layoutMode !== 'NONE' ? ' · ' + (n.layoutMode === 'HORIZONTAL' ? 'row' : 'column') + ' · padding ' + [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].join(' / ') + ' · gap ' + n.itemSpacing : '') + (typeof n.cornerRadius === 'number' && n.cornerRadius ? ' · radius ' + n.cornerRadius : '') + (inner ? ' (from the nested part)' : ''); }; const sigs = new Map(); for (const v of variants) { const k = sigOf(v); if (!sigs.has(k)) sigs.set(k, []); sigs.get(k).push(v.name); } const mLines = []; for (const [k, names] of sigs) { if (!isSet) mLines.push(k); else if (sigs.size === 1) mLines.push('All ' + names.length + ' variants: ' + k); else mLines.push(names.slice(0, 2).join(' ; ') + (names.length > 2 ? ' and ' + (names.length - 2) + ' more' : '') + ': ' + k); } const spec = await T(mLines.slice(0, 24).join('\n') + (mLines.length > 24 ? '\n… and ' + (mLines.length - 24) + ' more sizes' : ''), 'body-medium/Regular', 'text/muted', 'Measures'); sp.appendChild(spec); wrapText(spec);
  // rules
  if (rules) { const ru = await sub(block, 'What it is and its rules'); const rt = await T(rules, 'body-medium/Regular', 'text/muted', 'Rules'); ru.appendChild(rt); wrapText(rt); }
  // anatomy
  const an = await sub(block, 'Anatomy'); const rich = (ANATOMY === 'default' && isSet && set.defaultVariant) || variants.slice().sort((a, b) => visibleCount(b) - visibleCount(a))[0]; const inst = rich.createInstance();
  const boolSet = {}; for (const [k, d] of Object.entries(defs)) if (d.type === 'BOOLEAN') boolSet[k] = true; if (Object.keys(boolSet).length) { try { inst.setProperties(boolSet); } catch (e) {} }
  if ('children' in inst && inst.children.length === 1 && inst.children[0].type === 'INSTANCE') { const ni = inst.children[0]; const nb = {}; for (const [k, v] of Object.entries(ni.componentProperties)) if (v.type === 'BOOLEAN' && !/tooltip/i.test(k)) nb[k] = true; if (Object.keys(nb).length) { try { ni.setProperties(nb); } catch (e) {} try { ni.layoutSizingHorizontal = 'HUG'; inst.layoutSizingHorizontal = 'HUG'; } catch (e) {} } }
  const SC = inst.width < 320 ? Math.min(4, Math.max(1, Math.floor(480 / Math.max(inst.width, 1)))) : 1;
  const stage = figma.createFrame(); stage.name = 'Anatomy stage'; stage.fills = []; stage.strokes = [P('border/subtle')]; stage.strokeWeight = 1; stage.cornerRadius = 12; stage.clipsContent = false; an.appendChild(stage); stage.resize(400, 100); stage.layoutSizingHorizontal = 'FILL'; const SW = stage.width; stage.appendChild(inst); const PADX = 40, PADT = 48, PADB = 40; const maxW = SW - PADX * 2; if (inst.width > maxW) { try { inst.resize(maxW, inst.height); } catch (e) {} } inst.x = PADX; inst.y = PADT; stage.resize(SW, inst.height + PADT + PADB); stage.layoutSizingHorizontal = 'FILL';
  const parts = []; const collect = (node, depth) => { for (const c of node.children) { if (!c.visible) continue; if (c.type === 'FRAME' && c.children.length && depth < 1 && c.children.length <= 6) collect(c, depth + 1); else parts.push(c); } }; if ('children' in inst) collect(inst, 0); let guard = 0; while (parts.length === 1 && 'children' in parts[0] && parts[0].children.length && guard++ < 3) { const only = parts.pop(); collect(only, 0); if (!parts.length) { parts.push(only); break; } }
  const groups = []; for (const p of parts) { let mid = null; if (p.type === 'INSTANCE') { const m = await p.getMainComponentAsync(); mid = m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.id : m.id) : null; } const last = groups[groups.length - 1]; if (last && mid && last.mid === mid && last.node.name === p.name) { last.n++; continue; } groups.push({node: p, mid, n: 1}); }
  const legend = AL('VERTICAL', 'Legend', 8); an.appendChild(legend); fill(legend); let num = 0; const mk2 = []; if (SC > 1) legend.appendChild(await T('Shown at ' + SC + '× its real size.', 'body-small/Medium', 'text/subtle', 'Scale note'));
  for (const g of groups.slice(0, 12)) { num++; const p = g.node; const ax = p.absoluteTransform[0][2] - inst.absoluteTransform[0][2], ay = p.absoluteTransform[1][2] - inst.absoluteTransform[1][2]; const m = marker.createInstance(); stage.appendChild(m); m.setProperties({[mk]: String(num)}); m.x = Math.round(Math.min(SW - 26, Math.max(4, PADX + ax - 16))); m.y = Math.round(Math.min(stage.height - 26, Math.max(4, PADT + ay - 16))); mk2.push([m, ax, ay]);
    let detail = ''; if (p.type === 'TEXT') { const sid = p.textStyleId && p.textStyleId !== figma.mixed ? (await figma.getStyleByIdAsync(p.textStyleId)).name : 'no text style'; detail = 'Text · ' + sid + ' · ' + ((p.fills !== figma.mixed && await vname(p.fills[0])) || 'no colour token'); } else if (p.type === 'INSTANCE') { const mm = await p.getMainComponentAsync(); detail = 'Instance of ' + (mm ? (mm.parent && mm.parent.type === 'COMPONENT_SET' ? mm.parent.name : mm.name) : 'a missing component') + (g.n > 1 ? ' · ' + g.n + ' in a row' : '') + (p.isExposedInstance ? ' · exposed' : '') + (p.layoutPositioning === 'ABSOLUTE' ? ' · ' + Math.round(p.width) + ' × ' + Math.round(p.height) + ', placed over the row' : ''); } else { const fv = 'fills' in p && p.fills !== figma.mixed && p.fills.length ? await vname(p.fills[0]) : null; const sv = 'strokes' in p && p.strokes.length ? await vname(p.strokes[0]) : null; const lay = 'layoutMode' in p && p.layoutMode !== 'NONE' ? ' · ' + (p.layoutMode === 'HORIZONTAL' ? 'row' : 'column') + ', gap ' + p.itemSpacing : ''; detail = (p.type === 'FRAME' ? 'Frame' : p.type.charAt(0) + p.type.slice(1).toLowerCase().replace('_', ' ')) + ' · ' + Math.round(p.width) + ' × ' + Math.round(p.height) + lay + (fv ? ' · fill ' + fv : '') + (sv ? ' · stroke ' + sv : ''); }
    const row = AL('HORIZONTAL', 'Legend row', 12); legend.appendChild(row); fill(row); row.counterAxisAlignItems = 'CENTER'; const mi = marker.createInstance(); row.appendChild(mi); mi.setProperties({[mk]: String(num)}); row.appendChild(await T(p.name + (g.n > 1 ? ' ×' + g.n : ''), 'body-medium/Semibold', 'text/default', 'Part')); row.appendChild(await T(detail, 'body-medium/Regular', 'text/muted', 'Detail')); }
  if (SC > 1) { try { inst.rescale(SC); stage.resize(SW, inst.height + PADT + PADB); stage.layoutSizingHorizontal = 'FILL'; for (const [m, ax, ay] of mk2) { m.x = Math.round(Math.min(SW - 26, Math.max(4, PADX + ax * SC - 16))); m.y = Math.round(Math.min(stage.height - 26, Math.max(4, PADT + ay * SC - 16))); } } catch (e) { out.errors.push('scale ' + shortName + ': ' + String(e).slice(0, 80)); } }
  if (!groups.length) legend.appendChild(await T('One layer, no inner parts.', 'body-medium/Regular', 'text/muted', 'Detail'));
  out.blocks.push(shortName + ' p' + groups.length + ' pr' + Object.keys(defs).length + ' v' + variants.length); } catch (e) { out.errors.push(set.name + ': ' + String(e).slice(0, 140)); } }
out.leftEmpty = []; for (const p of oldParents) { if (p && p.type !== 'PAGE' && 'children' in p && p.children.length === 0) { out.leftEmpty.push(p.type + ' ' + p.name); if (p.type === 'SECTION') p.remove(); } }
out.removedOld = 0; for (const d of oldDocs) { if (d.findAllWithCriteria({types: ['COMPONENT_SET', 'COMPONENT']}).length === 0) { d.remove(); out.removedOld++; } }
if (REBUILD) { const others = page.children.filter(c => c.id !== doc.id); if (others.length) { doc.x = Math.round(Math.min(...others.map(c => c.x)) - doc.width - 200); doc.y = Math.round(Math.min(...others.map(c => c.y))); } }
if (LEVELS) { const DEF = {A: ['Atoms', 'The smallest parts: one element with one job. An atom nests no other LMS component; a thin wrapper around one base component (a badge, a button) is an atom too.'], M: ['Molecules', 'A few atoms and base components working as one unit. A molecule nests no other LMS molecule.'], O: ['Organisms', 'A whole section of a screen, built from molecules and atoms.']};
  const setT = async (t, v) => { await Promise.all(t.getRangeAllFontNames(0, t.characters.length).map(f => figma.loadFontAsync(f))); t.characters = v; }; const pl = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
  const blocks = doc.children.filter(c => /^Component · /.test(c.name)); const by = {A: [], M: [], O: []}; const missing = [];
  for (const b of blocks) { const nm = b.name.replace('Component · ', ''); if (LEVELS[nm]) by[LEVELS[nm]].push(b); else missing.push(nm); }
  if (missing.length) out.errors.push('no level for: ' + missing.join(', ') + ' (not split)'); else {
    const header = doc.children[0]; const kick = header.children[0].characters; const tail = 'Each block: the component, its properties, its measures, what it is and its rules, and its anatomy. Decisions and open questions live in the ICP Hub.'; const made = [];
    for (const L of ['A', 'M', 'O']) { if (!by[L].length) continue; const f = AL('VERTICAL', doc.name + ' · ' + DEF[L][0], 48); page.appendChild(f); f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = 64; f.fills = [P('bg/subtle')]; f.strokes = [P('border/default')]; f.strokeWeight = 1; f.counterAxisSizingMode = 'FIXED'; f.resize(doc.width, 100); f.primaryAxisSizingMode = 'AUTO';
      const h = header.clone(); f.appendChild(h); fill(h); const [k, t, i, m] = h.children; await setT(k, kick + ' · ' + TT.toUpperCase()); await setT(t, DEF[L][0]); await setT(i, DEF[L][1]); await setT(m, (by[L].length === 1 ? '1 component. ' : by[L].length + ' components, from the smallest to the largest. ') + tail);
      for (const b of by[L]) { f.appendChild(b); fill(b); } made.push(f); }
    await setT(header.children[3], pl(blocks.length, 'component') + ' in the frames below, by level: ' + pl(by.A.length, 'atom') + ', ' + pl(by.M.length, 'molecule') + ', ' + pl(by.O.length, 'organism') + '. ' + tail);
    let x = doc.x; const y = doc.y + doc.height + 120; for (const f of made) { f.x = x; f.y = y; x += f.width + 160; } out.levels = made.map(f => f.name.split(' · ').pop() + ' ' + (f.children.length - 1)); } }
out.doc = doc.id; out.size = [Math.round(doc.width), Math.round(doc.height)]; out.n = sets.length;
return out;
