# Prework Learner Journey. Work Plan for Nelson and Pintu

Source: Prework Task meeting, July 3, 2026. Deliverable promised for Monday/Tuesday (July 6-7).
Expected output per Harpreet: an end-to-end workflow diagram of the full learner experience. Explicitly not high-fidelity designs. "Just wireframe, no designs, please."

## 1. The problem we are designing for

- VILT and blended programs have a 4 to 6 week gap between enrollment and the orientation session (Rupali).
- Major drop-offs happen in this window, often before the learner even attends orientation.
- Today, prework courses sit in the Courses tab and confuse learners.
- Prework is currently the first course of the program, which breaks when cohort dates shift (the digital marketing incident: cohort pushed one month, learner lost all progress).

## 2. Decisions already locked. Do not reopen these

1. Prework is optional in Phase 1. No gating of the program on completion.
2. One-time release. No staggered content drops in the pilot. Staggering is Phase 2 or 3.
3. Prework is a container. Content inside is immaterial for our design. It can hold a linked course with coupon code, a podcast link, a downloadable PDF, a webinar registration, or NotebookLM case-study videos.
4. Prework is an independent entity. It must not lock or reset when the cohort start date moves.
5. Live or instructor-led sessions are out of scope for prework.
6. The name "Prework" is not final. Kirti is researching alternatives. Every label in our flow must be a placeholder that survives a rename. Nelson already used "Preparation Track" in the ICP wireframes.
7. Positioning is value-add, the "golden ticket" framing. Something free and extra, not homework. Rupali's data shows completion collapsed when prework looked like study material.
8. Two surfaces. Pintu covers the current LMS. Nelson covers LMS 2.0. Messaging identical, facade differs.

## 3. What the diagram must answer

Harpreet's brief, almost verbatim: "I am a learner who joined a cohort starting after 2 months. What does my journey look like? What goes in the email? If he clicks that email, does he come to the platform? What messaging does he see there?"

### Journey stages

1. Enrollment. Sales emails the backend team (Jazz's team), learner is enrolled manually. Welcome email fires.
2. Prework unlock. Backend enables prework, or learner receives coupon code. Email: "We opened something for you." HubSpot automation owned by Rashid, Anshul and Guy.
3. Email click. Learner lands on the dashboard. Program card shows: program locked, countdown to start date, prework highlighted as available now.
4. Program page. Curriculum visible but locked. Prework container unlocked at the top with clear messaging: "Your program starts in X days. While you wait, this is open for you."
5. Consumption. Learner opens container items. Course link may require coupon code and self-enrollment.
6. Nurture loop. Reminder emails if untouched. Countdown messaging: 30, 15, 7 days to go.
7. Orientation session. Prework's job is done if the learner shows up here.
8. Cohort start. Program unlocks. Define what happens to the prework block: stays accessible, collapses, or shows completed state.

### Entry-time scenarios (all four must be shown)

- A. Enrolls 6 weeks out. Full journey.
- B. Enrolls 2 weeks out. Sees everything already released, compressed email cadence.
- C. Enrolls 3 days out. Must not feel they missed anything (Navdeep's point). No "you're behind" messaging.
- D. Cohort date pushed after enrollment. Prework state and progress must survive untouched.

### Screen states to inventory

Dashboard program card: prework available not started, in progress, completed, program started.
Program page prework container: same four states, plus the locked-program messaging around it.

### Email and notification map

For each: trigger, timing rule relative to enrollment or cohort date, message intent, destination link.

- Welcome (existing)
- Prework available
- Reminder, prework untouched
- Countdown milestones
- Orientation invite (existing)
- Cohort start (existing)

## 4. Open questions to flag, not solve

- Access mechanism. Coupon code (shareable risk accepted by Harpreet) vs backend tagging per learner (discovery ticket says feasible, but manual and raises the R&R question of who flips it per enrollment). Show both variants as branches in the flow.
- Fallback messaging if manual: "Reach out to your learner advisor to get it unlocked."
- Post-cohort-start treatment of the container.
- Pilot metrics: prework completion rate, orientation attendance, drop-off in the gap window.

## 5. Split of work

Together, today: agree the single flow. Harpreet wants one solution, not two.
Nelson: journey diagram in Figma, LMS 2.0 screen states, entry-time scenarios.
Pintu: current LMS screen states, converge his 3 dashboard variants (separate section, tabs, tag) into one recommendation consistent with the flow.
Both: email map and messaging placeholders, walkthrough prep for the review.

## 6. What we show at the review

1. One end-to-end flow diagram (the core ask).
2. Screen-state inventory at wireframe level.
3. Email map with triggers.
4. Open questions list with our recommendation on each.
