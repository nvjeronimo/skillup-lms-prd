import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    course: "Generative AI for Product Managers",
    module: "Module 2 — AI in the product lifecycle",
    active: "Product lifecycle with AI",
  },
  parameters: {
    docs: {
      description: {
        component:
          "3-tier responsive breadcrumb. Ancestors hide at 960 / 640 / 480 breakpoints. Active leaf truncates with ellipsis when space is tight.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Desktop: Story = {};
export const Tablet: Story = {
  args: { showCourse: false },
  parameters: { viewport: { defaultViewport: "tablet" } },
};
export const Mobile: Story = {
  args: { showCourse: false, showModule: false },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
export const LongActiveLeaf: Story = {
  args: {
    active: "Building responsible AI features that respect privacy and minimize bias in production",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, border: "1px dashed var(--border2)", padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};
