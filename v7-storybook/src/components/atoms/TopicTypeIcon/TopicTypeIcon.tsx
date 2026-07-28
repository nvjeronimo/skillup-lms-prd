import "./TopicTypeIcon.css";

export type TopicType = "video" | "quiz" | "practice" | "lab" | "reading" | "live" | "recording";

export interface TopicTypeIconProps {
  type: TopicType;
  size?: number;
  className?: string;
}

const ICONS: Record<TopicType, React.ReactNode> = {
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" /><path d="m22 8-6 4 6 4z" />
    </svg>
  ),
  quiz: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
    </svg>
  ),
  practice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" />
    </svg>
  ),
  lab: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v8L4 22h16L14 10V2" /><path d="M8 2h8" />
    </svg>
  ),
  reading: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  live: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10v4a3 3 0 0 1-6 0v-4" /><circle cx="12" cy="7" r="3" /><path d="M5 18a9 9 0 0 1 14 0" />
    </svg>
  ),
  recording: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
};

/**
 * TopicTypeIcon — content-type marker shown next to topic titles.
 * Mirrors Nelson's `Topic-Types` Figma set: 7 variants.
 */
export function TopicTypeIcon({ type, size = 16, className = "" }: TopicTypeIconProps) {
  const cls = ["v7-topic-icon", `v7-topic-icon--${type}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} style={{ width: size, height: size }} aria-label={type}>
      {ICONS[type]}
    </span>
  );
}
