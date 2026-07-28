import type { Meta, StoryObj } from "@storybook/react";
import { StepDot } from "./StepDot";

const meta: Meta<typeof StepDot> = {
  title: "Atoms/StepDot",
  component: StepDot,
  tags: ["autodocs"],
  args: { index: 1, state: "default" },
  argTypes: { state: { control: "inline-radio", options: ["default", "current", "done", "wrong"] } },
};
export default meta;
type Story = StoryObj<typeof StepDot>;

export const Default: Story = {};
export const Current: Story = { args: { state: "current", index: 3 } };
export const Done: Story = { args: { state: "done", index: 1 } };
export const Wrong: Story = { args: { state: "wrong", index: 2 } };

export const Row: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <StepDot state="done" index={1} />
      <StepDot state="wrong" index={2} />
      <StepDot state="current" index={3} />
      <StepDot state="default" index={4} />
      <StepDot state="default" index={5} />
    </div>
  ),
};
