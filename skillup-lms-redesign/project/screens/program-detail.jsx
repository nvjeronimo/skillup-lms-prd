/* global React, CourseTile, Ring, SegBar, LiveBanner, I */
const { useState: useStatePD } = React;

function ProgramDetail({ onBack, onOpenCourse, liveSession, onJoinLive }) {
  const [tab, setTab] = useStatePD("Courses");

  const program = {
    title: "AI-Driven Digital Marketing Certificate",
    type: "Flexible + Live Sessions",
    cohort: "Cohort Apr 2026",
    started: "Started 3 weeks ago",
    by: "by SkillUp",
    progress: 27,
    week: 4,
    weeks: 32,
    coursesDone: 1,
    coursesTotal: 7,
    lessonsDone: 10,
    lessonsTotal: 64
  };

  const stats = [
    { label: "In progress", dot: "accent", value: "1 Course", sub: "Digital Marketing Fundamentals" },
    { label: "Live attendance", dot: "sage", value: "4 of 5 · 80%", sub: "1 missed · 7 more allowed program-wide" },
    { label: "Cohort pace", dot: "accent", value: "You 42% · Cohort 38%", sub: "Ahead of 68% of your cohort" },
    { label: "Time invested", dot: "amber", value: "6h 12m", sub: "of 89h 21m total" },
    { label: "Capstone", dot: "rose", value: "Oct 5 · Final Project", sub: "Unlocks after Course 6" }
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
      <LiveBannerSticky liveSession={liveSession} onJoinLive={onJoinLive} />
      <HeroDark program={program} stats={stats} onBack={onBack} />

      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="page" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="tabs" style={{ borderBottom: "none" }}>
            {[
              { k: "Courses" },
              { k: "Calendar", dot: 1 },
              { k: "Resources" },
              { k: "Projects" },
              { k: "Certificates" },
              { k: "1:1 Mentor" },
              { k: "FAQs" },
              { k: "Program Overview" },
            ].map(t => (
              <button key={t.k} className={"tab" + (tab === t.k ? " active" : "")} onClick={() => setTab(t.k)}>
                {t.k}
                {t.dot && <span className="count dot">{t.dot}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 28 }}>
        {tab === "Courses" && <CoursesTab courses={courses} onOpenCourse={onOpenCourse} />}
        {tab !== "Courses" && (
          <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--ink-3)" }}>
            <div style={{ fontSize: 15, color: "var(--ink-2)", fontWeight: 600, marginBottom: 4 }}>{tab}</div>
            <div>This tab is available in the full prototype.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function LiveBannerSticky({ liveSession, onJoinLive }) {
  return (
    <div style={{ padding: "16px 28px 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <LiveBanner session={liveSession} onJoin={onJoinLive} />
    </div>
  );
}

function HeroDark({ program, stats, onBack }) {
  return (
    <div style={{
      background: "linear-gradient(180deg, oklch(14% 0.02 50) 0%, oklch(10% 0.015 50) 100%)",
      color: "oklch(96% 0.01 70)",
      marginTop: 16,
      position: "relative",
      overflow: "hidden"
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(oklch(100% 0 0 / 0.04) 1px, transparent 1px)",
        backgroundSize: "4px 4px",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", right: -80, top: -80, width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, oklch(52% 0.18 var(--accent-h) / 0.35), transparent 70%)",
        pointerEvents: "none"
      }} />
      <div className="page" style={{ paddingTop: 32, paddingBottom: 32, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ color: "oklch(80% 0.02 70)" }}>
            <I.chevL width="14" height="14" /> Back to My Learning
          </button>
          <div className="spacer" />
          <button className="btn btn-outline btn-sm" style={{ background: "oklch(100% 0 0 / 0.05)", color: "oklch(94% 0.01 70)", borderColor: "oklch(100% 0 0 / 0.15)" }}>
            <I.share width="14" height="14" /> Share
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span className="badge" style={{ background: "oklch(100% 0 0 / 0.08)", color: "oklch(92% 0.02 70)" }}>
            <I.cert width="12" height="12" /> Program
          </span>
          <span className="badge badge-accent">{program.type}</span>
        </div>

        <h1 className="h1" style={{ fontSize: 42, color: "oklch(98% 0.005 70)" }}>{program.title}</h1>
        <p style={{ color: "oklch(75% 0.02 70)", marginTop: 10 }}>
          {program.cohort} · {program.started} · {program.by}
        </p>

        {/* Overall progress */}
        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 20 }}>
          <div>
            <div className="meta" style={{ color: "oklch(70% 0.02 70)", marginBottom: 8 }}>Overall progress</div>
            <div style={{ fontSize: 13, color: "oklch(78% 0.02 70)", marginBottom: 10 }}>
              Week {program.week} of {program.weeks} · {program.coursesDone} of {program.coursesTotal} courses · {program.lessonsDone} of {program.lessonsTotal} lessons
            </div>
            <div style={{
              height: 8, borderRadius: 999,
              background: "oklch(100% 0 0 / 0.08)",
              overflow: "hidden",
              width: "100%"
            }}>
              <div style={{
                height: "100%",
                width: `${program.progress}%`,
                background: "linear-gradient(90deg, var(--accent), oklch(70% 0.18 var(--accent-h)))",
                borderRadius: 999,
                boxShadow: "0 0 12px oklch(60% 0.2 var(--accent-h) / 0.6)"
              }} />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>{program.progress}%</div>
            <div style={{ fontSize: 12, color: "oklch(72% 0.02 70)" }}>of program complete</div>
          </div>
        </div>

        {/* Stat cards dark */}
        <div className="grid-stats-5" style={{ marginTop: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "oklch(100% 0 0 / 0.05)",
              border: "1px solid oklch(100% 0 0 / 0.08)",
              borderRadius: 16,
              padding: "14px 16px",
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(72% 0.02 70)", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%",
                  background: s.dot === "sage" ? "var(--sage)" :
                              s.dot === "amber" ? "var(--amber)" :
                              s.dot === "rose" ? "var(--rose)" : "var(--accent-2)" }} />
                {s.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", color: "oklch(98% 0.005 70)" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "oklch(70% 0.02 70)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesTab({ courses, onOpenCourse }) {
  return (
    <div>
      <div className="section-head">
        <h2 className="h2">6 Courses + 1 Capstone</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {courses.map((c, i) => <CourseRowDetail key={c.id} course={c} idx={i + 1} onOpen={() => onOpenCourse(c.id)} />)}
      </div>

      <div className="meta" style={{ marginTop: 32, marginBottom: 12 }}>Final projects</div>
      <div className="row" style={{ gridTemplateColumns: "auto 1fr auto" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "var(--amber-soft)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          color: "oklch(45% 0.13 60)"
        }}>
          <I.flag width="20" height="20" />
        </div>
        <div className="row-main">
          <div className="row-title">Capstone · Go-to-market plan</div>
          <div className="row-meta">
            <span>Present a full funnel strategy to live mentors · Builds on every module</span>
          </div>
        </div>
        <div className="row-right">
          <span className="badge badge-amber"><I.lock width="10" height="10" /> Unlocks Oct 5 or when all courses complete</span>
          <button className="btn btn-outline btn-sm">Details</button>
        </div>
      </div>

      {/* Attendance tracker */}
      <div style={{
        marginTop: 24,
        background: "linear-gradient(135deg, var(--amber-soft), oklch(97% 0.03 50))",
        border: "1px solid oklch(88% 0.06 60)",
        borderRadius: 16,
        padding: "16px 20px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 16,
        alignItems: "center"
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "oklch(100% 0 0 / 0.6)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "oklch(45% 0.13 60)" }}>
          <I.target width="20" height="20" />
        </div>
        <div>
          <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
            Attendance tracker
            <span className="badge badge-sage">4 of 5 attended</span>
            <span className="badge badge-amber">1 missed</span>
            <span className="badge">7 more allowed program-wide</span>
          </div>
          <div style={{ color: "var(--ink-3)", fontSize: 12.5, marginTop: 4 }}>Live attendance is mandatory. Exceeding 8 missed sessions puts your certificate at risk.</div>
        </div>
        <button className="btn btn-outline btn-sm">View all sessions</button>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <a href="#" className="link-arrow">View full syllabus →</a>
      </div>
    </div>
  );
}

function CourseRowDetail({ course, idx, onOpen }) {
  if (course.state === "active") {
    return (
      <div className="row current card-hover" onClick={onOpen} style={{ cursor: "pointer" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "var(--accent-soft)",
          color: "var(--accent)",
          fontWeight: 700, fontSize: 15,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: "1px solid oklch(88% 0.05 var(--accent-h))"
        }}>{idx}</div>
        <div className="row-main">
          <div className="row-title">
            <span>{course.title}</span>
            <span className="badge badge-accent">{course.type}</span>
          </div>
          <div className="row-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--accent-ink)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              In progress
            </span>
            <span>·</span><span>Module 2 · Lesson 3</span>
          </div>
        </div>
        <div className="row-right">
          <div className="row-progress">
            <span className="num">{course.progress}% complete</span>
            <div className="pbar"><div className="pbar-fill" style={{ width: `${course.progress}%` }} /></div>
          </div>
          <button className="btn btn-accent btn-sm">Resume <I.chevR width="12" height="12" /></button>
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "var(--surface-3)", color: "var(--ink-3)",
        fontWeight: 700, fontSize: 15,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>{idx}</div>
      <div className="row-main">
        <div className="row-title" style={{ color: "var(--ink-2)" }}>
          <span>{course.title}</span>
          <span className="badge badge-accent" style={{ opacity: 0.8 }}>{course.type}</span>
        </div>
      </div>
      <div className="row-right">
        <span className="badge badge-amber"><I.lock width="10" height="10" /> Unlocks {course.unlocks}</span>
        <button className="btn btn-outline btn-sm">Details</button>
      </div>
    </div>
  );
}

Object.assign(window, { ProgramDetail });
