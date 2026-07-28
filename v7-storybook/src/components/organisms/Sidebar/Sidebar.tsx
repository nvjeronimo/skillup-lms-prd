import { ModuleAccordionHeader } from "../../molecules/ModuleAccordionHeader/ModuleAccordionHeader";
import { ModuleNumberLabel } from "../../atoms/ModuleNumberLabel/ModuleNumberLabel";
import { TopicUnitRow, TopicUnitState } from "../../molecules/TopicUnitRow/TopicUnitRow";
import { TopicType } from "../../atoms/TopicTypeIcon/TopicTypeIcon";
import { useState } from "react";
import "./Sidebar.css";

export interface SidebarUnit {
  id: string;
  title: string;
  duration?: string;
  type?: TopicType;
  state?: TopicUnitState;
  meta?: string;
  bookmarked?: boolean;
}
export interface SidebarModule {
  id: string;
  number: number;
  title: string;
  units: SidebarUnit[];
  defaultExpanded?: boolean;
}

export interface SidebarProps {
  courseEyebrow?: string;
  courseName: string;
  modules: SidebarModule[];
  activeUnitId?: string;
  onUnitClick?: (id: string) => void;
  className?: string;
}

/**
 * Sidebar — full course outline panel.
 * Modules are accordion-collapsible; current module is expanded by default.
 */
export function Sidebar({
  courseEyebrow = "Course",
  courseName,
  modules,
  activeUnitId,
  onUnitClick,
  className = "",
}: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    modules.reduce<Record<string, boolean>>((acc, m) => {
      acc[m.id] = m.defaultExpanded ?? m.units.some((u) => u.id === activeUnitId);
      return acc;
    }, {})
  );

  return (
    <aside className={["v7-sidebar", className].filter(Boolean).join(" ")} aria-label="Course outline">
      <div className="v7-sidebar__head">
        <div className="v7-sidebar__eyebrow">{courseEyebrow}</div>
        <div className="v7-sidebar__name">{courseName}</div>
      </div>

      <div className="v7-sidebar__scroll">
        {modules.map((m) => (
          <div key={m.id} className="v7-sidebar__module">
            <div className="v7-sidebar__modnum">
              <ModuleNumberLabel number={m.number} />
            </div>
            <ModuleAccordionHeader
              title={m.title}
              expanded={expanded[m.id]}
              meta={`${m.units.filter((u) => u.state === "success").length} / ${m.units.length}`}
              onToggle={(e) => setExpanded((prev) => ({ ...prev, [m.id]: e }))}
            />
            {expanded[m.id] && (
              <div className="v7-sidebar__rows">
                {m.units.map((u) => (
                  <TopicUnitRow
                    key={u.id}
                    title={u.title}
                    duration={u.duration}
                    type={u.type}
                    state={u.id === activeUnitId ? "active" : u.state}
                    meta={u.meta}
                    bookmarked={u.bookmarked}
                    onClick={() => onUnitClick?.(u.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
