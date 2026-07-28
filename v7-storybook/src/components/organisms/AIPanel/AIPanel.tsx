import { Badge } from "../../atoms/Badge/Badge";
import "./AIPanel.css";

export interface AIPanelProps {
  showTakeaways?: boolean;
  showAsk?: boolean;
  showRelated?: boolean;
  showConversation?: boolean;
  takeaways?: string[];
  askChips?: string[];
  related?: { title: string; meta: string }[];
  /** Conversation thread of alternating user / assistant turns. */
  messages?: { from: "user" | "ai"; text: string }[];
  onClose?: () => void;
  onAsk?: (q: string) => void;
}

const SparkIcon = () => (
  <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 1v3M7 10v3M1 7h3M10 7h3" strokeLinecap="round" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
);

/**
 * AIPanel — right-rail AI assistant.
 * Four cards (toggleable via boolean props mirroring Figma):
 *   1. Key takeaways
 *   2. Ask about this video (suggestion chips)
 *   3. Related units
 *   4. Conversation thread
 */
export function AIPanel({
  showTakeaways = true,
  showAsk = true,
  showRelated = true,
  showConversation = true,
  takeaways = [
    "AI augments — does not replace — the PM's judgment in discovery.",
    "Validation should still rest on real user evidence, not generated assumptions.",
    "Production guardrails matter more than model choice for shipped features.",
  ],
  askChips = [
    "Summarize this video",
    "What's the key insight?",
    "Generate practice questions",
  ],
  related = [
    { title: "AI in discovery: stop guessing", meta: "Video · 4 min" },
    { title: "Validating with synthetic users", meta: "Reading · 6 min" },
  ],
  messages = [],
  onClose,
  onAsk,
}: AIPanelProps) {
  return (
    <aside className="v7-ai" aria-label="AI assistant">
      <div className="v7-ai__head">
        <span className="v7-ai__live" aria-hidden />
        <span className="v7-ai__title">AI Assistant</span>
        <Badge tone="accent">XBLOCK</Badge>
        <button type="button" className="v7-ai__close" aria-label="Close panel" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="v7-ai__body">
        {showTakeaways && (
          <section className="v7-ai__card">
            <div className="v7-ai__card-title">Key takeaways</div>
            <ul className="v7-ai__list">
              {takeaways.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>
        )}

        {showAsk && (
          <section className="v7-ai__card">
            <div className="v7-ai__card-title">Ask about this video</div>
            <div className="v7-ai__chips">
              {askChips.map((c) => (
                <button key={c} type="button" className="v7-ai__chip" onClick={() => onAsk?.(c)}>
                  {c}
                </button>
              ))}
            </div>
          </section>
        )}

        {showRelated && (
          <section className="v7-ai__card">
            <div className="v7-ai__card-title">Related units</div>
            <div className="v7-ai__related">
              {related.map((r, i) => (
                <button key={i} type="button" className="v7-ai__related-row">
                  <span className="v7-ai__related-title">{r.title}</span>
                  <span className="v7-ai__related-meta num-tabular">{r.meta}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {showConversation && messages.length > 0 && (
          <section className="v7-ai__convo">
            {messages.map((m, i) => (
              <div key={i} className={`v7-ai__msg v7-ai__msg--${m.from}`}>
                {m.text}
              </div>
            ))}
          </section>
        )}
      </div>

      <form
        className="v7-ai__input"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const q = String(fd.get("q") ?? "").trim();
          if (q) onAsk?.(q);
          e.currentTarget.reset();
        }}
      >
        <span className="v7-ai__input-icon"><SparkIcon /></span>
        <input name="q" placeholder="Ask anything about this video…" autoComplete="off" />
      </form>
    </aside>
  );
}
