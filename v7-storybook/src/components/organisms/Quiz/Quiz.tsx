import { StepDot } from "../../atoms/StepDot/StepDot";
import { QuizOption, QuizOptionState } from "../../molecules/QuizOption/QuizOption";
import { Button } from "../../atoms/Button/Button";
import "./Quiz.css";

export type QuizPhase = "start" | "question" | "revealed" | "results";

export interface QuizQuestion {
  prompt: string;
  options: { letter: string; label: string; correct?: boolean }[];
  /** Index of selected option (revealed state) */
  selectedIndex?: number;
  /** Optional explanation shown in revealed state */
  explanation?: string;
}

export interface QuizProps {
  phase: QuizPhase;
  /** Quiz title shown on start. */
  title?: string;
  /** Total question count (used by start screen + step rail). */
  total: number;
  /** Current question index (1-based) for question/revealed phases. */
  current?: number;
  /** Step states for the rail (length = total). */
  stepStates?: ("default" | "current" | "done" | "wrong")[];
  question?: QuizQuestion;
  /** Results data (used in results phase). */
  results?: {
    correct: number;
    /** Max score = total */
    passed?: boolean;
  };
  onStart?: () => void;
  onSubmit?: (selectedIndex: number) => void;
  onNext?: () => void;
  onRetake?: () => void;
}

/**
 * Quiz — full quiz module covering the four V7 quiz states.
 * Composes StepDot rail + QuizOption + Button.
 */
export function Quiz({
  phase,
  title = "Module 2 quiz",
  total,
  current = 1,
  stepStates,
  question,
  results,
  onStart,
  onSubmit,
  onNext,
  onRetake,
}: QuizProps) {
  if (phase === "start") {
    return (
      <div className="v7-quiz">
        <div className="v7-quiz__hero">
          <div className="v7-quiz__eyebrow">CHAPTER QUIZ</div>
          <h2 className="v7-quiz__display">{title}</h2>
          <p className="v7-quiz__lede">
            {total} questions · about {Math.max(3, total * 1)} minutes · unlimited retakes
          </p>
          <div className="v7-quiz__cta">
            <Button variant="primary" size="lg" onClick={onStart}>Start quiz</Button>
            <Button variant="ghost" size="lg">Skip for now</Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results" && results) {
    const pct = Math.round((results.correct / total) * 100);
    return (
      <div className="v7-quiz">
        <div className="v7-quiz__results">
          <div className="v7-quiz__ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" stroke="var(--surface)" strokeWidth="10" fill="none" />
              <circle
                cx="60" cy="60" r="52"
                stroke="var(--accent)" strokeWidth="10" fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={(2 * Math.PI * 52) * (1 - pct / 100)}
              />
            </svg>
            <div className="v7-quiz__score">
              <span className="v7-quiz__score-num num-tabular">{results.correct}</span>
              <span className="v7-quiz__score-denom num-tabular">/ {total}</span>
            </div>
          </div>
          <h2 className="v7-quiz__display">{results.passed === false ? "Almost there" : "Nice work"}</h2>
          <p className="v7-quiz__lede">
            You answered {results.correct} of {total} correctly ({pct}%).
          </p>
          <div className="v7-quiz__cta">
            <Button variant="secondary" onClick={onRetake}>Retake quiz</Button>
            <Button variant="primary" onClick={onNext}>Next unit →</Button>
          </div>
        </div>
      </div>
    );
  }

  // question + revealed share layout
  const isRevealed = phase === "revealed";
  const correctIdx = question?.options.findIndex((o) => o.correct) ?? -1;
  return (
    <div className="v7-quiz">
      <div className="v7-quiz__rail" role="list" aria-label="Question progress">
        {Array.from({ length: total }).map((_, i) => {
          const idx = i + 1;
          const state = stepStates?.[i] ?? (idx === current ? "current" : "default");
          return <StepDot key={i} index={idx} state={state} />;
        })}
      </div>
      <div className="v7-quiz__qhead">
        <span className="v7-quiz__num num-tabular">QUESTION {current} / {total}</span>
        <h3 className="v7-quiz__prompt">{question?.prompt}</h3>
      </div>
      <div className="v7-quiz__opts">
        {question?.options.map((o, i) => {
          let state: QuizOptionState = "default";
          if (isRevealed) {
            if (question.selectedIndex === i && o.correct) state = "revealedCorrect";
            else if (question.selectedIndex === i && !o.correct) state = "wrong";
            else if (i === correctIdx) state = "correct";
          } else if (question.selectedIndex === i) {
            state = "selected";
          }
          return (
            <QuizOption
              key={o.letter}
              letter={o.letter}
              label={o.label}
              state={state}
              explanation={isRevealed && (state === "revealedCorrect" || state === "wrong") ? question.explanation : undefined}
              onClick={!isRevealed ? () => onSubmit?.(i) : undefined}
            />
          );
        })}
      </div>
      {isRevealed && (
        <div className="v7-quiz__cta">
          <Button variant="primary" onClick={onNext}>{current === total ? "See results" : "Next question →"}</Button>
        </div>
      )}
    </div>
  );
}
