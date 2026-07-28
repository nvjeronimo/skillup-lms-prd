import { HTMLAttributes } from "react";
import "./StepDot.css";

export type StepDotState = "default" | "current" | "done" | "wrong";

export interface StepDotProps extends HTMLAttributes<HTMLSpanElement> {
  state?: StepDotState;
  /** 1-indexed step number */
  index: number;
}

/**
 * StepDot — quiz progression marker.
 * Default empty circle, current shows the number, done shows ✓, wrong shows ✕.
 */
export function StepDot({ state = "default", index, className = "", ...rest }: StepDotProps) {
  const cls = ["v7-step-dot", `v7-step-dot--${state}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      <span>{index}</span>
    </span>
  );
}
