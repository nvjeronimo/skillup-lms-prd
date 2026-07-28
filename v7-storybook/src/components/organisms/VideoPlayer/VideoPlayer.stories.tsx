import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";

const meta: Meta<typeof VideoPlayer> = {
  title: "Organisms/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { title: "Product lifecycle with AI", moduleLabel: "MODULE 02", position: 80, duration: 200 },
};
export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Paused: Story = {};
export const Playing: Story = { args: { isPlaying: true, position: 145 } };
