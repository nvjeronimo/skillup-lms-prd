import type { Meta, StoryObj } from "@storybook/react";
import { TopicTypeIcon, TopicType } from "./TopicTypeIcon";

const meta: Meta<typeof TopicTypeIcon> = {
  title: "Atoms/TopicTypeIcon",
  component: TopicTypeIcon,
  tags: ["autodocs"],
  args: { type: "video", size: 18 },
  argTypes: {
    type: { control: "inline-radio", options: ["video", "quiz", "practice", "lab", "reading", "live", "recording"] satisfies TopicType[] },
    size: { control: { type: "number", min: 12, max: 48 } },
  },
};
export default meta;
type Story = StoryObj<typeof TopicTypeIcon>;

export const Video: Story = { args: { type: "video" } };
export const Quiz: Story = { args: { type: "quiz" } };
export const Practice: Story = { args: { type: "practice" } };
export const Lab: Story = { args: { type: "lab" } };
export const Reading: Story = { args: { type: "reading" } };
export const Live: Story = { args: { type: "live" } };
export const Recording: Story = { args: { type: "recording" } };

export const All: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 16, alignItems: "center" }}>
      {(["video", "quiz", "practice", "lab", "reading", "live", "recording"] as TopicType[]).map((t) => (
        <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <TopicTypeIcon type={t} size={24} />
          <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-label)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t}</span>
        </div>
      ))}
    </div>
  ),
};
