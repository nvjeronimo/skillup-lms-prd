import type { Meta, StoryObj } from "@storybook/react";
import { TopicUnitRow } from "./TopicUnitRow";

const meta: Meta<typeof TopicUnitRow> = {
  title: "Molecules/TopicUnitRow",
  component: TopicUnitRow,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 256, padding: 12, background: "var(--bg)" }}>
        <Story />
      </div>
    ),
  ],
  args: { title: "Product lifecycle with AI", duration: "3 min 20 s", type: "video", state: "notStarted" },
  argTypes: {
    state: { control: "inline-radio", options: ["success", "active", "notStarted", "locked"] },
    type: { control: "inline-radio", options: ["video", "quiz", "practice", "lab", "reading", "live", "recording"] },
  },
};
export default meta;
type Story = StoryObj<typeof TopicUnitRow>;

export const NotStarted: Story = {};
export const Active: Story = { args: { state: "active" } };
export const Completed: Story = { args: { state: "success" } };
export const Locked: Story = { args: { state: "locked", title: "Practice Quiz: Analyze a launch plan" } };

export const LiveSession: Story = {
  args: { type: "live", state: "active", title: "Q&A with the instructor", meta: "Live session · 11:30 PM Apr 18, 2025" },
};
export const Recording: Story = {
  args: { type: "recording", state: "success", title: "Q&A with the instructor", meta: "Recording · Live Session · Apr 18, 2025" },
};

export const ListExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TopicUnitRow title="Defining AI in product context" duration="4 min" type="video" state="success" />
      <TopicUnitRow title="The product manager's AI toolkit" duration="6 min" type="video" state="success" />
      <TopicUnitRow title="Product lifecycle with AI" duration="3 min 20 s" type="video" state="active" bookmarked />
      <TopicUnitRow title="Module 2 quiz" duration="10 min" type="quiz" state="notStarted" />
      <TopicUnitRow title="Practice Quiz: Analyze a launch plan" duration="20 min" type="practice" state="locked" />
    </div>
  ),
};
