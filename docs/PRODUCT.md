# Product Spec

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->

## Overview

The Signos GLP-1 Graduation Program is a **16-week, one-focus-per-week** mobile application designed to help users tapering off or recently off GLP-1 receptor agonist medications (e.g., semaglutide, tirzepatide) build durable health habits and graduate with the skills, scores, and confidence to maintain their weight and metabolic health without medication.

The app is structured around intermittent CGM wear (4 sensor periods across 16 weeks) paired with an interactive Hunger Coach that serves as the primary feedback tool during off-CGM weeks.

## Target Users

- **Primary**: Adults tapering their GLP-1 dose or recently discontinued GLP-1 medication
- **Secondary**: Users who have been off GLP-1 for 3+ months and need maintenance support
- **Assumption**: All users wear a Signos CGM during designated sensor periods (Weeks 1–2, 5–6, 9–10, 15–16)

## 16-Week Weekly Structure

| Week | Focus | CGM | Check-In |
|------|-------|-----|----------|
| 1 | Know Your Baseline | ✓ | |
| 2 | Protein Foundation (choose meal) | ✓ | |
| 3 | Add Fiber (choose method) | | |
| 4 | Second Meal (choose meal) | | ✓ |
| 5 | Complete the Satiety Plate | ✓ | |
| 6 | Meal Timing | ✓ | |
| 7 | Hydration | | |
| 8 | Post-Meal Walking | | ✓ |
| 9 | Glucose Patterns | ✓ | |
| 10 | Portion Intuition | ✓ | |
| 11 | Daily Movement | | |
| 12 | Resistance Training | | ✓ (unlocks personalized weeks) |
| 13–14 | Personalized focus areas | | |
| 15 | Full Integration | ✓ | |
| 16 | Graduation | ✓ | ✓ Final |

**Weekly Choice Mechanism**: Several weeks include a choice prompt (e.g., "Which meal will you anchor with protein?" → Breakfast/Lunch/Dinner) so users choose their implementation approach.

## Key Features

| Feature | Description | Phase | Status |
|---------|-------------|-------|--------|
| Shortened Onboarding | 6-step flow: 4 info screens (welcome, about you, concerns, weight) + 1 baseline assessment page (8 questions scrollable, same as check-ins for progress tracking) | 1 | Implemented |
| 16-Week Weekly Focus Model | One focus per week with choice prompts where applicable | 1 | Implemented |
| Hunger Coach | Interactive conversational coaching with 10 scenarios, 57 branching paths, glucose integration, strategy tracking | 1 | Implemented |
| Intermittent CGM | 4 sensor periods, 2 weeks each (sensors last 15 days): Weeks 1–2 (baseline), Weeks 5–6 (satiety check), Weeks 9–10 (movement), Weeks 15–16 (graduation) | 1 | Implemented |
| Weight Bands | Two modes: "Still Losing" (progress bar toward goal) and "Maintenance" (±3% band with graph) | 1 | Implemented |
| Graduation Criteria | 4 criteria (Glucose GPA, Lifestyle GPA, weight in band, education completion) | 1 | Implemented |
| Check-In Flow | Every 4 weeks (Weeks 4, 8, 12, 16) with same 8-question format as baseline | 1 | Implemented |
| Redesigned Toolkit | Current week's focus prominent, resources (recipes, food lists, exercise guides) tied to focus, CGM schedule, weight progress/band, scrollable 16-week list | 1 | Implemented |
| Education System | 6 sections, 47+ modules, 5 interactive games, progressive unlock per week | 1 | Implemented |
| Glucose-Hunger Integration | Real-time glucose context in coach responses, check-in feedback, and landing page | 1 | Implemented |
| Daily/Weekly Check-Ins | Hunger check-in with glucose insight + weekly mood/confidence journal | 1 | Implemented |
| Insights Tabs | Three-tab insights: Lifestyle GPA, Glucose sensor comparison, Graduation trends | **2** | Deferred |
| Body Scanner | Camera-based body composition scan (mock) feeding into Lifestyle GPA | 2 | Implemented |
| Sensor Comparison Graph | Overlaid daily glucose curves across CGM periods with metrics table | **2** | Deferred |

## User Stories

- As a user coming off GLP-1, I want a structured program that addresses my specific transition fears.
- As a user whose appetite is returning, I want a coach that helps me understand and respond to hunger.
- As a user in an off-CGM week, I want guidance even without real-time glucose data.
- As a user still losing weight, I want to see progress toward my goal weight with a clear progress bar.
- As a user at goal weight, I want to know that ±3% fluctuation is within my maintenance band — not failure.
- As a user finishing the program, I want proof (CGM 4 vs CGM 1) that my habits work.

## Scope & Constraints

### In Scope
- Full 16-week graduation program with one focus per week
- Intermittent CGM with 4 sensor periods (Weeks 1–2, 5–6, 9–10, 15–16)
- Interactive Hunger Coach with glucose integration
- Weight bands: Still Losing (progress bar) and Maintenance (±3% band)
- Education library with progressive unlock
- Graduation criteria evaluation
- Self-assessment at 4 checkpoints (Weeks 4, 8, 12, 16)

### Out of Scope
- Real CGM data integration (currently simulated via `getGlucoseContext()`)
- Real body composition analysis (mock scanner)
- Push notifications
- Server-side persistence (localStorage only)
- Multi-device sync
- Social features
