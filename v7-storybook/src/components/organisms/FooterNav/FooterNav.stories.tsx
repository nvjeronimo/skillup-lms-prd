import type { Meta, StoryObj } from "@storybook/react";
import { FooterNav } from "./FooterNav";

const meta: Meta<typeof FooterNav> = {
  title: "Organisms/FooterNav",
  component: FooterNav,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { unitNumber: 5, unitTotal: 11, unitName: "Product lifecycle with AI" },
};
export default meta;
type Story = StoryObj<typeof FooterNav>;

export const Default: Story = {};
export const FirstUnit: Story = { args: { unitNumber: 1, prevDisabled: true } };
export const LastUnit: Story = { args: { unitNumber: 11, nextDisabled: true, nextLabel: "Finish course" } };
