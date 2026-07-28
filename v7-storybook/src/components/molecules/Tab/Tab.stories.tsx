import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tab, TabStrip } from "./Tab";

const meta: Meta = {
  title: "Molecules/Tab",
  parameters: {
    docs: {
      description: {
        component:
          "Content tab strip used below the video player. Use `Tab` items inside `TabStrip` for proper ARIA roles. Active state: cyan text + 2px cyan underline.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("transcript");
    const tabs = [
      { id: "transcript", label: "Transcript" },
      { id: "notes", label: "Notes" },
      { id: "downloads", label: "Downloads" },
      { id: "discussion", label: "Discussion" },
    ];
    return (
      <TabStrip>
        {tabs.map((t) => (
          <Tab key={t.id} active={active === t.id} onClick={() => setActive(t.id)}>
            {t.label}
          </Tab>
        ))}
      </TabStrip>
    );
  },
};

export const WithPip: Story = {
  render: () => (
    <TabStrip>
      <Tab>Transcript</Tab>
      <Tab>Notes</Tab>
      <Tab>Downloads</Tab>
      <Tab pip active>Discussion</Tab>
    </TabStrip>
  ),
};
