# SKO Brand ↔ UUI Primitives Mapping

Organised by the **same group names as the SKO brand sheet**: Primary, Neutral, Accents (Blue-Green / Green / Red / Yellow).

**Naming convention:**
- Prefix `utility-` is swapped to `sko-brand-` to signal these are SKO-branded primitives
- SKO brand name is appended as suffix with no internal spaces (e.g., `P07_UI Blue` becomes `P07_UI_Blue`)
- For the Primary family the duplicate "brand" is dropped (so `utility-brand-50` becomes `sko-brand-50`, not `sko-brand-brand-50`)

The "Current Light SKO" column shows what's IN the UUI library right now. "Δ" is the max RGB channel delta from the brand value.

## Primary

The SKO brand identity. Today UUI's `utility-brand-*` slots hold Untitled UI **purple** (#9E77ED family). These need to become SKO blue.

| SKO | Hex | Renamed UUI primitive | Current Light SKO | Δ | Action |
|---|---|---|---|---|---|
| P07_UI Blue | #EBF8FF | `sko-brand-50—P07_UI_Blue` | #F9F5FF | 22 | RENAME + REPLACE |
| P06_Blue_UI_Med | #ACD5F4 | `sko-brand-100—P06_Blue_UI_Med` | #F4EBFF | 72 | RENAME + REPLACE |
| P06_Blue_UI_Med | #ACD5F4 | `sko-brand-200—P06_Blue_UI_Med` | #E9D7FE | 61 | RENAME + REPLACE |
| P05_Blue_UI-Dark | #66A3D6 | `sko-brand-300—P05_Blue_UI-Dark` | #D6BBFB | 112 | RENAME + REPLACE |
| P05_Blue_UI-Dark | #66A3D6 | `sko-brand-400—P05_Blue_UI-Dark` | #B692F6 | 80 | RENAME + REPLACE |
| P04_Blue_Links | #3685C6 | `sko-brand-500—P04_Blue_Links` | #9E77ED | 104 | RENAME + REPLACE |
| P04_Blue_Links | #3685C6 | `sko-brand-600—P04_Blue_Links` | #7F56D9 | 73 | RENAME + REPLACE |
| P03_Teal blue | #26708E | `sko-brand-700—P03_Teal_blue` | #6941C6 | 67 | RENAME + REPLACE |
| P02_Deep Blue | #215477 | `sko-brand-800—P02_Deep_Blue` | #53389E | 50 | RENAME + REPLACE |
| P01_Brand Blue | #04313D | `sko-brand-900—P01_Brand_Blue` | #42307D | 62 | RENAME + REPLACE |

SKO has 7 P-shades, UUI has 10 brand slots. P04, P05, P06 each cover two adjacent slots.

## Neutral

SKO neutrals have a cool/blue tint, so the `gray-blue-*` family fits better than plain `gray-*`.

| SKO | Hex | Renamed UUI primitive | Current Light SKO | Δ | Action |
|---|---|---|---|---|---|
| White | #FFFFFF | `sko-brand-gray-50—White` | #FAFAFA | 5 | RENAME + REPLACE (tweak to #FFFFFF or accept) |
| N06_Gray6_UI | #F8F9FA | `sko-brand-gray-blue-50—N06_Gray6_UI` | #F8F9FC | 2 | RENAME only |
| N05_Gray5_UI | #E1E7EC | `sko-brand-gray-blue-100—N05_Gray5_UI` | #EAECF5 | 9 | RENAME + REPLACE |
| N04_Gray4_UI | #B9C4CE | `sko-brand-gray-blue-300—N04_Gray4_UI` | #B3B8DB | 13 | RENAME + REPLACE |
| N03_Gray3_Subtext2 | #8995A6 | `sko-brand-gray-blue-500—N03_Gray3_Subtext2` | #4E5BA6 | 58 | RENAME + REPLACE |
| N02_Gray2_SubText | #606B7A | `sko-brand-gray-blue-700—N02_Gray2_SubText` | #363F72 | 42 | RENAME + REPLACE |
| N01_Grey1_Main text | #212934 | `sko-brand-gray-blue-900—N01_Grey1_Main_text` | (slot not in scan) | — | ADD slot |

## Accents / Blue-Green

UUI calls these "blue light"; SKO blue-greens are more teal/turquoise. Values need full replacement.

| SKO | Hex | Renamed UUI primitive | Current Light SKO | Δ | Action |
|---|---|---|---|---|---|
| AA07_BlueGreen7 | #E8FFFE | `sko-brand-blue-light-50—AA07_BlueGreen7` | (not in scan) | — | ADD slot |
| AA06_BlueGreen6 | #AAEEEB | `sko-brand-blue-light-100—AA06_BlueGreen6` | #E0F2FE | 54 | RENAME + REPLACE |
| AA05_BlueGreen5 | #73D7D3 | `sko-brand-blue-light-200—AA05_BlueGreen5` | #B9E6FE | 70 | RENAME + REPLACE |
| AA04_BlueGreen4 | #42AEA3 | `sko-brand-blue-light-300—AA04_BlueGreen4` | #7CD4FD | 90 | RENAME + REPLACE |
| AA03_BlueGreen3 | #309187 | `sko-brand-blue-light-500—AA03_BlueGreen3` | #0BA5EC | 101 | RENAME + REPLACE |
| AA02_BlueGreen2 | #1F655E | `sko-brand-blue-light-600—AA02_BlueGreen2` | #0086C9 | 107 | RENAME + REPLACE |
| AA01_BlueGreen1 | #044150 | `sko-brand-blue-light-700—AA01_BlueGreen1` | #026AA2 | 82 | RENAME + REPLACE |

## Accents / Green

| SKO | Hex | Renamed UUI primitive | Current Light SKO | Δ | Action |
|---|---|---|---|---|---|
| AB06_Green6 | #E4FCED | `sko-brand-success-50—AB06_Green6` | #ECFDF3 | 8 | RENAME + REPLACE |
| AB05_Green5 | #AAEDC2 | `sko-brand-success-200—AB05_Green5` | #ABEFC6 | 4 | RENAME only |
| AB04_Green4 | #40C075 | `sko-brand-success-400—AB04_Green4` | #47CD89 | 20 | RENAME + REPLACE |
| AB03_Green3 | #2D9C5B | `sko-brand-success-500—AB03_Green3` | #17B26A | 22 | RENAME + REPLACE |
| AB02_Green2 | #1F7643 | `sko-brand-success-700—AB02_Green2` | #067647 | 25 | RENAME + REPLACE |
| AB01_Green1 | #17523A | `sko-brand-success-900—AB01_Green1` | (slot not in scan) | — | ADD slot |

## Accents / Red

| SKO | Hex | Renamed UUI primitive | Current Light SKO | Δ | Action |
|---|---|---|---|---|---|
| AC6_Red6 | #FCE8E8 | `sko-brand-error-100—AC6_Red6` | #FEE4E2 | 6 | RENAME + REPLACE |
| AC5_Red5 | #E26567 | `sko-brand-error-300—AC5_Red5` | #FDA29B | 61 | RENAME + REPLACE |
| AC4_Red4 | #DA3336 | `sko-brand-error-500—AC4_Red4` | #F04438 | 22 | RENAME + REPLACE |
| AC3_Red3 | #B62226 | `sko-brand-error-600—AC3_Red3` | #D92D20 | 35 | RENAME + REPLACE |
| AC2_Red2 | #881C1F | `sko-brand-error-700—AC2_Red2` | #B42318 | 44 | RENAME + REPLACE |
| AC1_Red1 | #60191A | `sko-brand-error-900—AC1_Red1` | (slot not in scan) | — | ADD slot |

## Accents / Yellow

| SKO | Hex | Renamed UUI primitive | Current Light SKO | Δ | Action |
|---|---|---|---|---|---|
| AD6_Yell6 | #FFF9EB | `sko-brand-warning-50—AD6_Yell6` | #FFFAEB | 1 | RENAME only |
| AD5_Yell5 | #FFEBBD | `sko-brand-warning-100—AD5_Yell5` | #FEF0C7 | 14 | RENAME + REPLACE |
| AD4_Yell4 | #F9C654 | `sko-brand-warning-200—AD4_Yell4` | #FEDF89 | 53 | RENAME + REPLACE |
| AD3_Yell3 | #CE8C00 | `sko-brand-warning-500—AD3_Yell3` | #F79009 | 41 | RENAME + REPLACE |
| AD2_Yell2 | #AC7720 | `sko-brand-warning-700—AD2_Yell2` | #B54708 | 49 | RENAME + REPLACE |
| AD1_Yell1 | #85580E | `sko-brand-warning-900—AD1_Yell1` | (slot not in scan) | — | ADD slot |

## Summary

| Group | Slots | RENAME only | RENAME + REPLACE | ADD slot |
|---|---|---|---|---|
| Primary | 10 | 0 | 10 | 0 |
| Neutral | 7 | 1 (N06) | 5 | 1 (N01) |
| Accents / Blue-Green | 7 | 0 | 6 | 1 (AA07) |
| Accents / Green | 6 | 1 (AB05) | 4 | 1 (AB01) |
| Accents / Red | 6 | 0 | 5 | 1 (AC1) |
| Accents / Yellow | 6 | 1 (AD6) | 4 | 1 (AD1) |
| **Total** | **42** | **3** | **34** | **5** |

## Execution sequence

1. Open the source UUI library file (`❖ SKO Design System (Untitled UI)`)
2. Navigate to `1. Color modes` variable collection
3. For each row above, in `Light mode SKO`:
   - Rename the variable to the new `sko-brand-…—{SKO_name}` form
   - If action is `REPLACE`, set the value to the SKO hex shown
4. Decide Dark mode SKO strategy: flat brand (same hex) or inverted shade (50 ↔ 900)
5. For the 5 ADD rows, create new variables in the appropriate family
6. Publish the UUI library
7. The V7 file (Wz2TCYFVr0hD8tJNiLajLt) auto-updates — no V7 changes needed
