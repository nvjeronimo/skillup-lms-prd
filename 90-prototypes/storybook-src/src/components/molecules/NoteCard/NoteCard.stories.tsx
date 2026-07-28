import type { Meta, StoryObj } from "@storybook/react";
import { NoteCard } from "./NoteCard";

const meta: Meta<typeof NoteCard> = {
  title: "Molecules/NoteCard",
  component: NoteCard,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
  args: { timestamp: "01:42", body: "Distinguish discovery vs delivery — AI helps with both, but with different evidence bars." },
};
export default meta;
type Story = StoryObj<typeof NoteCard>;
export const Default: Story = {};
