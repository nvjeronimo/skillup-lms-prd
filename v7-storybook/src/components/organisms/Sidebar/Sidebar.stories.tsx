import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar, SidebarModule } from "./Sidebar";

const COURSE: SidebarModule[] = [
  {
    id: "m1",
    number: 1,
    title: "Defining AI in product context",
    units: [
      { id: "u1", title: "Course welcome and goals", duration: "2 min", type: "video", state: "success" },
      { id: "u2", title: "What we mean by AI today", duration: "5 min", type: "video", state: "success" },
      { id: "u3", title: "Module 1 quiz", duration: "8 min", type: "quiz", state: "success" },
    ],
  },
  {
    id: "m2",
    number: 2,
    title: "AI in the product lifecycle",
    units: [
      { id: "u4", title: "Defining AI in product context", duration: "4 min", type: "video", state: "success" },
      { id: "u5", title: "The product manager's AI toolkit", duration: "6 min", type: "video", state: "success" },
      { id: "u6", title: "Product lifecycle with AI", duration: "3 min 20 s", type: "video", bookmarked: true },
      { id: "u7", title: "Live Q&A with the instructor", type: "live", meta: "Live session · 11:30 PM Apr 18, 2025" },
      { id: "u8", title: "Module 2 quiz", duration: "10 min", type: "quiz" },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "Operating AI features in production",
    units: [
      { id: "u9", title: "Monitoring & feedback loops", duration: "7 min", type: "video", state: "locked" },
      { id: "u10", title: "Guardrails practice", duration: "20 min", type: "practice", state: "locked" },
      { id: "u11", title: "Final assessment", duration: "30 min", type: "quiz", state: "locked" },
    ],
  },
];

const meta: Meta<typeof Sidebar> = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ height: 720, display: "flex" }}><Story /></div>],
  args: {
    courseEyebrow: "Course",
    courseName: "Generative AI for Product Managers",
    modules: COURSE,
    activeUnitId: "u6",
  },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
export const InProgress: Story = { args: { activeUnitId: "u4" } };
