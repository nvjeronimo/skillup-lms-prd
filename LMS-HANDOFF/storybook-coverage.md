# Storybook 8 Coverage Plan

One `.stories.tsx` file per component. Each component story should:

1. **Default**: with sensible defaults for all props.
2. **Variants**: one story per variant in the variant axis (e.g. Status=Completed, Pending, Locked).
3. **Boolean toggles**: show off / on stories for each boolean prop where meaningful.
4. **In context**: at least ONE story showing the component inside its real parent (e.g. Topic Row inside a mock Sidebar background).

Use `argTypes` for controls. Use `parameters.layout: 'centered'` for atoms, `'fullscreen'` for organisms.

Group with title prefixes:

- `Atoms/...`
- `Molecules/...`
- `Organisms/...`
- `Foundations/...` (color tokens, typography ramp, spacing)

---

## Foundations (3 stories)

| Story | What to show |
|---|---|
| `Foundations/Colors` | Swatch grid of all LMS color tokens with hex + variable name |
| `Foundations/Typography` | Each text style class rendered with sample text |
| `Foundations/Spacing` | 4pt / 8pt grid scale |

---

## Atoms (~14 components)

| Component | Stories |
|---|---|
| `Atoms/Button` | Primary/Secondary/Tertiary × Default/Hover/Disabled × sizes (sm/md/lg/xl) |
| `Atoms/Badge` (Topic-Types) | All 13 type variants in a grid |
| `Atoms/Badge` (Course Type) | Program · Course |
| `Atoms/Badge` (Difficulty) | Beginner · Intermediate · Advanced |
| `Atoms/Badge` (Delivery Mode) | Flexible · Flexible + Live · Cohort |
| `Atoms/Badge` (Provider) | SkillUp · Microsoft · IBM · Google Cloud · Stanford |
| `Atoms/Avatar` | Sizes (xs/sm/md/lg) × placeholder text + with status indicator |
| `Atoms/Bookmark` | Bookmarked = No · Yes |
| `Atoms/Completion Status` | Pending · In Progress · Done · Locked |
| `Atoms/Sidebar Toggle` | Expanded · Collapsed |
| `Atoms/Lesson Header` | Single text in eyebrow style |
| `Atoms/Section Header` | Section labeled with optional caret |
| `Atoms/Vertical Scroll` | Scrollbar in idle + dragging |
| `Atoms/Inline Alert` | Info · Success · Warning · Error |

---

## Molecules (~11 components)

| Component | Stories |
|---|---|
| `Molecules/Topic Row` | All 6 variants (Status × Topic Open) + with bookmark on/off |
| `Molecules/Module Header` | Expanded · Collapsed × Is completed false/true |
| `Molecules/Course Header (Sidebar)` | Default + sidebar toggle state |
| `Molecules/Overall Progress` | Device=Desktop bar · Device=Mobile ring |
| `Molecules/Module Time-Left` | With various breakdowns |
| `Molecules/Live Attendance` | Various participant counts |
| `Molecules/Topic Header` | Show Description on/off × Show Duration on/off × different topic type badges |
| `Molecules/Transcript Line` | Default · Active × Has note false/true. Show + Note + Edit affordances. |
| `Molecules/Note Item` | With anchor + note text + tags. Hover state with edit/delete actions. |
| `Molecules/File Item` | All Type variants (PDF/DOCX/XLSX/etc) |
| `Molecules/Thread Item` | With avatar, content, replies count |
| `Molecules/Content Feedback` | Inline like/dislike/report row |
| `Molecules/Card Overflow Menu` | Rate / Share / Unenroll items |

---

## Organisms (~5 components)

| Component | Stories |
|---|---|
| `Organisms/Sidebar v2` | All 5 State variants (Expanded · Collapsed · Mobile · Collapsed noLesson · Mobile noLesson). Fullscreen layout. |
| `Organisms/Course Player Topbar` | Theme × Size variants. Each utility button on/off. |
| `Organisms/Topic Footer Nav` | Previous / Title / Next default. Disabled Next state. |
| `Organisms/AI Panel` | Each Mode variant (Key Takeaways · Ask · Chat · Related) |
| `Organisms/Live Control Bar` | Live On · Join Live states |
| `Organisms/Quiz Card` | Each quiz state (Question · Revealed · Results · Not Passed) |
| `Organisms/Course Card` | Default + with overrides for each provider/difficulty/delivery |
| `Organisms/Course Row` | Compact list variant |
| `Organisms/Course Complete Modal` | Open state with backdrop |
| `Organisms/Course Certificate` | Preview state |
| `Organisms/Overlay Panel` | Shared chrome. Stories: empty body, with filter chips, with footer link, mobile full-screen variant. |
| `Organisms/Notifications Panel` | Open state with 5+ mock notifications across Today/Yesterday/This week groups. |
| `Organisms/Saved Panel` | Open state with mix of topics + notes. Story per filter chip active (All / Topics / Notes). |

## Molecules added (panel items)

| Component | Stories |
|---|---|
| `Molecules/Notification Item` | One per type: Live now (red dot) · Reply · Due · Course update · Peer rating · Syllabus change. Plus a "read" variant (no unread dot). |
| `Molecules/Saved Topic Item` | One per topic type icon (Reading / Live Session / Recording / Project / Practice / Peer Review / etc). |
| `Molecules/Saved Note Item` | Default + with long anchor quote + with many tags + with no tags. |
| `Atoms/Filter Chip` | Active + Inactive. With count badge. |

---

## Pages (in app/, not in stories — but optional showcase stories)

| Story | What to show |
|---|---|
| `Pages/Video Transcript (Desktop)` | Embeds Screen 1 layout as a story |
| `Pages/Video Notes (Desktop)` | Screen 3 |
| `Pages/Video Downloads (Desktop)` | Screen 4 |
| `Pages/Mobile Video` | Screen 6 |

---

## Implementation tips for the Storybook stories

- **One file per component**: `Button.stories.tsx`, `TopicRow.stories.tsx`, etc.
- **Use `argTypes` with controls** so designers can flip variants in Storybook UI.
- **Use MDX docs** for the Foundations stories (colors, typography). Inline tables work great.
- **`autodocs: true`** in story config so each component auto-generates a Docs tab from JSDoc + propTypes.
- **Token swatches**: build a `<TokenSwatch token="bg-brand-solid" />` helper to show var name + hex + visual.

## Config sketch

```ts
// .storybook/main.ts
const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(tsx|mdx)", "../stories/**/*.stories.@(tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: { name: "@storybook/nextjs", options: {} },
  docs: { autodocs: "tag" }
};
```

```ts
// .storybook/preview.ts
import "../tokens/colors.css";
import "../tokens/typography.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "lms-primary",
      values: [
        { name: "lms-primary", value: "#ffffff" },
        { name: "lms-secondary", value: "#f3f5fa" },
        { name: "lms-brand-section", value: "#ebf8ff" }
      ]
    }
  }
};
```
