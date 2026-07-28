import { ButtonHTMLAttributes, forwardRef } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show as icon-only square button (no padding inflation). */
  iconOnly?: boolean;
  /** Render leading icon node. */
  leading?: React.ReactNode;
}

/**
 * Button — primary interactive element.
 * Default: cyan accent on dark, darker cyan on light.
 * Use iconOnly + leading for icon buttons (sb-toggle, vc, etc.).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", iconOnly, leading, children, className = "", ...rest }, ref) => {
    const cls = [
      "v7-btn",
      `v7-btn--${variant}`,
      `v7-btn--${size}`,
      iconOnly && "v7-btn--icon",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <button ref={ref} className={cls} {...rest}>
        {leading && <span className="v7-btn__leading">{leading}</span>}
        {!iconOnly && children}
      </button>
    );
  }
);
Button.displayName = "Button";
