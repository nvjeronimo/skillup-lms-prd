# Variable Collections — SKO Design System

Guia das 4 coleções de variáveis do ficheiro Figma `c7EUDrQwP8si08aPipDSIV`.

> Este conteúdo vivia nas descrições das variáveis `!!! ABOUT THIS COLLECTION`, uma por coleção.
> Essas variáveis foram removidas em 2026-07-22 porque poluíam o export DTCG/CSS (apareciam
> como tokens do tipo STRING). O texto está preservado aqui, na íntegra.

---

## `_Primitives`

Raw, unopinionated design values (color scales, numeric spacing/size scale, type scale, width scale).
Hidden from publishing — never bind a component directly here. Everything else in this file aliases
from these.

**Modo único:** `Style`

---

## `1. Semantics`

3 namespaces:

- `Colors/*` + `Component colors/*` — generic base UI-kit roles (Untitled UI)
- `LMS/*` — SkillUp product tokens — **ALWAYS use `LMS/*` when building LMS screens**

**Modos:** Light/Dark × SKO (fixed teal) / BrandX (swappable via `2. Skins`).
Aliases `_Primitives` (SKO) ou `2. Skins` (BrandX).

---

## `2. Skins 🎨`

Swappable brand identity. Each mode = one custom skin. Only affects `1. Semantics` **BrandX** modes —
has zero effect on default SKO modes (those use a fixed teal from `_Primitives`).

Each color has `-light`/`-dark` variants as a **NAME suffix (not a mode)** because a Figma collection
can only have one mode axis.

**Modos:** SKO, Gold, Violet, Sky, Red, Ink

---

## `3. Responsive 📐`

Spacing + Radius + Typography + Container, all sharing one Desktop/Tablet/Mobile mode axis.
Set a frame's explicit mode for THIS collection to preview/lock a breakpoint.
All values alias `_Primitives/Numeric` ou `_Primitives/Type`.

**Modos:** Desktop, Tablet, Mobile

---

## Modelo de skins — duas pistas

Cada skin tem **duas** famílias de primitivos em `_Primitives`, e a distinção é deliberada.

### Pista 1 — rampa de marca `Colors/SKO-Brand/Skins/{Skin}/{25…950}`

12 passos gerados por interpolação **OKLCH** (espaço perceptual) a partir de duas âncoras de marca
que são preservadas exactamente: o `solid-dark` (400) e o `solid-light` (600).

Os papéis mapeiam para posições fixas — **esta é a regra, não há escolha caso-a-caso**:

| posição | papéis |
|---|---|
| 100 | `text-primary-dark` |
| 200 | `hover-light` |
| 300 | `text-dark`, `hover-dark` |
| 400 | `solid-dark`, `accent-dark` |
| 600 | `solid-light` |
| **700** | **`text-light`** *(950 no Ink)* |
| 800 | `text-primary-light` |

**Em dark mode o hover CLAREIA** — 300 é um passo mais claro que o solid em 400. Escurecer no
hover afunda o botão contra a superfície e é erro de dark theme.

**`text-light` é um passo ABAIXO do `solid-light`.** A cor de marca sólida não passa AA como texto
sobre `bg-tertiary` — o SKO ficava em 4.44 e o Gold em 4.29. A variável `Brand/text-light` alimenta
`LMS/Text/text-brand` e `text-brand-secondary`, e resolve para 700 em cinco skins. No Ink resolve
para **950**, porque a âncora dele está em 900 e o passo 700 seria *mais claro* que a própria marca.

| skin | `solid-light` | `text-light` | pior caso |
|---|---|---|---|
| SKO | `#26708E` (600) | `#215477` — `Primary/700_P02` | 4.44 → **6.48** |
| Gold | `#8F621A` (600) | `#724C00` — `Gold/700` | 4.29 → **6.13** |
| Violet | `#4D1B9A` (600) | `#3A1973` — `Violet/700` | 8.69 → **10.75** |
| Sky | `#2C6BA0` (600) | `#23537D` — `Sky/700` | 4.53 → **6.47** |
| Red | `#B62226` (600) | `#88262A` — `Red/700` | 5.19 → **7.14** |
| Ink | `#04313D` (**900**) | `#001119` — `Ink/950` | 11.14 → **15.39** |

Só o SKO e o Gold falhavam, mas a regra aplica-se aos seis — um sistema com excepções por skin é
exactamente o que esta refactorização veio eliminar. O Sky, a 4.53, estava no fio.

**Excepção Ink:** as âncoras do Ink são quase pretas (`solid-light` = `#04313D`, L 12.7%, contra
33–42% nos outros skins). Ancorado em 600 a rampa colapsa (passo mínimo 1.9pp). Por isso o Ink
ancora em **900**, com `text-primary-light` em 950. A cor de marca mantém-se exacta — só ocupa a
posição que a luminosidade dela realmente é.

**Excepção SKO:** o `hover-light` do SKO é **amarelo** (`Y01`), 156° de matiz fora do teal. É o
padrão de marca teal→amarelo e não cabe numa rampa de matiz único. Fica aliasado à rampa Yellow.

### Pista 2 — superfícies tingidas `Colors/SKO-Brand/Skins/{Skin}/surface-{light,dark}`

`section-light` e `section-dark` **não** vêm da rampa. São superfícies, não cor de marca:
propositadamente dessaturadas, à volta de L 13–17% no dark.

Pôr superfícies na rampa de matiz produz extremos saturados e quase-pretos — exactamente o que
um dark theme deve evitar. Superfícies escuras são near-black **tingido**, nunca o extremo da matiz.

### Adicionar um skin novo

1. Definir as duas âncoras de marca: `solid-light` e `solid-dark`
2. Gerar os 12 passos por OKLCH a partir delas
3. Definir as 2 superfícies tingidas (dessaturadas, L ~13–17% para a dark)
4. Ligar os 11 papéis às posições da tabela acima — sem escolhas manuais
5. Correr a validação de contraste (ver "Como re-validar") antes de publicar

Se a âncora `solid-light` do skin novo for muito escura (L abaixo de ~20%, como o Ink), ancorar em
900 em vez de 600 e descer `text-primary-light` e `text-light` para 950 — senão a rampa colapsa no
extremo escuro.

---

## Escala em Primary e Neutral

Ambos os grupos são famílias de matiz coerentes — amplitude de **15°** no Primary (192–207) e **16°**
no Neutral (207–223). Foram numerados por luminosidade a 2026-07-22, no formato
`{passo}_{código_de_marca}`, o mesmo que os accents já usavam (`25_AA07_BlueGreen7`).

**Os códigos de marca (`P01`–`P08`, `N00`–`N06`) são preservados** — vêm do guia de marca oficial
da SKO e a numeração é aditiva, nunca substitutiva.

**Primary**

| passo | valor | | passo | valor |
|---|---|---|---|---|
| `25_P07_UI_Blue` | `#EBF8FF` | | `500_P08_Blue_Progress` | `#0086C9` |
| `100_P06_Blue_UI_Med` | `#ACD5F4` | | `600_P03_Blue_Teal` | `#26708E` |
| `200_P04b_Blue_Light` | `#51BFFC` | | `700_P02_Blue_Ink` | `#215477` |
| `300_P05_Blue_UI_Dark` | `#66A3D6` | | `900_P01_Brand_Blue` | `#044150` |
| `400_P04_Blue_Links` | `#3685C6` | | `950_N00_DeepTeal` | `#13282F` |

**Neutral**

| passo | valor | origem |
|---|---|---|
| `25_N06_Gray6` | `#F8F9FA` | guia de marca |
| `50_N06b_Gray_Light` | `#F3F5FA` | guia de marca |
| `100_N05_Gray5` | `#E1E7EC` | guia de marca |
| `200_N04_Gray4` | `#B9C4CE` | guia de marca |
| `400_N03_Gray3` | `#8995A6` | guia de marca |
| `500_N02b_Gray_Mid` | `#677482` | guia de marca |
| `600_N02_Gray2` | `#606B7A` | guia de marca |
| **`700`** | **`#4F5B69`** | **interpolado — ver "Níveis de texto"** |
| **`800`** | **`#39414C`** | **interpolado — ver "Níveis de texto"** |
| `900_N01_Grey1` | `#212934` | guia de marca |
| `White` | `#FFFFFF` | guia de marca |

Os passos `700` e `800` **não vêm do guia de marca** — por isso não têm código. Foram criados a
2026-07-22 porque não havia nada entre o `600` (`#606B7A`) e o `900` (`#212934`), e os níveis de
texto em light não passavam AA sobre as superfícies elevadas.

Efeitos laterais desejados: os sufixos de uso (`_Main_text`, `_SubText`, `_UI`) desapareceram dos
neutrals, as inserções `b` passaram a ocupar posições legítimas (50 e 500) em vez de serem remendos,
e o `N00_DeepTeal` — que estava arquivado no grupo Primary com prefixo de neutral — passou a ocupar
a posição 950 do Primary, que é onde a luminosidade dele o coloca.

### Irregularidade conhecida no Primary

A numeração ordena por **luminosidade**, e isso está correcto. Mas o Primary **não tem curva de
croma contínua**: `P02`–`P05` formam uma pista mudada consistente (~57% de saturação), enquanto
`P08` (100%), `P04b` (97%) e `P07` (100%) são acentos vivos intercalados.

Ou seja, `200_P04b` e `300_P05` são vizinhos no número mas primos afastados no croma. A posição
diz onde a cor está na escala de luminosidade — **não** promete continuidade de família.

---

## Neutros escuros — `Dark-Neutral`

Família única (matiz 196–201°, amplitude de **5°**), numerada por luminosidade a 2026-07-22.
Substituiu os nomes de papel que viviam nos primitivos (`Surface-Base`, `Text-Primary`, etc.).

| passo | valor | L% | era |
|---|---|---|---|
| `50` | `#EAF1F4` | 93.7 | `Text-Primary` |
| `200` | `#B3C0C7` | 74.1 | `Text-Secondary` |
| `300` | `#93A3AB` | 62.4 | `Text-Tertiary` |
| `600` | `#33474F` | 25.5 | `Border-Subtle` |
| `700` | `#25383F` | 19.6 | `Surface-Elevated` |
| `800` | `#16282F` | 13.5 | `Surface-Subtle` |
| `900` | `#122228` | 11.4 | `Surface-Raised` |
| `950` | `#0E1A1F` | 8.8 | `Surface-Base` |
| `950-alpha-50` | `#0E1A1F` @50% | — | `Overlay-Scrim` |

### ⚠️ Não suavizar esta rampa

O espaçamento é **deliberadamente irregular**: de `300` para `600` há um salto de 37pp, mas de
`800` para `900` há 2.1pp. Os passos `700`–`950` são a **escada de superfícies do dark mode**,
afinada a ~1.07:1 entre degraus para dar elevação sem clarear demais.

Quem olhar para a rampa vai ter vontade de a regularizar. **Não regularizar** — destrói a elevação.
A irregularidade é a funcionalidade.

## Cores de estado em dark

Deixaram de ter primitivos próprios. Foram repontadas para o passo mais próximo da rampa de accent
a que pertencem (distância medida em OKLab), o que melhorou o contraste em dois dos três casos:

| papel | era | agora | pior contraste |
|---|---|---|---|
| success | `#5FCF8A` | `Green/200` `#72D99A` | 6.28 → **7.06** |
| warning | `#E0B251` | `Yellow/400` `#FAB929` | 6.21 → **7.01** |
| progress | `#38A8E6` | `Primary/300_P05` `#66A3D6` | 4.61 → 4.53 |
| erro (texto) | `#E8797B` `Red/100_AC5b` | `Red/50` `#F3AFB0` | 4.34 → **6.74** |

O texto de erro em dark falhava AA sobre `bg-tertiary` (`#25383F`) — 4.34:1. Subiu para 6.74.

O `progress` a **4.53:1** é o par mais fino em dark. Passa AA, mas se algum dia apertar, o candidato
seguinte é `Primary/200_P04b` (`#51BFFC`, 5.95:1). O par mais fino do sistema inteiro está em light
— ver "Como re-validar contraste".

O `hover_Y01_Yellow_Hover` foi removido: era um alias para `300_AD4_Yell4`, e com o Yellow já em
escala completa a indireção não acrescentava nada.

---

## Superfícies — a Pista 2, em todo o sistema

Regra geral do ficheiro: **um primitivo diz que cor é, não para que serve.** Há uma única categoria
de excepção, e é medida, não conveniência — as **superfícies**.

Vivem em dois sítios, ambos com nome explícito de superfície em vez de posição de escala:

- `Colors/SKO-Brand/Skins/{Skin}/surface-light` e `surface-dark` — superfícies de marca por skin
- `Colors/SKO-Brand/Surfaces/{success,warning,error}-dark` — superfícies de estado em dark

### Porque ficam fora das rampas

Não é preguiça de as numerar. As superfícies escuras são **near-black dessaturado tingido**, e por
construção caem abaixo do passo mais escuro da rampa de matiz a que pertenceriam:

| superfície | L% | passo 950 da sua rampa | L% |
|---|---|---|---|
| `success-dark` `#102B1D` | 11.6 | `Green/950` `#17523A` | 20.6 |
| `warning-dark` `#2E2410` | 12.2 | `Yellow/950` `#85580E` | ~29 |
| `error-dark` `#34191B` | 15.1 | `Red/950` `#60191A` | ~24 |

Todas caem na banda 11.6–15.1%, que é exactamente a do `Dark-Neutral/800–950` (11.4–13.5%) — são
neutros escuros com um tingimento de matiz, não degraus de uma rampa cromática.

Forçá-las a um passo `975` inventado daria-lhes um número que mente sobre o que são. Pôr o extremo
saturado da rampa no lugar delas partiria o princípio de dark theme que o sistema todo segue.

---

## Níveis de texto em light — e o tecto do `bg-tertiary`

A superfície mais escura do light mode é o `bg-tertiary` (`#E1E7EC`). Qualquer texto sobre ela
precisa de **Y ≤ 0.137** para passar 4.5:1, o que impõe um **tecto de L ≈ 40%** a toda a hierarquia
de texto. Acima disso não passa, ponto.

Os valores antigos estavam acima do tecto e falhavam:

| token | era | agora | pior caso |
|---|---|---|---|
| `text-primary` | `#13282F` | *(inalterado)* | 12.27 |
| `text-secondary` | `#606B7A` (L 42.7) | **`#39414C`** `Neutral/800` | 4.34 → **8.28** |
| `text-tertiary` | `#677482` (L 45.7) | **`#4F5B69`** `Neutral/700` | 3.83 → **5.55** |

### O efeito lateral que ninguém tinha diagnosticado

`text-secondary` (L 42.7) e `text-tertiary` (L 45.7) estavam a **3pp de luminosidade** um do outro —
na prática a mesma cor. A hierarquia de texto em light existia nos tokens mas **não no ecrã**.

Depois da correcção: primary→secondary 13pp, secondary→tertiary 10pp. A hierarquia passou a existir.

> A mudança **é visível**. Texto secundário, terciário e de marca ficam nitidamente mais escuros
> em light. É o efeito pretendido, não um bug de regressão.

---

## Como re-validar contraste

**Nunca com uma lista de pares escrita à mão.** Durante a sessão de 2026-07-22 falharam-se tokens
três vezes seguidas por causa disso — a última apanhou `text-brand-primary` e `text-brand-secondary`,
que nunca tinham sido testados em toda a história do sistema.

O método correcto:

1. Fazer parse do `tokens/colors.css` — é o artefacto que os devs consomem
2. **Descobrir** os tokens do ficheiro: todos os `--sk-text-*` como primeiro plano, todos os
   `--sk-bg-{primary,secondary,secondary-subtle,tertiary}` como fundo
3. Resolver a cascata para cada uma das 12 combinações (6 skins × light/dark)
4. Cruzar tudo, mais os pares semânticos explícitos (`*-on-brand`, `*-on-solid`, `bg-brand-section`)

Estado a 2026-07-22: **540 verificações, 0 falhas AA.**

### ⚠️ Ponto mais fino do sistema

`text-success-primary` sobre `bg-tertiary` em light = **4.51:1**. Passa por 0.01. Qualquer
escurecimento do `bg-tertiary` ou clareamento do verde parte-o — re-validar sempre que um dos dois
mudar.

---

## Camada de acessibilidade (Accessibility Standards)

Adoptada a 2026-07-24. Documentada visualmente na página Figma **`♿ Accessibility Standards`**
do ficheiro do DS. Três eixos **ortogonais** ao skin e ao tema, controlados por atributos em
`<html>` — um utilizador daltónico mantém a marca dele:
`<html data-skin="gold" data-theme="dark" data-vision="cvd">`.

### Porque a maior parte vive no CSS, não em variáveis

Os *modos* de variável do Figma são um eixo único por coleção, e o Figma **não alia
condicionalmente** entre coleções. `data-vision`, `data-text-size` e as flags de comportamento são
eixos novos que, como modos, causariam explosão combinatória (a Semantics 4→8 só com vision).
Por isso: os **valores** vivem no DS como primitivos; o **override** vive no CSS — exactamente
como o `[data-skin="teal"]` e o `--sk-font-scale`.

### 1. Colourblind-safe states — `data-vision="cvd"`

Retuna os estados (success/warning/error) para uma paleta segura ao daltonismo vermelho-verde
(deuteranopia + protanopia, ~99% dos casos). O problema real não é a cor de marca — são os estados
a colapsarem: no default, para um deuteranope, warning ≈ error (ΔE **3.9**). A distinção migra do
eixo vermelho-verde (perdido) para azul-amarelo + luminosidade (preservados). Base **Okabe-Ito**.
Separação sob deuter/protan: **ΔE ≥ 18**; todos os tiers passam WCAG AA em light e dark.

**Primitivos:** `Colors/SKO-Brand/CVD/{Success,Warning,Error}/{text,solid,surface}-{light,dark}`
(18 variáveis). Valores verificados 1:1 contra o `[data-vision]` do `colors.css`.

| estado | default | CVD light | CVD dark |
|---|---|---|---|
| success (text/solid) | verde `#1f7643` | **azul** `#00618f` / `#0072b2` | `#56b4e9` |
| warning | azeitona `#85580e` | **âmbar** `#8a5a00` / `#e69f00` | `#e6b54d` |
| error | vermelho `#b62226` | **vermelho-escuro** `#9e2a2b` / `#c0392b` | `#e8898a` |

Success vira azul — foge à convenção verde=sucesso, mas é opt-in e é o que o torna seguro; o ícone
✓ mantém o significado. **Encoding redundante auditado:** todos os indicadores de estado já
emparelham cor com ícone / forma / texto (CompletionStatus, InlineAlert, ProgressRail, etc.).

### 2. Text size — `data-text-size`

3 níveis via `--sk-font-scale`: `md` 100% (default, sem atributo), `lg` 115%, `xl` 130%. Aplicado à
rampa `.sk-text-*` (font-size + line-height por `calc`). WCAG 1.4.4. Só escala texto que usa as
classes `.sk-text-*` — que é a regra do sistema.

### 3. Flags de comportamento (só CSS, nunca variáveis)

| flag | atributo | efeito | WCAG |
|---|---|---|---|
| Reduce motion | `data-reduce-motion` | desliga animações/transições | 2.3.3 |
| Underline links | `data-underline-links` | sublinha sempre `<a>` | 1.4.1 |
| Larger touch targets | `data-large-targets` | mín. 44×44 em controlos (não links inline) | 2.5.8 |

### Estado de implementação

A camada está **implementada e a correr no protótipo** (painel de demo → secção *Accessibility
Standards*). No DS estão os **primitivos CVD** + a **página de documentação**. Inversão declarada:
a feature foi prototipada primeiro; o DS codifica os valores e documenta o mecanismo.

---

## Dívida conhecida

### `Type/family/*` vive na coleção errada

`Type/family/display` e `Type/family/body` estão em `3. Responsive`, uma coleção cujo eixo de
modos são **breakpoints**. Font-family não varia com o tamanho do ecrã — é modelação errada.

Conceptualmente a família pertence a `2. Skins`, porque o tipo de letra faz parte da identidade
de marca e *poderia* variar por skin.

**Porque não foi corrigido (2026-07-22):** existiam duplicados `Font/family-display` e
`Font/family-body` em `2. Skins`, mas com **zero** ligações. Os 47 text styles ligam todos aos
`Type/family/*` do Responsive. Os duplicados mortos foram apagados; rewirear 47 text styles para
ganhar uma capacidade que ninguém pediu (os 6 skins são todos Montserrat) seria trabalho
especulativo com risco real.

**Gatilho para corrigir:** no momento em que um skin precisar de tipografia própria. Aí migram-se
as famílias para `2. Skins` como migração deliberada, com os text styles a serem re-ligados de uma
só vez.
