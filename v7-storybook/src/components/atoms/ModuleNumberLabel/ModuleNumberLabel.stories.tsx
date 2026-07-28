import type { Meta, StoryObj } from "@storybook/react";
import { ModuleNumberLabel } from "./ModuleNumberLabel";

const meta: Meta<typeof ModuleNumberLabel> = {
  title: "Atoms/ModuleNumberLabel",
  component: ModuleNumberLabel,
  tags: ["autodocs"],
  args: { number: 2 },
};
export default meta;
type Story = StoryObj<typeof ModuleNumberLabel>;

export const Default: Story = {};
export const CustomPrefix: Story = { args: { prefix: "WEEK", number: 3 } };
