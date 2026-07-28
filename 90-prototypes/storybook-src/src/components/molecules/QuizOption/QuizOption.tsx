import "./QuizOption.css";

export type QuizOptionState = "default" | "selected" | "correct" | "wrong" | "revealedCorrect";

export interface QuizOptionProps {
  letter: string;
  label: string;
  state?: QuizOptionState;
  onClick?: () => void;
  /** Optional explanation shown beneath in revealed state. */
  explanation?: string;
  className?: string;
}

/**
 * QuizOption — single answer button.
 * States: default, selected, revealed-correct (was selected & correct), correct
 * (correct answer when user picked wrong), wrong (selected wrong answer).
 */
export function QuizOption({
  letter,
  label,
  state = "default",
  onClick,
  explanation,
  className = "",
}: QuizOptionProps) {
  const cls = ["v7-qopt", `v7-qopt--${state}`, className].filter(Boolean).join(" ");
  const disabled = state !== "default" && state !== "selected";
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      <span className="v7-qopt__letter">{letter}</span>
      <span className="v7-qopt__body">
        <span className="v7-qopt__label">{label}</span>
        {explanation && <span className="v7-qopt__exp">{explanation}</span>}
      </span>
      {state === "revealedCorrect" && <span className="v7-qopt__mark v7-qopt__mark--ok">✓</span>}
      {state === "correct" && <span className="v7-qopt__mark v7-qopt__mark--ok">✓</span>}
      {state === "wrong" && <span className="v7-qopt__mark v7-qopt__mark--no">✕</span>}
    </button>
  );
}
