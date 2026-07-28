import type { Meta, StoryObj } from "@storybook/react";
import { QuizOption } from "./QuizOption";

const meta: Meta<typeof QuizOption> = {
  title: "Molecules/QuizOption",
  component: QuizOption,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ maxWidth: 600 }}><Story /></div>],
  args: {
    letter: "A",
    label: "Generative AI is best applied during ideation to expand option space, not to validate decisions.",
    state: "default",
  },
  argTypes: {
    state: {
      control: "inline-radio",
      options: ["default", "selected", "correct", "wrong", "revealedCorrect"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof QuizOption>;

export const Default: Story = {};
export const Selected: Story = { args: { state: "selected" } };
export const RevealedCorrect: Story = {
  args: {
    state: "revealedCorrect",
    explanation: "Correct — user research and validation should still depend on real evidence, not generated assumptions.",
  },
};
export const Wrong: Story = {
  args: {
    state: "wrong",
    explanation: "This option misses the validation point — the right answer is A.",
  },
};
export const Correct: Story = {
  args: { state: "correct", letter: "B", label: "Use AI to draft option space, validate with real users." },
};
