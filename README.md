# Signos · GLP-1 Transition

A phase-aware app that combines **CGM (continuous glucose monitoring)** with **GLP-1 transition support**: same program scaffold, different emphasis and **visual identity** by phase (On GLP-1 → Dose Reduction → GLP-1 Graduation).

## Features

- **Phase detection & onboarding** — Manual phase selection and optional expected timeline; dose-change event logging (decreased / switching formulation / stopping).
- **Phase color theming** — Each phase has its own color identity (Phase 1 teal, Phase 2 amber, Phase 3 purple) applied across all buttons, progress bars, gauges, badges, and cards.
- **Home** — Phase badge, phase-specific hero card, current glucose graph (mock CGM), GPA strip (Glucose/Lifestyle/Consistency), daily habits, weekly focus, hunger reminder. Phase 3 shows a compact graduation progress card and weight maintenance graph.
- **Transition Toolkit** — Phase-adapted core principles, primary goal, 34+ education modules (beginner → intermediate → advanced) with completion tracking and progress bars, interactive games, and Phase 3 12-week graduation timeline with named milestones and criteria.
- **Hunger Check-in (Satiety Skill)** — Daily check-in reframed as skill-building: named scale anchors, Satiety Skill score (0–100), phase-specific framing ("manage, not fight"), post-check-in micro-education tips.
- **Body Scanner** — Camera-based body fat % and visceral fat % logging that feeds into the Lifestyle GPA.
- **Insights** — Glucose GPA, Lifestyle GPA, Transition Readiness with clickable component drill-downs and individual advice. Phase 3 shows a Graduation Trend graph (glucose, lifestyle, transition scores plotted weekly).
- **Weekly Check-in** — Pop-up on the home screen (mood, confidence, challenges) appearing once per week.
- **Log** — Quick log for hunger check-in, body scanner, food, exercise, water, sleep, weight.
- **Settings** — Change phase, log dose changes, view program details, manage preferences.

Data is stored in `localStorage` (no backend). CGM data on Home is mock for demo.

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

## PRD alignment

- **Phase identity:** Each phase has a distinct color, hero message, and emotional tone—the app *feels* different in each phase, not just says different things.
- **Guardrails:** Scale neutrality during taper; CGM as coach (pattern-based, not punitive); protein + resistance training as anchors.
- **Hunger as skill:** Hunger is framed as information to respond to, not a problem to fight. Satiety Skill score tracks mastery over time.
- **Weight framing:** Phase 3 normalizes 3–5% regain as maintenance. Above-band advice recommends gradual correction, never crash dieting.
- **Graduation earned:** Phase 3 has 4 criteria (Glucose GPA ≥ 3.5, Lifestyle GPA ≥ 3.0, weight within band, education ≥ 80%) that must be met—graduation is earned, not just timed.
- **Phased journey:** Same app surfaces and core actions; Phase 1 = learn + habits, Phase 2 = adaptation + reassurance, Phase 3 = graduation + drift prevention.
- **Success metrics** are reflected in the UI (habits, GPA scores, graduation criteria, education progress, satiety skill); red-flag escalation and clinician rules are open product decisions per the PRD.
