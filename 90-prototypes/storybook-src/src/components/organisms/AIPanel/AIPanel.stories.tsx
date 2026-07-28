import type { Meta, StoryObj } from "@storybook/react";
import { AIPanel } from "./AIPanel";

const meta: Meta<typeof AIPanel> = {
  title: "Organisms/AIPanel",
  component: AIPanel,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ height: 720, display: "flex", justifyContent: "flex-end", background: "var(--bg)" }}><Story /></div>],
  args: { showTakeaways: true, showAsk: true, showRelated: true, showConversation: false },
};
export default meta;
type Story = StoryObj<typeof AIPanel>;

export const Default: Story = {};

export const TakeawaysOnly: Story = {
  args: { showAsk: false, showRelated: false },
};

export const WithConversation: Story = {
  args: {
    showConversation: true,
    messages: [
      { from: "user", text: "What's the difference between discovery and delivery here?" },
      { from: "ai", text: "Discovery answers 'should we build this'. Delivery answers 'how do we ship it well'. AI changes both — but the evidence bar is higher in discovery." },
      { from: "user", text: "Give me an example?" },
      { from: "ai", text: "In discovery: AI helps generate option space, but a real-user interview is still the validation. In delivery: AI helps draft tests, code, copy — and you still need QA on the output." },
    ],
  },
};
