import "./StatusIcon.css";

export type StatusIconKind = "success" | "active" | "notStarted" | "locked";

export interface StatusIconProps {
  kind?: StatusIconKind;
  size?: number;
  className?: string;
}

/**
 * StatusIcon — sidebar topic-row status mark.
 * Mirrors Nelson's `Status-Topic` Figma component (3 variants + Locked added).
 *
 *  - success     : green filled check (completed)
 *  - active      : cyan ring with inner dot (current)
 *  - notStarted  : empty ring (not yet attempted)
 *  - locked      : padlock outline (gated)
 */
export function StatusIcon({ kind = "notStarted", size = 18, className = "" }: StatusIconProps) {
  const cls = ["v7-status", `v7-status--${kind}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} style={{ width: size, height: size }} aria-hidden="true">
      {kind === "success" && (
        <svg viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="9" />
          <path d="M5 9.5l2.5 2.5L13 6.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {kind === "active" && (
        <svg viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="3.5" />
        </svg>
      )}
      {kind === "notStarted" && (
        <svg viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      {kind === "locked" && (
        <svg viewBox="0 0 18 18">
          <rect x="4" y="8" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </span>
  );
}
