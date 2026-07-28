/* global React, TopNav, Footer, CourseTile, Ring, SegBar, LiveBanner, I */
const { useState: useStateM, useMemo: useMemoM } = React;

function MyLearning({ onOpenProgram, onOpenImmersive, liveSession, onJoinLive }) {
  const [tab, setTab] = useStateM("Active");

  const programs = [
    { id: "aidm", title: "AI-Driven Digital Marketing Certificate", type: "Flexible + Live Sessions", progress: 27, status: "in-progress", nextLive: null, cohort: "Cohort Apr 2026", courses: 7, modules: 28 },
    { id: "cyber", title: "Cybersecurity Fundamentals Certificate", type: "Flexible + Live Sessions", progress: 0, status: "not-started", starts: "May 12" }
  ];
  const singleCourses = [
    { id: "uxr", title: "UX Research and Design Thinking", type: "Flexible + Live Sessions", progress: 5, nextLive: "Thu Apr 30 · 6 PM" },
    { id: "pmai", title: "Project Management with AI Tools", type: "Flexible + Live Sessions", progress: 35 },
    { id: "lead", title: "Leadership in Remote Teams", type: "Flexible Learning", progress: 52 },
    { id: "prod", title: "Intro to Product Analytics", type: "Flexible Learning", progress: 0, status: "not-started" },
    { id: "bap", title: "Business Analytics with Python", type: "Live Sessions", progress: 0, starts: "Apr 28", startsIn: 10, prework: true }
  ];

  return (
    <div className="page">
      <LiveBanner session={liveSession} onJoin={onJoinLive} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, alignItems: "center", marginTop: 32 }}>
        <div>
          <h1 className="h1">My Learning</h1>
          <p className="sub" style={{ marginTop: 6 }}>Everything you are enrolled in</p>
        </div>
        <div className="grid-stats-3">
          <div className="stat-card">
            <span className="stat-label"><span className="dot" />In progress</span>
            <span className="stat-value">4 Courses</span>
            <span className="stat-sub">1 program · 3 single courses</span>
          </div>
          <div className="stat-card">
            <span className="stat-label"><span className="dot sage" />Live attendance</span>
            <span className="stat-value">4 of 5 · 80%</span>
            <span className="stat-sub">1 missed · 7 more allowed program-wide</span>
          </div>
          <div className="stat-card alert">
            <span className="stat-label" style={{ color: "var(--accent-ink)" }}>
              <span className="dot" style={{ background: "var(--rose)" }} />Live now · Ends in 37 min
            </span>
            <span className="stat-value" style={{ fontSize: 18 }}>Agile Coach Q&A</span>
            <span className="stat-sub">Course 1 · Module 2 · David Chen · ends 4:30 PM ET</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="tabs">
          {[
            { k: "Active", count: 3 },
            { k: "Completed", count: 1 },
            { k: "Expired", count: 1 },
          ].map(t => (
            <button key={t.k} className={"tab" + (tab === t.k ? " active" : "")} onClick={() => setTab(t.k)}>
              {t.k} <span className="count">{t.count}</span>
            </button>
          ))}
          <div className="spacer" />
          <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 8 }}>
            <button className="btn btn-ghost btn-sm"><I.search width="14" height="14" /> Search</button>
            <button className="btn btn-ghost btn-sm">Sort: Recent</button>
          </div>
        </div>
      </div>

      {tab === "Active" && (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 28 }}>
          <section>
            <div className="meta" style={{ marginBottom: 12 }}>Programs</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {programs.map(p => (
                <ProgramRow key={p.id} program={p} onOpen={() => onOpenProgram(p.id)} />
              ))}
            </div>
          </section>
          <section>
            <div className="meta" style={{ marginBottom: 12 }}>Single courses</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {singleCourses.map(c => (
                <CourseRow key={c.id} course={c} onOpen={() => onOpenImmersive(c.id)} />
              ))}
            </div>
          </section>
        </div>
      )}
      {tab === "Completed" && (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <CourseRow course={{ id: "intro", title: "Intro to Data Storytelling", type: "Flexible Learning", progress: 100, completed: true, completedOn: "Feb 14, 2026" }} onOpen={() => {}} />
        </div>
      )}
      {tab === "Expired" && (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <CourseRow course={{ id: "exp", title: "Growth Experiments 101", type: "Live Sessions", progress: 45, expired: true, expiredOn: "Mar 20, 2026" }} onOpen={() => {}} />
        </div>
      )}
    </div>
  );
}

function ProgramRow({ program, onOpen }) {
  const done = program.status === "not-started";
  return (
    <div className="row card-hover" onClick={onOpen} style={{ cursor: "pointer" }}>
      <CourseTile title={program.title} size="sm" glyph={<I.cert />} />
      <div className="row-main">
        <div className="row-title">
          <span>{program.title}</span>
        </div>
        <div className="row-meta">
          <span className="badge badge-accent">{program.type}</span>
          <span>·</span>
          <span>Program</span>
          {program.cohort && <><span>·</span><span>{program.cohort}</span></>}
          {program.courses && <><span>·</span><span>{program.courses} courses</span></>}
        </div>
      </div>
      <div className="row-right">
        {program.status === "not-started" ? (
          <span className="badge">Not started · Starts {program.starts}</span>
        ) : (
          <div className="row-progress">
            <span className="num">{program.progress}%</span>
            <div className="pbar"><div className="pbar-fill" style={{ width: `${program.progress}%` }} /></div>
          </div>
        )}
        <button className="arrow-btn" aria-label="Open"><I.chevR width="16" height="16" /></button>
      </div>
    </div>
  );
}

function CourseRow({ course, onOpen }) {
  return (
    <div className="row card-hover" onClick={onOpen} style={{ cursor: "pointer" }}>
      <CourseTile title={course.title} size="sm" glyph={<I.book />} />
      <div className="row-main">
        <div className="row-title">
          <span>{course.title}</span>
          {course.prework && <span className="badge badge-amber">Pre-work available</span>}
        </div>
        <div className="row-meta">
          <span className="badge badge-accent">{course.type}</span>
          {course.nextLive && (
            <>
              <span>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                Next Live: {course.nextLive}
              </span>
            </>
          )}
          {course.completedOn && <><span>·</span><span>Completed {course.completedOn}</span></>}
          {course.expiredOn && <><span>·</span><span>Expired {course.expiredOn}</span></>}
        </div>
      </div>
      <div className="row-right">
        {course.starts ? (
          <span className="badge badge-amber">Starts in {course.startsIn} days ({course.starts})</span>
        ) : course.status === "not-started" ? (
          <span className="badge">Not started</span>
        ) : course.completed ? (
          <span className="badge badge-sage"><I.check width="10" height="10" /> Completed</span>
        ) : course.expired ? (
          <span className="badge badge-rose">Expired at {course.progress}%</span>
        ) : (
          <div className="row-progress">
            <span className="num">{course.progress}%</span>
            <div className="pbar"><div className="pbar-fill" style={{ width: `${course.progress}%` }} /></div>
          </div>
        )}
        <button className="arrow-btn" aria-label="Open"><I.chevR width="16" height="16" /></button>
      </div>
    </div>
  );
}

Object.assign(window, { MyLearning });
