import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModuleAccordionHeader } from "./ModuleAccordionHeader";
import { ModuleNumberLabel } from "../../atoms/ModuleNumberLabel/ModuleNumberLabel";

const meta: Meta<typeof ModuleAccordionHeader> = {
  title: "Molecules/ModuleAccordionHeader",
  component: ModuleAccordionHeader,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ width: 256 }}><Story /></div>],
  args: { title: "AI in the product lifecycle", meta: "3 / 5", expanded: true },
};
export default meta;
type Story = StoryObj<typeof ModuleAccordionHeader>;

export const Expanded: Story = {};
export const Collapsed: Story = { args: { expanded: false } };

export const WithNumberLabel: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(true);
    return (
      <div>
        <div style={{ padding: "8px 12px 4px" }}>
          <ModuleNumberLabel number={2} />
        </div>
        <ModuleAccordionHeader
          title="AI in the product lifecycle"
          meta="3 / 5"
          expanded={expanded}
          onToggle={setExpanded}
        />
      </div>
    );
  },
};
