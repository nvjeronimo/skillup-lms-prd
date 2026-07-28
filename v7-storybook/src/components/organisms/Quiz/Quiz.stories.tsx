import type { Meta, StoryObj } from "@storybook/react";
import { Quiz } from "./Quiz";

const SAMPLE = {
  prompt: "When using AI in product discovery, which statement is most accurate?",
  options: [
    { letter: "A", label: "AI replaces user research — generated personas are sufficient evidence." },
    { letter: "B", label: "AI expands the option space, but user evidence still validates decisions.", correct: true },
    { letter: "C", label: "AI is only useful in delivery, not discovery." },
    { letter: "D", label: "AI removes the need for product strategy entirely." },
  ],
  explanation:
    "Generative AI is best used to broaden hypotheses and synthesize patterns. Validation should still rely on real-user evidence — interviews, observation, and outcome metrics.",
};

const meta: Meta<typeof Quiz> = {
  title: "Organisms/Quiz",
  component: Quiz,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { total: 5 },
};
export default meta;
type Story = StoryObj<typeof Quiz>;

export const Start: Story = { args: { phase: "start", title: "Module 2 quiz" } };

export const Question: Story = {
  args: {
    phase: "question",
    current: 3,
    stepStates: ["done", "done", "current", "default", "default"],
    question: SAMPLE,
  },
};

export const Revealed: Story = {
  args: {
    phase: "revealed",
    current: 3,
    stepStates: ["done", "done", "done", "default", "default"],
    question: { ...SAMPLE, selectedIndex: 1 },
  },
};

export const RevealedWrong: Story = {
  args: {
    phase: "revealed",
    current: 3,
    stepStates: ["done", "done", "wrong", "default", "default"],
    question: { ...SAMPLE, selectedIndex: 0 },
  },
};

export const Results: Story = {
  args: { phase: "results", results: { correct: 4, passed: true } },
};

export const ResultsLow: Story = {
  args: { phase: "results", total: 5, results: { correct: 2, passed: false } },
};
