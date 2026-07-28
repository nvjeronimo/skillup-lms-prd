/* global React, Ic */

function Certificates() {
  const Q = window.Ic || {};

  return (
    <div className="wrap" data-screen-label="Certificates">
      <div className="page-eyebrow">Earned · In progress · Verifiable</div>
      <div className="page-hero-2col">
        <h1 className="page-h1">Your <em>credentials.</em></h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22 }}>
        <div className="dash-section-h" style={{ marginBottom: 0 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Earned <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--ink-3)" }}>· 1</em></h3>
        </div>
      </div>

      <div className="cer-grid">
        <div className="cert-card earned">
          <div className="cert-frame">
            <div className="crest">SU</div>
            <div className="label">
              <div className="eye">Verified Certificate · 2025</div>
              <h3>Foundations of Product Management</h3>
              <div className="iss">Issued <b>Dec 18, 2025</b> · 8 weeks · 87% capstone score</div>
            </div>
            <div className="signed">
              <div>
                <div className="sig">Sahana Nair</div>
                <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 2 }}>Program Lead · SkillUp</div>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.04em" }}>ID · CRT-PM-1247</div>
            </div>
          </div>
          <div className="body">
            <div className="left">
              <div className="skl">Skills</div>
              <div className="lst">Roadmapping · Discovery · Stakeholder mgmt · Storytelling</div>
            </div>
            <div className="actions">
              <button className="btn-ghost">Share</button>
              <button className="btn-primary">Download</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-section-h" style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>In progress <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--ink-3)" }}>· 2</em></h3>
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Estimated completion based on current pace</span>
      </div>

      <div className="cer-grid">
        <div className="cert-card progress">
          <div className="cert-frame">
            <div className="crest">SU</div>
            <div className="label">
              <div className="eye">Program Certificate · 2026</div>
              <h3>AI-Driven Digital Marketing</h3>
              <div className="iss">Cohort starts <b>Apr 2026</b> · 16 weeks · 6 courses + capstone</div>
            </div>
            <div className="signed">
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Estimated · Aug 2026</div>
              <div style={{ fontSize: 10.5, color: "var(--ink-3)" }}>4 / 6 courses · capstone TBD</div>
            </div>
            <div className="progress-overlay">
              <div className="pct">38%</div>
              <div className="lb">Capstone in 6 weeks</div>
            </div>
          </div>
          <div className="body">
            <div className="left">
              <div className="skl">Skills tracked</div>
              <div className="lst">Audience strategy · GenAI prompting · Funnel design · Capstone</div>
            </div>
            <div className="actions">
              <button className="btn-primary">Continue</button>
            </div>
          </div>
        </div>

        <div className="cert-card progress">
          <div className="cert-frame">
            <div className="crest">SU</div>
            <div className="label">
              <div className="eye">Course Certificate · 2026</div>
              <h3>Leadership in Remote Teams</h3>
              <div className="iss">Self-paced · 6 weeks · Cohort optional</div>
            </div>
            <div className="signed">
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Estimated · May 2026</div>
              <div style={{ fontSize: 10.5, color: "var(--ink-3)" }}>5 / 9 lessons</div>
            </div>
            <div className="progress-overlay">
              <div className="pct">52%</div>
              <div className="lb">~ 4 hours left</div>
            </div>
          </div>
          <div className="body">
            <div className="left">
              <div className="skl">Skills tracked</div>
              <div className="lst">Async leadership · Trust · Feedback · Hiring remote</div>
            </div>
            <div className="actions">
              <button className="btn-primary">Continue</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div style={{ marginTop: 48, padding: 32, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>Verifiable, on-chain</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "8px 0 4px" }}>Every SkillUp certificate has a public verification page.</h3>
          <p style={{ fontSize: 13, color: "var(--ink-3)", margin: 0, maxWidth: "60ch" }}>Share a single link with recruiters. They'll see your enrollment date, completion date, hours logged, and projects submitted — no PDF tampering possible.</p>
        </div>
        <button className="btn-dark">Learn more {Q.arrow}</button>
      </div>
    </div>);

}

window.Certificates = Certificates;
