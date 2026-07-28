import "./VideoPlayer.css";

export interface VideoPlayerProps {
  title: string;
  /** "MODULE 02" eyebrow */
  moduleLabel?: string;
  /** Position seconds */
  position?: number;
  /** Duration seconds */
  duration?: number;
  speed?: 0.75 | 1 | 1.25 | 1.5 | 2;
  ccOn?: boolean;
  isPlaying?: boolean;
  onPlayToggle?: () => void;
}

const formatTime = (s: number) => {
  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = Math.floor(s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

const PlayIcon = ({ playing }: { playing: boolean }) => (
  playing ? (
    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
  ) : (
    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M4 2v12l11-6z" /></svg>
  )
);

/**
 * VideoPlayer — content area video stage + controls.
 * Visual placeholder for the actual video element. Real implementation will mount
 * an OpenEdX XBlock player here; the surrounding chrome is what this component owns.
 */
export function VideoPlayer({
  title,
  moduleLabel = "MODULE 02",
  position = 80,
  duration = 200,
  speed = 1,
  ccOn = true,
  isPlaying = false,
  onPlayToggle,
}: VideoPlayerProps) {
  const pct = Math.min(100, Math.max(0, (position / duration) * 100));
  return (
    <div className="v7-video">
      <div className="v7-video__stage">
        <div className="v7-video__bg" aria-hidden />
        <div className="v7-video__grid" aria-hidden />
        <div className="v7-video__label">
          <div className="v7-video__module">{moduleLabel}</div>
          <div className="v7-video__title">{title}</div>
        </div>
        <button type="button" className="v7-video__play" onClick={onPlayToggle} aria-label={isPlaying ? "Pause" : "Play"}>
          <PlayIcon playing={isPlaying} />
        </button>
      </div>

      <div className="v7-video__controls">
        <div className="v7-video__seek-row">
          <div className="v7-video__seek-track">
            <div className="v7-video__seek-fill" style={{ width: `${pct}%` }} />
            <div className="v7-video__seek-thumb" style={{ left: `${pct}%` }} />
          </div>
        </div>
        <div className="v7-video__btn-row">
          <button type="button" className="v7-video__ctrl" aria-label={isPlaying ? "Pause" : "Play"} onClick={onPlayToggle}>
            <PlayIcon playing={isPlaying} />
          </button>
          <span className="v7-video__time num-tabular">{formatTime(position)} / {formatTime(duration)}</span>
          <span style={{ flex: 1 }} />
          <button type="button" className={`v7-video__ctrl ${ccOn ? "v7-video__ctrl--on" : ""}`} aria-pressed={ccOn} aria-label="Captions">CC</button>
          <button type="button" className="v7-video__speed" aria-label="Playback speed">{speed}×</button>
          <button type="button" className="v7-video__ctrl" aria-label="Fullscreen">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 5V2h3M11 2h3v3M14 11v3h-3M5 14H2v-3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
