import "./FooterNav.css";

export interface FooterNavProps {
  /** Index of current unit (1-based). */
  unitNumber: number;
  /** Total units in the course. */
  unitTotal: number;
  /** Current unit's display name. */
  unitName: string;
  prevLabel?: string;
  nextLabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <path d="M9 3l-4 4 4 4" /> : <path d="M5 3l4 4-4 4" />}
  </svg>
);

/**
 * FooterNav — bottom prev/next bar.
 * Center cluster: "UNIT 5 / 11 · Product lifecycle with AI" (single line, Norman fix).
 */
export function FooterNav({
  unitNumber,
  unitTotal,
  unitName,
  prevLabel = "Previous",
  nextLabel = "Next",
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: FooterNavProps) {
  return (
    <footer className="v7-foot">
      <button type="button" className="v7-foot__btn" onClick={onPrev} disabled={prevDisabled}>
        <Chevron dir="left" />
        <span>{prevLabel}</span>
      </button>
      <div className="v7-foot__center num-tabular">
        <span className="v7-foot__count">UNIT {unitNumber} / {unitTotal}</span>
        <span className="v7-foot__sep" aria-hidden>·</span>
        <span className="v7-foot__name">{unitName}</span>
      </div>
      <button type="button" className="v7-foot__btn v7-foot__btn--primary" onClick={onNext} disabled={nextDisabled}>
        <span>{nextLabel}</span>
        <Chevron dir="right" />
      </button>
    </footer>
  );
}
