# Skin Switcher

Controlo autónomo de **skin de marca** + **light/dark**. Sem dependências, ~5 KB de JS.

| ficheiro | |
|---|---|
| `skin-switcher.js` | o módulo |
| `skin-switcher.css` | estilos do controlo (só tokens `--sk-*`) |
| `demo.html` | demo + **grelha de revisão visual de todos os tokens** |

---

## O princípio

**Não há nenhuma cor escrita neste módulo.** Nem no JS, nem no CSS, nem na demo.

- A **lista de skins** é descoberta dos selectores `[data-skin="…"]` do `tokens/colors.css`
- A **cor de cada bolinha** é o valor resolvido de `--sk-bg-brand-solid` para esse skin, lido
  do DOM com `getComputedStyle`

Isto não é preciosismo. Se as cores das skins fossem escritas no JS, passariam a existir **três**
cópias da verdade — Figma, `colors.css` e o switcher — e a terceira ia divergir exactamente como
o `colors.css` divergiu do Figma durante meses (ver `../../CHANGELOG.md`, v3.0).

Assim: muda a rampa no Figma → re-exporta o `colors.css` → o switcher acompanha sozinho.
Acrescenta um skin → aparece sozinho. Nunca é preciso tocar neste módulo.

---

## Integrar

```html
<link rel="stylesheet" href="tokens/colors.css">
<link rel="stylesheet" href="modules/skin-switcher/skin-switcher.css">
<div id="skin-switcher"></div>
<script src="modules/skin-switcher/skin-switcher.js"></script>
<script>SkinSwitcher.mount('#skin-switcher');</script>
```

**Evitar o flash** do skin errado ao carregar — colar no `<head>`, **antes** do CSS:

```html
<script>
try {
  var s = localStorage.getItem('sko.skin'), t = localStorage.getItem('sko.theme');
  if (s) document.documentElement.setAttribute('data-skin', s);
  if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
} catch (e) {}
</script>
```

## API

```js
SkinSwitcher.mount('#alvo', { label: 'Brand skin', theme: true })
SkinSwitcher.skins()        // ['', 'gold', 'violet', 'sky', 'red', 'ink']  ('' = SKO)
SkinSwitcher.get()          // { skin: 'ink', theme: 'dark' }
SkinSwitcher.setSkin('ink')
SkinSwitcher.setTheme('dark')
SkinSwitcher.toggleTheme()
SkinSwitcher.token('--sk-text-primary', 'gold', 'dark')   // lê sem aplicar

document.addEventListener('sko:themechange', e => console.log(e.detail))
```

## Acessibilidade

- `role="radiogroup"` + `role="radio"`, com `aria-checked` e roving tabindex
- Setas do teclado navegam entre skins
- Foco visível via `--sk-border-focus-ring` (WCAG 2.4.7) — **não remover o `:focus-visible`**
- Selecção marcada por anel, não por ✓ interior: um ✓ teria de contrastar com 6 cores diferentes
- Alvo de 44px em ecrãs de toque (WCAG 2.5.8); o disco mantém 28px
- Respeita `prefers-reduced-motion`

## Requisitos

O `colors.css` tem de ser servido da **mesma origem**. Stylesheets cross-origin lançam ao aceder
a `cssRules` e a descoberta falha — o módulo avisa na consola se não encontrar skins.

Isto significa que **abrir a demo com `file://` pode não funcionar** em alguns navegadores. Servir
por HTTP:

```bash
cd LMS-HANDOFF && python3 -m http.server 8000
# → http://localhost:8000/modules/skin-switcher/demo.html
```

## Estado de verificação

Verificado: sintaxe JS, resolução de caminhos, e a descoberta contra o `colors.css` real
(encontra os 6 skins, ignora correctamente as 5 variantes dark).

**Não foi executado num browser** — a validação acima é estática. Abre a `demo.html` por HTTP
antes de integrar.
