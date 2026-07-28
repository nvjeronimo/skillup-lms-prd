import { ButtonHTMLAttributes } from "react";
import "./Tab.css";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** Show small leading dot pip (used for indicating unread/active discussion). */
  pip?: boolean;
}

export function Tab({ active, pip, className = "", children, ...rest }: TabProps) {
  const cls = ["v7-tab", active && "v7-tab--active", className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} role="tab" aria-selected={active} {...rest}>
      {pip && <span className="v7-tab__pip" aria-hidden />}
      {children}
    </button>
  );
}

export interface TabStripProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function TabStrip({ children, className = "", ariaLabel = "Content tabs" }: TabStripProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={["v7-tab-strip", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
