/* global React */

function MyProgress() {
  const Q = window.Ic || {};

  const week = [
    { d: "M", on: true }, { d: "T", on: true }, { d: "W", on: true },
    { d: "T", on: true }, { d: "F", on: true }, { d: "S", on: false }, { d: "S", on: false }
  ];

  return (
    <div className="wrap mp2" data-screen-label="My progress" style={{ paddingTop: 0 }}>
      {/* WHERE YOU ARE — one clear status + one focal ring */}
      <section className="mp2-hero">
        <div className="mp2-hero-l">
          <div className="mp2-eyebrow">Your progress · AI-Driven Digital Marketing</div>
          <h1 className="mp2-h1">You're <em>72%</em> of the way to your certificate.</h1>
          <p className="mp2-sub">Two modules and a capstone to go. At your current pace you'll finish by <b>August 2026</b> — about 12 days ahead of target.</p>
        </div>
        <div className="mp2-hero-r">
          <svg viewBox="0 0 200 200" className="mp2-ring">
            <circle cx="100" cy="100" r="82" fill="none" stroke="var(--line)" strokeWidth="16" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="var(--accent)" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 82 * 0.72} ${2 * Math.PI * 82}`} transform="rotate(-90 100 100)" />
            <text x="100" y="94" textAnchor="middle" fontSize="46" fontWeight="800" fill="var(--ink)" letterSpacing="-0.03em">72<tspan fontSize="20" fontWeight="600">%</tspan></text>
            <text x="100" y="120" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--ink-3)" letterSpacing="0.16em">COMPLETE</text>
          </svg>
        </div>
      </section>

      {/* AT A GLANCE — daily habit + headline totals */}
      <section className="mp2-glance">
        <div className="mp2-stat">
          <div className="mp2-stat-top">
            <span className="v">12</span>
            <span className="mp2-week">
              {week.map((x, i) =>
                <span key={i} className={"wd" + (x.on ? " on" : "")}>{x.on ? "✓" : x.d}</span>
              )}
            </span>
          </div>
          <div className="l">Day streak · 5 of 7 this week</div>
        </div>
        <div className="mp2-stat"><span className="v">87<small>h</small></span><div className="l">Hours learned</div></div>
        <div className="mp2-stat"><span className="v">14</span><div className="l">Lessons completed</div></div>
        <div className="mp2-stat"><span className="v">2</span><div className="l">Certificates · 1 in progress</div></div>
      </section>

      <section className="mp-grid-2 mp2-body">
        {/* WHERE YOU ARE — the path */}
        <div className="mp-block">
          <div className="mp-blk-head"><div><h2>Where you are</h2><p>Your active learning path.</p></div></div>

          <div className="mp2-path">
            <div className="mp2-path-row done"><span className="mk">✓</span><div className="tx"><b>Module 1 · Foundations</b><span>4 lessons · completed Apr 20</span></div></div>
            <div className="mp2-path-row done"><span className="mk">✓</span><div className="tx"><b>Module 2 · Audience &amp; personas</b><span>5 lessons · completed Apr 24</span></div></div>
            <div className="mp2-path-row active"><span className="mk">▶</span><div className="tx"><b>Module 3 · Persona research</b><span>3 of 6 lessons · in progress</span><div className="mp2-bar"><div className="fl" style={{ width: "50%" }} /></div></div></div>
            <div className="mp2-path-row"><span className="mk" /><div className="tx"><b>Module 4 · Channel strategy</b><span>Unlocks after Module 3</span></div></div>
            <div className="mp2-path-row"><span className="mk star">★</span><div className="tx"><b>Capstone project</b><span>Go-to-market plan · final step</span></div></div>
          </div>
        </div>

        {/* WHAT YOU'VE ACHIEVED */}
        <div className="mp-block">
          <div className="mp-blk-head"><div><h2>What you've achieved</h2><p>Credentials, skills, and recent wins.</p></div></div>

          <div className="mp2-ach-cert">
            <div className="crest">SU</div>
            <div><b>Foundations of Product Management</b><span>Verified certificate · earned Dec 2025</span></div>
          </div>

          <div className="mp2-ach-lab">Verified skills</div>
          <div className="mp2-chips">
            <span className="chip ver">Roadmapping ✓</span>
            <span className="chip ver">Stakeholder mgmt ✓</span>
            <span className="chip">Audience segmentation · Adv</span>
            <span className="chip">GenAI prompting · Int</span>
          </div>

          <div className="mp2-ach-lab">Recent milestones</div>
          <div className="mp2-miles">
            <div className="mrow"><span className="k">🔥</span><div><b>12-day learning streak</b><span>Today · top 8% of cohort</span></div></div>
            <div className="mrow"><span className="k">✓</span><div><b>Completed Module 2</b><span>Apr 24 · Audience &amp; personas</span></div></div>
            <div className="mrow"><span className="k">★</span><div><b>Roadmapping verified</b><span>Apr 11 · passed 3 graded artifacts</span></div></div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.MyProgress = MyProgress;
