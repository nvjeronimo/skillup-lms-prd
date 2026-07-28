/* global React, Ic */
const { useState: useStateCal } = React;

function Calendar({ onNav }) {
  const Q = window.Ic || {};
  const [filter, setFilter] = useStateCal("All");
  const filters = ["All", "Live", "Due", "Office hours", "Peer"];

  return (
    <div className="wrap" data-screen-label="Calendar">
      <div className="page-eyebrow">Schedule · April 2026</div>
      <div className="page-hero-2col">
        <h1 className="page-h1">Up <em>next.</em></h1>
      </div>

      <div className="cal-toolbar">
        <div className="left">
          <h3>April 24 — May 8</h3>
          <div className="nav">
            <button>{Q.chevL}</button>
            <button>{Q.chevR}</button>
          </div>
        </div>
        <div className="cal-filters">
          {filters.map((f) =>
          <button key={f} className={"chip" + (filter === f ? " active" : "")} onClick={() => setFilter(f)}>
              {f === "Live" && <span className="dot" style={{ background: "var(--red-3)" }} />}
              {f === "Due" && <span className="dot" style={{ background: "var(--yel-3)" }} />}
              {f === "Office hours" && <span className="dot" style={{ background: "var(--p4)" }} />}
              {f === "Peer" && <span className="dot" style={{ background: "var(--p3)" }} />}
              {f}
            </button>
          )}
        </div>
      </div>

      {/* TODAY */}
      <div className="cal-day">
        <div className="cal-day-head today">
          <div className="num">24</div>
          <div className="nm">Wednesday</div>
          <div className="yr">Today · April 2026</div>
        </div>
        <div className="cal-events">
          <div className="cal-event">
            <div className="tm"><div className="start">11:00 AM</div><div className="end">1h</div></div>
            <div className="accent peer" />
            <div className="body">
              <div className="tag">Peer Review · UX Research</div>
              <div className="ttl">Review 3 classmates' persona research drafts</div>
              <div className="meta"><b>Async</b> · 3 of 4 reviewed · Due 11:59 PM</div>
            </div>
            <div className="right-col">
              <span className="badge">Async</span>
              <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>Open</button>
            </div>
          </div>
          <div className="cal-event">
            <div className="tm"><div className="start">4:00 PM</div><div className="end">30 min</div></div>
            <div className="accent live" />
            <div className="body">
              <div className="tag">Live Q&A · AI-Driven Marketing</div>
              <div className="ttl">Agile Coach Q&A with David Chen</div>
              <div className="meta"><b>Module 2</b> · Cohort A · Attendance required · Recording posted</div>
            </div>
            <div className="right-col">
              <span className="badge live">Live</span>
              <button className="btn-primary" style={{ padding: "8px 14px", fontSize: 12 }}>Join {Q.arrow}</button>
            </div>
          </div>
          <div className="cal-event">
            <div className="tm"><div className="start">11:59 PM</div><div className="end">Deadline</div></div>
            <div className="accent due" />
            <div className="body">
              <div className="tag">Assignment Due · UX Research</div>
              <div className="ttl">Persona research draft · Final submission</div>
              <div className="meta"><b>Module 1</b> · Submit PDF + 350-word reflection</div>
            </div>
            <div className="right-col">
              <span className="badge" style={{ background: "var(--yel-soft)", color: "var(--yel-2)" }}>Due tonight</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOMORROW */}
      <div className="cal-day">
        <div className="cal-day-head">
          <div className="num">25</div>
          <div className="nm">Thursday</div>
          <div className="yr">Tomorrow</div>
        </div>
        <div className="cal-events">
          <div className="cal-event">
            <div className="tm"><div className="start">10:00 AM</div><div className="end">45 min</div></div>
            <div className="accent office" />
            <div className="body">
              <div className="tag">Office Hours · Open Drop-in</div>
              <div className="ttl">Mara Vasquez · UX Research mentor</div>
              <div className="meta">3 / 8 slots booked · Drop in for portfolio feedback</div>
            </div>
            <div className="right-col">
              <span className="badge">Drop-in</span>
              <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>Reserve</button>
            </div>
          </div>
          <div className="cal-event">
            <div className="tm"><div className="start">2:00 PM</div><div className="end">90 min</div></div>
            <div className="accent live" />
            <div className="body">
              <div className="tag">Workshop · AI-Driven Marketing</div>
              <div className="ttl">Hands-on: Audience segmentation in Make.com</div>
              <div className="meta">Cohort A + B combined · Bring a brand brief · Recording optional</div>
            </div>
            <div className="right-col">
              <span className="badge live">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* FRIDAY */}
      <div className="cal-day">
        <div className="cal-day-head">
          <div className="num">26</div>
          <div className="nm">Friday</div>
          <div className="yr">April 2026</div>
        </div>
        <div className="cal-events">
          <div className="cal-event">
            <div className="tm"><div className="start">11:59 PM</div><div className="end">Deadline</div></div>
            <div className="accent due" />
            <div className="body">
              <div className="tag">Assignment Due · AI-Driven Marketing</div>
              <div className="ttl">Module 2 quiz + audience segmentation write-up</div>
              <div className="meta"><b>Module 2</b> · 350-word write-up · Submit before midnight</div>
            </div>
            <div className="right-col">
              <span className="badge" style={{ background: "var(--yel-soft)", color: "var(--yel-2)" }}>Due Fri</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUNDAY */}
      <div className="cal-day">
        <div className="cal-day-head">
          <div className="num">28</div>
          <div className="nm">Sunday</div>
          <div className="yr">April 2026</div>
        </div>
        <div className="cal-events">
          <div className="cal-event">
            <div className="tm"><div className="start">1:00 PM</div><div className="end">1h</div></div>
            <div className="accent office" />
            <div className="body">
              <div className="tag">Office Hours · Career Services</div>
              <div className="ttl">Resume Clinic with Theo Park</div>
              <div className="meta">Bring a current resume · 10 min slots · 4 / 12 booked</div>
            </div>
            <div className="right-col">
              <span className="badge">Drop-in</span>
            </div>
          </div>
        </div>
      </div>

      {/* TUESDAY */}
      <div className="cal-day">
        <div className="cal-day-head">
          <div className="num">30</div>
          <div className="nm">Tuesday</div>
          <div className="yr">April 2026</div>
        </div>
        <div className="cal-events">
          <div className="cal-event">
            <div className="tm"><div className="start">2:00 PM</div><div className="end">90 min</div></div>
            <div className="accent live" />
            <div className="body">
              <div className="tag">Live Workshop · AI-Driven Marketing</div>
              <div className="ttl">Capstone kickoff: Pick your brand</div>
              <div className="meta">Optional · Bring 3 brand candidates · Mentor matchmaking after</div>
            </div>
            <div className="right-col">
              <span className="badge live">Live</span>
            </div>
          </div>
          <div className="cal-event">
            <div className="tm"><div className="start">5:00 PM</div><div className="end">30 min</div></div>
            <div className="accent peer" />
            <div className="body">
              <div className="tag">Peer Group · UX Research</div>
              <div className="ttl">Cohort study group · Discovery techniques</div>
              <div className="meta">5 enrolled · Hosted by Riya Sharma · Casual</div>
            </div>
            <div className="right-col">
              <span className="badge">Peer</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAY 2 */}
      <div className="cal-day">
        <div className="cal-day-head">
          <div className="num">02</div>
          <div className="nm">Thursday</div>
          <div className="yr">May 2026</div>
        </div>
        <div className="cal-events">
          <div className="cal-event">
            <div className="tm"><div className="start">3:00 PM</div><div className="end">45 min</div></div>
            <div className="accent live" />
            <div className="body">
              <div className="tag">Mentor Session · 1:1</div>
              <div className="ttl">Capstone framing call with Mara Vasquez</div>
              <div className="meta">Confirmed · Bring a 1-page brief</div>
            </div>
            <div className="right-col">
              <span className="badge live">Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

window.Calendar = Calendar;
