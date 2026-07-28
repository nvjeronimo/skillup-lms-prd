import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Bookmark } from "./Bookmark";

const meta: Meta<typeof Bookmark> = {
  title: "Atoms/Bookmark",
  component: Bookmark,
  tags: ["autodocs"],
  args: { saved: false, size: 14 },
};
export default meta;
type Story = StoryObj<typeof Bookmark>;

export const Empty: Story = {};
export const Saved: Story = { args: { saved: true } };

export const Interactive: Story = {
  render: () => {
    const [saved, setSaved] = useState(false);
    return <Bookmark saved={saved} onToggle={setSaved} />;
  },
};
