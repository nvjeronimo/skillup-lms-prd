import { SidebarModule } from "../components/organisms/Sidebar/Sidebar";

export const SAMPLE_COURSE: SidebarModule[] = [
  {
    id: "m1",
    number: 1,
    title: "Defining AI in product context",
    units: [
      { id: "u1", title: "Course welcome and goals", duration: "2 min", type: "video", state: "success" },
      { id: "u2", title: "What we mean by AI today", duration: "5 min", type: "video", state: "success" },
      { id: "u3", title: "Module 1 quiz", duration: "8 min", type: "quiz", state: "success" },
    ],
  },
  {
    id: "m2",
    number: 2,
    title: "AI in the product lifecycle",
    units: [
      { id: "u4", title: "AI in discovery", duration: "4 min", type: "video", state: "success" },
      { id: "u5", title: "The PM's AI toolkit", duration: "6 min", type: "video", state: "success" },
      { id: "u6", title: "Product lifecycle with AI", duration: "3 min 20 s", type: "video", bookmarked: true },
      { id: "u7", title: "Live Q&A with the instructor", type: "live", meta: "Live · 11:30 PM Apr 18, 2025" },
      { id: "u8", title: "Module 2 quiz", duration: "10 min", type: "quiz" },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "Operating AI features in production",
    units: [
      { id: "u9", title: "Monitoring & feedback loops", duration: "7 min", type: "video", state: "locked" },
      { id: "u10", title: "Guardrails practice", duration: "20 min", type: "practice", state: "locked" },
      { id: "u11", title: "Final assessment", duration: "30 min", type: "quiz", state: "locked" },
    ],
  },
];

export const SAMPLE_TRANSCRIPT = [
  { ts: "00:00", text: "So far we've covered defining AI in product context.", state: "past" as const },
  { ts: "00:24", text: "Welcome back. In this video we'll walk through the AI-augmented product lifecycle.", state: "active" as const },
  { ts: "00:48", text: "Let's start with discovery — where AI changes the kind of questions you can answer.", state: "upcoming" as const },
  { ts: "01:12", text: "Discovery used to be bottlenecked by interview throughput. AI doesn't replace interviews.", state: "upcoming" as const },
  { ts: "01:36", text: "But it can help you generate hypotheses and synthesize patterns across what you've already heard.", state: "upcoming" as const },
];

export const SAMPLE_NOTES = [
  { ts: "01:42", body: "Distinguish discovery vs delivery — different evidence bars." },
  { ts: "02:18", body: "AI expands option space, doesn't replace validation." },
  { ts: "02:55", body: "Production guardrails > model choice." },
];

export const SAMPLE_DOWNLOADS = [
  { name: "Slides — Product lifecycle with AI.pdf", size: "1.4 MB" },
  { name: "Worksheet — Map your funnel.docx", size: "84 KB" },
  { name: "Reading list — Validation evidence bar.md", size: "12 KB" },
];

export const SAMPLE_DISCUSSION = [
  { who: "JP", name: "Janelle P.", time: "Yesterday", text: "The discovery vs delivery framing finally clicked. Going to use this in our next sprint planning." },
  { who: "AM", name: "Amir M.", time: "2 days ago", text: "Question on validation: how do you handle synthetic-user generation when you don't have access to real users yet?" },
];
