/* global React, I */
const { useState: useStateI, useMemo: useMemoI } = React;

function Immersive({ onClose }) {
  const [contentTab, setContentTab] = useStateI("Q&A");
  const [openModule, setOpenModule] = useStateI(2); // SEO module (idx 2)

  const modules = [
    { idx: 1, title: "Digital Marketing Foundations", state: "done", lessons: 4, topics: 10, note: "Completed" },
    { idx: 2, title: "SEO & Organic Search Strategies", state: "active", lessons: 3, topics: 10, progress: 80, sub: "3 lessons · 8 of 10 topics · 80%", children: [
      { idx: 1, title: "Lesson 1: SEO foundations", state: "done", sub: "4 topics · completed" },
      { idx: 2, title: "Lesson 2: On-page and technical SEO", state: "done", sub: "3 topics · completed" },
      { idx: 3, title: "Lesson 3: Applied SEO practice", state: "active", sub: "IN PROGRESS · 1 of 3 topics complete", topics: [
        { kind: "READ", title: "Case study · Shopify SEO playbook", meta: "12 min", state: "done" },
        { kind: "VILT", title: "Agile Coach Q&A with David Chen", meta: "60 min · ends 4:30 PM ET", state: "active", live: true },
        { kind: "LAB", title: "Audit a site's on-page SEO", meta: "45 min", state: "upcoming" },
      ]}
    ]},
    { idx: 3, title: "Paid Media and Performance Marketing", state: "upcoming", lessons: 4, topics: 12, note: "Starts Jun 3" },
    { idx: 4, title: "Analytics and Conversion Optimization", state: "upcoming", lessons: 3, topics: 6, note: "Starts Jul 8" },
  ];

  const questions = [
    { votes: 14, name: "Mariana S.", avatar: "M", time: "2 min ago", text: "How do you balance short-term paid ads with long-term organic SEO investment?", answered: true },
    { votes: 9, name: "Dev P.", avatar: "D", time: "5 min ago", text: "What is your take on keyword cannibalization inside a content cluster?" },
    { votes: 22, name: "Priya K.", avatar: "P", time: "7 min ago", text: "How should small teams prioritize technical SEO vs content SEO?", answered: true },
    { votes: 7, name: "Kaito R.", avatar: "K", time: "12 min ago", text: "When GEO results diverge from Google, whose intent do you optimize for first?" },
  ];

  return (
    <div className="immersive-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="immersive">
        <div className="immersive-top">
          <div className="crumbs">
            <a href="#">AI-Driven Digital Marketing</a>
            <I.chevR width="12" height="12" />
            <a href="#">Digital Marketing Fundamentals</a>
            <I.chevR width="12" height="12" />
            <span className="current">Lesson 3: Applied SEO practice</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><I.x width="18" height="18" /></button>
        </div>

        <div className="immersive-body">
          <div className="immersive-main">
            {/* Stage */}
            <div className="stage">
              <div className="stage-head">
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: "oklch(98% 0.005 70)" }}>
                    VILT: Agile Coach Q&A with David Chen
                  </div>
                  <div style={{ color: "oklch(78% 0.02 70)", fontSize: 12.5, marginTop: 4 }}>
                    60 min · Live attendance required · ends 4:30 PM ET
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="live-now-pill"><span className="led" />LIVE NOW · ENDS IN 37 MIN</span>
                  <span className="attendance-pill">Attendance required</span>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "oklch(74% 0.02 70)", textAlign: "right", marginTop: 6, position: "relative", zIndex: 1 }}>
                Lesson 3: Applied SEO practice
              </div>

              <div className="stage-center">
                <div className="stage-avatar">DC</div>
                <h3 className="stage-title">Agile Coach Q&A</h3>
                <div className="stage-sub">David Chen · 23 min elapsed · 142 learners attending</div>
                <button className="btn btn-sage" style={{ padding: "11px 22px", fontSize: 14 }}>
                  Join Live Session →
                </button>

                {/* Live timeline */}
                <div style={{ width: "min(540px, 90%)", marginTop: 14 }}>
                  <div style={{ height: 4, borderRadius: 999, background: "oklch(100% 0 0 / 0.12)", position: "relative", overflow: "hidden" }}>
                    <div style={{
                      position: "absolute", left: 0, top: 0, bottom: 0,
                      width: "38%",
                      background: "linear-gradient(90deg, oklch(70% 0.15 155), oklch(62% 0.12 175))",
                      borderRadius: 999
                    }} />
                    <div style={{
                      position: "absolute", left: "38%", top: -3, bottom: -3, width: 10,
                      background: "oklch(80% 0.15 155)",
                      borderRadius: "50%",
                      boxShadow: "0 0 12px oklch(70% 0.15 155)"
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "oklch(68% 0.02 70)", marginTop: 6 }}>
                    <span>Started 3:30 PM</span>
                    <span>23 of 60 min</span>
                    <span>Ends 4:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content tabs */}
            <div className="content-tabs">
              {[
                { k: "Transcript" },
                { k: "Resources", count: 3 },
                { k: "Notes", count: 12 },
                { k: "Q&A", count: 23 },
              ].map(t => (
                <button key={t.k} className={"tab" + (contentTab === t.k ? " active" : "")} onClick={() => setContentTab(t.k)}>
                  {t.k} {t.count != null && <span className="count">{t.count}</span>}
                </button>
              ))}
            </div>

            <div className="content-panels">
              {contentTab === "Q&A" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <div className="h3">Live Q&A</div>
                      <div className="sub" style={{ fontSize: 12 }}>23 questions · Upvote to boost · David picks from the top</div>
                    </div>
                    <button className="btn btn-outline btn-sm"><I.plus width="12" height="12" /> Ask a question</button>
                  </div>
                  {questions.map((q, i) => <QARow key={i} q={q} />)}
                </div>
              )}
              {contentTab === "Transcript" && (
                <div className="card" style={{ padding: 20, color: "var(--ink-2)", lineHeight: 1.7 }}>
                  <div className="meta" style={{ marginBottom: 10 }}>Live transcript · auto-captioned</div>
                  <p style={{ margin: 0 }}><strong>David Chen (3:31 PM):</strong> Welcome everyone — today we're unpacking applied SEO. I want to spend the first ten minutes on intent mapping before we get hands-on with audits.</p>
                  <p><strong>David Chen (3:34 PM):</strong> Think of keyword research not as a list-making exercise, but as reverse-engineering what a real human is trying to accomplish at a specific moment.</p>
                  <p style={{ color: "var(--ink-3)", fontStyle: "italic" }}>Transcript continues — captions update live.</p>
                </div>
              )}
              {contentTab === "Resources" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { t: "Shopify SEO playbook", k: "PDF · 24 pages" },
                    { t: "On-page SEO checklist", k: "Workbook · .docx" },
                    { t: "Search intent taxonomy", k: "Slide deck · 18 slides" },
                  ].map((r, i) => (
                    <div key={i} className="card card-hover" style={{ padding: 16 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent-soft)", color: "var(--accent-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <I.doc width="18" height="18" />
                      </div>
                      <div style={{ fontWeight: 600, marginTop: 10 }}>{r.t}</div>
                      <div className="sub" style={{ fontSize: 12 }}>{r.k}</div>
                    </div>
                  ))}
                </div>
              )}
              {contentTab === "Notes" && (
                <div className="card" style={{ padding: 20 }}>
                  <div className="meta" style={{ marginBottom: 10 }}>My notes · auto-saved</div>
                  <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: "var(--ink-2)" }}>
                    <li>David's framing: intent first, keyword second.</li>
                    <li>Cluster strategy: one hub page + 5–8 spokes, cross-linked.</li>
                    <li>Action: audit our top 20 landing pages next week.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="immersive-foot">
              <button className="btn btn-ghost btn-sm"><I.chevL width="14" height="14" /> Previous topic</button>
              <div className="lesson-chips">
                <span style={{ color: "var(--ink-3)", fontSize: 12 }}>Lesson 3:</span>
                <span className="chip-sm done"><I.check width="10" height="10" /> READ</span>
                <span className="chip-sm active">● VILT · LIVE</span>
                <span className="chip-sm locked">LAB</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <button className="btn btn-outline btn-sm" disabled style={{ opacity: 0.55, pointerEvents: "none" }}>Next topic <I.chevR width="12" height="12" /></button>
              </div>
            </div>
          </div>

          {/* Course rail */}
          <aside className="immersive-rail">
            <div className="rail-head">
              <span className="meta">Course journey</span>
              <span className="sub" style={{ fontSize: 11 }}>1/4 modules · 36 topics</span>
            </div>
            {modules.map(m => (
              <ModuleNode key={m.idx} m={m} open={openModule === m.idx} onToggle={() => setOpenModule(openModule === m.idx ? -1 : m.idx)} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

function QARow({ q }) {
  return (
    <div className="qa-row">
      <div className="qa-votes">
        <button className="vbtn" aria-label="Upvote"><I.upvote width="16" height="16" /></button>
        <span className="count">{q.votes}</span>
      </div>
      <div>
        <div className="qa-asker">
          <span className="ava">{q.avatar}</span>
          <span style={{ fontWeight: 600, color: "var(--ink-2)" }}>{q.name}</span>
          <span>· {q.time}</span>
          {q.answered && <span className="badge badge-sage" style={{ marginLeft: 4 }}><I.check width="10" height="10" /> Answered</span>}
        </div>
        <div className="qa-text">{q.text}</div>
      </div>
      <div />
    </div>
  );
}

function ModuleNode({ m, open, onToggle }) {
  const idxCls = m.state === "done" ? "done" : m.state === "active" ? "active" : "";
  return (
    <div className={"rail-mod" + (m.state === "active" ? " active" : "")}>
      <div className="rail-mod-head" onClick={onToggle}>
        <div className={"rail-mod-idx " + idxCls}>
          {m.state === "done" ? <I.check width="12" height="12" /> : m.idx}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>{m.title}</div>
          <div className="sub" style={{ fontSize: 11.5 }}>
            {m.sub || (m.lessons + " lessons · " + m.topics + " topics · " + (m.note || ""))}
          </div>
        </div>
        {m.children && (open ? <I.chevU width="14" height="14" style={{ color: "var(--ink-3)" }} /> : <I.chevD width="14" height="14" style={{ color: "var(--ink-3)" }} />)}
      </div>
      {open && m.children && (
        <div className="rail-mod-body">
          {m.children.map((l, i) => (
            <div key={i} className="rail-lesson" style={{ flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
                <span className={"idx " + (l.state === "done" ? "done" : l.state === "active" ? "active" : "")}>
                  {l.state === "done" ? <I.check width="10" height="10" /> : ""}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--ink)" }}>{l.title}</div>
                  <div className="sub" style={{ fontSize: 11 }}>{l.sub}</div>
                </div>
              </div>
              {l.topics && (
                <div style={{ marginLeft: 28, marginTop: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                  {l.topics.map((t, j) => (
                    <div key={j} className={"rail-topic" + (t.state === "active" ? " active" : "")}>
                      {t.state === "done"
                        ? <span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--sage)", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I.check width="8" height="8" /></span>
                        : t.state === "active"
                          ? <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} /></span>
                          : <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--border-2)" }} />}
                      <span className={"kind kind-" + t.kind.toLowerCase()}>{t.kind}</span>
                      <span style={{ flex: 1, fontWeight: t.state === "active" ? 600 : 500, color: t.state === "upcoming" ? "var(--ink-3)" : "var(--ink)" }}>{t.title}</span>
                      {t.live && <span className="live-pill" style={{ fontSize: 9, padding: "2px 7px" }}>LIVE</span>}
                      <span className="sub" style={{ fontSize: 10.5 }}>{t.meta}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Immersive });
