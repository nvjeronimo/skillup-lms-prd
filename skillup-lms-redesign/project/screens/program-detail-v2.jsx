/* global React, CourseTile, LiveBanner, I */
const { useState: useStatePD2 } = React;

function ProgramDetailV2({ onBack, onOpenCourse, liveSession, onJoinLive }) {
  const [tab, setTab] = useStatePD2("Courses");

  const program = {
    title: "AI-Driven Digital Marketing Certificate",
    type: "Flexible + Live Sessions",
    cohort: "Cohort Apr 2026",
    started: "Started 3 weeks ago",
    by: "by SkillUp",
    progress: 27, week: 4, weeks: 32,
    coursesDone: 1, coursesTotal: 7, lessonsDone: 10, lessonsTotal: 64
  };
  const stats = [
    { label: "In progress", dot: "", value: "1 Course", sub: "Digital Marketing Fundamentals" },
    { label: "Live attendance", dot: "success", value: "4 of 5 · 80%", sub: "1 missed · 7 more allowed" },
    { label: "Cohort pace", dot: "", value: "You 42% · Cohort 38%", sub: "Ahead of 68% of cohort" },
    { label: "Time invested", dot: "warn", value: "6h 12m", sub: "of 89h 21m total" },
    { label: "Capstone", dot: "danger", value: "Oct 5 · Final Project", sub: "Unlocks after Course 6" }
  ];
  const courses = [
    { id: "dmf", title: "Digital Marketing Fundamentals", type: "Flexible + Live Sessions", progress: 40, state: "active" },
    { id: "ai-content", title: "AI-Driven Content and Brand Comms", type: "Flexible Learning", unlocks: "MAY 18", state: "locked" },
    { id: "seo", title: "SEO, GEO, Organic Growth", type: "Flexible Learning", unlocks: "JUN 15", state: "locked" },
    { id: "paid", title: "Paid Advertising, Media", type: "Live Sessions", unlocks: "JUL 13", state: "locked" },
    { id: "social", title: "Social Media, Ecommerce", type: "Flexible Learning", unlocks: "AUG 10", state: "locked" },
    { id: "email", title: "Email, CRM, Lifecycle", type: "Flexible + Live Sessions", unlocks: "SEP 7", state: "locked" }
  ];

  return (
    <div>
      <div style={{ padding: "14px 24px 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <LiveBanner session={liveSession} onJoin={onJoinLive} />
      </div>

      <div className="hero-dark" style={{ marginTop: 14 }}>
        <div className="page" style={{ paddingTop: 28, paddingBottom: 28, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <button onClick={onBack} className="btn btn-sm" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
              <I.chevL width="12" height="12" /> Back
            </button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              skillup / learning / program
            </span>
            <div className="spacer" />
            <button className="btn btn-sm" style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <I.share width="12" height="12" /> Share
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.15)" }}>
              <I.cert width="11" height="11" /> Program
            </span>
            <span className="badge badge-accent" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc", borderColor: "rgba(165,180,252,0.3)" }}>{program.type}</span>
          </div>

          <h1 className="h1" style={{ fontSize: 40, color: "white" }}>{program.title}</h1>
          <div style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 8 }}>
            {program.cohort} · {program.started} · {program.by}
          </div>

          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Overall progress</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 10, fontFamily: "var(--font-mono)" }}>
                Week {program.week}/{program.weeks} · {program.coursesDone}/{program.coursesTotal} courses · {program.lessonsDone}/{program.lessonsTotal} lessons
              </div>
              <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${program.progress}%`, background: "white", borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", color: "white", fontFamily: "var(--font)" }}>{program.progress}%</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>of program complete</div>
            </div>
          </div>

          <div className="grid-stats-5" style={{ marginTop: 22 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%",
                    background: s.dot === "success" ? "#22c55e" : s.dot === "warn" ? "#fbbf24" : s.dot === "danger" ? "#ef4444" : "#a5b4fc" }} />
                  {s.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", color: "white" }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="page" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="tabs" style={{ borderBottom: "none" }}>
            {[
              { k: "Courses" }, { k: "Calendar", dot: 1 }, { k: "Resources" }, { k: "Projects" },
              { k: "Certificates" }, { k: "1:1 Mentor" }, { k: "FAQs" }, { k: "Program Overview" },
            ].map(t => (
              <button key={t.k} className={"tab" + (tab === t.k ? " active" : "")} onClick={() => setTab(t.k)}>
                {t.k}{t.dot && <span className="count dot">{t.dot}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 26 }}>
        {tab === "Courses" && <CoursesTabV2 courses={courses} onOpenCourse={onOpenCourse} />}
        {tab !== "Courses" && (
          <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--ink-3)" }}>
            <div style={{ fontSize: 15, color: "var(--ink-2)", fontWeight: 500, marginBottom: 4 }}>{tab}</div>
            <div style={{ fontSize: 13 }}>This tab is available in the full prototype.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function CoursesTabV2({ courses, onOpenCourse }) {
  return (
    <div>
      <div className="section-head">
        <div>
          <h2 className="h2">Courses</h2>
          <div className="meta" style={{ marginTop: 4 }}>6 courses + 1 capstone</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {courses.map((c, i) => <CourseRowDetailV2 key={c.id} course={c} idx={i + 1} onOpen={() => onOpenCourse(c.id)} />)}
      </div>

      <div className="meta" style={{ marginTop: 28, marginBottom: 10 }}>Final project</div>
      <div className="row">
        <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--warn-soft)", border: "1px solid #fde68a", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--warn)" }}>
          <I.flag width="18" height="18" />
        </div>
        <div className="row-main">
          <div className="row-title">Capstone · Go-to-market plan</div>
          <div className="row-meta"><span>Full funnel strategy presented to live mentors · builds on every module</span></div>
        </div>
        <div className="row-right">
          <span className="badge badge-warn"><I.lock width="10" height="10" /> Unlocks Oct 5 / on completion</span>
          <button className="btn btn-outline btn-sm">Details</button>
        </div>
      </div>

      <div style={{ marginTop: 20, background: "var(--warn-soft)", border: "1px solid #fde68a", borderRadius: 8, padding: "14px 18px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 6, background: "white", border: "1px solid #fde68a", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--warn)" }}>
          <I.target width="18" height="18" />
        </div>
        <div>
          <div style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
            Attendance tracker
            <span className="badge badge-success">4 of 5 attended</span>
            <span className="badge badge-warn">1 missed</span>
            <span className="badge">7 more allowed</span>
          </div>
          <div style={{ color: "var(--ink-3)", fontSize: 12, marginTop: 4 }}>Live attendance is mandatory. Exceeding 8 missed sessions puts your certificate at risk.</div>
        </div>
        <button className="btn btn-outline btn-sm">View sessions</button>
      </div>

      <div style={{ textAlign: "center", marginTop: 26 }}>
        <a href="#" className="link-arrow">View full syllabus →</a>
      </div>
    </div>
  );
}

function CourseRowDetailV2({ course, idx, onOpen }) {
  if (course.state === "active") {
    return (
      <div className="row current card-hover" onClick={onOpen} style={{ cursor: "pointer" }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--ink)", color: "white", fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)" }}>{String(idx).padStart(2,"0")}</div>
        <div className="row-main">
          <div className="row-title">
            <span>{course.title}</span>
            <span className="badge badge-accent">{course.type}</span>
          </div>
          <div className="row-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--ink)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
              in_progress
            </span>
            <span className="sep">/</span><span>module_02</span><span className="sep">/</span><span>lesson_03</span>
          </div>
        </div>
        <div className="row-right">
          <div className="row-progress">
            <span className="num">{course.progress}% complete</span>
            <div className="pbar"><div className="pbar-fill accent" style={{ width: `${course.progress}%` }} /></div>
          </div>
          <button className="btn btn-primary btn-sm">Resume <I.chevR width="11" height="11" /></button>
        </div>
      </div>
    );
  }
  return (
    <div className="row" style={{ opacity: 0.8 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--surface-3)", border: "1px solid var(--border)", color: "var(--ink-3)", fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)" }}>{String(idx).padStart(2,"0")}</div>
      <div className="row-main">
        <div className="row-title" style={{ color: "var(--ink-2)" }}>
          <span>{course.title}</span>
          <span className="badge">{course.type}</span>
        </div>
      </div>
      <div className="row-right">
        <span className="badge badge-warn"><I.lock width="10" height="10" /> Unlocks {course.unlocks}</span>
        <button className="btn btn-outline btn-sm">Details</button>
      </div>
    </div>
  );
}

Object.assign(window, { ProgramDetailV2 });
