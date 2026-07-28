import { HTMLAttributes } from "react";
import "./ProgressBar.css";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value: number;
  label?: string;
  /** Track width override (default 88px to match topbar). */
  width?: number | string;
  /** Hide the leading numeric label. */
  hideLabel?: boolean;
}

/**
 * ProgressBar — linear progress with optional label.
 * Default size matches topbar usage (88px track, 4px height).
 * Fill uses linear gradient (accent2 → accent) for subtle depth.
 */
export function ProgressBar({ value, label, width, hideLabel, className = "", ...rest }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const cls = ["v7-prog", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      {!hideLabel && <span className="v7-prog__label num-tabular">{label ?? `${Math.round(clamped)}%`}</span>}
      <div className="v7-prog__track" style={width ? { width } : undefined}>
        <div className="v7-prog__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
