/**
 * Rebind `Colors (Remove)/*` and `Component colors (Remove)/*` to `SKO/Colors/*`
 * in the ❖ SKO Design System (Untitled UI) file.
 *
 * Run this from a Figma plugin console in the file itself. It is written as one
 * pass because a plugin running in-file has no transport timeout — which is the
 * reason this could not be finished remotely.
 *
 * WHAT IT DOES NOT DO, deliberately:
 *   · It never touches a node inside an INSTANCE. Rebinding there creates a
 *     permanent override that survives future changes to the main component.
 *     Instances follow their component once the component's own page is done.
 *   · It skips the pages listed in SKIP below — foundations are specimen sheets
 *     that document the deprecated tokens, and the "examples" pages are demo
 *     content the file itself marks as movable.
 *   · It leaves Utility/*, Alpha/* and Components/* alone. They have no SKO
 *     destination yet; the script reports them rather than guessing.
 *
 * AFTER RUNNING: review screens. This repaints from Untitled UI stock ramps to
 * SkillUp brand ramps. A zero-outstanding count is not the test.
 */

const SKIP = [
  /you can delete this/i,
  /^\s*❖ FOUNDATIONS/, /↳ Colors/, /↳ Typography/, /↳ Logos/, /↳ Icons/,
  /↳ Misc icons/, /↳ Effect styles/, /↳ Spacing, radius & grids/,
  /↳ Portfolio mockups/, /↳ Design annotations/,
  /MARKETING WEBSITE EXAMPLES/, /APPLICATION EXAMPLES/,
  /^\s*❖ (Landing|Pricing|Blogs|Blog posts|About|Contact|Team|Legal|FAQ|Log in|Sign up|404)/,
  /^\s*❖ (Dashboards|Settings pages|Informational pages)/,
  /^–+$/, /^-+$/, /^Thumbnail$/
];

const RENAME = {
  'Text/text-white':               'Foreground/fg-white',
  'Text/text-brand-tertiary_alt':  'Text/text-brand-tertiary',
  'Border/border-brand_alt':       'Border/border-brand',
  'Foreground/fg-brand-primary_alt':'Foreground/fg-brand-primary',
  'Background/bg-brand-primary_alt':'Background/bg-brand-primary'
};

async function main() {
  await figma.loadAllPagesAsync();

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semantics = collections.find(c => c.name === '1. Semantics');
  const vars = [];
  for (const id of semantics.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v && v.resolvedType === 'COLOR') vars.push(v);
  }

  const sko = {};
  for (const v of vars) if (v.name.startsWith('SKO/')) sko[v.name] = v;

  const norm = n => n
    .replace(/^Colors \(Remove\)\//, '')
    .replace(/^Component colors \(Remove\)\//, '')
    .replace(/\s*\(\d+\)$/, '');

  const MAP = {};
  const unmappable = {};
  for (const v of vars) {
    if (!/\(Remove\)\//.test(v.name)) continue;
    const base = norm(v.name);
    const dest = sko['SKO/Colors/' + base] ||
                 (RENAME[base] ? sko['SKO/Colors/' + RENAME[base]] : null);
    if (dest) MAP[v.id] = dest;
    else unmappable[base] = true;
  }

  const insideInstance = node => {
    let p = node.parent;
    while (p) { if (p.type === 'INSTANCE') return true; p = p.parent; }
    return false;
  };

  let rebound = 0, pagesDone = 0, skippedNodes = 0;
  const perPage = [];

  for (const page of figma.root.children) {
    if (SKIP.some(re => re.test(page.name))) continue;
    let count = 0;

    for (const node of page.findAll(() => true)) {
      if (insideInstance(node)) { skippedNodes++; continue; }

      for (const key of ['fills', 'strokes']) {
        const paints = node[key];
        if (!paints || paints === figma.mixed || !paints.length) continue;
        let changed = false;
        const next = paints.map(p => {
          if (p.type !== 'SOLID') return p;
          const bound = p.boundVariables && p.boundVariables.color;
          if (!bound || !MAP[bound.id]) return p;
          changed = true;
          return figma.variables.setBoundVariableForPaint(p, 'color', MAP[bound.id]);
        });
        if (changed) { node[key] = next; count++; }
      }

      if (node.effects && node.effects.length) {
        let changed = false;
        const next = node.effects.map(e => {
          const bound = e.boundVariables && e.boundVariables.color;
          if (!bound || !MAP[bound.id]) return e;
          changed = true;
          return { ...e, boundVariables: { ...e.boundVariables,
            color: { type: 'VARIABLE_ALIAS', id: MAP[bound.id].id } } };
        });
        if (changed) { try { node.effects = next; count++; } catch (err) {} }
      }
    }

    if (count) perPage.push(page.name.trim() + ' → ' + count);
    rebound += count;
    pagesDone++;
  }

  console.log('pages processed:', pagesDone);
  console.log('nodes rebound:', rebound);
  console.log('nodes skipped inside instances:', skippedNodes);
  console.log('tokens with no SKO destination:', Object.keys(unmappable).sort());
  console.log(perPage.join('\n'));
}

main();
