import "./TranscriptLine.css";

export interface TranscriptLineProps {
  /** mm:ss timestamp */
  timestamp: string;
  text: string;
  state?: "past" | "active" | "upcoming";
  onClick?: () => void;
  className?: string;
}

/**
 * TranscriptLine — click-to-seek transcript row.
 * Active: cyan highlight + bold timestamp.
 * Past: dimmed.
 */
export function TranscriptLine({ timestamp, text, state = "upcoming", onClick, className = "" }: TranscriptLineProps) {
  const cls = ["v7-tl", state === "past" && "v7-tl--past", state === "active" && "v7-tl--active", className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} onClick={onClick}>
      <span className="v7-tl__ts num-tabular">{timestamp}</span>
      <span className="v7-tl__text">{text}</span>
    </button>
  );
}
