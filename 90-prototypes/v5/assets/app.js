// V5 Prototype app shell
// Renders shared nav + footer, wires tabs, and exposes helpers.
// All pages link to a real destination. Placeholder pages route to coming-soon.html?section=...

(function () {
  // --- Main nav items (left of avatar) ---
  const NAV_ITEMS = [
    { href: "coming-soon.html?section=Dashboard", label: "Dashboard", key: "dashboard" },
    { href: "index.html", label: "My Learning", key: "my-learning" },
    { href: "my-calendar.html", label: "My Calendar", key: "my-calendar" },
    { href: "coming-soon.html?section=Community", label: "Community", key: "community" },
    { href: "coming-soon.html?section=Services", label: "Services", key: "services" },
  ];

  // --- Profile dropdown items ---
  const PROFILE_MENU = [
    { href: "coming-soon.html?section=My+Profile", label: "My Profile", icon: "👤" },
    { href: "coming-soon.html?section=My+Certificates", label: "My Certificates", icon: "🏆" },
    { href: "coming-soon.html?section=My+Shortlist", label: "My Shortlist", icon: "★" },
    { href: "coming-soon.html?section=Notifications", label: "Notifications", icon: "🔔" },
    { href: "coming-soon.html?section=Suporte", label: "Suporte", icon: "💬" },
    { href: "coming-soon.html?section=Settings", label: "Settings", icon: "⚙" },
  ];

  function renderNav(active) {
    const links = NAV_ITEMS.map(item => {
      const isActive = active && active === item.key;
      return `<a class="nav__link ${isActive ? "nav__link--active" : ""}" href="${item.href}">${item.label}</a>`;
    }).join("");

    const dropdown = PROFILE_MENU.map(m => `
      <a class="profile-menu__item" href="${m.href}">
        <span class="profile-menu__icon">${m.icon}</span>
        <span>${m.label}</span>
      </a>
    `).join("");

    const initials = (window.V5_DATA && window.V5_DATA.user && window.V5_DATA.user.initials) || "JS";
    const userName = (window.V5_DATA && window.V5_DATA.user && window.V5_DATA.user.name) || "John Smith";

    return `
      <div class="demo-banner">
        <strong>V5 Prototype</strong> — clickable demo. All data reflects AIDM program syllabus (89h · 7 courses · 279 topics). ${window.V5_DATA ? 'Today: ' + window.V5_DATA.today : ''}
      </div>
      <nav class="nav">
        <div class="nav__inner">
          <a class="nav__logo" href="index.html">SkillUp<span>.</span></a>
          <div class="nav__links">${links}</div>
          <div class="nav__right">
            <div class="profile" data-profile>
              <button class="profile__button" type="button" aria-haspopup="true" aria-expanded="false" data-profile-toggle>
                <span class="nav__avatar">${initials}</span>
                <span class="profile__caret">▾</span>
              </button>
              <div class="profile-menu" data-profile-menu hidden>
                <div class="profile-menu__header">
                  <div class="profile-menu__name">${userName}</div>
                  <div class="profile-menu__email">nvjeronimo@gmail.com</div>
                </div>
                <div class="profile-menu__list">
                  ${dropdown}
                </div>
                <div class="profile-menu__foot">
                  <a class="profile-menu__item profile-menu__item--signout" href="coming-soon.html?section=Sign+out">
                    <span class="profile-menu__icon">↩</span>
                    <span>Sign out</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    return `
      <footer class="footer">
        <div>© 2026 SkillUp LMS. All rights reserved.</div>
        <div class="footer__links">
          <a href="coming-soon.html?section=Privacy+Policy">Privacy Policy</a>
          <a href="coming-soon.html?section=Help+Center">Help Center</a>
          <a href="coming-soon.html?section=Contact+Support">Contact Support</a>
        </div>
      </footer>
    `;
  }

  function mount() {
    const shell = document.querySelector("[data-shell]");
    if (!shell) return;
    const active = shell.dataset.shellActive || "";
    const navHost = document.createElement("div");
    navHost.innerHTML = renderNav(active);
    document.body.prepend(navHost);
    const footerHost = document.createElement("div");
    footerHost.innerHTML = renderFooter();
    document.body.appendChild(footerHost);
  }

  // Profile dropdown toggle + outside-click closes
  function wireProfileDropdown() {
    const wrap = document.querySelector("[data-profile]");
    if (!wrap) return;
    const btn = wrap.querySelector("[data-profile-toggle]");
    const menu = wrap.querySelector("[data-profile-menu]");
    if (!btn || !menu) return;

    function close() {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      wrap.classList.remove("profile--open");
    }
    function open() {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      wrap.classList.add("profile--open");
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.hidden) open(); else close();
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // Tab wiring — elements with [data-tab] show the panel with matching id
  function wireTabs() {
    document.querySelectorAll("[data-tabs]").forEach(group => {
      const tabs = group.querySelectorAll(".tab");
      tabs.forEach(t => {
        t.addEventListener("click", () => {
          const target = t.dataset.tab;
          tabs.forEach(x => x.classList.toggle("tab--active", x === t));
          group.querySelectorAll("[data-panel]").forEach(p => {
            p.hidden = p.dataset.panel !== target;
          });
        });
      });
    });
  }

  // Accordion / expand module
  function wireAccordions() {
    document.querySelectorAll("[data-accordion-toggle]").forEach(btn => {
      btn.addEventListener("click", () => {
        const wrapper = btn.closest("[data-accordion]");
        if (!wrapper) return;
        wrapper.classList.toggle("accordion--open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    wireProfileDropdown();
    wireTabs();
    wireAccordions();
  });

  // Helpers available to pages
  window.V5 = {
    escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
      }[c]));
    },
    topicTypeIcon(type) {
      return {
        Video: "▶",
        Reading: "📄",
        Podcast: "🎧",
        VILT: "🎥",
        Quiz: "✓",
        Lab: "🧪",
        Activity: "✦",
        Project: "📌",
      }[type] || "•";
    },
    // Route helper — every tab label has a canonical destination.
    // Falls back to coming-soon.html?section=<label> for unimplemented tabs.
    tabHref(label, context) {
      const key = label.trim().toLowerCase();
      const map = {
        "courses": { program: "program-detail.html" },
        "modules": { course: "course-detail.html" },
        "live sessions": "live-sessions-upcoming.html",
        "calendar": "my-calendar.html",
      };
      const found = map[key];
      if (!found) return "coming-soon.html?section=" + encodeURIComponent(label);
      if (typeof found === "string") return found;
      if (context && found[context]) return found[context];
      return "coming-soon.html?section=" + encodeURIComponent(label);
    },
  };
})();
