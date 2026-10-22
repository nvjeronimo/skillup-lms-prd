---
id: 030
title: Studio, the fourth brand skin, replaces the Sea proposal
date: 2026-10-22
status: accepted
audience: [designer, dev, stakeholder]
track: Foundations
phase: 1
---
**Decision** — The brand skins are SKO, Gold, Red and **Studio**. Studio is a calmer, editorial direction for the whole
platform (reference: humanacademy.ai, 22 Oct 2026), in light and dark. It replaces the Sea proposal (decision 027), which
was removed from the prototype the same day.

What Studio is:
- a cool grey ground (#f3f4f6) with white surfaces that float on a soft shadow, no card borders;
- ink text (#131720), and the logo's deep teal (#044150) as the primary, with a pale aqua soft accent (#e3f3f6);
- Studio Dark: a cool neutral night (ground #0d0f13, surfaces #16191f, text #eef0f3) with a pale aqua primary (#8fd0e0)
  and dark text on it; every pairing AA (text 15:1, muted 10.6, subtle 6.9, on-primary 10.1);
- buttons and fields are pills everywhere; cards round up around them by the nesting rule of decision 028
  (card radius = its padding + 20: card 36, surface 40, card-inset 32, control 20, track pill);
- Inter Tight for display and body text, set large and light (500), tracked tight;
- the Dashboard glance as Today-at-a-glance 1.5 in Studio's terms (ink block, figures on light cards).

**Why**
- Nelson, 22 Oct 2026: he asked for another visual direction of the whole platform, then to swap Sea for it, to apply
  the radius rule to it, to make its dark version and to take it to the DS.

**Design** — DS collection `🎨 SKO-Semantics`: two new modes, **Studio Light** and **Studio Dark** (8 modes in all).
They start as copies of SKO Light / SKO Dark; 16 roles differ in Light and 36 in Dark, each an alias of a new primitive
in `_Primitives` › `Studio/…` (28 new; the light ground, the logo teal and white reuse existing primitives).
Not in the DS yet:
- the font: `Font-Family/font-body` and `font-display` stay Montserrat in the Studio modes, because Inter Tight is not
  available in the Figma workspace (to set once it is installed);
- the radius scale: the radius roles live in `3. Responsive 📐`, which varies by breakpoint, not by skin;
- the pill rule.

**Dev impact** — Prototype: skin `studio` (profile menu › Appearance › Brand skin, or `?direction=studio`),
`html[data-direction="studio"]`, all styling in `tokens/direction-studio.css` (PRs 256, 262, 270, 272; the floating Resume
bar was removed in 274). Saved choices of Sea or of the old Studio switch move to Studio (store v7).

**Alternatives rejected** — Sea (decision 027): Nelson preferred Studio. A separate "Studio look" switch beside the skins:
merged into the skin picker so there is one choice.
