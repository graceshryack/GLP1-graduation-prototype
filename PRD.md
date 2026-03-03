# Product Requirements Document (PRD)

## Signos GLP-1 Graduation Program

**Product Name:** Signos GLP-1 Graduation
**Platform:** iOS (Capacitor-wrapped web app)
**Version:** 5.0
**Original Date:** February 11, 2026
**Last Updated:** March 2, 2026

---

## 1. Overview

The Signos GLP-1 Graduation Program is a **16-week (8-block) mobile application** designed to help users tapering off or recently off GLP-1 receptor agonist medications (e.g., semaglutide, tirzepatide) build durable health habits and graduate with the skills, scores, and confidence to thrive without medication.

The application provides:

- A comprehensive, personalized onboarding that collects profile data and tailors the program to the user's struggles
- A 2-week block model (8 blocks of 2 weeks each) with aligned CGM sensor periods and habit-building goals
- An intermittent CGM schedule — 4 sensor periods across 16 weeks for targeted data collection and validation
- A progressive education curriculum organized by block, with personalized block ordering
- An interactive Hunger Coach that integrates real-time glucose context
- A personalized final 4 blocks (Blocks 5–8) based on user self-assessment
- Actionable insights powered by continuous glucose monitor (CGM) data
- Baseline, mid-program, and post-foundation self-assessments

### Core Thesis

The window during and immediately after GLP-1 treatment is the optimal time to build lasting habits in nutrition, exercise, sleep, and stress management. The 16-week graduation program builds these habits from baseline observation to mastery across 8 two-week blocks, with intermittent CGM wear periods that validate progress with data.

### Key Design Principles

- **Single unified program** — no phase switching, one continuous 16-week journey structured as 8 two-week blocks
- **Purple (#7c3aed) identity throughout** — consistent, unified visual experience
- **2-week blocks align CGM and goals** — each CGM sensor period (15 days) maps cleanly to one block, preventing misalignment between sensor data and habit focus
- **CGM validates, habits persist** — on-CGM blocks prove habits work with data; off-CGM blocks build habits by feel
- **Hunger is a skill to develop** ("Hunger awareness"), not a problem to suppress
- **Glucose explains hunger** — CGM data is connected to hunger signals to teach users why they feel what they feel
- **Weight regain is biologically expected, not failure** — maintenance band shown from day 1
- **Graduation is earned through criteria**, not waited out
- **Personalized from day one** — onboarding data reshapes block order, and the coach adapts to user history
- **Education unlocks progressively** and is organized by block theme
- **Blocks 5–8 are personalized** based on the user's post-block-4 check-in results
- **Past-tense GLP-1 framing** — the app is designed for users coming off medication, not users on a stable dose

---

## 2. Target Users

- Adults tapering their GLP-1 dose under clinician supervision
- Adults recently off GLP-1 who require maintenance and habit-building support
- Adults currently taking GLP-1 medications who are planning their transition

---

## 3. Program Model

The application is structured as a **single 16-week GLP-1 Graduation program** divided into **8 two-week blocks**.

### 3.1 Block Model Overview

Each block spans 2 weeks and has a single focus. CGM sensor periods align perfectly with blocks — a 15-day sensor covers one full block.

| Block | Weeks | CGM | Default Focus | Goal |
|-------|-------|-----|---------------|------|
| 1 | 1–2 | ON | Baseline & Learn Your Glucose | Don't change anything — observe. Log meals, sleep, hunger. Build personal baseline. |
| 2 | 3–4 | OFF | Protein + Fiber Foundation | Protein at every meal (25g+), add fiber. Use hunger check-ins as data source. |
| 3 | 5–6 | ON | Movement & CGM Proof | Post-meal walking + 2 strength sessions/wk. Compare CGM 2 to CGM 1 baseline. |
| 4 | 7–8 | OFF | Satiating Meals + Sleep & Stress | Build balanced meals, sleep consistency, stress tool. Full system without CGM. |
| 5 | 9–10 | OFF | Personalized Focus | Complete post-block-4 check-in, choose deep-dive topic, maintain all habits. |
| 6 | 11–12 | ON | Validation & CGM Check | Compare CGM 3 to CGM 1 & 2. Handle a real-life disruption with CGM on. |
| 7 | 13–14 | OFF | Refinement & Stress Test | Fix weak spots from CGM 3. Build "minimum viable day" plan. |
| 8 | 15–16 | ON | Graduation | Final CGM sensor. Compare to Block 1 baseline. Meet graduation criteria. |

### 3.2 CGM Sensor Schedule

4 intermittent sensor periods across the 16-week program:

| Sensor | Block | Weeks | Purpose |
|--------|-------|-------|---------|
| CGM 1 | Block 1 | 1–2 | Learn your glucose patterns and establish baseline data |
| CGM 2 | Block 3 | 5–6 | See how walking and resistance training change your glucose |
| CGM 3 | Block 6 | 11–12 | Validate your full system is working |
| CGM 4 | Block 8 | 15–16 | Final assessment — prove it with data |

### 3.3 Foundation Blocks (1–4)

Blocks 1 and 3 are **fixed** (CGM blocks). Blocks 2 and 4 are **dynamically reorderable** based on the user's onboarding struggles via `buildPersonalizedWeekOrder()`.

**Personalized block ordering:** The `buildPersonalizedWeekOrder()` algorithm uses `STRUGGLE_TO_TOPIC` mapping to determine whether the user's biggest struggles are better addressed by the Nutrition block (protein + fiber) or the Full System block (satiating meals + sleep/stress), and orders blocks 2 and 4 accordingly.

### 3.4 Personalized Blocks (5–8)

Locked until completion of blocks 1–4 and the post-block-4 check-in.

| Block | Weeks | CGM | Theme | Description |
|-------|-------|-----|-------|-------------|
| 5 | 9–10 | OFF | Personalized Focus | Complete check-in, choose 1–2 focus areas for deep dive |
| 6 | 11–12 | ON | Validation | CGM 3 validates habits; stress-test with disruptions |
| 7 | 13–14 | OFF | Refinement | Fix weak spots, create minimum viable day plan |
| 8 | 15–16 | ON | Graduation | Final CGM comparison to baseline, meet criteria |

### 3.5 Core Principles (static throughout program)

1. Consistency beats perfection
2. Muscle preservation is your metabolic insurance
3. Hunger is information — respond to it, don't fight it
4. Small weight regain is maintenance, not failure

### 3.6 Graduation Criteria

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
| Home | home | Dashboard with glucose graph (live or average), block goal, graduation card, habits, GPA strip, weight graph, hunger coach, CGM toggle |
| Toolkit | dailies | Scrollable graduation timeline, CGM sensor schedule, core principles, block goal, education sections, readiness score |
| Log (+) | log | Daily logging: hunger check-in, body scanner, food, exercise, water, sleep, glucose notes |
| Insights | insights | Three tabs: Lifestyle, Glucose, Graduation — with GPA drill-downs, sensor comparisons, hunger correlations |
| Settings | settings | User profile display, program details, maintenance band, preferences, program reset |

### Secondary Screens

| Screen | Access From | Description |
|--------|-------------|-------------|
| onboarding | First launch or program reset | 18-step personalized onboarding flow |
| hunger_coach | Home card or hunger questionnaire | Interactive hunger coaching with glucose integration |
| week_detail | Toolkit (tap any week dot) | Block-specific goal, education modules, progress, CGM status, and locking |
| post8_checkin | Block 1, Block 3, or Block 5 | Parameterized self-assessment flow (baseline / mid-program / post-foundation) |
| program | Settings | Detailed program metrics, dose history, graduation readiness |
| toolkit_module | Toolkit | Step-by-step toolkit module |
| education_module | Toolkit or Week Detail | Long-form education article reading view |
| education_game | Toolkit | Interactive learning activities (quizzes, builders, etc.) |
| hunger_questionnaire | Log or Home | Daily hunger/fullness rating check-in with glucose-aware feedback |
| body_scanner | Log | Camera-based body composition scan |

### Navigation Model

- History-based stack (`navHistory`) enables true back-button behavior
- `navigateTo()` pushes to stack; `navigateBack()` pops
- Bottom nav taps reset history (top-level navigation)
- Program reset clears `navHistory` and returns to onboarding step 0

---

## 5. Feature Specifications

### 5.1 Onboarding (18-step personalized flow)

A one-question-per-page onboarding flow that collects comprehensive profile data and performs a baseline assessment. Progress bar shown throughout.

| Step | Screen | Data Collected |
|------|--------|----------------|
| 0 | Welcome | — (program overview) |
| 1 | Name & age | name, age |
| 2 | Medication history | medication, duration, medStatus |
| 3 | Why coming off GLP-1 | reasonOffGlp1 (multi-select from REASON_OFF_GLP1) |
| 4 | Body & activity | weight, goalWeight, heightFt, heightIn, activityLevel |
| 5 | Goals | goals (multi-select) |
| 6 | Pre-GLP-1 struggles | preGlp1Struggles (multi-select from STRUGGLE_OPTIONS) |
| 7 | Current struggles (ranked) | currentStruggles (ranked multi-select — directly shapes block order) |
| 8 | Strength training experience | strengthTraining (never / tried / beginner / light / regular / lost) |
| 9–16 | Baseline assessment quiz | 8 questions rated 1–5, same as post-block-4 format (POST8_QUESTIONS) |
| 17 | Your Personalized Program | Shows personalized 16-week roadmap, per-question feedback, "Start your graduation" button |

On completion:

- `state.weekOrder` is generated via `buildPersonalizedWeekOrder(currentStruggles)` — returns 4-item array (block topic order)
- `state.profile` stores all onboarding profile data
- `state.week1CheckIn` stores baseline assessment answers
- `state.weightAnchor` set from profile weight

**Struggle options (12 items):** Portion control, Emotional/stress eating, Late-night snacking, Low activity/exercise, Poor sleep, Sugar & carb cravings, Understanding my glucose, Inconsistent meals, Not enough protein, Staying full/satisfied, Chronic stress, No strength/resistance training

**Reason off GLP-1 (7 items):** Cost/insurance, Side effects, Reached my goal weight, Doctor recommended, Want to try without it, Pregnancy/planning, Other

### 5.2 Home Screen

Components (in order):

1. **Program badge** — "GLP-1 Graduation — Block X (Wk Y–Z)"
2. **Graduation card** — Compact, tappable card showing current block, milestone, progress %, criteria met, and next CGM sensor countdown (when off-CGM). Navigates to Toolkit.
3. **CGM-aware glucose display** — Two modes, toggleable by tapping:
   - **CGM Active** (on-sensor blocks): Live glucose graph (SVG line chart) with current reading, reference lines, meal/activity timeline. Blue-bordered card with "LIVE — tap to toggle" badge.
   - **CGM Off** (off-sensor blocks): "Your Average Day" card showing a static average daily glucose SVG from the last sensor period, in amber tones. Displays key metrics (Avg mg/dL, Glucose GPA, Time in Range) and an actionable insight. "OFF — tap to toggle" badge.
4. **Hunger Coach card** — Always visible. Shows satiety skill level, daily tip, and "Talk to your coach" button. Elevated during off-CGM blocks with a purple "YOUR PRIMARY SIGNAL THIS WEEK" banner and dedicated insight.
5. **GPA strip** — Glucose GPA, Lifestyle GPA, Consistency GPA (includes education completion). Tappable to Insights.
6. **Weight & maintenance band graph** — SVG chart with 16-week weight trend, ±3–5% band. Shown from day 1.
7. **Block goal card** — Current block's structural goal. For blocks 5+ when locked, shows locked state with unlock requirements.
8. **Today's habits card** — Daily habit checklist with progress indicators.
9. **Appetite return normalization card** — Contextual, dismissible card explaining that hunger returning is biologically expected during GLP-1 transition.

**CGM Toggle:** The glucose display card is clickable to toggle between CGM active and off views (controlled by `cgmOverride` state variable for demo purposes). Visual cues — colors, badges, and graph styles — make the difference obvious.

### 5.3 Hunger Coach

The Hunger Coach is an interactive conversational coaching tool for hunger understanding and management. It integrates real-time glucose context, tracks user strategy adoption, detects behavioral patterns, and progressively builds hunger literacy.

#### Architecture

The coach maintains an in-memory `coachState` object:

| Field | Type | Description |
|-------|------|-------------|
| scenario | string/null | Active scenario ID |
| branch | string/null | Current branching sub-scenario |
| step | number | Conversation step counter |
| path | Array | User's path through branches (for session logging) |
| haltSelected | string/null | HALT grid selection |
| scanStep | number | Body scan step index (-1 = not started) |
| followUpShown | boolean | Whether follow-up options have been rendered |
| timerActive | boolean | 10-minute pause timer active |
| timerSeconds | number | Timer countdown remaining |
| mealTimerActive | boolean | 20-minute meal timer active |
| mealTimerSeconds | number | Meal timer countdown remaining |
| strategyTracked | boolean | Whether user committed to a strategy |
| viewingLesson | string/null | Active mini-lesson ID |

`resetCoachState()` resets all fields between sessions.

#### Landing Page

The landing page renders a personalized experience based on accumulated user data:

- **Personalized greeting** — Uses `state.profile.name` (first name). Contextual message based on hunger trends:
  - 4+ days at hunger sweet spot (3): "You've been eating at the sweet spot X out of 7 days."
  - Average hunger > 3.5: "Your hunger has been running a bit high this week."
  - Average hunger < 2.5: "Your hunger has been very low this week. Make sure you're eating enough."
  - Default: "I'm here to help you understand your hunger — not fight it."
- **Stats bar** — Day streak, average hunger (color-coded green if |avg − 3| ≤ 0.5, amber otherwise), average fullness, coach chats this week
- **Glucose status card** — Real-time glucose context from `getGlucoseContext()` with color-coded background (red for crash, amber for below-baseline, green for stable) and contextual note linking glucose state to current hunger patterns
- **Best strategy card** — Surfaces the user's most effective strategy from `state.strategyLog` (filtered by `helped: true`)
- **Pattern detection card** — After 5+ sessions, identifies the most frequently selected scenario and suggests exploring the Learn section
- **Scenario selection** — 10 scenarios organized into 3 categories (see below)
- **Mini-lesson library** — 5 deep-dive lessons accessible from landing page

#### 10 Coaching Scenarios

Organized into 3 categories:

**Practice a Skill (Proactive)**

| ID | Label | Description |
|----|-------|-------------|
| about_to_eat | "I'm about to eat — help me prepare" | Pre-meal coaching with hunger level assessment and 20-minute meal timer |
| post_meal | "I just finished eating — let me reflect" | Post-meal debrief with fullness assessment and composition analysis |

**I'm Feeling Something (Reactive)**

| ID | Label | Description |
|----|-------|-------------|
| ate_still_hungry | "I just ate but I'm still hungry" | Post-meal hunger: timing → composition → stomach vs. mouth hunger |
| starving | "I'm starving and need to eat now" | Intense hunger: last meal timing → contextual advice |
| craving | "I'm craving something specific" | Craving type: sweet / salty / rich / specific food |
| not_hungry_want_eat | "I'm not hungry but I want to eat" | HALT check (2×2 grid): Hungry / Angry-Anxious / Lonely-Bored / Tired |
| unsure | "I'm not sure if I'm hungry" | 4-step guided body scan with timed interoception exercises |
| unusual_time | "I feel hungry at an unusual time" | Time-specific: late night / mid-afternoon / early morning / post-workout |

**Learn & Explore**

| ID | Label | Description |
|----|-------|-------------|
| hunger_changing | "My hunger feels different lately" | Medication transition: more hungry / less hungry / unpredictable / different sensation |
| learn_hunger | "Teach me about hunger" | Entry point to 5 mini-lessons |

#### Branching Conversation Model

Each scenario maps to a `COACH_BRANCHES` entry containing:

- **question** — The coach's opening question
- **options** — Array of selectable responses (id, label, optional desc)
- **responses** — Map of option ID to response object, which contains:
  - `title` — Bold heading for the advice
  - `body` — Explanatory paragraph with science-backed context
  - `actions` — Numbered action steps ("What to do right now")
  - `why` — "Why this works" explanation
  - `followUp` (optional) — ID of next branching question (enables multi-step trees)
  - `showTimer` (optional) — Shows 10-minute countdown timer
  - `showMealTimer` (optional) — Shows 20-minute meal timer (vagus nerve pacing)
  - `trackStrategy` (optional) — Shows strategy commitment UI

Some scenarios have specialized UI:

- **HALT check** (`isHalt: true`): Renders a 2×2 grid with H-A-L-T letters and descriptions
- **Body scan** (`isBodyScan: true`): Renders a multi-step timed exercise with per-step countdown timers (8–10 seconds each), followed by a post-scan interpretation selection

#### Branching Flow Maps

**"Still hungry" scenario** branches 3 levels deep:

1. "When did you finish eating?" → < 15 min / 15–30 min / > 30 min
2. (15–30 min) → "What did your meal look like?" → carb-heavy / had protein / balanced
3. (> 30 min or had protein) → "Put your hand on your stomach" → physical hunger / mouth hunger

**"Post-meal" scenario** branches into a sub-tree:

1. "How do you feel?" → still hungry / just right / too full / can't tell
2. (still hungry) → "What did your meal look like?" → low protein / small portion / ate fast / balanced meal

**"Starving" scenario:**

1. "When was your last meal?" → 4+ hours / 2–4 hours / just woke up

**"Craving" scenario:**

1. "What are you craving?" → sweet / salty / rich / a specific food

**"Not hungry but want to eat" (HALT):**

1. HALT grid → Actually hungry / Angry-Anxious / Lonely-Bored / Tired

**"Not sure if hungry" (Body Scan):**

1. 4 timed steps → "Close eyes, breathe" (8s) → "Hand on stomach" (10s) → "Think of plain food" (8s) → "Think of indulgent food" (8s)
2. Post-scan: "I felt physical signals" / "I'd eat plain food" / "Only want indulgent" / "Still unsure"

**"Unusual time" scenario:**

1. "When is this happening?" → Late night / Mid-afternoon / Early morning / Post-workout

**"About to eat" scenario:**

1. "What's your hunger level?" → 1–2 not hungry / 3 sweet spot / 4–5 very hungry

**"Hunger changing" scenario:**

1. "What feels different?" → Hungrier / Less hungry / Comes in waves / Different sensation

#### Glucose Integration in Responses

After the coach delivers its advice, a glucose context card is injected for all hunger-related scenarios (`ate_still_hungry`, `starving`, `craving`, `not_hungry_want_eat`, `unsure`, `post_meal`, `about_to_eat`, `hunger_changing`). The card includes:

- Current glucose value and trend
- Color-coded background (red/amber/green)
- Scenario-specific interpretation, e.g.:
  - Crash + craving: "This crash is likely driving your hunger right now."
  - Stable + not hungry but want to eat: "Stable glucose confirms this urge isn't physical hunger."
  - Stable + about to eat: "You're in a good position to eat a well-paced, balanced meal."
  - Crash + post-meal: "A rapid glucose drop like this can make you feel unsatisfied even after eating enough."
  - Below baseline + craving: "Your brain is requesting fast carbs to restore fuel."

#### Strategy Tracking

When `trackStrategy: true`:

1. Coach displays the first 3 action items as committable strategies
2. User taps to commit → logged to `state.strategyLog` with timestamp, scenario, strategy text (truncated to 60 chars), and `helped: null`
3. Strategy log capped at 200 entries (trimmed to last 100 on overflow)
4. Landing page surfaces the most effective strategy by counting entries where `helped: true`

#### Follow-Up System

Every coach response ends with 4 follow-up options:

1. **"I paused and the feeling passed"** → "Awareness win. You recognized the signal, paused, and let it pass on its own. That's not willpower — it's a skill."
2. **"I ate something intentionally"** → "That's a great outcome. You checked in, made a conscious decision, and chose to eat intentionally. That's the opposite of reactive eating."
3. **"I ate and I feel satisfied"** → "Perfect landing. You read your body's signal, responded to it, and ended up satisfied."
4. **"I want to learn more about this"** → "Curiosity is progress." + links to all 5 mini-lessons

All follow-up responses are positive. Eating is never framed as failure.

#### Session Logging

On follow-up selection, a session is logged to `state.coachSessions`:

```json
{
  "timestamp": "ISO-8601",
  "scenario": "craving",
  "path": ["craving", "sweet"],
  "followUp": "ate_intentional"
}
```

Capped at 100 entries.

#### 5 Mini-Lessons

| ID | Title | Key Takeaway |
|----|-------|-------------|
| types | The 5 types of hunger | Only stomach hunger requires food. The others need different solutions — and recognizing which one you're feeling IS the skill. |
| scale | The hunger scale explained | Eat at level 3 and stop at fullness 3–4. This "sweet spot" gets easier to find with practice. |
| glp1_hunger | How GLP-1 changes your hunger | Hunger signals will change throughout the program. Each phase is normal. The goal is to build skills that work at every hunger level. |
| satiation | The satiation toolkit | You don't need willpower to feel full. You need the right combination of nutrients, timing, and awareness. |
| glucose_hunger | How glucose drives your hunger | Most unexplained hunger is a glucose crash in disguise. Eat protein first, add fiber, and watch your CGM. |

Each lesson renders with full content, a "Key takeaway" highlight card, and a "Back to coach" button.

#### Timers

- **10-minute pause timer**: Used in craving, boredom, and uncertainty scenarios. Circular countdown ring (`coach-timer-ring`). Starts at 600 seconds.
- **20-minute meal timer**: Used in pre-meal coaching ("About to eat" scenario). Starts at 1200 seconds. Based on vagus nerve pacing — fullness signals take 15–20 minutes to reach the brain.
- **Body scan step timers**: 4 timed steps (8–10 seconds each) with per-step countdowns during interoception exercises.

### 5.4 Glucose-Hunger Integration Engine

The `getGlucoseContext()` function generates simulated glucose context that is threaded throughout the app — on the Hunger Coach landing, in coach responses, and in hunger check-in feedback.

#### Context Generation Logic

The function uses time-of-day, user profile (weight-adjusted baseline), and today's hunger entry to simulate one of 4 glucose states:

| State | Time Window | Trigger | Current Value | Trend | Color |
|-------|-------------|---------|---------------|-------|-------|
| **Crash** | 9–11, 14–16, 20–22 | High hunger OR 35% random | `max(68, peak − drop − 10)` where peak = baseline + 45–74, drop = 40–64 | "dropping" | Red (#ef4444) |
| **Below baseline** | 9–11, 14–16, 20–22 | 35–55% random | `baseline − 8 to −19` | "below_baseline" | Amber (#f59e0b) |
| **Post-meal rise** | 7–9, 12–14, 18–20 | Default during meal windows | `baseline + 15 to +34` | "rising" | Amber (#f59e0b) |
| **Stable** | All other times | Default | `baseline ± ~6` | "stable" | Green (#16a34a) |

**Baseline is weight-adjusted:** >200 lbs → 100 mg/dL, <140 lbs → 88 mg/dL, otherwise 95 mg/dL.

Each state includes:

- `current` — Simulated glucose value in mg/dL
- `baseline` — User's personal baseline
- `trend` — Trend label (dropping / below_baseline / rising / stable)
- `type` — State identifier
- `message` — Full-sentence explanation of what the value means for hunger
- `shortLabel` — Compact display string (e.g., "92 mg/dL — stable")
- `icon` — Color-coded circle emoji (red / amber / green)
- `color` — Hex color value

#### Integration Points

1. **Hunger Coach landing page** — Glucose card with contextual note linking glucose state to the user's weekly hunger trends
2. **Hunger Coach response cards** — Injected after every coach advice response with scenario-specific interpretation
3. **Hunger check-in feedback** — `getGlucoseHungerInsight()` generates a tailored insight card after submission

#### getGlucoseHungerInsight(hungerVal, fullnessVal)

Combines glucose context with the user's hunger/fullness ratings to produce scenario-specific insights:

| Glucose State | Hunger Level | Insight Title | Summary |
|--------------|-------------|---------------|---------|
| Crash | ≥ 4 | "Your hunger matches a glucose crash" | Rapid drop is driving hunger. Eat protein to stabilize without re-triggering spike-crash cycle. |
| Crash | ≤ 2 | "Glucose crashed but hunger is low" | Medication may be masking the signal. Eat a structured snack — low glucose affects concentration. |
| Below baseline | ≥ 3 | "Below-baseline glucose is driving carb cravings" | Brain requesting fast carbs. Satisfy with protein + small carb (apple + peanut butter). |
| Stable | = 3 | "Glucose stable, hunger at sweet spot" | Ideal state. Body communicating genuine hunger without glucose interference. |
| Stable | ≥ 4 | "Glucose is stable — this is real hunger" | Not crash-driven. Genuine physical hunger — eat a protein-forward meal. |
| Post-meal | ≤ 2 | "Post-meal glucose rising — fullness should follow" | Fullness signals take 15–20 minutes. Wait before eating more. |
| Stable | ≤ 2 | "Low hunger, stable glucose — medication effect" | Normal on medication. Eat by structure to protect muscle. |
| Default | — | "Your glucose context" | General glucose + hunger interpretation with reading and recommendation. |

### 5.5 Hunger Check-In (Glucose-Aware)

A daily hunger and fullness rating flow with glucose-integrated feedback, satiety skill tracking, and coach escalation.

#### Input Screen

Components (in order):

1. **Satiety Skill card** — Shows mastery score (0–100), level name (Beginner / Learning / Developing / Advanced), current streak, and progress bar. Color-coded: green ≥ 70, amber ≥ 40, gray < 40.
2. **Hunger awareness frame** — Static messaging: "Hunger is a signal to respond to, not resist. Each check-in builds your ability to recognize real hunger, eat at the right time, and trust your body's signals. Satiety is a skill — and it gets stronger with practice."
3. **Hunger rating** — Slider (1–5) with tappable named anchors above:
   - 1: "No signal" — Not hungry at all
   - 2: "Mildly aware" — Slight hunger
   - 3: "Ready to eat" — Comfortably hungry
   - 4: "Very hungry" — Hard to focus
   - 5: "Urgent" — Overly hungry
4. **Fullness rating** — Slider (1–5) with named anchors:
   - 1: "Still hungry" — Not satisfied
   - 2: "Slightly full" — Could eat more
   - 3: "Satisfied" — Comfortable (ideal)
   - 4: "Full" — Slightly too much
   - 5: "Stuffed" — Uncomfortably full
5. **Submit button**

#### Feedback Screen (post-submit)

On submission, the check-in data is saved to `state.hungerEntries[todayKey]` with `overallHunger`, `postMealFullness`, and `completedAt` timestamp. The input UI is replaced with:

1. **Contextual feedback** — Based on hunger value:
   - Hunger ≥ 4: "Higher hunger — your body is talking." Suggests protein-first meal, checks for sleep correlation.
   - Hunger ≤ 2: "Low hunger today." Encourages structured eating to protect muscle.
   - Hunger = 3: "Comfortably hungry — sweet spot." Confirms satiety habits are working.
   - Fullness modifiers: ≤ 2 adds slow-eating and fiber tips; ≥ 5 adds halfway-pause strategy.

2. **Glucose insight card** — Generated by `getGlucoseHungerInsight()`. Color-coded left border (red/amber/green). Shows title, interpretation, and actionable recommendation.

3. **Rotating micro-tip** — One of 10 randomized educational tips:
   - "Hunger at a 3 is your sweet spot — it means your body is communicating well."
   - "Feeling a 4 or 5? That usually means you waited too long. Next time, eat at a 3."
   - "Satiety improves with practice. Protein, fiber, and eating speed all help."
   - "Hunger returning as medication changes is a sign your metabolism is activating — that's good."
   - "Post-meal fullness of 3–4 means you nailed the portion. Over 4 means slightly too much."
   - "Pair protein + fiber at every meal to extend your fullness window by 1–2 hours."
   - "A 10-minute walk after eating improves both glucose and satiety signals."
   - "Poor sleep raises ghrelin (hunger hormone) by ~15–20%. Prioritize sleep to manage hunger."
   - "Eating slowly (20+ min per meal) lets fullness signals reach your brain before you overeat."
   - "Hunger is information, not an emergency. Observe it, respond to it, don't fight it."

4. **Updated Satiety Skill score** — Progress bar and level after incorporating today's entry.

5. **Coach escalation button** — Shown conditionally when hunger ≥ 4, fullness ≥ 5, or fullness ≤ 1: "Need help with this? Talk to your coach" → navigates to Hunger Coach.

6. **Done button** — Returns to Log screen.

#### Satiety Skill Score (getHungerMasteryScore)

Composite score (0–100) calculated from the last 14 days of hunger entries:

| Component | Max Points | Calculation |
|-----------|-----------|-------------|
| Logging consistency | 40 | `min(40, daysLogged × 4)` — full credit at 10 out of 14 days |
| Hunger accuracy | 30 | `max(0, 30 − |avgHunger − 3| × 15)` — ideal average is 3 |
| Fullness accuracy | 30 | `max(0, 30 − |avgFullness − 3.5| × 15)` — ideal average is 3.5 |

Level names: Beginner (0–19), Learning (20–49), Developing (50–79), Advanced (80–100).

Streak is calculated as consecutive days with a completed hunger entry, counting backwards from today.

### 5.6 Toolkit (Graduation Toolkit)

Structure:

1. **Scrollable graduation timeline** — 16 individual week dots in a single horizontal scrollable row. Weeks are visually grouped in pairs (blocks) with shared rounded containers:
   - CGM blocks (1, 3, 6, 8): Blue border with "CGM" badge centered on top
   - Habit blocks (2, 4, 5, 7): Subtle gray border
   - Short 6px connecting line between the two weeks inside a block; 10px line between blocks
   - Auto-scrolls to center on the current week on render
   - Right-edge fade gradient hints at scrollability
   - Hidden scrollbar for clean mobile appearance
   - Tapping any week dot opens the block detail view
   - Weeks 9–16 show lock icons when blocks 5–8 are not yet unlocked
   - Legend: CGM block indicator + Habit block indicator
2. **CGM Sensor Schedule card** — Grid showing all 4 sensor periods with block numbers, weeks, purpose, and active/done/upcoming status indicators
3. **Core principles card** — 4 static principles in a grid
4. **Block goal card** — Current block's goal (dynamically from `pBlockGoal()`)
5. **Primary goal widget** — Program-level goal with do/avoid/focus guidance
6. **Graduation readiness score** — Composite score with component breakdown
7. **Education sections** — 6 collapsible categories with progress tracking
8. **Block education goal indicator** — 80% completion target per block

### 5.7 Week Detail Screen (Block Detail)

Tapping any week dot opens a block-level detail view:

- Block number and week range (e.g., "Block 3 (Wk 5–6)")
- Block milestone name (personalized via `pBlockMilestone()`)
- Status — Completed / Current block / Upcoming, with week range
- CGM status badge:
  - CGM blocks: Blue banner with sensor label and purpose
  - Habit blocks: Gray "Habit Mode — No CGM" banner
- Block goal with description and target metric (from `pBlockGoal()`)
- Education modules assigned to the block (from `pBlockEdu()`), organized by section with progress tracking
- Block 1: Baseline assessment card (completed during onboarding)
- Block 3: Mid-program assessment card (links to post8_checkin with checkinWeek=5)
- Blocks 5–8 locked: Shows unlock requirements (blocks 1–4 completion + post-block-4 check-in), education progress bar, and "Start your check-in" button
- Navigation: Previous/next block buttons for browsing between blocks

### 5.8 Self-Assessment Flow (Parameterized)

The `renderPost8CheckIn` function is parameterized by `checkinWeek` (1, 5, or 9), serving three purposes:

| Invocation | Title | Purpose |
|-----------|-------|---------|
| Block 1 (onboarding) | "Baseline Check-In" | Establish starting point; stored in `state.week1CheckIn` |
| Block 3 | "Mid-Program Check-In" | Measure progress against baseline; stored in `state.week5CheckIn` |
| Block 5 | "Post-Block 4 Check-In" | Full check-in with focus area selection; stored in `state.postWeek8CheckIn` |

All three use the same 4-step flow with customized copy per stage:

**Step 1: Signos Insights**

- Grid of metrics: Glucose GPA, Lifestyle GPA, avg daily steps, avg protein/meal, post-meal walks/week, hunger check-in days
- Signos-noticed insights with data-driven observations
- Customized heading per stage ("Your Starting Numbers" / "Your Numbers So Far" / "Your Numbers")

**Step 2: Self-Assessment Quiz**

8 questions, each rated 1–5 (Not at all → A little → Sometimes → Usually → Always):

| # | Question | Area |
|---|----------|------|
| 1 | I consistently eat protein at every meal. | nutrition |
| 2 | I walk after meals most days. | exercise |
| 3 | I can tell the difference between physical hunger and emotional hunger. | hunger |
| 4 | I go to bed at a consistent time most nights. | sleep_stress |
| 5 | I understand what makes my glucose spike and how to manage it. | glucose |
| 6 | I have at least one stress management tool I use regularly. | sleep_stress |
| 7 | I usually stop eating when satisfied, not stuffed. | hunger |
| 8 | I understand what maintenance weight is and I'm not afraid of normal fluctuations. | weight |

**Step 3: Personalized Feedback**

Each question receives a detailed, data-backed feedback paragraph tailored to the user's rating:

- **Low (1–2):** Identifies the gap with specific data, gives one concrete next action
- **Mid (3):** Acknowledges progress, shows what's working vs. not, suggests next step
- **High (4–5):** Celebrates the win, reinforces with data, confirms the habit is locked in

For mid-program and post-block-4 check-ins, scores are compared to baseline with delta indicators.

**Step 4: Choose Your Focus** (Block 5 only)

Select 1–2 topics from 6 focus areas:

| Focus Area | Description | Modules |
|-----------|-------------|---------|
| Nutrition & Meal Building | Meal construction, flexible restraint, carb pairing, maintenance nutrition | 4 |
| Hunger & Satiety | Hunger signals, emotional eating, advanced satiety strategies | 4 |
| Exercise & Movement | Periodization, progressive overload, NEAT, long-term training | 4 |
| Sleep & Stress | Sleep architecture, allostatic load, HPA axis, daily stress tools | 4 |
| Glucose & CGM Mastery | Drift detection, maintenance CGM strategy, fasting glucose trends | 4 |
| Weight & Maintenance | Maintenance band, acceptable regain, scale interpretation, reset protocol | 5 |

- "Recommended" tags on areas matching lowest quiz scores
- Selecting unlocks personalized blocks 5–8 with modules distributed across 4 blocks
- State saved: `postWeek8CheckIn` (answers, timestamp, focus areas), `focusAreas`

### 5.9 Insights Screen

Restructured into three tabs:

**Lifestyle Tab**

- Lifestyle GPA gauge with component drill-down
- Transition Readiness score with weighted components (Glucose 30%, Lifestyle 30%, Hunger/Satiety 20%, Consistency 20%)
- Hunger & Lifestyle Correlations — Sleep, Activity, Water, Stress, Strength training correlations with hunger patterns
- 3-step stabilization plan card

**Glucose Tab**

- CGM status note (amber banner when off-CGM, showing next sensor block)
- Glucose GPA gauge with component drill-down
- Sensor-by-Sensor Comparison — `buildSensorComparisonSVG()` overlays average daily glucose curves for each completed CGM period with a detailed metrics comparison table (Avg Glucose, Time in Range, Spikes/Day, Post-meal Avg, Fasting Avg, Variability)
- Hunger & Glucose Correlations — Post-meal spikes, Glucose crashes, Fiber pairing, Protein first, Meal timing, Post-meal walk correlations

**Graduation Tab**

- Graduation trend SVG — Weekly GPA scores (Glucose, Lifestyle, Readiness) plotted over 16 weeks with CGM period shading
- Score summary — Latest vs. first scores with delta indicators
- Hunger & Program Progress — Food-specific findings, Satiety skill improvement, Hunger sweet spot progress, Consistency impact

**GPA Detail Modals:** Tappable GPA cards open a bottom-sheet modal with current score, 7-day trend, best/worst periods, description, clickable component list, and per-component improvement tips (5 tips per component).

### 5.10 Education System

Education is organized into **6 sections** with modules assigned per block:

| Section | Icon | Description |
|---------|------|-------------|
| Glucose & CGM | 📈 | CGM basics, patterns, pairing, transition, drift prevention, maintenance |
| Nutrition | 🍴 | Protein, fiber, meal structure, carb strategy, satiety, hydration |
| Exercise | 🏃 | Walking, resistance, recovery, post-meal movement |
| Hunger & Satiety | 🥘 | Hunger signals, fullness, emotional hunger, appetite return |
| Sleep & Recovery | 💤 | Sleep consistency, sleep-glucose connection, hydration |
| Stress & Resilience | 🧠 | Stress-glucose, stress management, recovery |

**Block education assignments** (`BLOCK_EDUCATION`):

| Block | Focus Sections | Module Count |
|-------|---------------|-------------|
| Block 1 | Glucose/CGM + Hunger | 8 modules |
| Block 2 | Nutrition + Hunger | 6 modules |
| Block 3 | Exercise + Glucose/CGM | 7 modules |
| Block 4 | Nutrition + Sleep + Stress + Hunger | 9 modules |
| Blocks 5–8 | Personalized from selected focus areas | Variable |

**Module tiers:** 🟢 Foundation, 🟡 Intermediate, 🟣 Advanced — with typical read times of 1–3 minutes.

**Interactive Games (5):**

| Game | Section | Mechanic | Description |
|------|---------|----------|-------------|
| Protein Guess | Nutrition | Multi-round quiz | Compare two foods — which has more protein? |
| Build a Balanced Plate | Nutrition | 3-step builder | Select protein, carb, and veggie to construct a meal and get scored |
| Best Workout | Exercise | Selection quiz | Choose the best workout for a given scenario |
| Form Check | Exercise | Camera recorder | Record exercise form for feedback (mock) |
| Meditation Timer | Stress | Timed activity | Guided meditation with countdown timer |

**80% block education goal:** Each block tracks module completion toward an 80% target, shown with an indicator in both the Toolkit and Week Detail screens.

### 5.11 Settings Screen

- **User profile card** — Displays onboarding data: name, age, medication, status, weight, activity level, strength training experience
- **Program details link** — navigates to program screen
- **Maintenance band percentage setting** — adjustable ±3–5%
- **Preferences toggles** — user preference controls
- **Reset program** — Red-bordered card with confirmation modal. Clears all localStorage, resets state, clears `navHistory`, resets `onboardStep` to 0, and navigates to the first onboarding screen.

### 5.12 Log Screen, Body Scanner & Weight Band

#### Log Screen

Central logging hub with 7 items:

1. **Daily hunger check-in banner** — Prominent, always visible until completed for the day. Changes state on completion.
2. **Body Scanner button** — Camera-based composition scan
3. **Food log** (placeholder)
4. **Exercise log** (placeholder)
5. **Water log** (placeholder)
6. **Sleep log** (placeholder)
7. **Glucose notes** (placeholder)

#### Body Scanner

Mock camera-based body composition measurement:

- Uses `navigator.mediaDevices.getUserMedia` for camera access
- 5-second scan countdown with visual indicator
- Results: body fat %, visceral fat %, lifestyle bonus (0–3 points added to Lifestyle GPA)
- Color-coded result indicators
- Results saved to `state.bodyScanEntries` keyed by date

#### Weight & Maintenance Band

- Anchor weight set from `state.weightAnchor` (defaults to onboarding profile weight)
- Band percentage configurable in Settings (`state.maintenanceBandPct`, default 5%)
- Band range: `anchor × (1 ± bandPct/100)` — e.g., 165 lbs with 5% → 157–173 lbs
- SVG chart showing 16-week weight trend with shaded band region
- Shown from day 1 on the Home screen with normalization messaging
- Graduation criterion: current weight ≤ upper band limit for 2 consecutive weeks
- Messaging: "Some weight regain is biologically expected — it's your body recalibrating, not a failure"

### 5.13 Weekly Check-In

- Pop-up modal on home screen (after 4 seconds, once per week)
- Collects: mood (1–5 emoji), confidence (1–5), biggest challenge (text)
- Shows education progress
- Saved to `state.weeklyCheckIns`

---

## 6. Scoring & Algorithms

### 6.1 Score-to-GPA Mapping

| Score (0–100) | Letter | GPA (1–5) |
|--------------|--------|-----------|
| 90–100 | A | ~4.6–5.0 |
| 80–89 | B | ~4.2–4.6 |
| 70–79 | C | ~3.8–4.2 |
| 60–69 | D | ~3.4–3.8 |
| 0–59 | F | ~1.0–3.4 |

Formula: `GPA = 1 + (score100 / 100) * 4`

### 6.2 Transition Readiness Calculation

```
readiness = (glucoseScore × 0.30) + (lifestyleScore × 0.30)
          + ((100 − |hungerAvg − 3| × 15) × 0.20)
          + (consistencyScore × 0.20)
```

### 6.3 Consistency Score

Average of: workout consistency, macro consistency (weekly), water consistency (weekly), education module completion.

### 6.4 Hunger Mastery Score

| Component | Max Points | Calculation |
|-----------|-----------|-------------|
| Logging frequency | 40 | `min(40, daysLogged × 4)` — full at 10/14 days |
| Hunger proximity to ideal | 30 | `max(0, 30 − |avgHunger − 3| × 15)` |
| Fullness proximity to ideal | 30 | `max(0, 30 − |avgFullness − 3.5| × 15)` |

Levels: Beginner (0–19), Learning (20–49), Developing (50–79), Advanced (80–100)

### 6.5 Block/Week Conversion

```
blockToWeeks(b) → [b * 2 - 1, b * 2]  // e.g., Block 3 → [5, 6]
weekToBlock(w) → Math.ceil(w / 2)       // e.g., Week 6 → Block 3
```

---

## 7. Data Model

All state persisted in localStorage under key `signos-glp1`.

| Field | Type | Description |
|-------|------|-------------|
| onboardingComplete | Boolean | Whether onboarding is done |
| phaseStartAt | String (date) | When the program started |
| program_enrolled_at | String (ISO) | Enrollment timestamp |
| profile | Object | Full onboarding profile (name, age, medication, duration, medStatus, weight, goalWeight, heightFt, heightIn, activityLevel, strengthTraining, goals, preGlp1Struggles, currentStruggles, reasonOffGlp1) |
| weekOrder | Array (4 strings) | Personalized block topic order (e.g., `['baseline_cgm', 'nutrition', 'movement_cgm', 'full_system']`) |
| week1CheckIn | Object | Baseline assessment answers from onboarding |
| week5CheckIn | Object | Mid-program assessment answers |
| postWeek8CheckIn | Object/null | Post-block-4 check-in answers, timestamp, focus areas |
| focusAreas | Array | User's selected focus area keys for blocks 5–8 |
| doseEvents | Array | Dose change event log |
| hungerEntries | Object | Keyed by date, hunger/fullness ratings + timestamps |
| bodyScanEntries | Object | Keyed by date, body composition results |
| completedModules | Object | Module completion timestamps |
| completedGames | Object | Game completion timestamps |
| weeklyCheckIns | Object | Keyed by week, check-in data |
| weeklyScoreHistory | Array | Weekly GPA scores for graduation trend (still per-week for granularity) |
| coachSessions | Array | Hunger Coach session logs. Capped at 100. |
| strategyLog | Array | Strategy tracking. Capped at 200. |
| cgmOverride | Boolean/null | Manual CGM toggle override for demo purposes |
| preferences | Object | User preferences |
| dismissedBanners | Object | Dismissed banner tracking |
| maintenanceBandPct | Number | Maintenance band percentage (default 5%) |
| weightAnchor | Number/null | Anchor weight for maintenance band |

---

## 8. CGM Integration Model

### 8.1 Intermittent Wear Schedule

The program uses 4 intermittent CGM sensor periods rather than continuous wear:

```
CGM_BLOCKS = { 1: true, 2: false, 3: true, 4: false, 5: false, 6: true, 7: false, 8: true }
```

### 8.2 Helper Functions

| Function | Purpose |
|----------|---------|
| `isCGMWeek(wk)` | Returns true if a given week has CGM active |
| `isCGMBlock(b)` | Returns true if a given block has CGM active |
| `getCGMPeriod(wk)` | Returns the CGM period object for a given week, or null |
| `getNextCGMBlock(b)` | Returns the next block number that has CGM, or null |
| `getLastCGMPeriod(wk)` | Returns the most recent completed CGM period before a given week |

### 8.3 Home Screen CGM Toggle

The glucose display on the home screen is clickable to toggle between CGM active and off views:

- **CGM Active view:** Blue-bordered card, live glucose SVG, "LIVE" badge
- **CGM Off view:** Amber-themed card, static "average day" glucose SVG from last sensor, key metrics, actionable insight, "OFF" badge
- Toggle controlled by `cgmOverride` state variable (null = auto-detect from schedule)
- Visual differences are pronounced (colors, graph styles, badges) to make the toggle obvious

### 8.4 Off-CGM Experience

During off-CGM blocks, the app adapts:

- **Home screen:** Average daily glucose graph replaces live CGM, hunger coach is elevated as "YOUR PRIMARY SIGNAL THIS WEEK"
- **Insights Glucose tab:** Amber notice showing CGM off status and next sensor block
- **Week detail:** "Habit Mode — No CGM" banner instead of CGM active banner
- **Education:** Modules emphasize building habits by feel rather than relying on real-time data

---

## 9. Design & UX Specifications

### 9.1 Visual Identity

- **Primary accent:** Purple (#7c3aed) throughout all screens
- **Purple light:** #ede9fe for backgrounds and highlight cards
- **CGM active:** Blue (#2563eb) borders, backgrounds, badges
- **CGM off:** Amber (#d97706) tones for average glucose display
- **Success:** Green (#16a34a) for completed states
- **Locked:** Gray (#94a3b8) for locked blocks

### 9.2 Layout & Typography

- **Max width:** 480px (mobile-first)
- **Typography:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Card design:** 16px border radius, box shadow, 18px padding
- **Navigation:** Fixed bottom nav with safe area inset support
- **Headers:** Lowered positioning (44px top padding) for comfortable thumb reach
- **Modals:** Bottom-sheet pattern with overlay dismiss, slide-up animation
- **Score gauges:** Half-circle SVG arc with purple gradient fill

### 9.3 Timeline UI

The graduation timeline is a single horizontal scrollable row with:

- 16 individual week dots, each 22px circles
- Dots grouped in pairs inside rounded block containers (20px border-radius)
- CGM blocks: `border: 1.5px solid #93c5fd; background: rgba(37,99,235,0.06)` with centered "CGM" badge
- Habit blocks: `border: 1.5px solid #e2e8f0; background: rgba(0,0,0,0.02)`
- 6px internal connecting line between weeks in a block; 10px between blocks
- Right-edge fade gradient for scroll hint
- Auto-centers on current week on render
- Hidden scrollbar (CSS `scrollbar-width: none`)

### 9.4 Coach UI Elements

- `.coach-bubble` (speech bubble), `.coach-option` (tappable option cards), `.coach-avatar` (🥘 emoji in purple circle)
- `.coach-timer-ring` (circular countdown), `.halt-grid` (2×2 HALT grid), `.coach-action-card` (numbered action steps)
- Glucose context cards: Color-coded (red/amber/green) with left border accent, icon, value, trend label, and explanatory text
- Strategy tracking UI: Checkmark buttons for committing to strategies

---

## 10. Safety & Compliance

- **Hunger Coach tone** — All follow-up responses are positive. Eating is never framed as failure. "I ate something intentionally" is celebrated as a skill. The coach never tells users not to eat.
- **No dosing advice** — all dosing decisions defer to the user's clinician
- **Clinician involvement** encouraged for any adverse symptoms
- **No alarmist glucose alerts** — pattern-based insights only, no shaming language
- **No "good/bad" food labels** — uses "more stabilizing" vs. "less stabilizing" framing
- **No detox/restriction language** — reset routines framed as structured habit recommitment
- **Past-tense GLP-1 framing** — app does not assume user is currently on medication
- **Normalization messaging** — weight regain and appetite return are biologically expected

---

## 11. Analytics Events

| Event | Properties | Trigger |
|-------|-----------|---------|
| glp1_program_enrolled | goals, struggles, weekOrder | Onboarding complete |
| glp1_insight_action_clicked | action_id | CTA button clicks |
| glp1_dose_event_logged | type | Dose event recorded |
| glp1_post8_checkin_completed | focus_areas | Post-block-4 check-in finished |
| glp1_weeks_912_unlocked | focus_areas | Focus areas selected, blocks unlocked |

---

## 12. Technical Architecture

- **Runtime:** Single-page application in vanilla JavaScript (no framework)
- **Packaging:** iOS app via Capacitor (ios/App/)
- **State management:** localStorage with migration/schema versioning (`migrateToProgramState()`)
- **Rendering:** DOM manipulation via innerHTML string construction + event handler attachment
- **Routing:** In-memory screen state with history stack
- **Block model:** `TOTAL_BLOCKS = 8`, `TOTAL_WEEKS = 16`, with `blockToWeeks()` and `weekToBlock()` conversion functions
- **CGM data:** Simulated glucose context via `getGlucoseContext()` (time-of-day, profile, and hunger-entry aware)
- **Camera access:** `navigator.mediaDevices.getUserMedia` for body scanner (mock analysis)

---

## 13. Key Changes from v4.0 → v5.0

| Change | Description |
|--------|-------------|
| 16-week program | Expanded from 12 weeks to 16 weeks for more time to build and validate habits |
| 2-week block model | 8 blocks of 2 weeks each replace individual weekly goals. Each block has a single focus spanning both weeks. |
| Intermittent CGM schedule | 4 sensor periods (Blocks 1, 3, 6, 8) instead of continuous wear. CGM validates; off-CGM blocks build habits by feel. |
| Combined weekly topics | Protein + Fiber combined into one block (Block 2); Walking + Resistance combined (Block 3); Satiating Meals + Sleep/Stress combined (Block 4) |
| Simplified personalization | Only 2 movable blocks (nutrition vs. full_system) instead of 4 individual movable weeks. Blocks 1 and 3 are fixed CGM blocks. |
| 18-step personalized onboarding | Comprehensive profile collection with medication history, struggles, goals, baseline assessment, and personalized program summary |
| CGM toggle on home screen | Clickable glucose display switches between live CGM and average daily glucose views. Visual differences (colors, badges, graph styles) are pronounced. |
| Off-CGM home experience | Average daily glucose graph from last sensor, elevated hunger coach as "primary signal," next sensor countdown in graduation card |
| Insights tab restructure | Three tabs: Lifestyle, Glucose, Graduation. Sensor-by-sensor comparison graph added. "Last 7 Days" tab removed. Hunger correlations organized under each tab. |
| Sensor comparison graph | `buildSensorComparisonSVG()` overlays daily glucose curves for each completed CGM period with metrics table |
| Scrollable timeline | 16 week dots in a single horizontal scrollable row, grouped in block pairs with shared CGM/habit borders. Auto-scrolls to current week. |
| Block-based education | `BLOCK_EDUCATION` assigns modules per block (not per week). Education completion counted per block with deduplication. |
| Updated check-in labels | "Post-block-4 check-in" replaces "post-week-8"; "Blocks 5–8 locked" replaces "Weeks 9–16 locked" |
| Consistency GPA | Now includes education module completion as a component |
| Parameterized self-assessment | Same 4-step check-in flow used at 3 checkpoints (Block 1 baseline, Block 3 mid-program, Block 5 post-foundation) with customized copy per stage |
| User journey reframing | All copy updated for users tapering off or already off GLP-1, using past-tense or transitional language |

---

## 14. Future Considerations

- Real CGM data integration via Signos API (replaces `getGlucoseContext()` simulation)
- Real body composition analysis (computer vision or hardware integration)
- Push notifications for habit reminders, drift alerts, sensor reminders, and coach nudges
- Clinician dashboard / data sharing
- Apple Health / Google Fit integration for activity, sleep, HRV data
- Server-side state persistence and cross-device sync
- Personalized AI-driven insights based on accumulated user data
- Graduation certificate screen
- Social features (community, accountability partners)
- Hunger Coach voice mode (spoken conversation instead of taps)
- Strategy effectiveness analytics dashboard for product team
- A/B testing framework for coach response content
- Smart sensor reminders (notification when next CGM block is approaching)
- Off-CGM glucose estimation based on meal/activity patterns from on-CGM data
