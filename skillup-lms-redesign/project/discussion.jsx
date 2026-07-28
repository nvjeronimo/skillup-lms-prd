/* global React, Ic */
const { useState: useStateDis } = React;

function Discussion() {
  const Q = window.Ic || {};
  const [tab, setTab] = useStateDis("All threads");
  const tabs = [
  { name: "All threads", n: 248 },
  { name: "Following", n: 12 },
  { name: "Mentions", n: 4 },
  { name: "My posts", n: 7 }];


  return (
    <div className="wrap" data-screen-label="Discussion">
      <div className="page-eyebrow">Community · 1,248 active learners</div>
      <div className="page-hero-2col" style={{ alignItems: "center" }}>
        <h1 className="page-h1">What's <em>everyone</em><br />talking about.</h1>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            Start a thread
          </button>
        </div>
      </div>

      <div className="dis-layout">
        <div>
          <div className="dis-toolbar" style={{ marginTop: 22 }}>
            <div className="search-pill">
              {Q.search}
              <input placeholder="Search threads, topics, or learners…" />
            </div>
          </div>

          <div className="dis-tabs">
            {tabs.map((t) =>
            <button key={t.name} className={"dis-tab" + (tab === t.name ? " active" : "")} onClick={() => setTab(t.name)}>
                {t.name} <span className="n">{t.n}</span>
              </button>
            )}
          </div>

          <div className="thread">
            <div className="ava mentor">DC</div>
            <div className="body">
              <div className="meta-row">
                <b>David Chen</b>
                <span className="pill-mn">Mentor</span>
                <span>·</span>
                <span className="scope">AI-Driven Digital Marketing</span>
                <span>·</span>
                <span>2h ago</span>
              </div>
              <div className="ttl">Reading list for Module 2 — what I'm using to prep for the Q&A today</div>
              <div className="pre">Quick post before the live Q&A at 4 PM. I've put together a short list of three articles + one Loom video that map directly to the Module 2 learning objectives. If you read just one, make it…</div>
              <div className="tags">
                <span className="t">📚 reading-list</span>
                <span className="t">module-2</span>
                <span className="t">live-q&a</span>
              </div>
            </div>
            <div className="stats">
              <div className="it hot">{Q.flame} 28</div>
              <div className="it">{Q.chat} 12 replies</div>
              <div className="it" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Pinned</div>
            </div>
          </div>

          <div className="thread">
            <div className="ava">RS</div>
            <div className="body">
              <div className="meta-row">
                <b>Riya Sharma</b>
                <span>·</span>
                <span className="scope">UX Research and Design Thinking</span>
                <span>·</span>
                <span>3h ago</span>
              </div>
              <div className="ttl">How do you handle a participant who keeps going off-script in discovery interviews?</div>
              <div className="pre">Did my first round of interviews this week and one participant kept steering the conversation toward unrelated past projects. I tried gentle redirects but it ate 20 minutes. Anyone have a script…</div>
              <div className="tags">
                <span className="t">discovery</span>
                <span className="t">interviews</span>
                <span className="t">help-wanted</span>
              </div>
            </div>
            <div className="stats">
              <div className="it">{Q.chat} 8 replies</div>
              <div className="it" style={{ color: "var(--green-1)" }}>● 2 mentor</div>
            </div>
          </div>

          <div className="thread">
            <div className="ava">JP</div>
            <div className="body">
              <div className="meta-row">
                <b>Jamie Patel</b>
                <span>·</span>
                <span className="scope">Project Management with AI Tools</span>
                <span>·</span>
                <span>Yesterday</span>
              </div>
              <div className="ttl">Sharing my Notion + Make automation for weekly status reports — feedback welcome</div>
              <div className="pre">Built this over the weekend after the Module 1 lesson on async workflows. It pulls Linear issues into a Notion DB, runs a GPT-4 summary, and posts to Slack every Friday at 9am. Took ~3 hours…</div>
              <div className="tags">
                <span className="t">show-and-tell</span>
                <span className="t">automation</span>
                <span className="t">notion</span>
              </div>
            </div>
            <div className="stats">
              <div className="it hot">{Q.flame} 41</div>
              <div className="it">{Q.chat} 19 replies</div>
            </div>
          </div>

          <div className="thread">
            <div className="ava mentor">MV</div>
            <div className="body">
              <div className="meta-row">
                <b>Mara Vasquez</b>
                <span className="pill-mn">Mentor</span>
                <span>·</span>
                <span className="scope">UX Research and Design Thinking</span>
                <span>·</span>
                <span>Yesterday</span>
              </div>
              <div className="ttl">Office hours this Thursday — bring questions on persona research drafts</div>
              <div className="pre">3 slots open for Thursday at 10 AM. Best for folks struggling with the Module 1 deliverable. Async fine too — drop a comment with your draft link and I'll review by EOD Friday…</div>
              <div className="tags">
                <span className="t">office-hours</span>
                <span className="t">module-1</span>
              </div>
            </div>
            <div className="stats">
              <div className="it">{Q.chat} 6 replies</div>
            </div>
          </div>

          <div className="thread">
            <div className="ava">KO</div>
            <div className="body">
              <div className="meta-row">
                <b>Kelsey Owusu</b>
                <span>·</span>
                <span className="scope">Leadership in Remote Teams</span>
                <span>·</span>
                <span>2 days ago</span>
              </div>
              <div className="ttl">Anyone running async standups with a non-tech team? Looking for templates</div>
              <div className="pre">Marketing team of 8, mostly mid-career, who really hate Loom. Module 3 lesson got me thinking about lighter-touch options. Have you tried a structured Slack canvas? Curious about formats…</div>
              <div className="tags">
                <span className="t">async</span>
                <span className="t">templates</span>
                <span className="t">non-technical</span>
              </div>
            </div>
            <div className="stats">
              <div className="it">{Q.chat} 14 replies</div>
            </div>
          </div>

          <div className="thread">
            <div className="ava">AT</div>
            <div className="body">
              <div className="meta-row">
                <b>Ade Tanaka</b>
                <span>·</span>
                <span className="scope">AI-Driven Digital Marketing</span>
                <span>·</span>
                <span>3 days ago</span>
              </div>
              <div className="ttl">Capstone brand candidates — would love a sanity check on my shortlist</div>
              <div className="pre">Working in B2B fintech today and trying to find a brand that's both new-to-market and has enough public material to research. Currently weighing: Mercury, Ramp, Brex. Each has tradeoffs…</div>
              <div className="tags">
                <span className="t">capstone</span>
                <span className="t">brand-pick</span>
              </div>
            </div>
            <div className="stats">
              <div className="it">{Q.chat} 3 replies</div>
            </div>
          </div>
        </div>

        <aside className="dis-aside">
          <div>
            <h4>Trending tags this week</h4>
            <div className="dis-tag-cloud">
              <span className="t hot">🔥 capstone <span className="n">42</span></span>
              <span className="t">module-2 <span className="n">31</span></span>
              <span className="t">async <span className="n">24</span></span>
              <span className="t">show-and-tell <span className="n">19</span></span>
              <span className="t">help-wanted <span className="n">17</span></span>
              <span className="t">automation <span className="n">14</span></span>
              <span className="t">live-q&a <span className="n">12</span></span>
              <span className="t">office-hours <span className="n">10</span></span>
              <span className="t">interviews <span className="n">8</span></span>
            </div>
          </div>

          <div className="card-base">
            <h4 style={{ marginBottom: 14 }}>Mentors online now</h4>
            <div className="dis-mentor-card">
              <div className="ava">DC</div>
              <div>
                <div className="nm">David Chen</div>
                <div className="rl">Agile Coach · AI-Driven Marketing</div>
                <div className="sts">Online · live in 37 min</div>
              </div>
            </div>
            <div className="dis-mentor-card">
              <div className="ava">MV</div>
              <div>
                <div className="nm">Mara Vasquez</div>
                <div className="rl">UX Research mentor</div>
                <div className="sts">Online · replying</div>
              </div>
            </div>
            <div className="dis-mentor-card">
              <div className="ava">TP</div>
              <div>
                <div className="nm">Theo Park</div>
                <div className="rl">Career coach</div>
                <div className="sts">Online</div>
              </div>
            </div>
          </div>

          <div className="card-base" style={{ background: "var(--ink)", color: "white", borderColor: "var(--ink)" }}>
            <h4 style={{ color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Community guidelines</h4>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>Be specific, be kind, give credit. Mentors respond within 24 hours on weekdays.</div>
          </div>
        </aside>
      </div>
    </div>);

}

window.Discussion = Discussion;
