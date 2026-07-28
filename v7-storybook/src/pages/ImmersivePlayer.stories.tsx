import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ImmersivePlayer } from "./ImmersivePlayer";
import { VideoPlayer } from "../components/organisms/VideoPlayer/VideoPlayer";
import { Tab, TabStrip } from "../components/molecules/Tab/Tab";
import { TranscriptLine } from "../components/molecules/TranscriptLine/TranscriptLine";
import { NoteCard } from "../components/molecules/NoteCard/NoteCard";
import { Quiz } from "../components/organisms/Quiz/Quiz";
import { SAMPLE_COURSE, SAMPLE_TRANSCRIPT, SAMPLE_NOTES, SAMPLE_DOWNLOADS, SAMPLE_DISCUSSION } from "./sample-data";

const SHARED = {
  modules: SAMPLE_COURSE,
  course: "Generative AI for Product Managers",
  module: "Module 2 — AI in the product lifecycle",
  active: "Product lifecycle with AI",
  activeUnitId: "u6",
  unitNumber: 5,
  unitTotal: 11,
  progress: 45,
};

const meta: Meta<typeof ImmersivePlayer> = {
  title: "Pages/ImmersivePlayer",
  component: ImmersivePlayer,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ImmersivePlayer>;

const TABS: { id: string; label: string }[] = [
  { id: "transcript", label: "Transcript" },
  { id: "notes", label: "Notes" },
  { id: "downloads", label: "Downloads" },
  { id: "discussion", label: "Discussion" },
];

const TabbedContent = ({ initial }: { initial: string }) => {
  const [active, setActive] = useState(initial);
  return (
    <>
      <VideoPlayer title="Product lifecycle with AI" position={80} duration={200} />
      <div className="v7-content-tabs">
        <TabStrip>
          {TABS.map((t) => (
            <Tab key={t.id} active={active === t.id} onClick={() => setActive(t.id)}>{t.label}</Tab>
          ))}
        </TabStrip>
        {active === "transcript" && (
          <div className="v7-content-pane">
            {SAMPLE_TRANSCRIPT.map((l, i) => (
              <TranscriptLine key={i} timestamp={l.ts} text={l.text} state={l.state} />
            ))}
          </div>
        )}
        {active === "notes" && (
          <div className="v7-content-pane v7-content-pane--two-col">
            <div>
              <div className="v7-pane-label" style={{ marginBottom: 8 }}>YOUR NOTES</div>
              <p style={{ color: "var(--text2)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
                Capture timestamps and ideas as you watch. Notes here are tied to the current unit and visible only to you.
              </p>
            </div>
            <aside className="v7-content-pane__notes">
              <div className="v7-pane-label">SAVED</div>
              {SAMPLE_NOTES.map((n, i) => <NoteCard key={i} timestamp={n.ts} body={n.body} />)}
            </aside>
          </div>
        )}
        {active === "downloads" && (
          <div className="v7-content-pane">
            <div className="v7-pane-label">DOWNLOADS</div>
            <div className="v7-dl">
              {SAMPLE_DOWNLOADS.map((d, i) => (
                <a key={i} className="v7-dl__item" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="v7-dl__icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M8 2v9M4 7l4 4 4-4M3 14h10" />
                    </svg>
                  </span>
                  <span className="v7-dl__name">{d.name}</span>
                  <span className="v7-dl__size num-tabular">{d.size}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        {active === "discussion" && (
          <div className="v7-content-pane">
            <div className="v7-pane-label">DISCUSSION · {SAMPLE_DISCUSSION.length} POSTS</div>
            <div className="v7-disc">
              {SAMPLE_DISCUSSION.map((d, i) => (
                <div key={i} className="v7-disc__row">
                  <span className="v7-disc__av">{d.who}</span>
                  <div className="v7-disc__bubble">
                    <div className="v7-disc__meta">{d.name} · {d.time}</div>
                    <div className="v7-disc__text">{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const VideoTranscript: Story = {
  args: { ...SHARED, content: <TabbedContent initial="transcript" /> },
};
export const VideoNotes: Story = {
  args: { ...SHARED, content: <TabbedContent initial="notes" /> },
};
export const VideoDownloads: Story = {
  args: { ...SHARED, content: <TabbedContent initial="downloads" /> },
};
export const VideoDiscussion: Story = {
  args: { ...SHARED, content: <TabbedContent initial="discussion" /> },
};

const QUIZ_Q = {
  prompt: "When using AI in product discovery, which statement is most accurate?",
  options: [
    { letter: "A", label: "AI replaces user research — generated personas are sufficient evidence." },
    { letter: "B", label: "AI expands the option space, but user evidence still validates decisions.", correct: true },
    { letter: "C", label: "AI is only useful in delivery, not discovery." },
    { letter: "D", label: "AI removes the need for product strategy entirely." },
  ],
  explanation: "Generative AI is best used to broaden hypotheses and synthesize patterns. Validation should still rely on real-user evidence.",
};

export const QuizStart: Story = {
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: <Quiz phase="start" total={5} title="Module 2 quiz" />,
  },
};

export const QuizQuestion: Story = {
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: (
      <Quiz
        phase="question"
        total={5}
        current={3}
        stepStates={["done", "done", "current", "default", "default"]}
        question={QUIZ_Q}
      />
    ),
  },
};

export const QuizRevealed: Story = {
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: (
      <Quiz
        phase="revealed"
        total={5}
        current={3}
        stepStates={["done", "done", "done", "default", "default"]}
        question={{ ...QUIZ_Q, selectedIndex: 1 }}
      />
    ),
  },
};

export const QuizResults: Story = {
  args: {
    ...SHARED,
    active: "Module 2 quiz",
    activeUnitId: "u8",
    unitNumber: 9,
    showAIPanel: false,
    content: <Quiz phase="results" total={5} results={{ correct: 4, passed: true }} />,
  },
};
