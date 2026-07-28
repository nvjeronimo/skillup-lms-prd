import { ReactNode } from "react";
import { Topbar } from "../components/organisms/Topbar/Topbar";
import { Sidebar, SidebarModule } from "../components/organisms/Sidebar/Sidebar";
import { AIPanel } from "../components/organisms/AIPanel/AIPanel";
import { FooterNav } from "../components/organisms/FooterNav/FooterNav";
import "./ImmersivePlayer.css";

export interface ImmersivePlayerProps {
  /** Course outline for the sidebar. */
  modules: SidebarModule[];
  course: string;
  module: string;
  active: string;
  activeUnitId: string;
  unitNumber: number;
  unitTotal: number;
  progress: number;
  /** Center column content — VideoPlayer + tabs, or Quiz, etc. */
  content: ReactNode;
  /** Hide AI panel (e.g. in quiz screens). */
  showAIPanel?: boolean;
  /** Hide sidebar (e.g. focus mode or mobile). */
  showSidebar?: boolean;
}

/**
 * ImmersivePlayer — page template.
 * Three-column grid: Sidebar (256) / Content / AIPanel (272), with Topbar above and FooterNav below.
 */
export function ImmersivePlayer({
  modules,
  course,
  module,
  active,
  activeUnitId,
  unitNumber,
  unitTotal,
  progress,
  content,
  showAIPanel = true,
  showSidebar = true,
}: ImmersivePlayerProps) {
  const cls = [
    "v7-app",
    !showSidebar && "v7-app--no-sidebar",
    !showAIPanel && "v7-app--no-ai",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <header className="v7-app__topbar">
        <Topbar
          course={course}
          module={module}
          active={active}
          progress={progress}
          showAIToggle={showAIPanel}
        />
      </header>
      {showSidebar && (
        <div className="v7-app__sidebar">
          <Sidebar
            courseEyebrow="Course"
            courseName={course}
            modules={modules}
            activeUnitId={activeUnitId}
          />
        </div>
      )}
      <main className="v7-app__content">
        {content}
        <FooterNav unitNumber={unitNumber} unitTotal={unitTotal} unitName={active} />
      </main>
      {showAIPanel && (
        <div className="v7-app__ai">
          <AIPanel />
        </div>
      )}
    </div>
  );
}
