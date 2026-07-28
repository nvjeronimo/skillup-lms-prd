import type { Meta, StoryObj } from "@storybook/react";
import { StatusIcon } from "./StatusIcon";

const meta: Meta<typeof StatusIcon> = {
  title: "Atoms/StatusIcon",
  component: StatusIcon,
  tags: ["autodocs"],
  args: { kind: "active", size: 24 },
  argTypes: {
    kind: { control: "inline-radio", options: ["success", "active", "notStarted", "locked"] },
    size: { control: { type: "number", min: 12, max: 48 } },
  },
};
export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Success: Story = { args: { kind: "success" } };
export const Active: Story = { args: { kind: "active" } };
export const NotStarted: Story = { args: { kind: "notStarted" } };
export const Locked: Story = { args: { kind: "locked" } };

export const Row: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <StatusIcon kind="success" size={24} />
      <StatusIcon kind="active" size={24} />
      <StatusIcon kind="notStarted" size={24} />
      <StatusIcon kind="locked" size={24} />
    </div>
  ),
};
