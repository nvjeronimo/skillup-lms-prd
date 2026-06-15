# SKO Brand → UUI Library — Manual Edit Playbook

The Figma Plugin API blocks value changes on published-library primitives (a safety feature). So the actual brand swap has to be done by hand in Figma's Variables UI. This document is the step-by-step.

**File:** `❖ SKO Design System (Untitled UI)` — https://www.figma.com/design/c7EUDrQwP8si08aPipDSIV

**Time estimate:** ~30 minutes total. ~5 min per family group.

## How to open the variable

1. Open the file in Figma
2. Open the Local Variables panel: `Shift+Cmd+Y` or right-side panel
3. Switch to the `_Primitives` collection (top-left dropdown)
4. Search for the variable name (e.g. `Colors/Brand/50`)
5. Edit name + value as shown below

For each row in the tables below, the action is:
- **Rename** the variable to the new name shown
- **Set the colour value** to the SKO hex shown

The `_Primitives` collection has a single mode called "Style" — there's no mode switching to deal with at this layer.

---

## 1. Primary (12 shades)

UUI's `Colors/Brand/*` primitives — currently purple. Replace with SKO blue.

| Current name | New name | New hex |
|---|---|---|
| Colors/Brand/25 | Colors/Brand/25—P07_UI_Blue | #EBF8FF |
| Colors/Brand/50 | Colors/Brand/50—P07_UI_Blue | #EBF8FF |
| Colors/Brand/100 | Colors/Brand/100—P06_Blue_UI_Med | #ACD5F4 |
| Colors/Brand/200 | Colors/Brand/200—P06_Blue_UI_Med | #ACD5F4 |
| Colors/Brand/300 | Colors/Brand/300—P05_Blue_UI-Dark | #66A3D6 |
| Colors/Brand/400 | Colors/Brand/400—P05_Blue_UI-Dark | #66A3D6 |
| Colors/Brand/500 | Colors/Brand/500—P04_Blue_Links | #3685C6 |
| Colors/Brand/600 | Colors/Brand/600—P04_Blue_Links | #3685C6 |
| Colors/Brand/700 | Colors/Brand/700—P03_Teal_blue | #26708E |
| Colors/Brand/800 | Colors/Brand/800—P02_Deep_Blue | #215477 |
| Colors/Brand/900 | Colors/Brand/900—P01_Brand_Blue | #04313D |
| Colors/Brand/950 | Colors/Brand/950—P01_Brand_Blue | #04313D |

SKO has 7 P-shades, UUI has 12 slots — adjacent slots share the same colour.

## 2. Neutral (12 shades)

UUI's `Colors/Gray blue/*` is the closest match to SKO Neutrals (cool tint).

| Current name | New name | New hex |
|---|---|---|
| Colors/Gray blue/25 | Colors/Gray blue/25—White | #FFFFFF |
| Colors/Gray blue/50 | Colors/Gray blue/50—N06_Gray6_UI | #F8F9FA |
| Colors/Gray blue/100 | Colors/Gray blue/100—N05_Gray5_UI | #E1E7EC |
| Colors/Gray blue/200 | Colors/Gray blue/200—N05_Gray5_UI | #E1E7EC |
| Colors/Gray blue/300 | Colors/Gray blue/300—N04_Gray4_UI | #B9C4CE |
| Colors/Gray blue/400 | Colors/Gray blue/400—N04_Gray4_UI | #B9C4CE |
| Colors/Gray blue/500 | Colors/Gray blue/500—N03_Gray3_Subtext2 | #8995A6 |
| Colors/Gray blue/600 | Colors/Gray blue/600—N03_Gray3_Subtext2 | #8995A6 |
| Colors/Gray blue/700 | Colors/Gray blue/700—N02_Gray2_SubText | #606B7A |
| Colors/Gray blue/800 | Colors/Gray blue/800—N02_Gray2_SubText | #606B7A |
| Colors/Gray blue/900 | Colors/Gray blue/900—N01_Grey1_Main_text | #212934 |
| Colors/Gray blue/950 | Colors/Gray blue/950—N01_Grey1_Main_text | #212934 |

## 3. Accents / Blue-Green (12 shades)

UUI's `Colors/Blue light/*` — closest hue match for SKO teal/turquoise accents.

| Current name | New name | New hex |
|---|---|---|
| Colors/Blue light/25 | Colors/Blue light/25—AA07_BlueGreen7 | #E8FFFE |
| Colors/Blue light/50 | Colors/Blue light/50—AA07_BlueGreen7 | #E8FFFE |
| Colors/Blue light/100 | Colors/Blue light/100—AA06_BlueGreen6 | #AAEEEB |
| Colors/Blue light/200 | Colors/Blue light/200—AA05_BlueGreen5 | #73D7D3 |
| Colors/Blue light/300 | Colors/Blue light/300—AA04_BlueGreen4 | #42AEA3 |
| Colors/Blue light/400 | Colors/Blue light/400—AA04_BlueGreen4 | #42AEA3 |
| Colors/Blue light/500 | Colors/Blue light/500—AA03_BlueGreen3 | #309187 |
| Colors/Blue light/600 | Colors/Blue light/600—AA02_BlueGreen2 | #1F655E |
| Colors/Blue light/700 | Colors/Blue light/700—AA01_BlueGreen1 | #044150 |
| Colors/Blue light/800 | Colors/Blue light/800—AA01_BlueGreen1 | #044150 |
| Colors/Blue light/900 | Colors/Blue light/900—AA01_BlueGreen1 | #044150 |
| Colors/Blue light/950 | Colors/Blue light/950—AA01_BlueGreen1 | #044150 |

## 4. Accents / Green (12 shades)

UUI's `Colors/Success/*`.

| Current name | New name | New hex |
|---|---|---|
| Colors/Success/25 | Colors/Success/25—AB06_Green6 | #E4FCED |
| Colors/Success/50 | Colors/Success/50—AB06_Green6 | #E4FCED |
| Colors/Success/100 | Colors/Success/100—AB05_Green5 | #AAEDC2 |
| Colors/Success/200 | Colors/Success/200—AB05_Green5 | #AAEDC2 |
| Colors/Success/300 | Colors/Success/300—AB04_Green4 | #40C075 |
| Colors/Success/400 | Colors/Success/400—AB04_Green4 | #40C075 |
| Colors/Success/500 | Colors/Success/500—AB03_Green3 | #2D9C5B |
| Colors/Success/600 | Colors/Success/600—AB03_Green3 | #2D9C5B |
| Colors/Success/700 | Colors/Success/700—AB02_Green2 | #1F7643 |
| Colors/Success/800 | Colors/Success/800—AB02_Green2 | #1F7643 |
| Colors/Success/900 | Colors/Success/900—AB01_Green1 | #17523A |
| Colors/Success/950 | Colors/Success/950—AB01_Green1 | #17523A |

## 5. Accents / Red (12 shades)

UUI's `Colors/Error/*`.

| Current name | New name | New hex |
|---|---|---|
| Colors/Error/25 | Colors/Error/25—AC6_Red6 | #FCE8E8 |
| Colors/Error/50 | Colors/Error/50—AC6_Red6 | #FCE8E8 |
| Colors/Error/100 | Colors/Error/100—AC6_Red6 | #FCE8E8 |
| Colors/Error/200 | Colors/Error/200—AC5_Red5 | #E26567 |
| Colors/Error/300 | Colors/Error/300—AC5_Red5 | #E26567 |
| Colors/Error/400 | Colors/Error/400—AC4_Red4 | #DA3336 |
| Colors/Error/500 | Colors/Error/500—AC4_Red4 | #DA3336 |
| Colors/Error/600 | Colors/Error/600—AC3_Red3 | #B62226 |
| Colors/Error/700 | Colors/Error/700—AC2_Red2 | #881C1F |
| Colors/Error/800 | Colors/Error/800—AC2_Red2 | #881C1F |
| Colors/Error/900 | Colors/Error/900—AC1_Red1 | #60191A |
| Colors/Error/950 | Colors/Error/950—AC1_Red1 | #60191A |

## 6. Accents / Yellow (12 shades)

UUI's `Colors/Warning/*`.

| Current name | New name | New hex |
|---|---|---|
| Colors/Warning/25 | Colors/Warning/25—AD6_Yell6 | #FFF9EB |
| Colors/Warning/50 | Colors/Warning/50—AD6_Yell6 | #FFF9EB |
| Colors/Warning/100 | Colors/Warning/100—AD5_Yell5 | #FFEBBD |
| Colors/Warning/200 | Colors/Warning/200—AD4_Yell4 | #F9C654 |
| Colors/Warning/300 | Colors/Warning/300—AD4_Yell4 | #F9C654 |
| Colors/Warning/400 | Colors/Warning/400—AD3_Yell3 | #CE8C00 |
| Colors/Warning/500 | Colors/Warning/500—AD3_Yell3 | #CE8C00 |
| Colors/Warning/600 | Colors/Warning/600—AD2_Yell2 | #AC7720 |
| Colors/Warning/700 | Colors/Warning/700—AD2_Yell2 | #AC7720 |
| Colors/Warning/800 | Colors/Warning/800—AD1_Yell1 | #85580E |
| Colors/Warning/900 | Colors/Warning/900—AD1_Yell1 | #85580E |
| Colors/Warning/950 | Colors/Warning/950—AD1_Yell1 | #85580E |

---

## After all edits

1. Publish the library (top-right → Publish library, review the diff)
2. The consuming V7 file (`Wz2TCYFVr0hD8tJNiLajLt`) shows an "Updates available" badge — click to accept all
3. All bg-brand-*, text-brand-*, border-brand, fg-success-*, bg-warning-*, etc. across V7 will start rendering SKO brand colours
4. Spot-check the Dark Video Transcript frame to confirm brand blue replaces brand purple

## Total scope

- 72 variables to rename + revalue (6 families × 12 shades)
- 0 new variables to create
- 0 alias changes (utility-* and semantic-* tokens cascade automatically since they alias to these primitives)

## Why the Plugin API can't do this

Figma protects published library primitives from being mutated programmatically. The `setValueForMode` call drops the MCP connection silently when targeting an existing primitive. Renames work because they don't affect the value of any consumer. Creating new vars works because nothing was published yet. Mutating existing primitive values is the specific operation blocked.

A possible workaround if you don't want to do this manually: have a Figma admin or someone with library-edit permissions run the same operations in a Figma plugin (not the MCP). The desktop plugin context appears not to have the same restriction. But for a one-time setup, manual via the UI is fastest.
