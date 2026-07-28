/* global React, Ic */
const { useState } = React;

function Dashboard({ onNav }) {
  const Q = window.Ic || {};

  return (
    <div className="wrap" data-screen-label="Dashboard">
      <div className="page-eyebrow">Wednesday, April 24 · Day 12</div>
      <div className="page-hero-2col">
        <h1 className="page-h1">Good morning,<br /><em>John.</em></h1>
      </div>

      {/* KPIs + Streak */}
      <div className="dash-grid">
        <div className="dash-today-card">
          <div className="eye">Today at a glance</div>
          <div className="dash-kpi-grid">
            <div className="kpi"><div className="vl">3</div><div className="lb">Today's lessons</div><div className="sb">2 done · 1 in progress</div></div>
            <div className="kpi"><div className="vl">1h 24m</div><div className="lb">Time learned</div><div className="sb">Goal · 2h</div></div>
            <div className="kpi"><div className="vl">+420</div><div className="lb">XP this week</div><div className="sb">Top 8% in cohort</div></div>
            <div className="kpi"><div className="vl">80%</div><div className="lb">Live attendance</div><div className="sb">4 of 5 sessions</div></div>
          </div>
        </div>

        <div className="dash-streak">
          <div className="num">12<small>Day streak · keep going</small></div>
          <div className="dash-week">
            {[
            { d: "Su", s: "done" }, { d: "Mo", s: "done" }, { d: "Tu", s: "done" },
            { d: "We", s: "today" }, { d: "Th", s: "todo" }, { d: "Fr", s: "todo" }, { d: "Sa", s: "todo" }].
            map((x, i) =>
            <div key={i} className={"dw " + x.s}>
                <span className="d">{x.d}</span>
                <span className="c">{(x.s === "done" || x.s === "today") && Q.check}</span>
              </div>
            )}
          </div>
          <div className="streak-note">You extended your streak — <b>13 hours</b> left in the day. Nice work!</div>
        </div>
      </div>

      <div className="dash-row">
        <div>
          <div className="dash-section-h">
            <h3>Due <em>this week</em></h3>
            <a className="more" onClick={() => onNav && onNav("calendar")}>View calendar {Q.chevR}</a>
          </div>
          <div className="dash-due-list">
            <div className="dash-due-row">
              <div className="when urgent"><div className="day">24</div><div className="mo">Today</div></div>
              <div className="body">
                <div className="ttl">Live Q&A: Agile Coaching with David Chen</div>
                <div className="meta">Module 2 · 4:00 PM · 30 min · Attendance required</div>
              </div>
              <span className="pill live">● Live</span>
            </div>
            <div className="dash-due-row">
              <div className="when urgent"><div className="day">24</div><div className="mo">Tonight</div></div>
              <div className="body">
                <div className="ttl">Peer review · Persona research draft</div>
                <div className="meta">UX Research and Design Thinking · 11:59 PM</div>
              </div>
              <span className="pill due">Due 11:59</span>
            </div>
            <div className="dash-due-row">
              <div className="when"><div className="day">26</div><div className="mo">Fri</div></div>
              <div className="body">
                <div className="ttl">Submit assignment 02 · Audience segmentation</div>
                <div className="meta">AI-Driven Digital Marketing · Module 2 · Quiz + 350-word write-up</div>
              </div>
              <span className="pill due">Due Fri</span>
            </div>
            <div className="dash-due-row">
              <div className="when"><div className="day">28</div><div className="mo">Sun</div></div>
              <div className="body">
                <div className="ttl">Optional · Office hours with Mara Vasquez</div>
                <div className="meta">Drop-in · 1:00 – 2:00 PM ET</div>
              </div>
              <span className="pill opt">Optional</span>
            </div>
            <div className="dash-due-row">
              <div className="when"><div className="day">30</div><div className="mo">Tue</div></div>
              <div className="body">
                <div className="ttl">Live workshop · Capstone kickoff</div>
                <div className="meta">2:00 PM · 90 min · Attendance optional</div>
              </div>
              <span className="pill opt">Optional</span>
            </div>
          </div>
        </div>

        <div>
          <div className="dash-section-h">
            <h3>Pick up <em>where you left off</em></h3>
            <a className="more" onClick={() => onNav && onNav("my-learning")}>My learning {Q.chevR}</a>
          </div>
          <div className="dash-due-list">
            <div className="dash-due-row resume-row" onClick={() => onNav && onNav("lesson")}>
              <div className="resume-thumb" style={{ background: "var(--p1)" }}>AI</div>
              <div className="body">
                <div className="kind-row"><span className="kind-tag program">Program</span><span className="kind-name">AI-Driven Digital Marketing</span></div>
                <div className="ttl">M2 · L3 · Building audience personas with AI</div>
                <div className="meta">12 min left · 38% complete</div>
              </div>
              <span className="pill done">38%</span>
            </div>
            <div className="dash-due-row resume-row" onClick={() => onNav && onNav("lesson")}>
              <div className="resume-thumb" style={{ background: "var(--p3)" }}>UX</div>
              <div className="body">
                <div className="kind-row"><span className="kind-tag">Course</span><span className="kind-name">UX Research and Design Thinking</span></div>
                <div className="ttl">M1 · L2 · Discovery interview techniques</div>
                <div className="meta">9 min left · 5% complete</div>
              </div>
              <span className="pill done">5%</span>
            </div>
            <div className="dash-due-row resume-row" onClick={() => onNav && onNav("lesson")}>
              <div className="resume-thumb" style={{ background: "var(--p2)" }}>LR</div>
              <div className="body">
                <div className="kind-row"><span className="kind-tag">Course</span><span className="kind-name">Leadership in Remote Teams</span></div>
                <div className="ttl">M3 · L2 · Async standups that actually work</div>
                <div className="meta">24 min left · 52% complete</div>
              </div>
              <span className="pill done">52%</span>
            </div>
            <div className="dash-due-row resume-row" onClick={() => onNav && onNav("lesson")}>
              <div className="resume-thumb" style={{ background: "var(--bluegreen)" }}>PM</div>
              <div className="body">
                <div className="kind-row"><span className="kind-tag">Course</span><span className="kind-name">Project Management with AI Tools</span></div>
                <div className="ttl">M2 · L3 · GenAI prompt patterns for PMs</div>
                <div className="meta">18 min left · 35% complete</div>
              </div>
              <span className="pill done">35%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-section-h" style={{ marginTop: 32 }}>
        <h3>Jump <em>somewhere</em></h3>
      </div>
      <div className="dash-quick">
        <a onClick={() => onNav && onNav("discussion")}>
          <div className="ico">{Q.chat}</div>
          <div className="ttl">Discussion</div>
          <div className="sub">12 new replies · 2 mentions</div>
        </a>
        <a onClick={() => onNav && onNav("services")}>
          <div className="ico">{Q.grid}</div>
          <div className="ttl">Book a mentor</div>
          <div className="sub">Mara has Thursday open</div>
        </a>
        <a onClick={() => onNav && onNav("certificates")}>
          <div className="ico">{Q.trophy}</div>
          <div className="ttl">Certificates</div>
          <div className="sub">2 in progress · 1 to download</div>
        </a>
        <a onClick={() => onNav && onNav("profile")}>
          <div className="ico">{Q.bell}</div>
          <div className="ttl">Profile</div>
          <div className="sub">Skills · Settings · Sharing</div>
        </a>
      </div>
    </div>);

}

window.Dashboard = Dashboard;
