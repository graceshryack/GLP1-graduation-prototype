# Product Requirements Document (PRD)

## Signos GLP-1 Graduation Program

**Product Name:** Signos GLP-1 Graduation
**Platform:** iOS (Capacitor-wrapped web app)
**Version:** 3.0
**Original Date:** February 11, 2026
**Last Updated:** February 24, 2026

---

## 1. Overview

The Signos GLP-1 Graduation Program is a **12-week mobile application** designed to help users taking GLP-1 receptor agonist medications (e.g., semaglutide, tirzepatide) build durable health habits and graduate with the skills, scores, and confidence to thrive with or without medication.

The application provides:
- A progressive, week-by-week education curriculum
- Weekly structural goals that build on each other
- A personalized final 4 weeks based on user self-assessment
- Actionable insights powered by continuous glucose monitor (CGM) data

### Core Thesis

The appetite-suppressed window during GLP-1 treatment is the optimal time to build lasting habits in nutrition, exercise, sleep, and stress management. The 12-week graduation program builds these habits from baseline observation to mastery, culminating in measurable graduation criteria.

### Key Design Principles

- **Single unified program** — no phase switching, one continuous 12-week journey
- **Purple (#7c3aed) identity** throughout — consistent, unified visual experience
- Hunger is framed as a **skill to develop** ("Hunger awareness"), not a problem to suppress
- Weight regain is **biologically expected**, not a failure — maintenance band shown from day 1
- Graduation is **earned through criteria**, not waited out
- Education **unlocks progressively** and is organized by weekly theme
- **Weeks 9–12 are personalized** based on the user's post-week-8 check-in results

---

## 2. Target Users

- Adults currently taking GLP-1 medications for weight or metabolic health
- Users tapering their GLP-1 dose under clinician supervision
- Users recently off GLP-1 who require maintenance support
- All users are assumed to wear a Signos CGM

---

## 3. Program Model

The application is structured as a **single 12-week GLP-1 Graduation program** divided into two phases:

### Phase 1: Foundation (Weeks 1–8)

Each week introduces one focused habit that builds on the previous week:

| Week | Theme | Goal | Target Metric |
|------|-------|------|---------------|
| 1 | **Baseline — Learn your body** | Don't change anything. Observe food responses, activity, sleep, hunger. | Log meals, sleep, and hunger daily |
| 2 | **Protein at every meal** | Include palm-sized protein at every meal. Eat protein first. | 25g+ protein per meal |
| 3 | **Post-meal walking & steps** | 10–15 min walk after your biggest meal. Build to 7,000 steps. | 7,000+ steps/day, post-meal walk daily |
| 4 | **Add fiber for satiety** | Add one extra serving of vegetables or fiber-rich food per day. | +1 fiber serving/day |
| 5 | **Mid-program check** | Review scores, complete daily hunger check-ins, assess progress. | 7/7 hunger check-ins, review scores |
| 6 | **Start resistance training** | Two strength sessions this week (bodyweight/bands/weights). | 2 strength sessions |
| 7 | **Build a satiating meal** | Combine protein + fiber + fat + volume. Practice meal construction. | Build a balanced meal 5+ days |
| 8 | **Sleep & stress** | Sleep consistency + one stress management tool. | Consistent bedtime 5/7 nights + 1 stress tool |

### Phase 2: Personalized Focus (Weeks 9–12)

**Locked until completion of weeks 1–8 and the post-week-8 check-in.**

| Week | Theme | Description |
|------|-------|-------------|
| 9 | **Your personalized focus** | Complete check-in, choose 1–2 focus areas for deep dive |
| 10 | **Deep dive** | Continue focus area with advanced modules; maintain all week 1–8 habits |
| 11 | **Stress test your system** | Navigate a real-life disruption using all habits |
| 12 | **Graduation week** | Review journey, check graduation criteria |

The user selects their focus area(s) from 6 options after completing a structured post-week-8 check-in (see §5.13).

### Core Principles (static throughout program)

1. Consistency beats perfection
2. Muscle preservation is your metabolic insurance
3. Hunger is information — respond to it, don't fight it
4. Small weight regain is maintenance, not failure

### Graduation Criteria

| Criterion | Threshold | Duration Required |
|-----------|-----------|-------------------|
| Glucose GPA ≥ 3.5 | 3.5 / 5.0 | 3 consecutive weeks |
| Lifestyle GPA ≥ 3.0 | 3.0 / 5.0 | 3 consecutive weeks |
| Weight within maintenance band | ±3–5% of anchor | 2 consecutive weeks |
| Education ≥ 80% completed | 80% | At any point |

---

## 4. Information Architecture

### Bottom Navigation (5 Tabs)

| Tab | Screen | Description |
|-----|--------|-------------|
| Home | home | Dashboard with glucose graph, weekly goal, graduation card, habits, GPA strip, weight graph |
| Toolkit | dailies | Clickable graduation timeline, core principles, weekly goal, education sections, readiness score |
| Log (+) | log | Daily logging: hunger check-in, body scanner, food, exercise, water, sleep, glucose notes |
| Insights | insights | Glucose GPA, Lifestyle GPA, Transition Readiness with drill-down; Graduation Trend graph |
| Settings | settings | Program details, maintenance band, preferences |

### Secondary Screens

| Screen | Access From | Description |
|--------|-------------|-------------|
| onboarding | First launch | Welcome to GLP-1 Graduation (single screen, no phase selection) |
| week_detail | Toolkit (tap any week dot) | Week-specific goal, education modules, progress, and locking status |
| post8_checkin | Week 9 (locked screen) | 4-step check-in flow: progress report → quiz → feedback → focus selection |
| program | Settings | Detailed program metrics, dose history, graduation readiness |
| toolkit_module | Toolkit | Step-by-step toolkit module |
| education_module | Toolkit or Week Detail | Long-form education article reading view |
| education_game | Toolkit | Interactive learning activities (quizzes, builders, etc.) |
| hunger_questionnaire | Log or Home | Daily hunger/fullness rating check-in |
| body_scanner | Log | Camera-based body composition scan |

### Navigation Model

- History-based stack (`navHistory`) enables true back-button behavior
- `navigateTo()` pushes to stack; `navigateBack()` pops
- Bottom nav taps reset history (top-level navigation)

---

## 5. Feature Specifications

### 5.1 Onboarding

Single-screen welcome:
- Program overview (what to expect in weeks 1–4, 5–8, 9–12)
- "Start your graduation" button
- No phase selection — user enters the unified 12-week program
- State persisted to localStorage
- Analytics event: `glp1_program_enrolled`

### 5.2 Home Screen

Components (in order):

1. **Program badge** — "GLP-1 Graduation — Week X"
2. **Graduation card** — Compact, tappable card showing current week, milestone, progress %, criteria met. Navigates to Toolkit.
3. **Glucose graph card** — Real-time CGM visualization (SVG line chart)
4. **Hunger check-in banner** — Shown if daily check-in incomplete. "Hunger awareness" framing.
5. **GPA strip** — Glucose GPA, Lifestyle GPA, Consistency GPA. Tappable to Insights.
6. **Weight & maintenance band graph** — SVG chart with 12-week weight trend, ±3–5% band. Shown from day 1.
7. **Weekly goal card** — Current week's structural goal with title, description, target metric. CTA to Toolkit. For weeks 9+ when locked, shows a locked state with progress toward unlocking.
8. **Today's habits card** — Daily habit checklist with progress indicators.

### 5.3 Toolkit (Graduation Toolkit)

Structure:

1. **Clickable graduation timeline** — 12 week dots, each tappable to open the Week Detail screen. Weeks 9–12 show a lock icon with dashed connecting lines when not yet unlocked. Shows milestone names, graduation criteria progress.
2. **Core principles card** — 4 static principles in a grid
3. **Weekly goal card** — Current week's goal
4. **Primary goal widget** — Program-level goal with do/avoid/focus guidance
5. **Graduation readiness score** — Composite score with component breakdown
6. **Education sections** — 6 collapsible categories, each with section icon, progress bar, and chevron. Tap to expand/collapse. Modules assigned to current week are highlighted with a "Week X module" badge.
7. **Weekly education goal indicator** — Shows current week's module completion vs. 80% target

### 5.4 Week Detail Screen

Accessible by tapping any week dot on the graduation timeline.

Displays:
- Week number, milestone name, status (Completed / Current / Upcoming)
- Week's structural goal with description and target metric
- Education modules assigned to that week, organized by section
- Progress bar with 80% completion goal
- Previous/Next week navigation buttons

**For weeks 9–12 when locked:**
- Lock icon and "Weeks 9–12 are locked" message
- Progress toward unlocking (weeks 1–8 education completion + check-in status)
- "Start your check-in" button to begin the post-week-8 flow

**For weeks 9–12 when unlocked:**
- Shows user's chosen focus area(s)
- Personalized education modules from selected focus area(s)
- "Consolidation Phase" card explaining these weeks tie everything together

### 5.5 Education System

Education is organized into **6 sections**:

| Section | Icon | Module Count |
|---------|------|-------------|
| Glucose & CGM | 📈 | 10 |
| Nutrition | 🍴 | 9 |
| Exercise | 🏃 | 7 + 4 games |
| Hunger & Satiety | 🥘 | 9 |
| Sleep & Recovery | 💤 | 6 |
| Stress & Resilience | 🧠 | 6 + 1 game |

Modules have three tiers:

| Tier | Indicator | Content Level | Typical Read Time |
|------|-----------|---------------|-------------------|
| Foundation | 🟢 | Basic, jargon-free | 1 min |
| Intermediate | 🟡 | Practical science | 2 min |
| Advanced | 🟣 | Research-backed, precise | 3 min |

**Weekly module assignments:** Each week 1–8 has specific modules assigned that align with the week's theme. Weeks 9–12 modules are dynamically assigned based on the user's chosen focus area(s).

**Collapsible sections:** In the Toolkit, sections are collapsed by default. Tapping a section header expands it to show all modules. Section headers display icon, name, completion progress, and a progress bar.

**80% weekly education goal:** Each week tracks module completion toward an 80% target, shown with an indicator in both the Toolkit and Week Detail screens.

### 5.6 Hunger & Satiety Education Section

Dedicated education section with 9 modules:

| Module | Tier | Description |
|--------|------|-------------|
| What hunger actually is | Foundation | Ghrelin, leptin, the fuel gauge metaphor |
| Reading your hunger levels | Foundation | 5-level hunger scale, why eating at a 3 is ideal |
| Reading your fullness levels | Foundation | 5-level fullness scale, the halfway pause |
| Hunger vs. fullness on medication | Foundation | Signals are muted; practice noticing now |
| How medication changes hunger | Intermediate | GLP-1 effects on ghrelin, gastric emptying, rebound |
| Emotional vs. physical hunger | Intermediate | HALT technique, sudden vs. gradual cravings |
| Navigating appetite return | Intermediate | Recalibration vs. overeating, habit toolkit |
| Satiety as a skill | Advanced | What/how/when you eat; three levers for fullness |
| Advanced satiety strategies | Advanced | Protein leveraging, volume eating, satiation distinction |

### 5.7 Interactive Education Games

| Game | Type | Description |
|------|------|-------------|
| Protein quiz | Quiz | Compare two foods — which has more protein? |
| Fiber face-off | Quiz | Compare two foods — which has more fiber? |
| Build a balanced plate | Builder | Select protein, carb, veggie for a meal |
| Which muscle? | Quiz | Identify primary muscle an exercise targets |
| Build a workout | Builder | Select exercises, get scored, learn rep schemes |
| Which has better form? | Quiz | Compare exercise form descriptions |
| Record your form | Camera | Film 5 reps, get form feedback (mock) |
| Guided breathing | Timer | 5-minute guided breathing exercise |

### 5.8 Log Screen

Log items:
- **Daily hunger check-in** — prominent banner, "Hunger awareness" framing
- **Body scanner** — camera-based body composition measurement
- Food (placeholder)
- Exercise (placeholder)
- Water (placeholder)
- Sleep (placeholder)
- Glucose notes (placeholder)

### 5.9 Hunger Check-In

- **Framing:** "Hunger awareness" — consistent throughout program
- **Tip:** "Hunger is a signal to respond to, not resist."
- Satiety Skill score (0–100) with levels (Beginner → Learning → Developing → Advanced)
- Streak tracking
- Named scale anchors for hunger (No signal → Urgent) and fullness (Still hungry → Stuffed)
- Post-submit educational feedback based on ratings
- Rotating micro-tips from `HUNGER_MICRO_TIPS`

### 5.10 Body Scanner

- Camera-based scan via `navigator.mediaDevices.getUserMedia`
- 5-second scan with visual countdown
- Generates body fat %, visceral fat %, lifestyle bonus (0–3 pts)
- Results saved to `state.bodyScanEntries`

### 5.11 Insights Screen

Two tabs:
1. **Last 7 Days** — Glucose GPA, Lifestyle GPA, Transition Readiness scores with gauges and component drill-down
2. **Graduation Trend** — SVG graph plotting weekly Glucose, Lifestyle, and Readiness scores across the 12-week program

**GPA Detail Modals:** Each score section is tappable, opens bottom-sheet with current score, description, clickable component list, and per-component improvement tips.

### 5.12 Weight & Maintenance Band

- Shown from day 1 on the Home screen
- SVG chart with 12-week trend, ±3–5% maintenance band (green zone)
- Status indicator: within band (green) or above band (red)
- Messaging: "Some weight regain is biologically expected — it's your body recalibrating, not a failure"

### 5.13 Post-Week-8 Check-In (4-Step Flow)

**Triggered from the Week 9 locked screen.** Always accessible via "Start your check-in" button.

**Step 1: Your 8-Week Progress Report**
- Grid of metrics: Glucose GPA, Lifestyle GPA, avg daily steps, avg protein/meal, avg sleep, hunger check-in rate
- 6 detailed Signos insights with data-driven observations covering:
  - Glucose patterns (post-meal spike data, pairing correlations)
  - Nutrition consistency (3-component meal percentage, satiety duration)
  - Activity & movement (step data, post-meal walk frequency, overnight glucose impact)
  - Hunger & satiety (check-in rate, average ratings)
  - Sleep impact (hours, glucose variability correlation, hunger increase on poor sleep)
  - Stress & recovery (consistency score, stress-glucose correlation)

**Step 2: Self-Assessment Quiz**
- 8 questions, each rated 1–5 (Not at all → Always):
  1. I consistently eat protein at every meal (Nutrition)
  2. I walk after meals most days (Exercise)
  3. I can tell the difference between physical and emotional hunger (Hunger)
  4. I go to bed at a consistent time most nights (Sleep/Stress)
  5. I understand what makes my glucose spike and how to manage it (Glucose)
  6. I have at least one stress management tool I use regularly (Sleep/Stress)
  7. I usually stop eating when satisfied, not stuffed (Hunger)
  8. I understand the maintenance band and I'm not afraid of normal fluctuations (Weight)
- All questions must be answered before proceeding

**Step 3: Personalized Feedback**
- Each question receives a detailed, data-backed feedback paragraph tailored to the user's rating:
  - **Low (1–2):** Identifies the gap with specific data, gives one concrete next action
  - **Mid (3):** Acknowledges progress, shows what's working vs. not, suggests next step
  - **High (4–5):** Celebrates the win, reinforces with data, confirms the habit is locked in
- Per-question colored progress bar and rating label
- Area-by-area summary ranking from weakest to strongest with visual bars
- Recommendation of two lowest-scoring areas for focus

**Step 4: Choose Your Focus**
- Select 1 or 2 topics from 6 focus areas:

| Focus Area | Description | Modules |
|-----------|-------------|---------|
| Nutrition & Meal Building | Meal construction, flexible restraint, carb pairing, maintenance nutrition | 4 |
| Hunger & Satiety | Hunger signals, emotional eating, advanced satiety strategies | 4 |
| Exercise & Movement | Periodization, progressive overload, NEAT, long-term training | 4 |
| Sleep & Stress | Sleep architecture, allostatic load, HPA axis, daily stress tools | 4 |
| Glucose & CGM Mastery | Drift detection, maintenance CGM strategy, fasting glucose trends | 4 |
| Weight & Maintenance | Maintenance band, acceptable regain, scale interpretation, reset protocol | 5 |

- "Recommended" tags on areas matching lowest quiz scores
- Selecting unlocks personalized weeks 9–12 with modules distributed across 4 weeks
- State saved: `postWeek8CheckIn` (answers, timestamp, focus areas), `focusAreas`

### 5.14 Weekly Check-In

- Pop-up modal on home screen (after 4 seconds, once per week)
- Collects: mood (1–5 emoji), confidence (1–5), biggest challenge (text)
- Shows education progress
- Saved to `state.weeklyCheckIns`

### 5.15 Settings & Program

- **Settings:** Program details link, maintenance band configuration
- **Program screen:** Graduation week indicator, primary goal, dose history, program metrics, graduation readiness bar, recommended education modules

---

## 6. Scoring & Algorithms

### Score-to-GPA Mapping

| Score (0–100) | Letter | GPA (1–5) |
|--------------|--------|-----------|
| 90–100 | A | ~4.6–5.0 |
| 80–89 | B | ~4.2–4.6 |
| 70–79 | C | ~3.8–4.2 |
| 60–69 | D | ~3.4–3.8 |
| 0–59 | F | ~1.0–3.4 |

Formula: `GPA = 1 + (score100 / 100) * 4`

### Transition Readiness Calculation

```
readiness = (glucoseScore × 0.30) + (lifestyleScore × 0.30)
          + ((100 − |hungerAvg − 3| × 15) × 0.20)
          + (consistencyScore × 0.20)
```

### Hunger Mastery Score

- Logging frequency (40 pts max)
- Hunger proximity to ideal level 3 (30 pts max)
- Fullness proximity to ideal level 3.5 (30 pts max)
- Levels: Beginner (0–19), Learning (20–49), Developing (50–79), Advanced (80–100)

---

## 7. Data Model

All state persisted in localStorage under key `signos-glp1`.

| Field | Type | Description |
|-------|------|-------------|
| onboardingComplete | Boolean | Whether onboarding is done |
| phaseStartAt | String (date) | When the program started |
| program_enrolled_at | String (ISO) | Enrollment timestamp |
| doseEvents | Array | Dose change event log |
| hungerEntries | Object | Keyed by date, hunger/fullness ratings |
| bodyScanEntries | Object | Keyed by date, body composition results |
| completedModules | Object | Module completion timestamps |
| completedGames | Object | Game completion timestamps |
| weeklyCheckIns | Object | Keyed by week, check-in data |
| weeklyScoreHistory | Array | Weekly GPA scores for graduation trend |
| postWeek8CheckIn | Object/null | Check-in answers, timestamp, chosen focus areas |
| focusAreas | Array | User's selected focus area keys for weeks 9–12 |
| preferences | Object | User preferences |
| dismissedBanners | Object | Dismissed banner tracking |
| maintenanceBandPct | Number | Maintenance band percentage (default 5%) |
| weightAnchor | Number/null | Anchor weight for maintenance band |

---

## 8. Design & UX Specifications

- **Max width:** 480px (mobile-first)
- **Color:** Purple (#7c3aed) as primary accent throughout
- **Supporting colors:** Purple light (#ede9fe) for backgrounds, purple gradient for hero cards
- **Typography:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Card design:** 16px border radius, box shadow, 18px padding
- **Navigation:** Fixed bottom nav with safe area inset support
- **Headers:** Lowered positioning (44px top padding) for comfortable thumb reach
- **Modals:** Bottom-sheet pattern with overlay dismiss, slide-up animation
- **Score gauges:** Half-circle SVG arc with purple gradient fill
- **Education tiers:** 🟢 Foundation, 🟡 Intermediate, 🟣 Advanced indicators
- **Locked weeks:** Gray (#94a3b8) dots, lock icons, dashed connecting lines
- **Collapsible sections:** Chevron rotation animation on expand/collapse

---

## 9. Safety & Compliance

- **No dosing advice** — all dosing decisions defer to the user's clinician
- **Normalization messaging** — weight regain and appetite return are biologically expected
- **Clinician involvement** — safety copy encourages clinician involvement for adverse symptoms
- **No "good/bad" food labels** — uses "more stabilizing" vs. "less stabilizing" framing
- **No detox/restriction language** — reset routines framed as structured habit recommitment
- **Hunger framing** — skill development, not threat management

---

## 10. Analytics Events

| Event | Properties | Trigger |
|-------|-----------|---------|
| glp1_program_enrolled | — | Onboarding complete |
| glp1_insight_action_clicked | action_id | CTA button clicks |
| glp1_dose_event_logged | type | Dose event recorded |
| glp1_post8_checkin_completed | focus_areas | Post-week-8 check-in finished |
| glp1_weeks_912_unlocked | focus_areas | Focus areas selected, weeks unlocked |

---

## 11. Technical Architecture

- **Runtime:** Single-page application in vanilla JavaScript (no framework)
- **Packaging:** iOS app via Capacitor (ios/App/)
- **State management:** localStorage with migration/schema versioning
- **Rendering:** DOM manipulation via innerHTML string construction + event handler attachment
- **Routing:** In-memory screen state with history stack
- **CGM data:** Mock data for prototype
- **Camera access:** navigator.mediaDevices.getUserMedia for body scanner (mock analysis)

---

## 12. Future Considerations

- Real CGM data integration via Signos API
- Real body composition analysis (computer vision or hardware integration)
- Push notifications for habit reminders and drift alerts
- Clinician dashboard / data sharing
- Apple Health / Google Fit integration for activity, sleep, HRV data
- Server-side state persistence and cross-device sync
- Personalized AI-driven insights based on accumulated user data
- Graduation certificate screen
- Social features (community, accountability partners)

---

### Key Changes from v2.0 → v3.0

1. **Eliminated the 3-phase model** — replaced with a single 12-week GLP-1 Graduation program
2. **Unified purple theming** — removed phase-specific color switching (teal/amber/purple)
3. **Restructured weekly goals** — Week 1 is baseline observation, weeks 2–8 each introduce one focused habit
4. **Weeks 9–12 locked** — require completion of weeks 1–8 + post-week-8 check-in to unlock
5. **Post-week-8 check-in** — 4-step flow with progress report, 8-question self-assessment, per-question personalized feedback, and focus area selection
6. **Added Hunger & Satiety** as a 6th education section with 9 dedicated modules
7. **Collapsible education sections** — sections in the Toolkit collapse/expand on tap, with icons and progress bars
8. **Clickable week timeline** — every week dot navigates to a Week Detail screen with goals and education
9. **Weekly education assignments** — specific modules assigned to each week, matching the week's theme
10. **80% weekly education goal** — tracked with visual indicator per week
