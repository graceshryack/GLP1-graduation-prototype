# Product Requirements Document (PRD)

## Signos GLP-1 Graduation Program

**Product Name:** Signos GLP-1 Graduation
**Platform:** iOS (Capacitor-wrapped web app)
**Version:** 6.0
**Original Date:** February 11, 2026
**Last Updated:** March 8, 2026

---

## 1. Overview

The Signos GLP-1 Graduation Program is a **16-week mobile application** designed to help users tapering off or recently off GLP-1 receptor agonist medications (e.g., semaglutide, tirzepatide) build durable health habits and graduate with the skills, scores, and confidence to thrive without medication.

The application provides:

- A streamlined 6-step onboarding that collects profile data and establishes a behavioral baseline
- A 16-week program with **one focused goal per week**, preventing information overload while maintaining engagement
- An intermittent CGM schedule — 4 sensor periods of 2 weeks each (8 of 16 weeks) for targeted data collection and validation
- Weekly choice prompts that let users decide how to implement each week's focus
- Check-ins every 4 weeks (Weeks 4, 8, 12, 16) to track progress against baseline
- An interactive Hunger Coach that integrates real-time glucose context
- Personalized final 4 weeks (Weeks 13–16) based on Week 12 check-in results
- Dynamic toolkit content tied to the current week's focus (recipes, food lists, guides)
- Dual weight tracking: "Still losing" mode toward a goal weight, or "Maintenance" mode with a ±3–5% band

### Core Thesis

The window during and immediately after GLP-1 treatment is the optimal time to build lasting habits in nutrition, exercise, sleep, and stress management. The 16-week graduation program builds these habits from baseline observation to mastery, with one focused goal each week and intermittent CGM wear that validates progress with data.

### Key Design Principles

- **One goal per week** — each week has a single, clear focus to prevent overwhelm and maintain engagement
- **User chooses implementation** — weekly choice prompts let users decide *how* to implement (e.g., "increase protein at breakfast, lunch, or dinner")
- **Ordered by GLP-1 importance** — satiety-building (protein, fiber, fat) comes first; sleep and stress come later
- **Toolkit tied to current focus** — dynamically provides relevant resources (fiber options, protein recipes, sleep hygiene ideas)
- **Purple (#7c3aed) identity throughout** — consistent, unified visual experience
- **CGM periods are 2 weeks each** — sensors last 15 days, so every CGM period spans 2 consecutive weeks
- **CGM validates, habits persist** — CGM weeks prove habits work with data; off-CGM weeks build habits by feel
- **Hunger is a skill to develop** ("Hunger awareness"), not a problem to suppress
- **Glucose explains hunger** — CGM data is connected to hunger signals
- **Weight regain is biologically expected, not failure** — supports both weight loss and maintenance modes
- **Graduation is earned through criteria**, not waited out
- **Baseline assessment enables progress tracking** — same 8 questions asked at onboarding and every 4-week check-in

---

## 2. Target Users

- Adults tapering their GLP-1 dose under clinician supervision
- Adults recently off GLP-1 who require maintenance and habit-building support
- Adults currently taking GLP-1 medications who are planning their transition

---

## 3. Program Model

The application is structured as a **single 16-week GLP-1 Graduation program** with **one focused goal per week**.

### 3.1 Weekly Focus Overview

Each week has a single focus, a specific goal, and (for some weeks) a choice prompt where the user decides how to implement.

| Week | Focus | Goal | CGM | Category | Choice Prompt |
|------|-------|------|-----|----------|---------------|
| 1 | Know Your Baseline | Log meals and hunger daily, observe CGM after each meal | ON | baseline | — |
| 2 | Protein Foundation | 30g+ protein at your chosen meal every day | ON | nutrition | Which meal will you anchor with protein? (Breakfast / Lunch / Dinner) |
| 3 | Add Fiber | Protein + fiber at your anchor meal daily | OFF | nutrition | How will you add fiber? (Extra vegetables / Beans or legumes / Whole grains) |
| 4 | Second Meal | Two meals with protein + fiber daily | OFF | nutrition | Which second meal will you anchor? (Breakfast / Lunch / Dinner) |
| 5 | Complete the Satiety Plate | All meals include protein + fiber + healthy fat | ON | nutrition | Your go-to healthy fat source? (Avocado/olive oil / Nuts/seeds / Fatty fish/cheese) |
| 6 | Meal Timing | Eat at consistent times, 3–4 meals, no skipping | ON | structure | — |
| 7 | Hydration | Water before every meal, 8+ glasses daily | OFF | structure | — |
| 8 | Post-Meal Walking | 10–15 min walk after at least 1 meal daily | OFF | movement | — |
| 9 | Glucose Patterns | Identify top 3 spike triggers and 3 best meals | ON | glucose | — |
| 10 | Portion Intuition | Rate hunger before every meal, stop at satisfied | ON | hunger | — |
| 11 | Daily Movement | 7,000+ steps daily | OFF | movement | — |
| 12 | Resistance Training | 2 strength sessions this week | OFF | movement | — |
| 13 | Your Focus (Personalized) | Deep-dive your chosen focus area | OFF | personalized | — |
| 14 | Your Focus (Personalized) | Build consistency in your focus area | OFF | personalized | — |
| 15 | Full Integration | All habits running, navigate 1+ disruption with CGM | ON | integration | — |
| 16 | Graduation | All criteria met — graduate | ON | graduation | — |

### 3.2 Program Quarters

The 16 weeks are organized into four quarters:

| Quarter | Weeks | Theme | Color |
|---------|-------|-------|-------|
| Q1 | 1–4 | Satiety Foundation | Purple (var(--phase-accent)) |
| Q2 | 5–8 | Structure & Habits | Blue (#2563eb) |
| Q3 | 9–12 | Deepen Skills | Green (#16a34a) |
| Q4 | 13–16 | Personalized & Graduation | Amber (#d97706) |

### 3.3 CGM Sensor Schedule

4 intermittent sensor periods, **each spanning 2 consecutive weeks** (sensors last 15 days):

| Sensor | Weeks | Purpose |
|--------|-------|---------|
| CGM 1: Baseline | 1–2 | Observe glucose patterns before changing anything |
| CGM 2: Satiety Check | 5–6 | See how protein + fiber + fat affect your glucose |
| CGM 3: Movement | 9–10 | Watch how walking changes your glucose curve |
| CGM 4: Graduation | 15–16 | Final proof — your habits handle your glucose |

CGM-active weeks: 1, 2, 5, 6, 9, 10, 15, 16 (8 of 16 weeks on CGM).

### 3.4 Check-In Schedule

Check-ins occur every 4 weeks at **Weeks 4, 8, 12, and 16**:

| Check-In | Week | Title | Purpose |
|----------|------|-------|---------|
| 1 | 4 | Week 4 Check-In | First progress check after satiety foundation |
| 2 | 8 | Week 8 Check-In | Mid-program assessment after structure & habits |
| 3 | 12 | Week 12 Check-In | Pre-personalization assessment + focus area selection |
| 4 | 16 | Week 16 Check-In | Final check-in before graduation |

The baseline assessment is collected during onboarding (step 4), giving 5 data points total for progress tracking.

### 3.5 Personalized Weeks (13–16)

Weeks 13–14 are locked until completion of the Week 12 check-in and focus area selection. Weeks 15–16 are the final CGM period and graduation.

### 3.6 Core Principles (static throughout program)

1. Consistency beats perfection
2. Muscle preservation is your metabolic insurance
3. Hunger is information — respond to it, don't fight it
4. Small weight regain is maintenance, not failure

### 3.7 Graduation Criteria

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
| Home | home | Dashboard with glucose graph (live or average), weekly focus card, graduation progress, habits, GPA strip, weight graph, hunger coach card |
| Toolkit | dailies | Current week focus, CGM sensor schedule, weekly resources, weight progress, 16-week scrollable list, education sections |
| Log (+) | log | Daily logging: hunger check-in, body scanner, food, exercise, water, sleep, glucose notes |
| Insights | insights | Three tabs: Lifestyle, Glucose, Graduation — with GPA drill-downs, sensor comparisons, hunger correlations |
| Settings | settings | User profile display, program details, maintenance band, preferences, program reset |

### Secondary Screens

| Screen | Access From | Description |
|--------|-------------|-------------|
| onboarding | First launch or program reset | 6-step onboarding flow with baseline assessment |
| hunger_coach | Home card or hunger questionnaire | Interactive hunger coaching with glucose integration |
| week_detail | Toolkit (tap any week dot) | Per-week focus, goal, resources, CGM status, choice prompt, check-in badge |
| post8_checkin | Triggered at Weeks 4, 8, 12, 16 | Self-assessment flow with progress comparison |
| program | Settings | Detailed program metrics, dose history, graduation readiness |
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

### 5.1 Onboarding (6-step streamlined flow)

A streamlined onboarding flow that collects profile data and performs a baseline behavioral assessment. All 8 assessment questions appear on a single scrollable page. Progress bar shown throughout.

| Step | Screen | Data Collected |
|------|--------|----------------|
| 0 | Welcome | Program overview with 4-quarter structure preview |
| 1 | About You | name, GLP-1 medication (from list), medication status (Currently tapering / Planning to taper / Recently stopped / Stopped 1+ month ago) |
| 2 | Concerns | Ranked concerns multi-select (weight regain, appetite return, no habits yet, glucose management, emotional eating, don't know where to start) |
| 3 | Weight & Goals | Current weight, goal weight, weight mode ("Still losing" vs "Maintaining") |
| 4 | Baseline Assessment | 8 self-assessment questions on one scrollable page, each rated 1–5 with vertical answer layout (circle badge + label per option) |
| 5 | Your 16-Week Plan | Shows full roadmap by quarter, CGM schedule, weight mode summary, "Start Week 1" button |

On completion:

- `state.profile` stores all onboarding data (name, medication, medStatus, concerns, weight, weightMode, goalWeight)
- `state.week1CheckIn` stores baseline assessment answers
- `state.weightAnchor` set from profile weight
- `state.weightMode` set from profile weight mode
- `state.goalWeight` set from profile goal weight
- `state.onboardingComplete = true`

### 5.2 Baseline Assessment Questions

The same 8 questions are used at onboarding and every 4-week check-in:

| # | ID | Question | Icon | Area |
|---|-----|----------|------|------|
| 1 | q_protein | I consistently eat protein at every meal. | 🍴 | nutrition |
| 2 | q_walking | I walk after meals most days. | 🏃 | exercise |
| 3 | q_hunger | I can tell the difference between physical hunger and emotional hunger. | 🍳 | hunger |
| 4 | q_sleep | I go to bed at a consistent time most nights. | 💤 | sleep_stress |
| 5 | q_glucose | I understand what makes my glucose spike and how to manage it. | 📉 | glucose |
| 6 | q_stress | I have at least one stress management tool I use regularly. | 🧠 | sleep_stress |
| 7 | q_satiety | I usually stop eating when satisfied, not stuffed. | 🍽️ | hunger |
| 8 | q_weight | I understand what maintenance weight is and I'm not afraid of normal fluctuations. | ⚖️ | weight |

Rating scale: 1 (Not at all) → 2 (A little) → 3 (Sometimes) → 4 (Usually) → 5 (Always)

Layout: Vertical column of 5 answer buttons, each showing a circle number badge and label text.

### 5.3 Home Screen

Components (in order):

1. **Program badge** — "GLP-1 Graduation — Week X: [Focus Title]"
2. **Graduation card** — Compact, tappable card showing current week focus (icon + title), progress %, criteria met, and next CGM sensor countdown (when off-CGM). Navigates to Toolkit.
3. **CGM-aware glucose display** — Two modes, toggleable by tapping:
   - **CGM Active** (on-sensor weeks): Live glucose graph (SVG line chart) with current reading, reference lines, meal/activity timeline. Blue-bordered card with "LIVE — tap to toggle" badge.
   - **CGM Off** (off-sensor weeks): "Your Average Day" card showing a static average daily glucose SVG from the last sensor period, in amber tones. Displays key metrics (Avg mg/dL, Glucose GPA, Time in Range) and an actionable insight. "OFF — tap to toggle" badge.
4. **Hunger Coach card** — Always visible. Shows satiety skill level, daily tip, and "Talk to your coach" button. Elevated during off-CGM weeks with a purple "YOUR PRIMARY SIGNAL THIS WEEK" banner and dedicated insight.
5. **GPA strip** — Glucose GPA, Lifestyle GPA, Consistency GPA. Tappable to Insights.
6. **Weight & maintenance band graph** — SVG chart with 16-week weight trend. Mode-dependent display (see §5.13).
7. **Weekly focus goal card** — Current week's structural goal with focus description.
8. **Today's habits card** — Daily habit checklist with progress indicators.
9. **Appetite return normalization card** — Contextual, dismissible card explaining that hunger returning is biologically expected during GLP-1 transition.

### 5.4 Toolkit (Graduation Toolkit)

The toolkit is week-focused, dynamically showing resources tied to the current week's focus:

1. **Current week focus card** — Large card with icon, title, description, goal, and choice prompt (if applicable)
2. **Weekly resources** — Context-specific resources for the current week (e.g., protein sources during Week 2, fiber sources during Week 3, healthy fat sources during Week 5, hydration guide during Week 7, walking guide during Week 8, strength training basics during Week 12)
3. **CGM Sensor Schedule card** — Grid showing all 4 sensor periods with weeks, purpose, and active/done/upcoming status
4. **Weight progress card** — Shows weight loss progress (if in lose mode) or maintenance band (if in maintain mode), with simulated history
5. **16-week scrollable list** — All 16 weeks listed with focus titles, CGM badges, check-in markers, current week highlighting. Locked weeks (13–14 if not yet unlocked) shown with lock icons.
6. **Core principles** and education sections

#### Weekly Resources

| Week | Resource Title | Content |
|------|----------------|---------|
| 2 | Protein Sources | Animal protein per 4oz, plant protein, quick 30g combos |
| 3 | Fiber Sources | Vegetables, legumes & grains, fruits & seeds with fiber counts |
| 4 | Satiety Meal Ideas | Breakfast, lunch, dinner meal ideas combining protein + fiber |
| 5 | Healthy Fat Sources | Cooking fats, whole food fats, condiment fats |
| 7 | Hydration Guide | Daily routine suggestions, alternatives to plain water |
| 8 | Walking Guide | Timing tips, how to make it easy |
| 12 | Strength Training Basics | No-gym exercises, weekly plan |
| 13 | Personalized Resources | Sleep hygiene, stress toolbox, smart snacks, emotional eating tools |

### 5.5 Week Detail Screen

Tapping any week in the toolkit list opens a per-week detail view:

- Week number and focus title (e.g., "Week 3 — Add Fiber")
- Focus icon, description, and specific goal
- CGM status badge:
  - CGM weeks: Blue banner with sensor label and purpose
  - Non-CGM weeks: Gray "Habit Mode — No CGM" banner
- **Choice prompt** (if applicable): Shows the week's implementation choice with selectable options
- **Weekly resources** specific to the week's focus
- **Check-in badge** (at weeks 4, 8, 12, 16): Prompts user to start their check-in
- **Education modules** assigned to the week
- Navigation: Previous/next week buttons for browsing

### 5.6 Self-Assessment Flow (Check-In)

The `renderPost8CheckIn` function handles all check-ins (Weeks 4, 8, 12, 16) with a multi-step flow:

| Step | Content |
|------|---------|
| 0 | **Introduction** — Check-in title, emoji, heading, and overview. Customized per check-in week. |
| 1 | **Self-Assessment** — All 8 questions on one scrollable page, rated 1–5. Header shows "How are you progressing since your baseline?" with subtext "Compare to your onboarding answers." |
| 2 | **Personalized Feedback** — Per-question feedback with score deltas compared to baseline. Low (1–2), mid (3), and high (4–5) feedback text. |
| 3 | **Choose Your Focus** (Week 12 only) — Select focus areas for Weeks 13–14. |

Check-in data saved per week:
- `state.week4CheckIn` — Week 4 answers
- `state.week8CheckIn` — Week 8 answers
- `state.week12CheckIn` — Week 12 answers (triggers focus selection)
- `state.week16CheckIn` — Week 16 answers (final)

### 5.7 Hunger Coach

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

#### Landing Page

The landing page renders a personalized experience based on accumulated user data:

- **Personalized greeting** — Uses `state.profile.name` (first name). Contextual message based on hunger trends.
- **Stats bar** — Day streak, average hunger (color-coded), average fullness, coach chats this week
- **Glucose status card** — Real-time glucose context with color-coded background and contextual note
- **Best strategy card** — Surfaces the user's most effective strategy from `state.strategyLog`
- **Pattern detection card** — After 5+ sessions, identifies the most frequently selected scenario
- **Scenario selection** — 10 scenarios organized into 3 categories
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
  - `followUp` (optional) — ID of next branching question
  - `showTimer` (optional) — Shows 10-minute countdown timer
  - `showMealTimer` (optional) — Shows 20-minute meal timer
  - `trackStrategy` (optional) — Shows strategy commitment UI

#### Branching Flow Maps

**"Still hungry" scenario** branches 3 levels deep:

1. "When did you finish eating?" → < 15 min / 15–30 min / > 30 min
2. (15–30 min) → "What did your meal look like?" → carb-heavy / had protein / balanced
3. (> 30 min or had protein) → "Put your hand on your stomach" → physical hunger / mouth hunger

**"Post-meal" scenario:**

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

After the coach delivers its advice, a glucose context card is injected for hunger-related scenarios. The card includes:

- Current glucose value and trend
- Color-coded background (red/amber/green)
- Scenario-specific interpretation

#### Follow-Up System

Every coach response ends with 4 follow-up options:

1. **"I paused and the feeling passed"** — Celebrates awareness skill
2. **"I ate something intentionally"** — Celebrates conscious decision-making
3. **"I ate and I feel satisfied"** — Celebrates body signal reading
4. **"I want to learn more about this"** — Links to mini-lessons

All follow-up responses are positive. Eating is never framed as failure.

#### 5 Mini-Lessons

| ID | Title | Key Takeaway |
|----|-------|-------------|
| types | The 5 types of hunger | Only stomach hunger requires food |
| scale | The hunger scale explained | Eat at level 3, stop at fullness 3–4 |
| glp1_hunger | How GLP-1 changes your hunger | Hunger signals will change throughout the program |
| satiation | The satiation toolkit | Right combination of nutrients, timing, and awareness |
| glucose_hunger | How glucose drives your hunger | Most unexplained hunger is a glucose crash in disguise |

#### Timers

- **10-minute pause timer**: Used in craving, boredom, and uncertainty scenarios
- **20-minute meal timer**: Used in pre-meal coaching (vagus nerve pacing)
- **Body scan step timers**: 4 timed steps (8–10 seconds each)

### 5.8 Glucose-Hunger Integration Engine

The `getGlucoseContext()` function generates simulated glucose context threaded throughout the app.

#### Context Generation Logic

Uses time-of-day, user profile (weight-adjusted baseline), and today's hunger entry to simulate one of 4 glucose states:

| State | Trigger | Current Value | Trend | Color |
|-------|---------|---------------|-------|-------|
| Crash | High hunger OR random | peak − drop − 10 | "dropping" | Red (#ef4444) |
| Below baseline | Random | baseline − 8 to −19 | "below_baseline" | Amber (#f59e0b) |
| Post-meal rise | During meal windows | baseline + 15 to +34 | "rising" | Amber (#f59e0b) |
| Stable | Default | baseline ± ~6 | "stable" | Green (#16a34a) |

Baseline is weight-adjusted: >200 lbs → 100 mg/dL, <140 lbs → 88 mg/dL, otherwise 95 mg/dL.

### 5.9 Hunger Check-In (Glucose-Aware)

A daily hunger and fullness rating flow with glucose-integrated feedback, satiety skill tracking, and coach escalation.

#### Input Screen

1. **Satiety Skill card** — Mastery score (0–100), level name, streak, progress bar
2. **Hunger awareness frame** — Static messaging about hunger as a skill
3. **Hunger rating** — Slider (1–5): No signal / Mildly aware / Ready to eat / Very hungry / Urgent
4. **Fullness rating** — Slider (1–5): Still hungry / Slightly full / Satisfied / Full / Stuffed
5. **Submit button**

#### Feedback Screen (post-submit)

1. Contextual feedback based on hunger value
2. Glucose insight card from `getGlucoseHungerInsight()`
3. Rotating micro-tip (10 randomized tips)
4. Updated Satiety Skill score
5. Coach escalation button (conditional)
6. Done button

#### Satiety Skill Score

| Component | Max Points | Calculation |
|-----------|-----------|-------------|
| Logging consistency | 40 | min(40, daysLogged × 4) |
| Hunger accuracy | 30 | max(0, 30 − |avgHunger − 3| × 15) |
| Fullness accuracy | 30 | max(0, 30 − |avgFullness − 3.5| × 15) |

Levels: Beginner (0–19), Learning (20–49), Developing (50–79), Advanced (80–100).

### 5.10 Insights Screen

Three tabs:

**Lifestyle Tab**
- Lifestyle GPA gauge with component drill-down
- Transition Readiness score (Glucose 30%, Lifestyle 30%, Hunger/Satiety 20%, Consistency 20%)
- Hunger & Lifestyle Correlations
- 3-step stabilization plan card

**Glucose Tab**
- CGM status note (amber banner when off-CGM)
- Glucose GPA gauge with component drill-down
- Sensor-by-Sensor Comparison — overlays average daily glucose curves for each completed CGM period
- Hunger & Glucose Correlations

**Graduation Tab**
- Graduation trend SVG — Weekly GPA scores over 16 weeks with CGM period shading
- Score summary with delta indicators
- Hunger & Program Progress

### 5.11 Education System

Education is organized into **6 sections** with modules assigned per week:

| Section | Icon | Description |
|---------|------|-------------|
| Glucose & CGM | 📈 | CGM basics, patterns, pairing, transition, drift prevention, maintenance |
| Nutrition | 🍴 | Protein, fiber, meal structure, carb strategy, satiety, hydration |
| Exercise | 🏃 | Walking, resistance, recovery, post-meal movement |
| Hunger & Satiety | 🥘 | Hunger signals, fullness, emotional hunger, appetite return |
| Sleep & Recovery | 💤 | Sleep consistency, sleep-glucose connection, hydration |
| Stress & Resilience | 🧠 | Stress-glucose, stress management, recovery |

**Week-based education assignments** (`WEEK_EDUCATION_MAP`):

| Week | Focus Sections | Key Modules |
|------|---------------|-------------|
| 1 | Glucose/CGM | cgm_basics, glp1_basics, patterns_101 |
| 2 | Nutrition | protein_anchor_p1, protein_muscle, meal_structure |
| 3 | Nutrition | fiber_intro, gi_comfort |
| 4 | Nutrition | satiety_playbook, satiety_skill |
| 5 | Nutrition | pairing_glucose, carb_strategy |
| 6 | Structure | meal_structure, appetite_return, hunger_basics |
| 7 | Hydration | hydration_p1, hunger_signals, understanding_fullness |
| 8 | Movement | post_meal_move, post_meal_walk |
| 9 | Glucose | patterns_101, cgm_transition, weight_after_glp1 |
| 10 | Hunger | hunger_signals, fullness_signals, hunger_medication, emotional_hunger |
| 11 | Movement | post_meal_maintenance, recovery_p1 |
| 12 | Movement | resistance_first, strength_taper, long_term_strength |
| 15 | Integration | drift_prevention, cgm_maintenance, quick_reset |
| 16 | Graduation | maintenance_playbook, scale_during_transition, maintenance_band_education |

**Interactive Games:**

| Game | Section | Mechanic | Description |
|------|---------|----------|-------------|
| Protein Guess | Nutrition | Multi-round quiz | Compare two foods — which has more protein? |
| Build a Balanced Plate | Nutrition | 3-step builder | Select protein, carb, and veggie to construct a meal and get scored |

### 5.12 Settings Screen

- **User profile card** — Displays onboarding data: name, medication, status, weight, weight mode
- **Program details link** — navigates to program screen
- **Maintenance band percentage setting** — adjustable ±3–5% (default 5%)
- **Preferences toggles** — user preference controls
- **Reset program** — Red-bordered card with confirmation modal. Clears all localStorage, resets state, returns to onboarding.

### 5.13 Weight Management (Dual Mode)

The weight system supports two modes, selected during onboarding:

#### Weight Loss Mode (`weightMode === 'lose'`)

- Shows progress toward goal weight with a progress bar
- Tracks current weight relative to goal weight
- Displays pounds remaining and percentage progress
- Uses amber/warm color scheme
- Once goal weight is reached, transitions to maintenance mode

#### Maintenance Mode (`weightMode === 'maintain'`)

- Shows a ±3–5% band around the anchor weight (configurable in Settings)
- SVG chart with 16-week weight trend and shaded band region
- Band range: `anchor × (1 ± bandPct/100)` — e.g., 175 lbs with 3% → 170–180 lbs
- Messaging: "Normal daily fluctuations of 2–4 lbs are expected"
- Graduation criterion: current weight within band for 2 consecutive weeks

### 5.14 Log Screen & Body Scanner

#### Log Screen

Central logging hub with 7 items:

1. **Daily hunger check-in banner** — Prominent, always visible until completed
2. **Body Scanner button** — Camera-based composition scan
3. **Food log** (placeholder)
4. **Exercise log** (placeholder)
5. **Water log** (placeholder)
6. **Sleep log** (placeholder)
7. **Glucose notes** (placeholder)

#### Body Scanner

Mock camera-based body composition measurement using `navigator.mediaDevices.getUserMedia`:

- 5-second scan countdown with visual indicator
- Results: body fat %, visceral fat %, lifestyle bonus (0–3 points)
- Results saved to `state.bodyScanEntries` keyed by date

### 5.15 Weekly Check-In

- Pop-up modal on home screen (after 4 seconds, once per week)
- Collects: mood (1–5 emoji), confidence (1–5), biggest challenge (text)
- Shows education progress
- Saved to `state.weeklyCheckIns`

---

## 6. Scoring & Algorithms

### 6.1 Score-to-GPA Mapping

Formula: `GPA = 1 + (score100 / 100) * 4`

| Score (0–100) | Letter | GPA (1–5) |
|--------------|--------|-----------|
| 90–100 | A | ~4.6–5.0 |
| 80–89 | B | ~4.2–4.6 |
| 70–79 | C | ~3.8–4.2 |
| 60–69 | D | ~3.4–3.8 |
| 0–59 | F | ~1.0–3.4 |

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
| Logging frequency | 40 | min(40, daysLogged × 4) — full at 10/14 days |
| Hunger proximity to ideal | 30 | max(0, 30 − |avgHunger − 3| × 15) |
| Fullness proximity to ideal | 30 | max(0, 30 − |avgFullness − 3.5| × 15) |

### 6.5 Week Calculations

```
getCurrentWeek() → derived from phaseStartAt date
blockToWeeks(b) → [b * 2 - 1, b * 2]
weekToBlock(w) → Math.ceil(w / 2)
getWeeklyFocus(wk) → WEEKLY_FOCUSES[wk]
```

---

## 7. Data Model

All state persisted in localStorage under key `signos-glp1`.

| Field | Type | Description |
|-------|------|-------------|
| onboardingComplete | Boolean | Whether onboarding is done |
| phaseStartAt | String (date) | When the program started |
| program_enrolled_at | String (ISO) | Enrollment timestamp |
| profile | Object | Onboarding profile (name, medication, medStatus, concerns, weight, weightMode, goalWeight) |
| weightMode | String | "lose" or "maintain" |
| weightAnchor | Number | Anchor weight for maintenance band |
| goalWeight | Number | Target weight (for lose mode) |
| week1CheckIn | Object | Baseline assessment answers from onboarding |
| week4CheckIn | Object | Week 4 check-in answers |
| week8CheckIn | Object | Week 8 check-in answers |
| week12CheckIn | Object | Week 12 check-in answers (triggers focus selection) |
| week16CheckIn | Object | Week 16 check-in answers (final) |
| focusAreas | Array | User's selected focus area keys for Weeks 13–14 |
| weekChoices | Object | User's weekly implementation choices (keyed by week number) |
| hungerEntries | Object | Keyed by date, hunger/fullness ratings + timestamps |
| bodyScanEntries | Object | Keyed by date, body composition results |
| completedModules | Object | Module completion timestamps |
| completedGames | Object | Game completion timestamps |
| weeklyCheckIns | Object | Keyed by week, check-in data |
| weeklyScoreHistory | Array | Weekly GPA scores for graduation trend |
| coachSessions | Array | Hunger Coach session logs. Capped at 100. |
| strategyLog | Array | Strategy tracking. Capped at 200. |
| cgmOverride | Boolean/null | Manual CGM toggle override for demo purposes |
| preferences | Object | User preferences |
| dismissedBanners | Object | Dismissed banner tracking |
| maintenanceBandPct | Number | Maintenance band percentage (default 5%) |

---

## 8. CGM Integration Model

### 8.1 Intermittent Wear Schedule

4 sensor periods, each spanning 2 consecutive weeks (sensors last 15 days):

```
CGM_WEEKS = {1:true, 2:true, 5:true, 6:true, 9:true, 10:true, 15:true, 16:true}
```

### 8.2 Helper Functions

| Function | Purpose |
|----------|---------|
| `isCGMWeek(wk)` | Returns true if a given week has CGM active |
| `getCGMPeriod(wk)` | Returns the CGM period object for a given week, or null |
| `getNextCGMWeek(wk)` | Returns the next week number that has CGM, or null |
| `getLastCGMPeriod(wk)` | Returns the most recent completed CGM period before a given week |

### 8.3 Home Screen CGM Toggle

- **CGM Active view:** Blue-bordered card, live glucose SVG, "LIVE" badge
- **CGM Off view:** Amber-themed card, static "average day" glucose SVG, key metrics, "OFF" badge
- Toggle controlled by `cgmOverride` state variable (null = auto-detect from schedule)

### 8.4 Off-CGM Experience

During off-CGM weeks:

- **Home screen:** Average daily glucose graph replaces live CGM, hunger coach is elevated as "YOUR PRIMARY SIGNAL THIS WEEK"
- **Insights Glucose tab:** Amber notice showing CGM off status and next sensor week
- **Week detail:** "Habit Mode — No CGM" banner
- **Education:** Modules emphasize building habits by feel

---

## 9. Design & UX Specifications

### 9.1 Visual Identity

- **Primary accent:** Purple (#7c3aed) throughout all screens
- **Purple light:** #ede9fe for backgrounds and highlight cards
- **CGM active:** Blue (#2563eb) borders, backgrounds, badges
- **CGM off:** Amber (#d97706) tones for average glucose display
- **Success:** Green (#16a34a) for completed states
- **Locked:** Gray (#94a3b8) for locked weeks

### 9.2 Layout & Typography

- **Max width:** 480px (mobile-first)
- **Typography:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Card design:** 16px border radius, box shadow, 18px padding
- **Navigation:** Fixed bottom nav with safe area inset support
- **Headers:** Lowered positioning (44px top padding) for comfortable thumb reach
- **Modals:** Bottom-sheet pattern with overlay dismiss, slide-up animation
- **Score gauges:** Half-circle SVG arc with purple gradient fill

### 9.3 Timeline UI

The graduation timeline in the toolkit shows all 16 weeks as a scrollable list with:

- Individual week entries showing focus title, CGM badges, and check-in markers
- Current week highlighting
- Locked weeks (13–14 when not yet unlocked) shown with lock icons
- CGM period indicators on relevant weeks
- Check-in markers at Weeks 4, 8, 12, 16

### 9.4 Assessment UI

Both onboarding and check-in self-assessments use a consistent card-based layout:

- Each question is a card with icon, question text, and 5 vertically stacked answer buttons
- Each answer button shows a circle number badge (1–5) with the label text beside it
- Selected answers are highlighted with the accent color
- "See your plan" / "Next" button only activates when all questions are answered

### 9.5 Coach UI Elements

- `.coach-bubble` (speech bubble), `.coach-option` (tappable option cards), `.coach-avatar` (🥘 emoji in purple circle)
- `.coach-timer-ring` (circular countdown), `.halt-grid` (2×2 HALT grid), `.coach-action-card` (numbered action steps)
- Glucose context cards: Color-coded with left border accent, icon, value, trend label, and explanatory text
- Strategy tracking UI: Checkmark buttons for committing to strategies

---

## 10. Safety & Compliance

- **Hunger Coach tone** — All follow-up responses are positive. Eating is never framed as failure.
- **No dosing advice** — all dosing decisions defer to the user's clinician
- **Clinician involvement** encouraged for any adverse symptoms
- **No alarmist glucose alerts** — pattern-based insights only
- **No "good/bad" food labels** — uses "more stabilizing" vs. "less stabilizing" framing
- **No detox/restriction language** — reset routines framed as structured habit recommitment
- **Past-tense GLP-1 framing** — app does not assume user is currently on medication
- **Normalization messaging** — weight regain and appetite return are biologically expected

---

## 11. Analytics Events

| Event | Properties | Trigger |
|-------|-----------|---------|
| glp1_program_enrolled | concerns, weightMode | Onboarding complete |
| glp1_insight_action_clicked | action_id | CTA button clicks |
| glp1_dose_event_logged | type | Dose event recorded |
| glp1_checkin_completed | checkinWeek, focus_areas | Check-in finished |

---

## 12. Technical Architecture

- **Runtime:** Single-page application in vanilla JavaScript (no framework)
- **Packaging:** iOS app via Capacitor (ios/App/) with SwiftUI shell + WKWebView
- **State management:** localStorage with migration/schema versioning (`migrateToProgramState()`)
- **Rendering:** DOM manipulation via innerHTML string construction + event handler attachment
- **Routing:** In-memory screen state with history stack
- **Week model:** `TOTAL_WEEKS = 16` with `WEEKLY_FOCUSES` object defining per-week data
- **CGM data:** Simulated glucose context via `getGlucoseContext()` (time-of-day, profile, and hunger-entry aware)
- **Camera access:** `navigator.mediaDevices.getUserMedia` for body scanner (mock analysis)
- **Test automation:** `window.__protoflow` API for programmatic navigation and state control

---

## 13. Key Changes from v5.0 → v6.0

| Change | Description |
|--------|-------------|
| Weekly focus model | Replaced 8-block (2-week) model with 16 individual weekly focuses. Each week has one clear goal. |
| User-chosen implementation | Weeks 2–5 include choice prompts letting users decide how to implement (e.g., "increase protein at breakfast, lunch, or dinner") |
| CGM periods all 2 weeks | Fixed CGM schedule so all 4 sensor periods span 2 consecutive weeks (sensors last 15 days). CGM 2 moved from Week 5 only to Weeks 5–6; CGM 3 moved from Weeks 8–9 to Weeks 9–10. |
| 6-step onboarding | Shortened from 18 steps to 6. Removed individual struggle/goal/activity pages. Added concerns multi-select and weight mode selection. |
| Single-page baseline assessment | All 8 self-assessment questions on one scrollable page instead of one-per-page |
| Vertical answer layout | 1–5 rating buttons displayed as vertical column with circle badges instead of horizontal row |
| Check-ins every 4 weeks | Changed from block-based (Blocks 1, 3, 5) to every-4-week cadence (Weeks 4, 8, 12, 16) |
| Baseline in onboarding | Assessment questions added to onboarding for progress tracking at each check-in |
| Weight loss mode | Added "Still losing" weight mode alongside maintenance mode, selected during onboarding |
| Dynamic toolkit resources | Toolkit content tied to current week's focus — protein sources, fiber options, recipes, etc. |
| Reordered by GLP-1 importance | Weeks ordered: satiety (protein, fiber, fat) → structure → movement → glucose patterns → personalized → graduation |
| Personalized Weeks 13–14 | Focus area selection moved from Block 5 to Week 12 check-in. Unlocks Weeks 13–14 instead of Blocks 5–8. |
| Removed block personalization | Removed `buildPersonalizedWeekOrder()` and `STRUGGLE_TO_TOPIC`. Fixed 16-week timeline for all users. |

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
- Smart sensor reminders (notification when next CGM period is approaching)
- Off-CGM glucose estimation based on meal/activity patterns from on-CGM data
