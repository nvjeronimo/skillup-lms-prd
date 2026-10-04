# Figma Plugin API — twenty-one things that fail quietly

Collected while building the Course Detail components. Every one of these **succeeded without an error** and
produced the wrong result — which is the only reason they are worth writing down. An exception teaches you on
the spot; a silent success teaches you two hours later, if at all.

The rule they all point at: **after any structural mutation, read the state back and count something.** Not
"did it throw" — "is the number what I expect".

## Sizing and layout

1. **`resize()` resets sizing modes to FIXED.** Set `primaryAxisSizingMode` / `counterAxisSizingMode` *after*
   the resize, never before. A hug that silently became a fixed height is how a component ends up 10px tall.
2. **`createComponentFromNode()` does the same.** It returns a component whose primary axis is FIXED at
   whatever height the node had at that instant. Re-assert `AUTO`, and `clipsContent = false`.
3. **`createSlot()` does not exist.** Content containers are plain frames. There is no slot primitive, which is
   the main reason a "base row atom" pays off less in Figma than it does in code.

## Component properties

4. **Nested component property keys carry an `#id` suffix.** Resolve them by prefix (`k.indexOf('Title#')===0`),
   never by literal name.
5. **`componentPropertyDefinitions` cannot be read from a variant.** Read them from the set.
6. **A TEXT property on a component *set* has one value across all variants.** Per-variant copy and a shared
   text property are mutually exclusive — pick one.
7. **`addComponentProperty` with `INSTANCE_SWAP` rejects a component key.** It wants the node id of a local
   instance-able component. `setProperties` on an INSTANCE_SWAP is the same: node id, not key.
8. **`clone()` on a variant inside a component set silently drops `componentPropertyReferences` that point at
   the set's own properties.** References to a *nested instance's* own properties survive, which makes the
   damage look partial and plausible. Re-bind after cloning and count the bindings per variant — six variants
   that should each have seven and three of them have three is a number you can see; a title rendering the
   wrong module is not, until you look at the screen.

## Imports and the library

9. **`importComponentByKeyAsync` fails on a component-SET key.** Use `importComponentSetByKeyAsync`.
10. **The library `Button` has no plain TEXT label property.** Override the Text node on the instance and turn
    the two icon booleans off.
11. **There is no team-library component enumeration API in the plugin sandbox.**
    `getAvailableLibraryVariableCollectionsAsync` exists for variables; there is no component equivalent. Use
    the MCP `search_design_system` tool instead — and search by *where a thing is used*, not by what it looks
    like, because that is how the library names things.

## Text

12. **Text styles must be applied explicitly.** Setting `fontName` is not enough and passes silently.
    Call `setTextStyleIdAsync`.
13. **`setTextStyleIdAsync` resets `textDecoration`.** Apply the style first, decoration after.
14. **Montserrat does not render ✅ — or ⚙.** Use ✓, and keep symbol glyphs in layer and section *names*,
    which Figma draws in its own UI font, rather than in canvas text.

## Colour and modes

15. **The brand token resolves teal, not the sky blue** that was hardcoded in v10/v11.
16. **There is no dark surface token in `1. Semantics`.** The dark mentor card was an invented colour.
17. **`1. Semantics` carries `Light mode SKO` / `Dark mode SKO`** — a dark surface is a *mode flip* via
    `setExplicitVariableModeForCollection`, not a different token.
18. **Icon colour lives on `strokes`, not `fills`.**
19. **Property access on a leaf node can throw rather than return `undefined`.** `textNode.findAll` raises
    a `TypeError` instead of being falsy, so `node.findAll ? … : …` does not guard it. Check `node.type`
    against a container list instead.

## The transport

20. **A dropped `use_figma` response is not a failed write.** On a large file, a call that mutates a lot of
    paints often returns *"transport dropped mid-call"* — but the writes landed. Treating the drop as a
    failure and retrying the same range is how you conclude something is impossible when it is only slow.
    `Buttons/Button` went from 123 outstanding to zero entirely through calls that all reported as dropped.

    An **internal timeout** is the same thing with a different name: one timeout at a cap of 40 had written
    88 bindings by the time it was cut off. Only `An unexpected error occurred` leaves the state genuinely
    unknown.

21. **Tranche size is not the variable — file load is.** The first read of trap 20 was that 8 and 20 land
    while 40 does not. That held for one afternoon and then stopped being true: with the same runner, the
    same file returned cleanly at 30, 40, 120, 200, 400 and 600 mutations per call. Sizing tranches to a
    number observed once turns a two-hour job into a two-day one.

    **Make the runner measure itself instead.** Give it a mutation budget, and have it count what it did
    *not* reach in the same pass:

    ```js
    if (budget <= 0) { remaining++; continue; }   // count, don't write
    ...
    done++; budget--;
    return { rebound: done, stillLeft: remaining };
    ```

    `stillLeft` is computed after the writes, inside the call, so it survives a dropped response — and when
    it comes back `0` the page is provably finished. Then raise the budget until a call fails, rather than
    guessing low forever.

## Querying and annotations

21. **`query()` attribute selectors fail on values containing a space.** `INSTANCE[name=Topic row]` silently
    returns nothing. Filter with `findAll` instead — and remember **`findAll()` excludes the node it is called
    on**, so use `[node, ...node.findAll(...)]` when the root may match.

    **Reading `node.annotations` returns both `label` and `labelMarkdown`; writing back with both fails
    validation.** Keep `labelMarkdown` only.

## Components, slots and tokens (24 Sep)

22. **Setting `textCase` on a text that has a text style detaches the style** — even when the style already has
    that case. Apply the style last and set nothing after it; if the case must differ, pick a style that has it.

23. **`findAll()` descends into instances.** A token pass that writes fills from `node.findAll()` also writes
    *overrides inside nested instances* — it painted a DS partner logo white. Walk the tree yourself and stop at
    `INSTANCE`. To undo, `instance.removeOverrides()` (re-set the instance name afterwards); main nodes of remote
    components are not reachable by id, so they cannot be copied back.

24. **Min / max size cannot be overridden in an instance** (`min-size` error). A DS component with a min width is
    as narrow as it gets; work around it (hide columns) or ask the library.

25. **`setBoundVariable` on responsive spacing picks the value of the node's mode.** `Spacing/3xl` is 24 on
    Desktop and 16 on Mobile. Read `node.resolvedVariableModes[collectionId]` and choose the token that gives the
    same number in that mode; a frame set to Mobile resolves every bound child in Mobile.

26. **Slots:** `set.addComponentProperty(name,'SLOT','')` then `frame.componentPropertyReferences =
    {slotContentId: key}` turns the frame into a `SLOT` in each variant. In an instance the slot is found with
    `findAllWithCriteria({types:['SLOT']})`; append children to it.

27. **Layers hidden by a boolean property are absent from an instance's `findAll`** until the property is on —
    turn it on, edit, turn it off.

28. **Annotations on layers inside instances survive the first clear after a `clone()`.** Clearing right after the
    clone misses them; a second `findAll(n=>n.annotations?.length)` pass clears them. Always re-count.

29. **`findAllWithCriteria` descends into instances too**, like `findAll`. A text-style pass over it restyled 51 texts
    inside three certificate instances. Walk the tree yourself and return at `INSTANCE`.

30. **Texts inside a scaled instance have no text style** — scaling rewrites their size, and a style would pin it.
    An audit that stops at instances does not see them; one that does must not "fix" them.

31. **`resize()` pins both axes to Fixed.** Setting `primaryAxisSizingMode = 'AUTO'` and then calling `resize()` on a
    new auto-layout component leaves it Fixed — the Due item stayed 80 tall and its instances clipped their text. Set
    the sizing modes **after** the resize.

32. **Two kinds of grid.** In a grid whose children are auto-placed, `setGridChildPosition` throws — reorder with
    `insertChild`. In a grid with explicit anchors, `insertChild` does not move anything — use
    `setGridChildPosition(row, col)`. And `gridRowCount` cannot drop a row that still holds a child: move the child first.

33. **Cutting a grid's row count can leave its track at a fixed 1 px.** The Programs grid rendered 1 px tall after
    `gridRowCount = 1`. `gridRowSizes = [{type:'HUG', value:1}]` did nothing; `[{type:'HUG'}]` (no value) fixed it.

34. **An instance does not keep a `layoutMode` override.** Setting a DS row to VERTICAL read back HORIZONTAL and
    left its children half-configured. And inside `LMS / Course Row` the nested frames ignore `resize()` and
    sizing changes — visibility is the override that works.

35. **A variant swap resets text overrides in nested instances.** `Horizontal tabs` md → sm put the component's
    default labels back (*My details 2*, twice). Copy the texts across after the swap.

36. **Absolutely positioned layers keep that when cloned** — the ICP status bar is absolute in its screen; set
    `layoutPositioning = 'AUTO'` before `layoutSizingHorizontal = 'FILL'`.

37. **A non-auto-layout component does not follow a new width, and its instances cannot fix it.** Children of an
    instance cannot be moved (`x` is "relative-transform", not overridable), and a hugging auto-layout row ignores a
    `STRETCH` constraint. Fix the component (fixed row width + `STRETCH`, children pinned), then resize the instance
    down and up so the constraints settle.

38. **`resize()` on a layer nested in an instance does nothing, and says nothing.** Figma does not let an instance
    resize its inner layers; the call returns without an error and the size stays the component's. What an
    instance *can* override: sizing mode (fill / hug / fixed — fixed snaps to the component's size), padding,
    gap, visibility, text. To size something, use those — a progress fill is *fill* plus a right padding on its
    track. **Always report a size you read back, never the one you computed.**

