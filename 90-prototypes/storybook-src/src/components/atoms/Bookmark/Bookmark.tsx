import "./Bookmark.css";

export interface BookmarkProps {
  saved?: boolean;
  size?: number;
  onToggle?: (saved: boolean) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Bookmark — sidebar topic-row bookmark toggle.
 * Mirrors Nelson's `Bookmark-Topic` (Saved=Yes / No variants).
 */
export function Bookmark({
  saved = false,
  size = 14,
  onToggle,
  className = "",
  "aria-label": ariaLabel,
}: BookmarkProps) {
  const cls = ["v7-bm", saved && "v7-bm--saved", className].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      className={cls}
      aria-pressed={saved}
      aria-label={ariaLabel ?? (saved ? "Remove bookmark" : "Add bookmark")}
      onClick={() => onToggle?.(!saved)}
      style={{ width: size, height: size + 2 }}
    >
      <svg viewBox="0 0 14 16" width="100%" height="100%" aria-hidden>
        {saved ? (
          <path d="M2 1h10v14l-5-3.5L2 15z" fill="currentColor" />
        ) : (
          <path d="M2 1h10v14l-5-3.5L2 15z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
