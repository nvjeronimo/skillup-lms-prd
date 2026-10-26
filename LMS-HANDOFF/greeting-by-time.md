# Dashboard greeting by local time

26 Oct 2026, Nelson. The Dashboard title greets the learner by the time of day where they are,
instead of the fixed "Good morning,". Prototype: PR 380 (`lib/platform/greeting.ts`).

## The rule

| Learner's local time | Greeting |
|---|---|
| 05:00 – 11:59 | Good morning, {first name}. |
| 12:00 – 17:59 | Good afternoon, {first name}. |
| 18:00 – 04:59 | Good evening, {first name}. |

- **Edges:** a greeting starts exactly on the hour (05:00, 12:00, 18:00).
- **Name:** the second half is the learner's first name with a full stop, as before. The title stays on one
  line and truncates with an ellipsis (23 Oct 2026).
- **No "Good night":** it reads as a goodbye. Late at night the greeting is "Good evening".

## Where the time comes from

1. **The browser's clock** (`new Date().getHours()`, the device's time zone). This is the source of truth: it is
   right when the learner travels and needs no setting.
2. **Fallback:** if the page has to be greeted on the server (no client rendering), use the learner's Open edX
   user preference `time_zone` (Account settings › Time zone). Most learners never set it, so only fall back to
   it; never use the server's time zone.

## Implementation notes

- **Server rendering:** render a neutral **"Hello,"** on the server and swap in the right greeting on the client
  after hydration. In React, `useSyncExternalStore` with a server snapshot of "Hello," does this without a
  hydration error. The swap happens under the page's arrival fade, so it is not seen.
- **Tabs left open:** re-check when the tab comes back to the front (`visibilitychange`), so a Dashboard left open
  overnight says "Good morning" the next day. No timer is needed.
- **Translation:** each language needs the three phrases plus "Hello,". The hour bands stay the same unless a
  locale's convention differs; then they belong with the translation strings, not in code.
- **Accessibility:** nothing changes; the greeting is the page's `h1`.
- **Tests:** the edges 04:59 / 05:00, 11:59 / 12:00, 17:59 / 18:00 and midnight
  (prototype: `lib/platform/greeting.test.ts`).

## Design

No new component and no Figma variants: the ICP Dashboard screens keep "Good morning," as the example. The rule
lives here and in the Dashboard's dev note.

## Effort

- **Prototype:** about an hour with tests (done).
- **LMS:** half a day to a day, counting the translations and the `time_zone` fallback.
