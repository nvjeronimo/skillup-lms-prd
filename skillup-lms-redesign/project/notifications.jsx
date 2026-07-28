/* global React, Ic */
const { useState: useStateNot } = React;

function Notifications() {
  const Q = window.Ic || {};
  const [filter, setFilter] = useStateNot("All");
  const [open, setOpen] = useStateNot({ Today: true, Yesterday: true, "This week": true });
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const filters = [
  { name: "All", n: 24 },
  { name: "Mentions", n: 4 },
  { name: "Live", n: 3 },
  { name: "Due", n: 5 },
  { name: "Mentor", n: 2 },
  { name: "Certificates", n: 1 }];

  const GroupHead = ({ label, count }) =>
    <button className={"not-group-head" + (open[label] ? " open" : "")} onClick={() => toggle(label)}>
      <span className="chev">{Q.chevR}</span>
      <span className="lb">{label}</span>
      <span className="ct">{count}</span>
    </button>;


  return (
    <div className="wrap" data-screen-label="Notifications">
      <div className="page-eyebrow">Inbox · 8 unread</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 32 }}>
        <h1 className="page-h1">Inbox.</h1>
        <div style={{ display: "flex", gap: 10, paddingBottom: 18 }}>
          <button className="btn-ghost">Mark all read</button>
          <button className="btn-ghost">Notification settings</button>
        </div>
      </div>

      <div className="not-toolbar">
        <div className="not-filters">
          {filters.map((f) =>
          <button key={f.name} className={"ft" + (filter === f.name ? " active" : "")} onClick={() => setFilter(f.name)}>
              {f.name}<span className="n">{f.n}</span>
            </button>
          )}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Sorted by most recent</div>
      </div>

      {/* TODAY */}
      <GroupHead label="Today" count="8" />
      {open["Today"] &&
      <div className="not-group">
      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd live">{Q.bell}</div>
        <div className="body">
          <div className="head">Live session starting in <b>37 minutes</b> · <b>Agile Coach Q&A with David Chen</b></div>
          <div className="meta">AI-Driven Digital Marketing · Module 2 · 4:00 PM ET</div>
        </div>
        <div className="when">Just now</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd mention">{Q.chat}</div>
        <div className="body">
          <div className="head"><b>Mara Vasquez</b> mentioned you in <b>Office hours this Thursday</b></div>
          <div className="meta">"@john-smith great question — let's pair on this Thursday"</div>
        </div>
        <div className="when">22 min ago</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd due">{Q.cal}</div>
        <div className="body">
          <div className="head"><b>Peer review</b> due tonight at <b>11:59 PM</b></div>
          <div className="meta">UX Research · 1 of 4 reviews complete</div>
        </div>
        <div className="when">1h ago</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd">{Q.chat}</div>
        <div className="body">
          <div className="head"><b>Riya Sharma</b> replied to your thread <b>Capstone brand candidates</b></div>
          <div className="meta">"+1 on Mercury — strong public material and a clean visual system"</div>
        </div>
        <div className="when">2h ago</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd cert">{Q.trophy}</div>
        <div className="body">
          <div className="head">You hit a <b>12-day streak</b> 🔥 — top 8% in your cohort this week</div>
          <div className="meta">Keep going to unlock the Consistent Learner badge at 30 days</div>
        </div>
        <div className="when">4h ago</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd">{Q.book}</div>
        <div className="body">
          <div className="head">New lesson available · <b>M2L4 · Cross-channel funnels with GenAI</b></div>
          <div className="meta">AI-Driven Digital Marketing · 22 min · Optional pre-read for Friday</div>
        </div>
        <div className="when">6h ago</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd">{Q.grid}</div>
        <div className="body">
          <div className="head"><b>Mara Vasquez</b> confirmed your mentor session for <b>May 2 · 3:00 PM</b></div>
          <div className="meta">45 min · Capstone framing · Bring a 1-page brief</div>
        </div>
        <div className="when">7h ago</div>
      </div>

      <div className="not-row unread">
        <span className="udot" />
        <div className="ic-rd mention">{Q.chat}</div>
        <div className="body">
          <div className="head"><b>Jamie Patel</b> mentioned you in <b>Notion + Make automation</b></div>
          <div className="meta">"@john-smith curious if you'd want to fork this for fintech reporting"</div>
        </div>
        <div className="when">8h ago</div>
      </div>
      </div>
      }

      {/* YESTERDAY */}
      <GroupHead label="Yesterday" count="3" />
      {open["Yesterday"] &&
      <div className="not-group">
      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd cert">{Q.trophy}</div>
        <div className="body">
          <div className="head">You earned <b>+85 XP</b> for completing M2L1 · Audience research with AI</div>
          <div className="meta">Streak day 11 logged</div>
        </div>
        <div className="when">Yesterday · 9:42 PM</div>
      </div>

      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd live">{Q.bell}</div>
        <div className="body">
          <div className="head">You're enrolled · <b>Capstone kickoff workshop</b> · Tue Apr 30 · 2 PM</div>
          <div className="meta">Optional · Recording will be posted within 24 hours</div>
        </div>
        <div className="when">Yesterday · 4:15 PM</div>
      </div>

      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd">{Q.chat}</div>
        <div className="body">
          <div className="head"><b>3 new replies</b> on threads you're following</div>
          <div className="meta">Capstone brand picks · Async standups · Module 2 reading list</div>
        </div>
        <div className="when">Yesterday · 11:08 AM</div>
      </div>
      </div>
      }

      {/* THIS WEEK */}
      <GroupHead label="This week" count="4" />
      {open["This week"] &&
      <div className="not-group">
      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd due">{Q.cal}</div>
        <div className="body">
          <div className="head"><b>Module 1 quiz</b> graded · 92% — well done!</div>
          <div className="meta">UX Research and Design Thinking</div>
        </div>
        <div className="when">2 days ago</div>
      </div>

      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd">{Q.book}</div>
        <div className="body">
          <div className="head">New course recommended · <b>Intro to Product Analytics</b></div>
          <div className="meta">Pairs well with your AI-Driven Marketing program</div>
        </div>
        <div className="when">3 days ago</div>
      </div>

      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd">{Q.grid}</div>
        <div className="body">
          <div className="head"><b>Theo Park</b> sent feedback on your resume draft</div>
          <div className="meta">3 inline comments · 1 page summary attached</div>
        </div>
        <div className="when">4 days ago</div>
      </div>

      <div className="not-row read">
        <span className="udot" />
        <div className="ic-rd cert">{Q.trophy}</div>
        <div className="body">
          <div className="head">Skill <b>Roadmapping</b> verified at Advanced</div>
          <div className="meta">Triggered by completing 3 graded artifacts at 90%+</div>
        </div>
        <div className="when">5 days ago</div>
      </div>
      </div>
      }
    </div>);

}

window.Notifications = Notifications;
