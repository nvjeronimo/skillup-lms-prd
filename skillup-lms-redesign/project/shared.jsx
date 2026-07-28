/* global React */
const { useState, useMemo, useEffect, useRef } = React;

/* ============ ICONS ============ */
const I = {
  chevR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  chevL: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  chevD: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  chevU: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 15l6-6 6 6"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  moon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 13l4 4L19 7"/></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  play: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M7 5v14l12-7z"/></svg>,
  book: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 4v12"/><path d="M18 8l2-1v13"/></svg>,
  cert: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></svg>,
  users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1A4 4 0 0 1 16 11"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  cal: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></svg>,
  share: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>,
  message: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>,
  flag: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>,
  target: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
  help: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>,
  x: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  upvote: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5l7 7h-4v7h-6v-7H5z"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
};

/* ============ UTILS ============ */
// Deterministic hash -> hue
function hashHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}

/* ============ COURSE TILE (abstract gradient art) ============ */
function CourseTile({ title, size = "md", style: styleName = "gradient", glyph }) {
  const hue = hashHue(title);
  const hue2 = (hue + 40) % 360;
  let bg;
  if (styleName === "gradient") {
    bg = `
      radial-gradient(120% 90% at 15% 10%, oklch(78% 0.14 ${hue}) 0%, oklch(62% 0.17 ${hue}) 35%, oklch(44% 0.18 ${hue2}) 100%)
    `;
  } else if (styleName === "dots") {
    bg = `
      radial-gradient(circle at 25% 25%, oklch(70% 0.16 ${hue}) 0%, oklch(48% 0.17 ${hue2}) 100%),
      radial-gradient(oklch(100% 0 0 / 0.18) 2px, transparent 2px) 0 0 / 12px 12px
    `;
  } else if (styleName === "waves") {
    bg = `
      linear-gradient(140deg, oklch(72% 0.16 ${hue}), oklch(52% 0.17 ${hue2})),
      repeating-linear-gradient(135deg, oklch(100% 0 0 / 0.06) 0 10px, transparent 10px 20px)
    `;
  } else if (styleName === "mono") {
    bg = `linear-gradient(140deg, oklch(30% 0.02 50), oklch(18% 0.02 50))`;
  }
  const cls = "tile " + (size === "sm" ? "tile-sm" : size === "lg" ? "tile-lg" : "");
  return (
    <div className={cls} style={{ background: bg, backgroundBlendMode: styleName === "dots" ? "overlay, normal" : "normal" }}>
      {glyph && <div className="tile-glyph">{glyph}</div>}
    </div>
  );
}

/* ============ RING ============ */
function Ring({ value, size = 44, done = false }) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div className="ring" style={{ "--size": size + "px" }}>
      <svg>
        <circle className="track" cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={4} />
        <circle className={"fill" + (done ? " done" : "")} cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={4} strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div className="ring-label">{done ? "✓" : `${value}%`}</div>
    </div>
  );
}

/* ============ SEGMENTED PROGRESS ============ */
function SegBar({ segments }) {
  // segments: array of {state: 'done'|'active'|'upcoming'|'locked', progress?: 0-1}
  return (
    <div className="segbar">
      {segments.map((s, i) => (
        <div
          key={i}
          className={"seg " + (s.state || "upcoming")}
          style={s.state === "active" && s.progress != null ?
            { background: `linear-gradient(90deg, var(--accent) ${Math.round(s.progress*100)}%, var(--surface-3) ${Math.round(s.progress*100)}%)` }
            : undefined}
          title={s.label || ""}
        />
      ))}
    </div>
  );
}

/* ============ LIVE BANNER ============ */
function LiveBanner({ session, onJoin, endsInMin = 37 }) {
  return (
    <div className="live-banner">
      <div className="lb-main">
        <div className="lb-title">
          <span>{session.title}</span>
          <span className="live-pill">LIVE NOW</span>
        </div>
        <div className="lb-sub">{session.context}</div>
      </div>
      <div className="lb-side">
        <span className="lb-countdown">Ends at {session.endsAt}</span>
        <button className="btn btn-primary" onClick={onJoin}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--rose)", boxShadow: "0 0 8px var(--rose)" }} />
          Join Live Now
        </button>
      </div>
    </div>
  );
}

/* ============ TOP NAV ============ */
function TopNav({ active, onNav }) {
  const items = ["Dashboard", "My Learning", "My Calendar", "Discussion", "Services"];
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); onNav("Dashboard"); }}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">SkillUp</span>
          <span className="brand-tag">LMS</span>
        </a>
        <div className="topnav-links">
          {items.map(it => (
            <button key={it} className={"navlink" + (active === it ? " active" : "")} onClick={() => onNav(it)}>{it}</button>
          ))}
        </div>
        <div className="topnav-right">
          <button className="icon-btn" aria-label="Theme"><I.moon width="18" height="18" /></button>
          <button className="icon-btn" aria-label="Notifications">
            <I.bell width="18" height="18" />
            <span className="dot" />
          </button>
          <button className="user-chip">
            <span className="avatar">JS</span>
            <span className="user-info">
              <span className="user-name">John Smith</span>
              <span className="user-role">Learner</span>
            </span>
            <I.chevD width="14" height="14" style={{ color: "var(--ink-3)" }} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <div className="footer">
      <div>© 2026 SkillUp LMS. All rights reserved.</div>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Help Center</a>
        <a href="#">Contact Support</a>
      </div>
    </div>
  );
}

/* Export to window */
Object.assign(window, { I, hashHue, CourseTile, Ring, SegBar, LiveBanner, TopNav, Footer });
