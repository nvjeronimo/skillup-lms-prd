/* global React, Ic */
const { useState: useStateLS } = React;

function Lesson({ onNav }) {
  const Q = window.Ic || {};
  const [tab, setTab] = useStateLS("Transcript");
  const [aiOpen, setAiOpen] = useStateLS(true);

  const modules = [
    {
      title: "Module 1 — Foundations",
      items: [
        { t: "What AI can do for PMs", sub: "Video · 7m 24s", state: "done" },
        { t: "Limitations of GenAI", sub: "Video · 5m 18s", state: "done" },
        { t: "Chapter quiz", sub: "Quiz · 6 questions", state: "done" },
      ],
    },
    {
      title: "Module 2 — In Practice",
      items: [
        { t: "Ideation with ChatGPT", sub: "Video · 9m 02s", state: "active" },
        { t: "Process lifecycle with AI", sub: "Video · 7m 41s", state: "next", flag: true },
        { t: "User segmentation with AI", sub: "Video · 8m 12s", state: "locked" },
        { t: "Validating product ideas", sub: "Video · 6m 35s", state: "locked" },
        { t: "Prototyping with ChatGPT", sub: "Video · 7m 03s", state: "locked" },
        { t: "Chapter quiz", sub: "Quiz · 5 questions", state: "locked" },
      ],
    },
    {
      title: "Module 3 — Conclusion",
      items: [
        { t: "Taking your AI skills further", sub: "Video · 4m 18s", state: "locked" },
        { t: "Final test", sub: "Quiz · 8 questions", state: "locked" },
      ],
    },
  ];

  const transcript = [
    { t: "0:00", s: "Welcome back. In this unit we'll look at the product development lifecycle through the lens of AI-augmented workflows.", active: true },
    { t: "0:32", s: "Understanding this lifecycle is critical — it's the bedrock of every strong product manager once, from discovery to launch." },
    { t: "0:58", s: "The lifecycle begins long before any line is written — with deep understanding of customer needs and unmet jobs-to-be-done." },
    { t: "0:56", s: "Traditionally, this research phase was time-consuming — hours of interviews, synthesis workshops, affinity mapping." },
    { t: "1:14", s: "This is exactly where AI tools can dramatically compress the 'research' phase — turning 50 interviews into distilled themes in minutes." },
    { t: "1:34", s: "From there you move into 'ideation' — generating and stress-testing hypotheses about what the product should or could do for whom." },
    { t: "1:54", s: "ChatGPT is particularly powerful here. Give it your customer personas and you get 20+ product concepts in 60 seconds." },
    { t: "2:16", s: "Prototyping. Indie ideation — MVPs, click-throughs, paper prototypes — the place where you risked assumptions are 'truer' to build." },
    { t: "2:36", s: "Once you have a prototype, move to 'testing'. Dogfooding, then external pilots, gather signal, not just feedback." },
    { t: "2:54", s: "Finally, 'launch'. Remember — what is at the beginning of a new business cycle. Re-feeds straight back into discovery." },
    { t: "3:18", s: "Next we'll look at user segmentation — and how AI can identify segments you didn't even know existed in your data." },
  ];

  const myNotes = [
    { t: "0:32", s: "Lifecycle starts with customer understanding before any code." },
    { t: "1:14", s: "AI compresses research phase — synthesize at scale, not replacement." },
    { t: "2:16", s: "MVP = test riskiest assumption first.", flag: true },
  ];

  const aiChips = ["What makes a good MVP?", "AI in research", "Process lifecycle", "Validation crunches"];

  return (
    <div className="ls-shell" data-screen-label="Lesson Player">
      {/* ========= TOP CRUMB BAR ========= */}
      <div className="ls-crumb">
        <a onClick={() => onNav && onNav("course-detail")}>Gen AI my PMs</a>
        <span className="arr">{Q.chevR}</span>
        <a onClick={() => onNav && onNav("course-detail")}>Module 2</a>
        <span className="arr">{Q.chevR}</span>
        <span className="cur">Ideation with ChatGPT</span>
        <div className="ls-crumb-right">
          <button className="ls-icn" title="Toggle theater">{Q.expand || "⤢"}</button>
          <div className="ls-ava">JS</div>
        </div>
      </div>

      <div className="ls-grid" data-ai={aiOpen ? "open" : "closed"}>
        {/* ========= LEFT RAIL — OUTLINE ========= */}
        <aside className="ls-outline">
          <div className="ls-out-head">
            <div className="lab">Course</div>
            <div className="ttl">Generative AI for<br />Product Managers</div>
            <button className="ls-collapse" title="Collapse">{Q.chevL || "‹"}</button>
          </div>

          {modules.map((m, mi) => (
            <div key={mi} className="ls-mod">
              <div className="ls-mod-h">{m.title}</div>
              <div className="ls-mod-list">
                {m.items.map((it, ii) => (
                  <button key={ii} className={"ls-it " + it.state}>
                    <span className="dot">
                      {it.state === "done" && <span className="ck">✓</span>}
                      {it.state === "active" && <span className="play">▶</span>}
                      {it.state === "next" && <span className="ring" />}
                      {it.state === "locked" && <span className="lk" />}
                    </span>
                    <span className="meta">
                      <span className="t">{it.t}</span>
                      <span className="s">{it.sub}</span>
                    </span>
                    {it.flag && <span className="bk" title="Bookmarked" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* ========= CENTER — STAGE + TABS + FOOTER ========= */}
        <section className="ls-center">
          {/* Video stage */}
          <div className="ls-stage">
            <div className="ls-stage-grid" />
            <button className="ls-play-big" aria-label="Play">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor"><path d="M7 5v14l12-7z" /></svg>
            </button>
            <div className="ls-stage-cap">Ideation with ChatGPT</div>

            {/* Player chrome */}
            <div className="ls-player">
              <div className="ls-player-row">
                <button className="ls-pi">▶</button>
                <button className="ls-pi">⟲</button>
                <button className="ls-pi">⟳</button>
                <button className="ls-pi sm">1×</button>
                <div className="ls-scrub">
                  <div className="ls-scrub-track">
                    <div className="ls-scrub-fill" style={{ width: "32%" }} />
                    <div className="ls-scrub-knob" style={{ left: "32%" }} />
                  </div>
                </div>
                <div className="ls-time">0:00 / 9:02</div>
                <button className="ls-pi">CC</button>
                <button className="ls-pi">⚙</button>
                <button className="ls-pi">⤢</button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="ls-tabs">
            {["Transcript", "Notes", "Downloads", "Discussion"].map((x) => (
              <button key={x} className={"ls-tab " + (tab === x ? "active" : "")} onClick={() => setTab(x)}>
                {x}
                {x === "Discussion" && <span className="bdg">12</span>}
              </button>
            ))}
          </div>

          {/* Body — Transcript + My Notes */}
          <div className="ls-body">
            <div className="ls-trn">
              {transcript.map((r, i) => (
                <div key={i} className={"ls-trn-row " + (r.active ? "active" : "")}>
                  <div className="ts">{r.t}</div>
                  <div className="tx">{r.s}</div>
                </div>
              ))}
            </div>
            <aside className="ls-notes">
              <div className="ls-notes-h">My Notes</div>
              {myNotes.map((n, i) => (
                <div key={i} className="ls-note">
                  <div className="ts">{n.t}</div>
                  <div className="tx">
                    {n.s}
                    {n.flag && <span className="flag">★</span>}
                  </div>
                </div>
              ))}
              <button className="ls-note-add">＋ Add note at 6:00</button>
            </aside>
          </div>

          {/* Footer */}
          <div className="ls-foot">
            <button className="ls-prev">{Q.chevL || "‹"} Previous</button>
            <div className="ls-foot-mid">
              <div className="ls-foot-prog">
                <div className="track"><div className="fill" style={{ width: "60%" }} /></div>
              </div>
              <div className="ls-foot-meta">Unit <strong>4</strong> / 11 · <span>Ideation with ChatGPT</span></div>
            </div>
            <button className="ls-next">Next unit {Q.arrow || "→"}</button>
          </div>
        </section>

        {/* ========= RIGHT RAIL — AI ASSISTANT ========= */}
        {aiOpen && (
          <aside className="ls-ai">
            <div className="ls-ai-h">
              <div className="ls-ai-spark">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
                </svg>
              </div>
              <div className="ls-ai-ttl">AI Assistant</div>
              <button className="ls-ai-x" onClick={() => setAiOpen(false)}>Close</button>
            </div>

            <div className="ls-ai-sec">
              <div className="ls-ai-lab">Key takeaways</div>
              <ul className="ls-ai-bul">
                <li>A four-phase view of synthesis — turning hours of interviews into structured themes in minutes.</li>
                <li>The lifecycle starts before any code, customer needs &amp; jobs first, always.</li>
                <li>MVP = test riskiest assumption, not the smallest features to ship.</li>
                <li>'Build to learn' is more empathy than 'is it easy to build.'</li>
              </ul>
            </div>

            <div className="ls-ai-sec">
              <div className="ls-ai-lab">Ask about this video</div>
              <div className="ls-ai-chips">
                {aiChips.map((c, i) => <button key={i} className="ls-ai-chip">{c}</button>)}
              </div>
            </div>

            <div className="ls-ai-sec">
              <div className="ls-ai-lab">Related units</div>
              <div className="ls-ai-rel">
                <div className="rel">
                  <div className="rt">Ideation with ChatGPT</div>
                  <div className="rs">Module 2 · 9m 02s</div>
                </div>
                <div className="rel">
                  <div className="rt">Validating product ideas</div>
                  <div className="rs">Module 2 · 6m 35s</div>
                </div>
              </div>
            </div>

            <div className="ls-ai-sec">
              <div className="ls-ai-lab">Conversation</div>
              <div className="ls-ai-msg">
                Hi! No judgment is visible. Ask me anything about this process: lifecycle, AI tooling, or MVP strategy.
              </div>
            </div>

            <div className="ls-ai-input">
              <input placeholder="Ask about this video…" />
              <button>{Q.arrow || "↑"}</button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

window.Lesson = Lesson;
