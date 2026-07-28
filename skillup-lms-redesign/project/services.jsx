/* global React, Ic */
const { useState: useStateSrv } = React;

function Services() {
  const Q = window.Ic || {};
  const [tab, setTab] = useStateSrv("Mentors");
  const tabs = [
  { name: "Mentors", n: 24 },
  { name: "Career", n: 6 },
  { name: "Help center", n: null }];


  return (
    <div className="wrap" data-screen-label="Services">
      <div className="page-eyebrow">Support · Mentors · Career</div>
      <div className="page-hero-2col">
        <h1 className="page-h1">All the <em>humans</em><br />on your side.</h1>
        <p className="page-lede">Book a 1:1 mentor, polish your resume with a career coach, or get a hold of support. Everything that isn't a course lives here.</p>
      </div>

      <div className="srv-tabs">
        {tabs.map((t) =>
        <button key={t.name} className={"srv-tab" + (tab === t.name ? " active" : "")} onClick={() => setTab(t.name)}>
            {t.name}{t.n != null && <span className="n">{t.n}</span>}
          </button>
        )}
      </div>

      {tab === "Mentors" &&
      <div className="srv-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Recommended <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--ink-3)" }}>for you.</em></h3>
            <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Based on your enrollments and goals</span>
          </div>

          <div className="srv-mentors">
            <div className="mentor-card">
              <div className="top">
                <div className="ava-lg">MV</div>
                <div>
                  <div className="nm">Mara Vasquez</div>
                  <div className="rl">UX Research · Senior at Linear</div>
                </div>
              </div>
              <div className="bio">9 years in product research, ex-Atlassian. Loves teaching the messy parts of qualitative research.</div>
              <div className="skills">
                <span className="s">Discovery</span>
                <span className="s">Personas</span>
                <span className="s">Synthesis</span>
                <span className="s">Workshops</span>
              </div>
              <div className="meta-bar">
                <span className="stars">★★★★★ 4.9</span>
                <span>3 slots this week</span>
              </div>
              <div className="actions">
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Book session</button>
                <button className="btn-ghost">Profile</button>
              </div>
            </div>

            <div className="mentor-card">
              <div className="top">
                <div className="ava-lg va">DC</div>
                <div>
                  <div className="nm">David Chen</div>
                  <div className="rl">Agile Coach · ex-Spotify</div>
                </div>
              </div>
              <div className="bio">Helped 40+ marketing teams adopt agile rituals. Office hours run hot — book early.</div>
              <div className="skills">
                <span className="s">Agile</span>
                <span className="s">Marketing ops</span>
                <span className="s">Capstone prep</span>
              </div>
              <div className="meta-bar">
                <span className="stars">★★★★★ 4.8</span>
                <span>1 slot left</span>
              </div>
              <div className="actions">
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Book session</button>
                <button className="btn-ghost">Profile</button>
              </div>
            </div>

            <div className="mentor-card">
              <div className="top">
                <div className="ava-lg vb">TP</div>
                <div>
                  <div className="nm">Theo Park</div>
                  <div className="rl">Career Coach · ex-LinkedIn TA</div>
                </div>
              </div>
              <div className="bio">Reviews resumes line-by-line and runs mock interviews. Specializes in PM and design pivots.</div>
              <div className="skills">
                <span className="s">Resumes</span>
                <span className="s">Mock interviews</span>
                <span className="s">Negotiation</span>
              </div>
              <div className="meta-bar">
                <span className="stars">★★★★★ 4.9</span>
                <span>5 slots this week</span>
              </div>
              <div className="actions">
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Book session</button>
                <button className="btn-ghost">Profile</button>
              </div>
            </div>

            <div className="mentor-card">
              <div className="top">
                <div className="ava-lg vc">SN</div>
                <div>
                  <div className="nm">Sahana Nair</div>
                  <div className="rl">Product Lead · Notion</div>
                </div>
              </div>
              <div className="bio">Practical PM mentor focused on roadmapping and stakeholder management. Drops resources every week.</div>
              <div className="skills">
                <span className="s">Roadmapping</span>
                <span className="s">PM craft</span>
                <span className="s">Storytelling</span>
              </div>
              <div className="meta-bar">
                <span className="stars">★★★★★ 4.9</span>
                <span>2 slots this week</span>
              </div>
              <div className="actions">
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Book session</button>
                <button className="btn-ghost">Profile</button>
              </div>
            </div>

            <div className="mentor-card">
              <div className="top">
                <div className="ava-lg">JL</div>
                <div>
                  <div className="nm">Jordan Lee</div>
                  <div className="rl">Engineering Manager · Stripe</div>
                </div>
              </div>
              <div className="bio">EM focused on remote team health, async ops, and the manager-as-coach model. Big fan of writing.</div>
              <div className="skills">
                <span className="s">Async</span>
                <span className="s">Remote</span>
                <span className="s">EM craft</span>
              </div>
              <div className="meta-bar">
                <span className="stars">★★★★★ 4.7</span>
                <span>4 slots this week</span>
              </div>
              <div className="actions">
                <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Book session</button>
                <button className="btn-ghost">Profile</button>
              </div>
            </div>

            <div className="mentor-card">
              <div className="top">
                <div className="ava-lg va">PL</div>
                <div>
                  <div className="nm">Priya Lakshmi</div>
                  <div className="rl">Data Scientist · Snowflake</div>
                </div>
              </div>
              <div className="bio">Helps non-technical learners get comfortable with Python and product analytics. Patient with first-timers.</div>
              <div className="skills">
                <span className="s">Python</span>
                <span className="s">Analytics</span>
                <span className="s">Stats 101</span>
              </div>
              <div className="meta-bar">
                <span className="stars">★★★★★ 4.8</span>
                <span>Waitlist · 5 days</span>
              </div>
              <div className="actions">
                <button className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Join waitlist</button>
                <button className="btn-ghost">Profile</button>
              </div>
            </div>
          </div>
        </div>
      }

      {tab === "Career" &&
      <div className="srv-section">
          <div className="srv-career-grid">
            <div className="srv-career-feature">
              <div className="eye">Career Sprint · 4 weeks</div>
              <h2>Land your next role,<br />with a coach in your corner.</h2>
              <p>Resume reviews, mock interviews, salary negotiation prep, and a private job board. Two coaches assigned, async-first. Available to all Pro members.</p>
              <div className="feat-stats">
                <div><div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>78%</div><div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Placed in 6 mo</div></div>
                <div><div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>$18K</div><div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Avg. salary lift</div></div>
                <div><div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>4.9★</div><div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Coach rating</div></div>
              </div>
              <button className="btn-primary">Apply for sprint {Q.arrow}</button>
            </div>

            <div className="srv-services-list">
              <div className="srv-svc-item">
                <div className="ic-box">{Q.book}</div>
                <div>
                  <div className="nm">Resume review</div>
                  <div className="sb">90-min line-by-line edit · Theo Park or rotating</div>
                </div>
                <div className="arr">{Q.chevR}</div>
              </div>
              <div className="srv-svc-item">
                <div className="ic-box">{Q.chat}</div>
                <div>
                  <div className="nm">Mock interview</div>
                  <div className="sb">45 min behavioral or technical · 1 free per quarter</div>
                </div>
                <div className="arr">{Q.chevR}</div>
              </div>
              <div className="srv-svc-item">
                <div className="ic-box">{Q.trophy}</div>
                <div>
                  <div className="nm">Salary negotiation prep</div>
                  <div className="sb">60-min role-play · Bring an offer or target band</div>
                </div>
                <div className="arr">{Q.chevR}</div>
              </div>
              <div className="srv-svc-item">
                <div className="ic-box">{Q.grid}</div>
                <div>
                  <div className="nm">Portfolio audit</div>
                  <div className="sb">Async written feedback in 48 hours</div>
                </div>
                <div className="arr">{Q.chevR}</div>
              </div>
              <div className="srv-svc-item">
                <div className="ic-box">{Q.cal}</div>
                <div>
                  <div className="nm">Private job board</div>
                  <div className="sb">88 active openings from partner companies</div>
                </div>
                <div className="arr">{Q.chevR}</div>
              </div>
            </div>
          </div>
        </div>
      }

      {tab === "Help center" &&
      <div className="srv-section">
          <div className="srv-help-grid">
            <div>
              <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
                <div className="search-pill" style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 999, padding: "11px 18px", color: "var(--ink-3)" }}>
                  {Q.search}
                  <input style={{ flex: 1, background: "transparent", border: "none", outline: "none", font: "inherit", color: "var(--ink)" }} placeholder="Search help articles, billing questions, account…" />
                </div>
              </div>

              <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", margin: "10px 0 6px" }}>Top questions</h3>

              <div className="srv-faq-item open">
                <div className="q">How do I get a refund within the 14-day window?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a">If it's been less than 14 days since enrollment and you've completed less than 30% of the program, you can request a full refund from your billing settings. Refunds process to the original payment method within 5–7 business days.</div>
              </div>
              <div className="srv-faq-item">
                <div className="q">Can I switch cohorts after a program starts?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a"></div>
              </div>
              <div className="srv-faq-item">
                <div className="q">Where can I download my certificates?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a"></div>
              </div>
              <div className="srv-faq-item">
                <div className="q">What happens if I miss a required live session?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a"></div>
              </div>
              <div className="srv-faq-item">
                <div className="q">How does cohort attendance affect my certificate?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a"></div>
              </div>
              <div className="srv-faq-item">
                <div className="q">Can I extend my access to a course after it ends?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a"></div>
              </div>
              <div className="srv-faq-item">
                <div className="q">My video isn't loading — what should I check?<span className="ic" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 300 }}>+</span></div>
                <div className="a"></div>
              </div>
            </div>

            <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="srv-ticket-card">
                <h4>Still stuck?</h4>
                <p>Open a support ticket and we'll get back within 24 hours on weekdays. For account or billing issues, expect a reply same-day.</p>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>New ticket {Q.arrow}</button>
                <div className="my-tickets">2 open tickets · last reply 4h ago</div>
              </div>

              <div className="card-base" style={{ background: "var(--ink)", color: "white", borderColor: "var(--ink)" }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>Live chat</h4>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginBottom: 14, lineHeight: 1.5 }}>Mon–Fri · 9 AM – 8 PM ET. Average wait 2 min.</div>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Start chat {Q.chat}</button>
              </div>
            </aside>
          </div>
        </div>
      }
    </div>);

}

window.Services = Services;
