/* global React, Ic */
const { useState: useStateCD } = React;

function CourseDetail({ onBack, onNav }) {
  const Q = window.Ic || {};
  const [tab, setTab] = useStateCD("Overview");
  const [open, setOpen] = useStateCD("M2");

  return (
    <div className="wrap" data-screen-label="Course Detail" style={{ paddingTop: 0 }}>
      <div className="cd-cover">
        <div className="crumbs">
          <a onClick={() => onNav && onNav("my-learning")}>My Learning</a>
          <span className="arr">{Q.chevR}</span>
          <a onClick={() => onNav && onNav("program-detail")}>AI-Driven Digital Marketing</a>
          <span className="arr">{Q.chevR}</span>
          <span style={{ color: "white" }}>Course 2 · Audience strategy with AI</span>
        </div>
        <div className="head-grid">
          <div>
            <div className="eye">Course 2 of 6 · Cohort A · Apr 2026</div>
            <h1>Audience strategy<br /><em style={{ fontStyle: "italic", fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>with AI.</em></h1>
            <p className="lede">Build segmentation, persona, and channel-fit strategies that hold up to GenAI tooling — without losing the editorial judgment that brand work demands.</p>
            <div className="pf-chips" style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <span className="pf-chip accent" style={{ background: "var(--accent)", color: "var(--ink)", fontWeight: 700, padding: "6px 12px", borderRadius: 999, fontSize: 11 }}>● Live + Flexible</span>
              <span className="pf-chip" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "6px 12px", borderRadius: 999, fontSize: 11 }}>4 modules · 16 lessons</span>
              <span className="pf-chip" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "6px 12px", borderRadius: 999, fontSize: 11 }}>~ 14 hours</span>
            </div>

            <div className="cd-stat-strip">
              <div className="it"><div className="lb">Lessons</div><div className="vl">16</div><div className="sb">8 video · 6 reading · 2 lab</div></div>
              <div className="it"><div className="lb">Live sessions</div><div className="vl">3</div><div className="sb">Q&A + 2 workshops</div></div>
              <div className="it"><div className="lb">Mentor</div><div className="vl">David Chen</div><div className="sb">Replies in 24h</div></div>
              <div className="it"><div className="lb">Assignments</div><div className="vl">2</div><div className="sb">Submission + peer review</div></div>
            </div>
          </div>

          <div className="cd-progress-block">
            <div className="pct-row">
              <span className="pct">38%</span>
              <span className="lb">6 of 16 lessons</span>
            </div>
            <div className="bar"><div className="fl" style={{ width: "38%" }} /></div>
            <button className="resume" onClick={() => onNav && onNav("lesson")}>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span className="lesson">Resume · M2 L3</span>
                <span>Building audience personas with AI</span>
              </span>
              {Q.play}
            </button>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", display: "flex", justifyContent: "space-between" }}>
              <span>● Module 2</span><span>12 min left</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cd-tabs">
        <button className={"cd-tab" + (tab === "Overview" ? " active" : "")} onClick={() => setTab("Overview")}>{Q.book} Overview</button>
        <button className={"cd-tab" + (tab === "Player" ? " active" : "")} onClick={() => setTab("Player")}>{Q.play} Lesson player</button>
        <button className="cd-tab">{Q.grid} Resources</button>
        <button className="cd-tab">{Q.chat} Discussion <span className="n" style={{ fontSize: 10.5, padding: "1px 6px", borderRadius: 999, background: "var(--paper-2)", color: "var(--ink-2)", fontWeight: 700 }}>14</span></button>
        <button className="cd-tab">{Q.trophy} Grade</button>
      </div>

      {tab === "Overview" &&
      <div className="cd-body">
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px" }}>What you'll <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--ink-3)" }}>learn.</em></h2>
            <p style={{ fontSize: 14, color: "var(--ink-2)", marginBottom: 28, lineHeight: 1.6, maxWidth: "70ch" }}>Four modules, sixteen lessons. Each module ends with a graded artifact and a live workshop. Module 4 hands off to your capstone.</p>

            <div className="cd-module done" onClick={() => setOpen(open === "M1" ? null : "M1")}>
              <div className="mh">
                <div className="num">{Q.check}</div>
                <div>
                  <div className="ttl">Module 1 · Foundations of audience-first marketing</div>
                  <div className="meta">4 lessons · 3h 20m · Completed Apr 20</div>
                </div>
                <div className="right">100%<span>{Q.chevR}</span></div>
              </div>
            </div>

            <div className={"cd-module current" + (open === "M2" ? " open" : "")}>
              <div className="mh" onClick={() => setOpen(open === "M2" ? null : "M2")}>
                <div className="num">2</div>
                <div>
                  <div className="ttl">Module 2 · Building audience personas with AI</div>
                  <div className="meta">5 lessons · 4h 10m · 2 of 5 complete · Live Q&A today</div>
                </div>
                <div className="right">38%<span>{Q.chevR}</span></div>
              </div>
              {open === "M2" &&
            <div className="lessons">
                  <div className="cd-lesson">
                    <span className="check">{Q.check}</span>
                    <span className="ttl">L1 · Audience research, then and now</span>
                    <span className="kind">Video</span>
                    <span className="dur">22 min</span>
                  </div>
                  <div className="cd-lesson">
                    <span className="check">{Q.check}</span>
                    <span className="ttl">L2 · GenAI prompt patterns for personas</span>
                    <span className="kind">Reading</span>
                    <span className="dur">18 min</span>
                  </div>
                  <div className="cd-lesson current" onClick={() => onNav && onNav("lesson")}>
                    <span className="check current">●</span>
                    <span className="ttl">L3 · Building audience personas with AI</span>
                    <span className="kind">Video</span>
                    <span className="dur">28 min</span>
                  </div>
                  <div className="cd-lesson">
                    <span className="check todo">○</span>
                    <span className="ttl">L4 · Cross-channel funnels with GenAI</span>
                    <span className="kind">Lab</span>
                    <span className="dur">45 min</span>
                  </div>
                  <div className="cd-lesson">
                    <span className="check todo">○</span>
                    <span className="ttl">L5 · Live Q&A with David Chen</span>
                    <span className="kind">Live</span>
                    <span className="dur">30 min</span>
                  </div>
                </div>
            }
            </div>

            <div className="cd-module" onClick={() => setOpen(open === "M3" ? null : "M3")}>
              <div className="mh">
                <div className="num">3</div>
                <div>
                  <div className="ttl">Module 3 · Channel mix and creative tests</div>
                  <div className="meta">4 lessons · 3h 15m · Locks Apr 28</div>
                </div>
                <div className="right" style={{ color: "var(--ink-4)" }}>{Q.lock}<span>{Q.chevR}</span></div>
              </div>
            </div>

            <div className="cd-module" onClick={() => setOpen(open === "M4" ? null : "M4")}>
              <div className="mh">
                <div className="num">4</div>
                <div>
                  <div className="ttl">Module 4 · Capstone framing</div>
                  <div className="meta">3 lessons · 2h 50m · Hands off to capstone</div>
                </div>
                <div className="right" style={{ color: "var(--ink-4)" }}>{Q.lock}<span>{Q.chevR}</span></div>
              </div>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "40px 0 14px" }}>Assignments <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--ink-3)" }}>· 2 graded</em></h2>
            <div className="dash-due-list">
              <div className="dash-due-row">
                <div className="when urgent"><div className="day">26</div><div className="mo">Fri</div></div>
                <div className="body">
                  <div className="ttl">Assignment 02 · Audience segmentation write-up</div>
                  <div className="meta">350 words + quiz · Module 2 · Submit by 11:59 PM</div>
                </div>
                <span className="pill due">Due Fri</span>
              </div>
              <div className="dash-due-row">
                <div className="when"><div className="day">10</div><div className="mo">May</div></div>
                <div className="body">
                  <div className="ttl">Assignment 03 · Channel-fit recommendation memo</div>
                  <div className="meta">600 words + 1 figure · Module 3 · Peer reviewed</div>
                </div>
                <span className="pill opt">Module 3</span>
              </div>
            </div>
          </div>

          <aside className="det-aside">
            <div className="det-aside-card dark">
              <h4>Mentor</h4>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--accent)", color: "var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>DC</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>David Chen</div>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>Agile Coach · ex-Spotify</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, marginBottom: 14 }}>Office hours every Tuesday at 11 AM. Replies in discussion within 24 hours on weekdays.</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "9px 14px", fontSize: 12 }}>Book session</button>
                <button className="btn-ghost" style={{ flex: 1, justifyContent: "center", background: "rgba(255,255,255,0.08)", color: "white", borderColor: "rgba(255,255,255,0.2)", padding: "9px 14px", fontSize: 12 }}>Message</button>
              </div>
            </div>

            <div className="det-aside-card">
              <h4>Resources</h4>
              <div style={{ display: "flex", flexDirection: "column", fontSize: 12.5 }}>
                <div style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)", display: "flex", justifyContent: "space-between", color: "var(--ink-2)", cursor: "pointer" }}>Persona research template <span style={{ color: "var(--ink-3)", fontSize: 10.5, letterSpacing: "0.1em" }}>FIGMA</span></div>
                <div style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)", display: "flex", justifyContent: "space-between", color: "var(--ink-2)", cursor: "pointer" }}>Module 2 prompt library <span style={{ color: "var(--ink-3)", fontSize: 10.5, letterSpacing: "0.1em" }}>DOC</span></div>
                <div style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)", display: "flex", justifyContent: "space-between", color: "var(--ink-2)", cursor: "pointer" }}>"AI for Audience Strategy" reading <span style={{ color: "var(--ink-3)", fontSize: 10.5, letterSpacing: "0.1em" }}>PDF · 12p</span></div>
                <div style={{ padding: "9px 0", display: "flex", justifyContent: "space-between", color: "var(--ink-2)", cursor: "pointer" }}>Slack channel · #cohort-a-m2 <span style={{ color: "var(--ink-3)", fontSize: 10.5, letterSpacing: "0.1em" }}>SLACK</span></div>
              </div>
            </div>

            <div className="det-aside-card">
              <h4>Cohort attendance</h4>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {[1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 0, 2].map((s, i) =>
              <div key={i} style={{
                width: 22, height: 22, borderRadius: 6,
                background: s === 1 ? "var(--green-1)" : s === 0 ? "var(--red-soft)" : "var(--paper-2)",
                color: s === 1 ? "white" : s === 0 ? "var(--red-2)" : "var(--ink-3)",
                fontSize: 11, fontWeight: 700,
                display: "inline-flex", alignItems: "center", justifyContent: "center"
              }}>
                    {s === 1 ? "✓" : s === 0 ? "·" : ""}
                  </div>
              )}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>4 of 5 attended · 80%</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>Need 75%+ for cohort certificate</div>
            </div>
          </aside>
        </div>
      }

      {tab === "Player" &&
      <div className="cd-body">
          <div>
            <div className="cd-player">
              <div className="play-cta">
                <div className="meta">Module 2 · Lesson 3 · 28 min</div>
                <div className="ttl">Building audience personas with AI</div>
                <div className="play-btn">{Q.play}</div>
              </div>
              <div className="ctrl-bar">
                <span style={{ fontWeight: 700 }}>{Q.play}</span>
                <span>9:42</span>
                <div className="scrub"><div className="fl" /></div>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>28:00</span>
                <span style={{ padding: "2px 8px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>1.0×</span>
                <span style={{ padding: "2px 8px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>CC</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>Module 2 · Lesson 3</div>
                <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: "6px 0 0" }}>Building audience personas with AI</h2>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-ghost">{Q.chevL} Previous</button>
                <button className="btn-primary">Next lesson {Q.arrow}</button>
              </div>
            </div>

            <div className="cd-transcript">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <h4>Transcript</h4>
                <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Click any line to jump to that timestamp</span>
              </div>
              <div className="cd-transcript-row">
                <span className="ts">00:00</span>
                <div className="text">In the last lesson we walked through prompt patterns for personas — today we're going to actually build one, end-to-end, using a real B2B fintech as our example.</div>
              </div>
              <div className="cd-transcript-row">
                <span className="ts">02:14</span>
                <div className="text">The first thing I want you to notice is how much input quality matters. The persona is only as good as the source material you feed in.</div>
              </div>
              <div className="cd-transcript-row active">
                <span className="ts">04:38</span>
                <div className="text">So we'll start by pulling three things: customer interview transcripts, support ticket exports, and the last 90 days of sales call recordings. Notice we're not feeding in the website copy.</div>
              </div>
              <div className="cd-transcript-row">
                <span className="ts">07:21</span>
                <div className="text">Now here's the prompt I use — it's deliberately structured. We're asking the model to extract jobs-to-be-done first, then triangulate emotional drivers, then synthesize a persona last.</div>
              </div>
              <div className="cd-transcript-row">
                <span className="ts">10:55</span>
                <div className="text">Let's run it. I'm going to drop the transcripts into Claude with the system prompt I just showed you, and we'll see what comes back.</div>
              </div>
            </div>
          </div>

          <aside className="det-aside">
            <div className="det-aside-card">
              <h4>In this module</h4>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="cd-lesson" style={{ padding: "9px 0", gridTemplateColumns: "20px 1fr auto" }}>
                  <span className="check">{Q.check}</span>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>L1 · Audience research, then and now</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>22m</span>
                </div>
                <div className="cd-lesson" style={{ padding: "9px 0", gridTemplateColumns: "20px 1fr auto" }}>
                  <span className="check">{Q.check}</span>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>L2 · Prompt patterns for personas</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>18m</span>
                </div>
                <div className="cd-lesson current" style={{ padding: "9px 0", gridTemplateColumns: "20px 1fr auto" }}>
                  <span className="check current">●</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>L3 · Building personas with AI</span>
                  <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>28m</span>
                </div>
                <div className="cd-lesson" style={{ padding: "9px 0", gridTemplateColumns: "20px 1fr auto" }}>
                  <span className="check todo">○</span>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>L4 · Cross-channel funnels</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>45m</span>
                </div>
                <div className="cd-lesson" style={{ padding: "9px 0", gridTemplateColumns: "20px 1fr auto" }}>
                  <span className="check todo">○</span>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>L5 · Live Q&A · David Chen</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>30m</span>
                </div>
              </div>
            </div>

            <div className="det-aside-card">
              <h4>My notes</h4>
              <div style={{ background: "var(--paper-2)", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, fontFamily: "ui-serif, Georgia, serif", minHeight: 90 }}>
                <i>Don't feed in website copy</i> — too synthesized. Better signal: interview transcripts &gt; tickets &gt; calls.
              </div>
              <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10, padding: "8px 14px", fontSize: 12 }}>+ Add note at 4:38</button>
            </div>

            <div className="det-aside-card">
              <h4>Quick actions</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                <button className="btn-ghost" style={{ justifyContent: "flex-start" }}>{Q.book} Open prompt library</button>
                <button className="btn-ghost" style={{ justifyContent: "flex-start" }}>{Q.chat} Ask in #cohort-a-m2</button>
                <button className="btn-ghost" style={{ justifyContent: "flex-start" }}>{Q.cal} Add to calendar</button>
              </div>
            </div>
          </aside>
        </div>
      }
    </div>);

}

window.CourseDetail = CourseDetail;
