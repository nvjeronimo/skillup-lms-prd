import type { Meta, StoryObj } from "@storybook/react";
import { TranscriptLine } from "./TranscriptLine";

const meta: Meta<typeof TranscriptLine> = {
  title: "Molecules/TranscriptLine",
  component: TranscriptLine,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
  args: { timestamp: "00:24", text: "Welcome back. In this video we'll walk through the AI-augmented product lifecycle.", state: "active" },
};
export default meta;
type Story = StoryObj<typeof TranscriptLine>;

export const Active: Story = {};
export const Upcoming: Story = { args: { state: "upcoming" } };
export const Past: Story = { args: { state: "past" } };

export const Stack: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <TranscriptLine timestamp="00:00" text="So far we've covered defining AI in product context." state="past" />
      <TranscriptLine timestamp="00:24" text="Welcome back. In this video we'll walk through the AI-augmented product lifecycle." state="active" />
      <TranscriptLine timestamp="00:48" text="Let's start with discovery — where AI changes the kind of questions you can answer." state="upcoming" />
    </div>
  ),
};
