import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    iconOnly: { control: "boolean" },
  },
  args: { children: "Continue", variant: "primary", size: "md" },
  parameters: {
    docs: {
      description: {
        component:
          "Primary interactive button. Use `primary` for the main CTA per surface, `secondary` for paired actions, `ghost` for low-emphasis controls (topbar icons, tab nav), `danger` for destructive actions only.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Retake quiz" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Cancel" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete note" } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  args: { iconOnly: true, leading: "▶", "aria-label": "Play" },
};

export const Disabled: Story = { args: { disabled: true, children: "Submit" } };
