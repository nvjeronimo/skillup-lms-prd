import { StatusIcon, StatusIconKind } from "../../atoms/StatusIcon/StatusIcon";
import { TopicTypeIcon, TopicType } from "../../atoms/TopicTypeIcon/TopicTypeIcon";
import { Bookmark } from "../../atoms/Bookmark/Bookmark";
import "./TopicUnitRow.css";

export type TopicUnitState = "success" | "active" | "notStarted" | "locked";

export interface TopicUnitRowProps {
  title: string;
  /** Plain duration label. e.g. "6 min". The TYPE is shown via the type icon — don't put it in duration. */
  duration?: string;
  type?: TopicType;
  state?: TopicUnitState;
  /** Optional sub-meta line, e.g. "Live session · 11:30 PM Apr 18, 2025". */
  meta?: string;
  bookmarked?: boolean;
  onBookmarkToggle?: (saved: boolean) => void;
  onClick?: () => void;
  /** Tooltip shown on locked rows. */
  lockedTooltip?: string;
  className?: string;
}

const STATE_TO_ICON: Record<TopicUnitState, StatusIconKind> = {
  success: "success",
  active: "active",
  notStarted: "notStarted",
  locked: "locked",
};

/**
 * TopicUnitRow — single row in the sidebar's module group.
 * Mirrors Nelson's `Topic-unit-row-status` (Property 1 = Success / Active / Not Started / Locked).
 */
export function TopicUnitRow({
  title,
  duration,
  type = "video",
  state = "notStarted",
  meta,
  bookmarked,
  onBookmarkToggle,
  onClick,
  lockedTooltip = "Complete previous module to unlock",
  className = "",
}: TopicUnitRowProps) {
  const cls = [
    "v7-unit",
    `v7-unit--${state}`,
    bookmarked && "v7-unit--bookmarked",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const isLocked = state === "locked";
  return (
    <div
      className={cls}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      aria-disabled={isLocked || undefined}
      title={isLocked ? lockedTooltip : undefined}
      onClick={isLocked ? undefined : onClick}
    >
      <StatusIcon kind={STATE_TO_ICON[state]} size={18} />
      <TopicTypeIcon type={type} size={14} />
      <div className="v7-unit__info">
        <div className="v7-unit__name">{title}</div>
        <div className="v7-unit__meta num-tabular">
          {meta ?? duration}
        </div>
      </div>
      <Bookmark saved={bookmarked} onToggle={onBookmarkToggle} />
    </div>
  );
}
