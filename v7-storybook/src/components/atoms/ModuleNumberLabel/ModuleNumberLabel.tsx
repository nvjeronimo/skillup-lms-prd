import { HTMLAttributes } from "react";
import "./ModuleNumberLabel.css";

export interface ModuleNumberLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Module number, displayed two-digit with leading zero. */
  number: number;
  /** Override the prefix label (defaults to "MODULE"). */
  prefix?: string;
}

/**
 * ModuleNumberLabel — small-caps eyebrow for module separators.
 * Outfit Medium 11px / 14% letter-spacing per the V7 chrome scale.
 */
export function ModuleNumberLabel({ number, prefix = "MODULE", className = "", ...rest }: ModuleNumberLabelProps) {
  const cls = ["v7-modnum", className].filter(Boolean).join(" ");
  const padded = String(number).padStart(2, "0");
  return (
    <span className={cls} {...rest}>
      {prefix} {padded}
    </span>
  );
}
