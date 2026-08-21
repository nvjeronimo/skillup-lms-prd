# Figma Plugin API — nineteen things that fail quietly

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

## Querying and annotations

19. **`query()` attribute selectors fail on values containing a space.** `INSTANCE[name=Topic row]` silently
    returns nothing. Filter with `findAll` instead — and remember **`findAll()` excludes the node it is called
    on**, so use `[node, ...node.findAll(...)]` when the root may match.

    **Reading `node.annotations` returns both `label` and `labelMarkdown`; writing back with both fails
    validation.** Keep `labelMarkdown` only.
