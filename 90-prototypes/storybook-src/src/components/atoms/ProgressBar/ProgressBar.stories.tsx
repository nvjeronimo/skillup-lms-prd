import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: { value: { control: { type: "range", min: 0, max: 100, step: 1 } } },
  args: { value: 45 },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Halfway: Story = { args: { value: 50 } };
export const Full: Story = { args: { value: 100 } };
export const Wide: Story = { args: { value: 72, width: 240 } };
export const NoLabel: Story = { args: { value: 30, hideLabel: true, width: 160 } };
