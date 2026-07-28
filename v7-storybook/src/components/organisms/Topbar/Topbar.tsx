import { Breadcrumb } from "../../molecules/Breadcrumb/Breadcrumb";
import { ProgressBar } from "../../atoms/ProgressBar/ProgressBar";
import "./Topbar.css";

export interface TopbarProps {
  course: string;
  module: string;
  active: string;
  /** 0–100 */
  progress?: number;
  theme?: "dark" | "light";
  onThemeToggle?: () => void;
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
  onAIToggle?: () => void;
  aiOpen?: boolean;
  /** Visibility toggles mirror the Figma component boolean props. */
  showWordmark?: boolean;
  showCourseCrumb?: boolean;
  showModuleCrumb?: boolean;
  showAIToggle?: boolean;
  showProgress?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  /** Avatar initials (or pass a node via avatarSlot). */
  initials?: string;
  avatarSlot?: React.ReactNode;
}

const PanelIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="12" height="10" rx="1.5" />
    <line x1="6" y1="3" x2="6" y2="13" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 9.5A6 6 0 0 1 6.5 2 6 6 0 1 0 14 9.5z" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 2v4M8 10v4M2 8h4M10 8h4M4 4l2.5 2.5M9.5 9.5L12 12M4 12l2.5-2.5M9.5 6.5L12 4" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

/**
 * Topbar — top bar for the immersive course player.
 * Composes: sidebar toggle, brand/wordmark, breadcrumb, progress, theme toggle, AI toggle, avatar.
 *
 * Boolean props (`showWordmark`, `showCourseCrumb`, `showModuleCrumb`, `showAIToggle`, `showClose`)
 * mirror the Figma component variants — used to express responsive variants without a separate component.
 */
export function Topbar({
  course,
  module,
  active,
  progress,
  theme = "dark",
  onThemeToggle,
  onSidebarToggle,
  sidebarOpen = true,
  onAIToggle,
  aiOpen = true,
  showWordmark = true,
  showCourseCrumb = true,
  showModuleCrumb = true,
  showAIToggle = true,
  showProgress = true,
  showClose = false,
  onClose,
  initials = "NJ",
  avatarSlot,
}: TopbarProps) {
  return (
    <div className="v7-topbar">
      <div className="v7-topbar__left">
        <button
          type="button"
          className="v7-topbar__icon-btn"
          aria-expanded={sidebarOpen}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={onSidebarToggle}
        >
          <PanelIcon />
        </button>
        {showWordmark && (
          <span className="v7-topbar__brand">
            <span className="v7-topbar__brand-skill">Skill</span>
            <span className="v7-topbar__brand-up">Up</span>
          </span>
        )}
      </div>

      <div className="v7-topbar__center">
        <Breadcrumb
          course={course}
          module={module}
          active={active}
          showCourse={showCourseCrumb}
          showModule={showModuleCrumb}
        />
      </div>

      <div className="v7-topbar__right">
        {showProgress && progress !== undefined && (
          <ProgressBar value={progress} />
        )}
        <button type="button" className="v7-topbar__pill" onClick={onThemeToggle} aria-label="Toggle theme">
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          <span>{theme === "dark" ? "Dark" : "Light"}</span>
        </button>
        {showAIToggle && (
          <button
            type="button"
            className="v7-topbar__icon-btn"
            aria-pressed={aiOpen}
            aria-label="Toggle AI assistant panel"
            onClick={onAIToggle}
          >
            <SparkIcon />
          </button>
        )}
        {showClose && (
          <button type="button" className="v7-topbar__icon-btn" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        )}
        {avatarSlot ?? <span className="v7-topbar__avatar" aria-label={`User ${initials}`}>{initials}</span>}
      </div>
    </div>
  );
}
