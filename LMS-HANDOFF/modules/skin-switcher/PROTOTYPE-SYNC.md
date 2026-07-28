# Sincronizar o protótipo com o DS

Alvo: `https://lms-prototype-mu.vercel.app` · repo ainda não fornecido.

Comparação feita a 2026-07-22 entre o CSS servido em produção e o DS (Figma + `tokens/colors.css`
v3.1). O protótipo **já usa `--sk-*`** — não é migração, é sincronização.

---

## 0. Regra acordada

> DS é o source. Os tokens espelham-se nos dois lados. Um token fundamental que só exista no
> protótipo nasce também no DS.

Aplicada: os solids em falta foram **criados no DS** (ver secção 3). O resto é o protótipo a
alinhar-se com o DS.

---

## 1. Atributo: `data-skin` (resolvido)

O protótipo usa `data-skin`. O DS foi alinhado a `data-skin` (era `data-brand` até v3.0).
**Nenhuma mudança do lado do protótipo.** O `colors.css` v3.1 e o skin-switcher já usam `data-skin`.

---

## 2. Substituir o `:root`/skins do protótipo pelo `colors.css` v3.1

O protótipo define os `--sk-*` no seu próprio CSS, com valores desatualizados e — crucialmente —
**deriva as cores de marca com `color-mix()`** a partir de uma âncora, em vez de usar os passos de
rampa validados. Isso reintroduz bugs que o DS já corrigiu.

**Exemplo concreto do problema:**
```css
/* protótipo, hoje */
--sk-bg-brand-hover: color-mix(in srgb, var(--sk-bg-brand-solid) 72%, #000);  /* DARK */
```
Em dark mode isto **escurece** o hover. O DS define hover = passo 300, que **clareia** — o
comportamento correcto de dark theme. Uma fórmula não sabe disto; um passo de rampa validado sabe.
O mesmo se aplica a `bg-brand-primary`, `bg-brand-section` e `text-brand-primary`, todos derivados
por `color-mix` no protótipo.

**Acção:** substituir os blocos `:root` / `[data-skin=…]` / `[data-theme=…]` do protótipo pelo
conteúdo de `tokens/colors.css` v3.1. Manter os tokens não-cor do protótipo (fontes, etc.).

### Divergências que isto corrige (amostra, modos SKO)

| token | protótipo (hoje) | DS v3.1 |
|---|---|---|
| `text-secondary` (light) | `#606b7a` | `#39414c` |
| `text-tertiary` (light) | `#677482` | `#4f5b69` |
| `text-brand` (light) | `#26708e` | `#215477` |
| `text-error-primary` (light) | `#da3336` | `#b62226` |
| `border-primary` (dark) | `#5b6b78` | `#8995a6` |
| `bg-brand-solid` (dark) | `#3d9bc1` | `#4aa3c7` |
| `bg-error-solid` (dark) | `#cf3b3e` | `#e26567` |
| `bg-overlay` | `#0c1a1f` (opaco) | `#0e1a1f80` (α 50%) |

### Cores de marca por skin

Violet, Red e Ink já batem certo. **Gold e Sky divergem** — o protótipo usa `#ac7720` / `#3685c6`,
o DS usa `#8f621a` / `#2c6ba0`. Adoptar os do DS.

---

## 3. Tokens criados no DS para espelhar o protótipo

O protótipo tinha 4 tokens que o DS não tinha. Avaliação por "fundamental":

| token | veredicto | acção |
|---|---|---|
| `bg-success-solid` | **fundamental** — irmão do `bg-error-solid` | ✅ criado no DS |
| `bg-warning-solid` | **fundamental** — idem | ✅ criado no DS |
| `bg-brand-stage` | derivado, e **com bug** (ver 4) | ✗ não criado — decisão pendente |
| `fg-like` | não fundamental — é `fg-progress` com outro nome | ✗ não criado — usar `fg-progress` |

Os solids trazem também os labels (`fg-success-on-solid`, `fg-warning-on-solid`), que o protótipo
não tinha. **O `warning-solid` do protótipo (`#ac7720`) falhava AA com QUALQUER label** (branco
3.88, escuro 3.95). O DS usa `#f9c654` com label escuro (9.64:1). Adoptar o do DS.

---

## 4. Dois tokens do protótipo — resolvidos (2026-07-22)

**`bg-brand-stage`** — ✅ **criado no DS**, corrigido. O protótipo tinha
`color-mix(in srgb, #26708e 58%, #000)` com o teal **hardcoded**, logo o palco era teal escuro em
todos os skins (bug). No DS segue agora o skin — passo 900 da rampa de cada um — e é **tema-estável**
(palco escuro também em light mode, como um ecrã de cinema, tal como o protótipo pretendia):

| skin | bg-brand-stage |
|---|---|
| SKO | `#044150` (Primary/900) |
| gold | `#472a00` (Gold/900) |
| violet | `#22024d` (Violet/900) |
| sky | `#063050` (Sky/900) |
| red | `#58060f` (Red/900) |
| ink | `#04313d` (Ink/900) |

**Acção no protótipo:** trocar a fórmula `color-mix` por `var(--sk-bg-brand-stage)` (já vem no
`colors.css` v3.1).

**`fg-like`** — resolve para `#0086c9`, exactamente o valor de `fg-progress`. Duplicado semântico,
**não criado no DS**. **Acção no protótipo:** `--sk-fg-like` passa a `var(--sk-fg-progress)`, ou o
botão de "like" usa `--sk-fg-progress` directamente.

---

## 5. Tokens do DS que faltam ao protótipo

Estes 3 existem no DS mas não no protótipo — devem ser adicionados quando o protótipo adoptar o
`colors.css` v3.1 (já lá vêm incluídos):

- `--sk-border-focus-ring` — **WCAG 2.4.7 Focus Visible.** A ausência é um gap de acessibilidade.
- `--sk-fg-error-on-solid`
- `--sk-text-primary-on-brand-hover`

---

## 6. O painel de demo do protótipo

O painel "Demo preview settings" com as bolinhas de skin já existe no protótipo. Ao adoptar o
`colors.css` v3.1, as bolinhas passam a ler as cores certas automaticamente **se** forem pintadas
a partir de `--sk-bg-brand-solid` (como o `skin-switcher.js` deste módulo faz). Se estiverem com
hex escritos no componente, trocar por leitura do token — senão voltam a divergir.

---

## Verificação

Depois de o protótipo adoptar o v3.1, correr o mesmo diff:

```js
// na consola do protótipo — extrai a matriz resolvida
// e compara com tokens/colors.css. Deve dar 0 divergências.
```

Estado do DS a 2026-07-22: 38 tokens LMS, 456 comparações Figma↔CSS sem divergência,
552 verificações de contraste sem falha AA.
