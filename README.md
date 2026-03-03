# Signos · GLP-1 Graduation Program

A **16-week (8-block) mobile application** that helps users tapering off or recently off GLP-1 medications build durable health habits and graduate with the skills, scores, and confidence to thrive without medication. Built as a Capacitor-wrapped web app for iOS.

## Core Thesis

The window during and immediately after GLP-1 treatment is the optimal time to build lasting habits in nutrition, exercise, sleep, and stress management. The program builds these habits from baseline observation to mastery across 8 two-week blocks, with intermittent CGM wear periods that validate progress with data.

## Program Structure

A single unified 16-week journey structured as **8 two-week blocks** with an intermittent CGM schedule (4 sensor periods):

| Block | Weeks | CGM | Focus |
|-------|-------|-----|-------|
| 1 | 1–2 | ON | Baseline & Learn Your Glucose |
| 2 | 3–4 | OFF | Protein + Fiber Foundation |
| 3 | 5–6 | ON | Movement & CGM Proof |
| 4 | 7–8 | OFF | Satiating Meals + Sleep & Stress |
| 5 | 9–10 | OFF | Personalized Focus (unlocked after post-block-4 check-in) |
| 6 | 11–12 | ON | Validation & CGM Check |
| 7 | 13–14 | OFF | Refinement & Stress Test |
| 8 | 15–16 | ON | Graduation |

Blocks 1–4 form the **foundation** (with personalized ordering of blocks 2 and 4 based on onboarding struggles). Blocks 5–8 are **personalized** based on a post-block-4 self-assessment.

## Features

- **18-step personalized onboarding** — Collects name, age, medication history, struggles, goals, strength training experience, and an 8-question baseline self-assessment. Generates a personalized block order via `buildPersonalizedWeekOrder()`.
- **Home screen** — Program badge, graduation card, CGM-aware glucose display (live graph or "average day" from last sensor), hunger coach card, GPA strip (Glucose / Lifestyle / Consistency), weight & maintenance band graph, block goal, today's habits, and appetite return normalization messaging.
- **CGM toggle** — Clickable glucose display switches between live CGM view (blue-bordered, real-time graph) and off-CGM view (amber-themed, average daily glucose from last sensor period). Off-CGM blocks elevate the Hunger Coach as the primary signal.
- **Hunger Coach** — Interactive conversational coaching with 10 scenarios across 3 categories (Practice a Skill, I'm Feeling Something, Learn & Explore), branching conversation trees, real-time glucose integration, strategy tracking, body scan exercises, 10-minute and 20-minute timers, and 5 mini-lessons.
- **Glucose-Hunger Integration** — `getGlucoseContext()` threads simulated glucose context throughout the app. Scenario-specific interpretations connect glucose state to hunger patterns (e.g., crash + craving, stable + emotional eating).
- **Hunger check-in (Satiety Skill)** — Daily hunger (1–5) and fullness (1–5) ratings with glucose-aware feedback, Satiety Skill score (0–100), coach escalation for extreme values, and rotating micro-tips.
- **Graduation Toolkit** — Scrollable 16-week timeline (dots grouped in block pairs with CGM/habit borders), CGM sensor schedule, core principles, block goals, graduation readiness score, and 6 collapsible education sections with progress tracking.
- **Block detail view** — Per-block goals, education modules, CGM status, assessment links, and previous/next navigation. Blocks 5–8 show locked state with unlock requirements.
- **Self-assessment flow** — Parameterized 4-step check-in used at 3 checkpoints (Block 1 baseline, Block 3 mid-program, Block 5 post-foundation) with Signos insights, 8-question quiz, personalized feedback with baseline comparison, and focus area selection (Block 5 only).
- **Insights** — Three tabs: Lifestyle (GPA, transition readiness, hunger correlations), Glucose (GPA, sensor-by-sensor comparison graph, glucose correlations), and Graduation (trend SVG, score deltas, program progress).
- **Education system** — 6 sections (Glucose & CGM, Nutrition, Exercise, Hunger & Satiety, Sleep & Recovery, Stress & Resilience) with block-based assignments, 3 module tiers, 5 interactive games, and 80% per-block completion targets.
- **Body Scanner** — Camera-based body composition measurement (mock) with lifestyle GPA bonus.
- **Log** — Central hub for hunger check-in, body scanner, food, exercise, water, sleep, and glucose notes.
- **Weekly check-in** — Pop-up modal (mood, confidence, biggest challenge) appearing once per week.
- **Settings** — User profile, program details, maintenance band configuration, preferences, and program reset.

Data is stored in `localStorage` (no backend). CGM data is simulated for demo purposes.

## Run locally (browser)

```bash
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`). Use a narrow viewport or device for the mobile-first layout.

## Run on your iPhone (or Simulator)

Open **`ios/App/App.xcworkspace`** in Xcode, connect your iPhone (or pick a simulator), then press **Run** (⌘R). The app installs and runs from a bundled copy—no Terminal or `npm run dev` needed.
**Full steps (signing, trust):** see **`ios/README.md`**.

## Build (web only)

```bash
npm run build
npm run preview
```

## Design Principles

- **Single unified program** — No phase switching; one continuous 16-week journey in 8 two-week blocks with a consistent purple (#7c3aed) identity.
- **CGM validates, habits persist** — On-CGM blocks prove habits work with data; off-CGM blocks build habits by feel. 4 intermittent sensor periods across 16 weeks.
- **Hunger as skill** — Hunger is framed as information to respond to, not a problem to fight. Satiety Skill score tracks mastery over time. The Hunger Coach never tells users not to eat.
- **Glucose explains hunger** — CGM data connects to hunger signals so users understand *why* they feel what they feel.
- **Weight normalization** — 3–5% regain is biologically expected maintenance, shown from day 1. Weight regain is not failure.
- **Graduation earned** — 4 criteria must be met: Glucose GPA ≥ 3.5, Lifestyle GPA ≥ 3.0, weight within maintenance band, and education ≥ 80% completed.
- **Personalized from day one** — Onboarding struggles reshape block order; post-block-4 check-in unlocks personalized blocks 5–8; the coach adapts to user history.
- **Past-tense GLP-1 framing** — The app is designed for users coming off medication, not users on a stable dose.
- **Safety guardrails** — No dosing advice, no alarmist glucose alerts, no "good/bad" food labels, no restriction language. All coach follow-ups are positive.
