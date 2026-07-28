import type { Meta, StoryObj } from "@storybook/react";
import { Topbar } from "./Topbar";

const meta: Meta<typeof Topbar> = {
  title: "Organisms/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    course: "Generative AI for Product Managers",
    module: "Module 2 — AI in the product lifecycle",
    active: "Product lifecycle with AI",
    progress: 45,
    theme: "dark",
    sidebarOpen: true,
    aiOpen: true,
  },
};
export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {};

export const TabletVariant: Story = {
  args: { showCourseCrumb: false, showAIToggle: false },
  parameters: { docs: { description: { story: "Tablet (≤960px) hides Course crumb and AI toggle." } } },
};

export const MobileVariant: Story = {
  args: { showCourseCrumb: false, showModuleCrumb: false, showWordmark: false, showAIToggle: false, showProgress: false, showClose: true },
  parameters: { docs: { description: { story: "Mobile (≤480px): brandmark only, single active crumb, sidebar drawer toggle handled separately." } } },
};

export const LightTheme: Story = { args: { theme: "light" } };
