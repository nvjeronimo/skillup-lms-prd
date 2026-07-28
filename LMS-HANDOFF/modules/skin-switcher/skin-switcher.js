/* ============================================================================
   SKO Design System — Skin Switcher
   Módulo autónomo. Sem dependências. ~5 KB.

   PRINCÍPIO: este ficheiro não contém nenhuma cor.

   As skins são DESCOBERTAS a partir do `tokens/colors.css` (selectores
   `[data-skin="…"]`), e a cor de cada bolinha é lida do token resolvido
   `--sk-bg-brand-solid`. Não há lista de skins nem hex em JS.

   Consequência: acrescenta um skin ao colors.css e ele aparece aqui sozinho.
   Muda uma rampa no Figma → re-exporta o CSS → o switcher acompanha.
   Nunca é preciso tocar neste ficheiro.

   USO
     <link rel="stylesheet" href="tokens/colors.css">
     <link rel="stylesheet" href="modules/skin-switcher/skin-switcher.css">
     <script src="modules/skin-switcher/skin-switcher.js"></script>
     <script>SkinSwitcher.mount('#skin-switcher');</script>

   API
     SkinSwitcher.mount(target, opts)   → renderiza o controlo
     SkinSwitcher.skins()               → ['', 'gold', 'violet', …]  ('' = SKO)
     SkinSwitcher.get()                 → { skin, theme }
     SkinSwitcher.setSkin('ink')        → aplica e persiste
     SkinSwitcher.setTheme('dark')      → 'light' | 'dark'
     SkinSwitcher.toggleTheme()
     SkinSwitcher.token('--sk-…', skin, theme) → valor resolvido, sem aplicar

   EVENTO
     document.addEventListener('sko:themechange', e => e.detail) // {skin, theme}
   ============================================================================ */
(function (global) {
  'use strict';

  var ATTR_BRAND  = 'data-skin';
  var ATTR_THEME  = 'data-theme';
  var KEY_SKIN    = 'sko.skin';
  var KEY_THEME   = 'sko.theme';
  var SWATCH_TOKEN = '--sk-bg-brand-solid';
  var DEFAULT_LABEL = 'SKO';

  var root = document.documentElement;

  /* ---------- descoberta ---------------------------------------------------
     Varre as stylesheets à procura de `[data-skin="x"]` exactamente — ignora
     `[data-skin="x"][data-theme="dark"]`, que é o mesmo skin noutro modo.
     Stylesheets cross-origin lançam ao aceder a cssRules; são saltadas. */
  function discoverSkins() {
    var found = [];
    var sheets = Array.prototype.slice.call(document.styleSheets);
    for (var i = 0; i < sheets.length; i++) {
      var rules;
      try { rules = sheets[i].cssRules; } catch (e) { continue; }
      if (!rules) continue;
      for (var j = 0; j < rules.length; j++) {
        var sel = rules[j].selectorText;
        if (!sel) continue;
        var m = /^\[data-skin="([^"]+)"\]$/.exec(sel.trim());
        // "teal" é o alias explícito do SKO (reset de marca), não um skin distinto —
        // o SKO já é representado por '' (default de :root). Ignorar para não duplicar.
        if (m && m[1] !== 'teal' && found.indexOf(m[1]) === -1) found.push(m[1]);
      }
    }
    return found;
  }

  var _skins = null;
  function skins() {
    if (_skins === null) _skins = [''].concat(discoverSkins()); // '' = SKO, o default de :root
    return _skins.slice();
  }

  /* ---------- leitura de tokens sem aplicar --------------------------------
     Cria um nó fora de ecrã com os atributos pedidos e lê o valor computado.
     É assim que a bolinha fica a *ser* o token em vez de o copiar. */
  function token(name, skin, theme) {
    var probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
    // Sempre marcar data-skin — para SKO (skin '') usar o alias "teal" que reseta
    // os tokens de marca. Sem isto, o probe do SKO herdaria o skin activo do
    // documento e liaa a cor errada (o bug clássico do primeiro swatch).
    probe.setAttribute(ATTR_BRAND, skin || 'teal');
    // o tema TEM de ser explícito no probe: sem ele, o bloco light do skin
    // sobrepõe-se aos valores dark herdados e a leitura sai errada
    if ((theme || currentTheme()) === 'dark') probe.setAttribute(ATTR_THEME, 'dark');
    (document.body || root).appendChild(probe);
    var value = getComputedStyle(probe).getPropertyValue(name).trim();
    probe.parentNode.removeChild(probe);
    return value;
  }

  /* ---------- estado -------------------------------------------------------- */
  function currentSkin()  { return root.getAttribute(ATTR_BRAND) || ''; }
  function currentTheme() { return root.getAttribute(ATTR_THEME) === 'dark' ? 'dark' : 'light'; }
  function get() { return { skin: currentSkin(), theme: currentTheme() }; }

  function store(key, value) {
    try { value ? localStorage.setItem(key, value) : localStorage.removeItem(key); } catch (e) {}
  }
  function restore(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function emit() {
    document.dispatchEvent(new CustomEvent('sko:themechange', { detail: get() }));
  }

  function setSkin(skin) {
    skin = skin || '';
    if (skin && skins().indexOf(skin) === -1) {
      console.warn('[SkinSwitcher] skin desconhecido: "' + skin + '". Disponíveis: ' + skins().join(', '));
      return;
    }
    skin ? root.setAttribute(ATTR_BRAND, skin) : root.removeAttribute(ATTR_BRAND);
    store(KEY_SKIN, skin);
    render();
    emit();
  }

  function setTheme(theme) {
    theme === 'dark' ? root.setAttribute(ATTR_THEME, 'dark') : root.removeAttribute(ATTR_THEME);
    store(KEY_THEME, theme === 'dark' ? 'dark' : '');
    render();
    emit();
  }

  function toggleTheme() { setTheme(currentTheme() === 'dark' ? 'light' : 'dark'); }

  /* ---------- restauro ------------------------------------------------------
     Para evitar flash, replica isto inline no <head>, antes do CSS:
       <script>try{var s=localStorage.getItem('sko.skin'),t=localStorage.getItem('sko.theme');
       if(s)document.documentElement.setAttribute('data-skin',s);
       if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}</script> */
  function restoreState() {
    var s = restore(KEY_SKIN), t = restore(KEY_THEME);
    if (s) root.setAttribute(ATTR_BRAND, s);
    if (t === 'dark') root.setAttribute(ATTR_THEME, 'dark');
  }

  /* ---------- UI ------------------------------------------------------------ */
  var mounts = [];

  function label(skin) {
    return skin ? skin.charAt(0).toUpperCase() + skin.slice(1) : DEFAULT_LABEL;
  }

  function render() {
    for (var i = 0; i < mounts.length; i++) paint(mounts[i]);
  }

  function paint(m) {
    var active = currentSkin();
    var theme = currentTheme();
    for (var i = 0; i < m.swatches.length; i++) {
      var b = m.swatches[i];
      var skin = b.getAttribute('data-skin-value');
      var on = skin === active;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      // a cor vem do token resolvido — nunca de uma constante
      b.style.setProperty('--swatch', token(SWATCH_TOKEN, skin, theme));
    }
    if (m.themeBtn) {
      var dark = theme === 'dark';
      m.themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      m.themeBtn.textContent = dark ? '☾  Dark' : '☀  Light';
    }
  }

  function onKeydown(m, e) {
    var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    var list = skins();
    var idx = list.indexOf(currentSkin());
    var next = (idx + keys[e.key] + list.length) % list.length;
    setSkin(list[next]);
    var el = m.swatches[next];
    if (el) el.focus();
  }

  function mount(target, opts) {
    opts = opts || {};
    var host = typeof target === 'string' ? document.querySelector(target) : target;
    if (!host) { console.warn('[SkinSwitcher] alvo não encontrado:', target); return null; }

    var list = skins();
    if (list.length <= 1) {
      console.warn('[SkinSwitcher] nenhum skin descoberto. O tokens/colors.css está carregado ' +
                   'e na mesma origem? Stylesheets cross-origin não são legíveis.');
    }

    host.innerHTML = '';
    host.classList.add('sk-switcher');

    var group = document.createElement('div');
    group.className = 'sk-switcher__skins';
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', opts.label || 'Brand skin');

    var m = { host: host, swatches: [], themeBtn: null };

    for (var i = 0; i < list.length; i++) {
      (function (skin) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sk-switcher__swatch';
        b.setAttribute('role', 'radio');
        b.setAttribute('data-skin-value', skin);
        b.setAttribute('aria-label', label(skin));
        b.title = label(skin);
        b.addEventListener('click', function () { setSkin(skin); });
        b.addEventListener('keydown', function (e) { onKeydown(m, e); });
        group.appendChild(b);
        m.swatches.push(b);
      })(list[i]);
    }
    host.appendChild(group);

    if (opts.theme !== false) {
      var t = document.createElement('button');
      t.type = 'button';
      t.className = 'sk-switcher__theme';
      t.addEventListener('click', toggleTheme);
      host.appendChild(t);
      m.themeBtn = t;
    }

    mounts.push(m);
    paint(m);
    return m;
  }

  restoreState();

  global.SkinSwitcher = {
    mount: mount, skins: skins, get: get, token: token,
    setSkin: setSkin, setTheme: setTheme, toggleTheme: toggleTheme
  };
})(window);
