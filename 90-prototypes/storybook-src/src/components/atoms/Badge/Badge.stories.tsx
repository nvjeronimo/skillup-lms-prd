import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "MODULE 02", tone: "neutral" },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "accent", "success", "amber", "red", "live"] },
    withDot: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {};
export const Accent: Story = { args: { tone: "accent", children: "PROGRAM" } };
export const Success: Story = { args: { tone: "success", children: "COMPLETED" } };
export const Amber: Story = { args: { tone: "amber", children: "DUE SOON" } };
export const Red: Story = { args: { tone: "red", children: "OVERDUE" } };

export const LiveNow: Story = {
  args: { tone: "live", withDot: true, children: "LIVE NOW" },
  parameters: {
    docs: {
      description: {
        story: "Use only when a live session is currently in progress. The pulsing dot is reserved for this state.",
      },
    },
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge tone="neutral">UNIT 5 / 11</Badge>
      <Badge tone="accent">XBLOCK</Badge>
      <Badge tone="success">COMPLETED</Badge>
      <Badge tone="amber">DUE WED</Badge>
      <Badge tone="red">OVERDUE</Badge>
      <Badge tone="live" withDot>LIVE NOW</Badge>
    </div>
  ),
};
