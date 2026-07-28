import { HTMLAttributes } from "react";
import "./Badge.css";

export type BadgeTone = "neutral" | "accent" | "success" | "amber" | "red" | "live";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Adds the small leading dot used for "LIVE" / "NOW" indicators */
  withDot?: boolean;
}

/**
 * Badge — small label chip used for status, type, and meta tags.
 * Outfit small-caps tier with tabular numerics.
 */
export function Badge({ tone = "neutral", withDot, className = "", children, ...rest }: BadgeProps) {
  const cls = ["v7-badge", `v7-badge--${tone}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {withDot && <span className="v7-badge__dot" aria-hidden />}
      {children}
    </span>
  );
}
