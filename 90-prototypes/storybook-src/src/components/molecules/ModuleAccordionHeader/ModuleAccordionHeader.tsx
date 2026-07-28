import "./ModuleAccordionHeader.css";

export interface ModuleAccordionHeaderProps {
  title: string;
  expanded?: boolean;
  /** Optional unit count meta to right of the chevron, e.g. "3 / 5 done". */
  meta?: string;
  onToggle?: (expanded: boolean) => void;
  className?: string;
}

/**
 * ModuleAccordionHeader — sidebar module header with expand/collapse chevron.
 * Module Number eyebrow lives as a separate `ModuleNumberLabel` atom — keep them composed,
 * not merged.
 */
export function ModuleAccordionHeader({
  title,
  expanded = true,
  meta,
  onToggle,
  className = "",
}: ModuleAccordionHeaderProps) {
  const cls = ["v7-modhd", expanded && "v7-modhd--expanded", className].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      className={cls}
      aria-expanded={expanded}
      onClick={() => onToggle?.(!expanded)}
    >
      <span className="v7-modhd__title">{title}</span>
      {meta && <span className="v7-modhd__meta num-tabular">{meta}</span>}
      <svg className="v7-modhd__chev" viewBox="0 0 12 12" width="12" height="12" aria-hidden>
        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
