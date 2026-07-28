/* global React, Ic */
const { useState: useStatePrf } = React;

function Profile() {
  const Q = window.Ic || {};
  const [tab, setTab] = useStatePrf("Public");

  return (
    <div className="wrap" data-screen-label="Profile" style={{ paddingTop: 0 }}>
      <div className="prf-cover">
        <div className="inner">
          <div className="ava-xl">JS</div>
          <div className="name">
            <h1>John Smith</h1>
            <div className="role">
              Product Manager <span className="pip" /> Brooklyn, NY <span className="pip" /> Pro learner since 2024
            </div>
          </div>
          <div className="meta-stats">
            <div className="it"><div className="vl">1</div><div className="lb">Certificate</div></div>
            <div className="it"><div className="vl">87</div><div className="lb">Hours</div></div>
            <div className="it"><div className="vl">12</div><div className="lb">Day streak</div></div>
          </div>
        </div>
      </div>

      <div className="prf-tabs">
        <button className={"prf-tab" + (tab === "Public" ? " active" : "")} onClick={() => setTab("Public")}>Public profile</button>
        <button className={"prf-tab" + (tab === "Settings" ? " active" : "")} onClick={() => setTab("Settings")}>Settings</button>
        <button className={"prf-tab" + (tab === "Billing" ? " active" : "")} onClick={() => setTab("Billing")}>Billing</button>
        <button className={"prf-tab" + (tab === "Sharing" ? " active" : "")} onClick={() => setTab("Sharing")}>Sharing</button>
      </div>

      {tab === "Public" &&
      <div className="prf-body">
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", margin: "0 0 6px" }}>About</h3>
            <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 4, maxWidth: "70ch" }}>PM at a Series B B2B fintech. Currently going deep on AI-driven marketing through SkillUp's certificate program — building the muscle to embed AI workflows into go-to-market without losing brand voice.</p>

            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", margin: "32px 0 14px" }}>Skills <span style={{ color: "var(--ink-4)", fontWeight: 500, marginLeft: 6 }}>· Tracked across enrolled courses</span></h3>

            <div className="prf-skills">
              <div className="skill-row">
                <div className="nm">Audience segmentation <span className="en">87 hrs</span></div>
                <div className="bar"><div className="fl" style={{ width: "82%" }} /></div>
                <div className="lvl">Advanced</div>
              </div>
              <div className="skill-row">
                <div className="nm">GenAI prompting <span className="en">42 hrs</span></div>
                <div className="bar"><div className="fl" style={{ width: "68%" }} /></div>
                <div className="lvl">Intermediate</div>
              </div>
              <div className="skill-row">
                <div className="nm">UX research methods <span className="en">11 hrs</span></div>
                <div className="bar"><div className="fl" style={{ width: "20%" }} /></div>
                <div className="lvl">Beginner</div>
              </div>
              <div className="skill-row">
                <div className="nm">Async leadership <span className="en">38 hrs</span></div>
                <div className="bar"><div className="fl" style={{ width: "55%" }} /></div>
                <div className="lvl">Intermediate</div>
              </div>
              <div className="skill-row">
                <div className="nm">Roadmapping <span className="en">112 hrs · earned</span></div>
                <div className="bar"><div className="fl" style={{ width: "100%", background: "var(--green-1)" }} /></div>
                <div className="lvl" style={{ color: "var(--green-1)" }}>Verified</div>
              </div>
              <div className="skill-row">
                <div className="nm">Stakeholder management <span className="en">67 hrs · earned</span></div>
                <div className="bar"><div className="fl" style={{ width: "100%", background: "var(--green-1)" }} /></div>
                <div className="lvl" style={{ color: "var(--green-1)" }}>Verified</div>
              </div>
            </div>

            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", margin: "32px 0 14px" }}>Activity</h3>
            <div className="card-base">
              <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>
                <div style={{ padding: "8px 0", borderBottom: "1px dashed var(--line)" }}><b>Today</b> · Completed lesson · M2L2 · GenAI prompt patterns for personas</div>
                <div style={{ padding: "8px 0", borderBottom: "1px dashed var(--line)" }}><b>Yesterday</b> · Submitted peer review · UX Research persona drafts</div>
                <div style={{ padding: "8px 0", borderBottom: "1px dashed var(--line)" }}><b>Apr 22</b> · Booked mentor session · Mara Vasquez (Apr 25)</div>
                <div style={{ padding: "8px 0", borderBottom: "1px dashed var(--line)" }}><b>Apr 20</b> · Started course · UX Research and Design Thinking</div>
                <div style={{ padding: "8px 0" }}><b>Apr 15</b> · Reached 12-day streak 🔥</div>
              </div>
            </div>
          </div>

          <aside className="prf-aside">
            <div className="ava-card">
              <h4>Certificates</h4>
              <div className="prf-mini-cert">
                <div className="crest">SU</div>
                <div>
                  <div className="nm">Foundations of Product Management</div>
                  <div className="yr">Earned · Dec 2025</div>
                </div>
              </div>
              <div className="prf-mini-cert">
                <div className="crest" style={{ background: "var(--paper-2)", color: "var(--ink-3)" }}>38%</div>
                <div>
                  <div className="nm">AI-Driven Digital Marketing</div>
                  <div className="yr">In progress · Est. Aug 2026</div>
                </div>
              </div>
              <div className="prf-mini-cert">
                <div className="crest" style={{ background: "var(--paper-2)", color: "var(--ink-3)" }}>52%</div>
                <div>
                  <div className="nm">Leadership in Remote Teams</div>
                  <div className="yr">In progress · Est. May 2026</div>
                </div>
              </div>
            </div>

            <div className="ava-card">
              <h4>Public profile</h4>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginBottom: 10 }}>Anyone with the link can view this profile.</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", padding: "9px 12px", background: "var(--paper-2)", borderRadius: 8, fontFamily: "ui-monospace, monospace" }}>skillup.com/u/john-smith</div>
              <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}>Copy link</button>
            </div>

            <div className="ava-card" style={{ background: "var(--ink)", color: "white", borderColor: "var(--ink)" }}>
              <h4 style={{ color: "rgba(255,255,255,0.6)" }}>Linked accounts</h4>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>LinkedIn · Connected · auto-post badges</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>GitHub · Not connected</div>
            </div>
          </aside>
        </div>
      }

      {tab === "Settings" &&
      <div className="prf-body" style={{ display: "block" }}>
          <div className="set-section">
            <h3>Account</h3>
            <p className="desc">Your basic info and how we reach you.</p>
            <div className="set-row">
              <div className="lab">Display name<div className="h">Shown on your profile and certificates</div></div>
              <input type="text" defaultValue="John Smith" />
            </div>
            <div className="set-row">
              <div className="lab">Email<div className="h">Used for sign-in and notifications</div></div>
              <input type="email" defaultValue="john.smith@example.com" />
            </div>
            <div className="set-row">
              <div className="lab">Time zone<div className="h">Live sessions show in your local time</div></div>
              <select defaultValue="ET"><option>America / New York (ET)</option><option>America / Los Angeles (PT)</option><option>Europe / London (GMT)</option></select>
            </div>
            <div className="set-row">
              <div className="lab">Language</div>
              <select defaultValue="en"><option>English</option><option>Español</option><option>Português</option></select>
            </div>
          </div>

          <div className="set-section">
            <h3>Notifications</h3>
            <p className="desc">Choose what reaches your email and what stays in-app.</p>
            <div className="set-row">
              <div className="lab">Live session reminders<div className="h">Email · 30 min before scheduled start</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>On</span></div>
            </div>
            <div className="set-row">
              <div className="lab">Mentions in discussion<div className="h">In-app + email</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>On</span></div>
            </div>
            <div className="set-row">
              <div className="lab">Weekly progress digest<div className="h">Email · Sundays at 6 PM</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>On</span></div>
            </div>
            <div className="set-row">
              <div className="lab">Marketing updates<div className="h">New programs and promotions</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Off</span></div>
            </div>
          </div>

          <div className="set-section">
            <h3>Learning preferences</h3>
            <p className="desc">Tune the experience to your pace.</p>
            <div className="set-row">
              <div className="lab">Daily learning goal<div className="h">We'll celebrate when you hit it</div></div>
              <select defaultValue="60"><option value="30">30 min / day</option><option value="60">1 hour / day</option><option value="120">2 hours / day</option></select>
            </div>
            <div className="set-row">
              <div className="lab">Auto-play next lesson</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>On</span></div>
            </div>
            <div className="set-row">
              <div className="lab">Reduced motion<div className="h">Tones down animations across the app</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Off</span></div>
            </div>
          </div>

          <div className="set-section">
            <h3 style={{ color: "var(--red-2)" }}>Danger zone</h3>
            <p className="desc">Irreversible. Read carefully.</p>
            <div className="set-row">
              <div className="lab">Export my data<div className="h">JSON archive of activity, posts, submissions</div></div>
              <button className="btn-ghost" style={{ justifySelf: "end" }}>Request export</button>
            </div>
            <div className="set-row">
              <div className="lab">Delete account<div className="h">All progress, certificates, and posts will be permanently removed</div></div>
              <button className="btn-ghost" style={{ justifySelf: "end", color: "var(--red-2)", borderColor: "var(--red-soft)" }}>Delete account…</button>
            </div>
          </div>
        </div>
      }

      {tab === "Billing" &&
      <div className="prf-body" style={{ display: "block" }}>
          <div className="set-section">
            <h3>Plan</h3>
            <p className="desc">You're on the Pro plan, billed annually.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, padding: "14px 0" }}>
              <div className="card-base"><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Plan</div><div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>Pro · Annual</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>Renews Dec 14, 2026</div></div>
              <div className="card-base"><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Price</div><div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>$348<span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-3)" }}> / yr</span></div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>$29 / mo equivalent</div></div>
              <div className="card-base"><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Card</div><div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>•• 4242</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>Visa · Exp 09/2027</div></div>
            </div>
            <div className="set-row">
              <div className="lab">Manage plan<div className="h">Switch to monthly, cancel, or upgrade</div></div>
              <div style={{ display: "flex", gap: 8, justifySelf: "end" }}><button className="btn-ghost">Switch to monthly</button><button className="btn-primary">Upgrade to Team</button></div>
            </div>
          </div>

          <div className="set-section">
            <h3>Invoices</h3>
            <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", marginTop: 8 }}>
              {[
            { d: "Dec 14, 2025", a: "$348.00", st: "Paid" },
            { d: "Dec 14, 2024", a: "$348.00", st: "Paid" },
            { d: "Apr 03, 2024", a: "$29.00", st: "Paid" },
            { d: "Mar 03, 2024", a: "$29.00", st: "Paid" }].
            map((i) =>
            <div key={i.d} style={{ display: "grid", gridTemplateColumns: "180px 1fr 100px 100px", padding: "14px 22px", borderBottom: "1px solid var(--line)", fontSize: 13, alignItems: "center" }}>
                  <span style={{ color: "var(--ink-3)" }}>{i.d}</span>
                  <span>SkillUp Pro · Annual</span>
                  <span>{i.a}</span>
                  <span style={{ color: "var(--green-1)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{i.st}</span>
                </div>
            )}
            </div>
          </div>
        </div>
      }

      {tab === "Sharing" &&
      <div className="prf-body" style={{ display: "block" }}>
          <div className="set-section">
            <h3>Public link</h3>
            <p className="desc">Anyone with this link can view your public profile, certificates, and verified skills. Activity feed stays private.</p>
            <div style={{ display: "flex", gap: 10, padding: "14px 0", alignItems: "center" }}>
              <div style={{ flex: 1, padding: "12px 16px", background: "var(--paper-2)", borderRadius: 10, fontFamily: "ui-monospace, monospace", fontSize: 13, color: "var(--ink-2)" }}>https://skillup.com/u/john-smith</div>
              <button className="btn-primary">Copy link</button>
            </div>
          </div>

          <div className="set-section">
            <h3>LinkedIn</h3>
            <p className="desc">Auto-post earned badges to your LinkedIn profile.</p>
            <div className="set-row">
              <div className="lab">Auto-publish badges<div className="h">Posted as a feed update on completion</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>On</span></div>
            </div>
            <div className="set-row">
              <div className="lab">Add credentials to profile<div className="h">Skills appear in your LinkedIn skills section</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>On</span></div>
            </div>
          </div>

          <div className="set-section">
            <h3>Cohort directory</h3>
            <p className="desc">Show in the directory shared with your cohort. Helps with peer matching for capstones.</p>
            <div className="set-row">
              <div className="lab">List me in cohort directory</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle on" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Visible</span></div>
            </div>
            <div className="set-row">
              <div className="lab">Show my email to cohort<div className="h">Only enrolled cohort members can see it</div></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifySelf: "end" }}><div className="toggle" /><span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Hidden</span></div>
            </div>
          </div>
        </div>
      }
    </div>);

}

window.Profile = Profile;
