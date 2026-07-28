import "./Breadcrumb.css";

export interface BreadcrumbProps {
  course: string;
  module: string;
  active: string;
  onCourseClick?: () => void;
  onModuleClick?: () => void;
  /** Show / hide ancestor crumbs explicitly (useful for stories at fixed widths). */
  showCourse?: boolean;
  showModule?: boolean;
  className?: string;
}

/**
 * Breadcrumb — 3-tier responsive truncation.
 *
 * Default behavior (driven by viewport width):
 *  - ≥960px : Course / Module / Unit (Unit truncates with ellipsis)
 *  - 640–960px : Module / Unit
 *  - ≤640px : Unit only
 *
 * Pass `showCourse` / `showModule` props to override responsive behavior
 * (used by Storybook variants and topbar `Show Course Crumb` / `Show Module Crumb`
 * boolean props on the Figma component).
 */
export function Breadcrumb({
  course,
  module,
  active,
  onCourseClick,
  onModuleClick,
  showCourse,
  showModule,
  className = "",
}: BreadcrumbProps) {
  const cls = [
    "v7-bc",
    showCourse === false && "v7-bc--no-course",
    showModule === false && "v7-bc--no-module",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <nav className={cls} aria-label="Breadcrumb">
      <button type="button" className="v7-bc__crumb v7-bc__crumb--link v7-bc__course" onClick={onCourseClick}>
        {course}
      </button>
      <span className="v7-bc__sep" aria-hidden>/</span>
      <button type="button" className="v7-bc__crumb v7-bc__crumb--link v7-bc__module" onClick={onModuleClick}>
        {module}
      </button>
      <span className="v7-bc__sep v7-bc__sep--module" aria-hidden>/</span>
      <span className="v7-bc__crumb v7-bc__crumb--active" title={active} aria-current="page">
        {active}
      </span>
    </nav>
  );
}
