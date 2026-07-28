import "./NoteCard.css";

export interface NoteCardProps {
  /** mm:ss timestamp this note refers to */
  timestamp: string;
  body: string;
  onClick?: () => void;
  className?: string;
}

export function NoteCard({ timestamp, body, onClick, className = "" }: NoteCardProps) {
  return (
    <button type="button" className={["v7-note", className].filter(Boolean).join(" ")} onClick={onClick}>
      <span className="v7-note__ts num-tabular">{timestamp}</span>
      <span className="v7-note__body">{body}</span>
    </button>
  );
}
