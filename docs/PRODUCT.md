# Product Spec

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->

## Overview

The Signos GLP-1 Graduation Program is a 16-week (8-block) mobile application designed to help users tapering off or recently off GLP-1 receptor agonist medications (e.g., semaglutide, tirzepatide) build durable health habits and graduate with the skills, scores, and confidence to maintain their weight and metabolic health without medication.

The app is structured around intermittent CGM wear (4 sensor periods across 16 weeks) paired with an interactive Hunger Coach that serves as the primary feedback tool during off-CGM blocks.

## Target Users

- **Primary**: Adults tapering their GLP-1 dose or recently discontinued GLP-1 medication
- **Secondary**: Users who have been off GLP-1 for 3+ months and need maintenance support
- **Assumption**: All users wear a Signos CGM during designated sensor periods (Blocks 1, 3, 6, 8)

## Key Features

| Feature | Description | Status |
|---------|-------------|--------|
| Personalized Onboarding | 18-step flow collecting profile, medication history, struggles, baseline assessment | Implemented |
| 8-Block Program Structure | 16 weeks in 8 two-week blocks with personalized ordering of Blocks 2 & 4 | Implemented |
| Hunger Coach | Interactive conversational coaching with 10 scenarios, glucose integration, strategy tracking | Implemented |
| Intermittent CGM | 4 sensor periods (Blocks 1, 3, 6, 8) with live/historical toggle and sensor comparison | Implemented |
| Weight Maintenance Band | ±3–5% band shown from day 1 with normalization messaging | Implemented |
| Graduation Criteria | 4 criteria (Glucose GPA, Lifestyle GPA, weight in band, education completion) | Implemented |
| Self-Assessment Flow | Parameterized check-in at Block 1 (onboarding), Block 3, and Block 5 | Implemented |
| Education System | 6 sections, 47+ modules, 5 interactive games, progressive unlock per block | Implemented |
| Glucose-Hunger Integration | Real-time glucose context in coach responses, check-in feedback, and landing page | Implemented |
| Body Scanner | Camera-based body composition scan (mock) feeding into Lifestyle GPA | Implemented |

## User Stories

- As a user coming off GLP-1, I want a structured program that addresses my specific transition fears.
- As a user whose appetite is returning, I want a coach that helps me understand and respond to hunger.
- As a user in an off-CGM block, I want guidance even without real-time glucose data.
- As a user who gained 2 lbs, I want to know that's within my maintenance band — not failure.
- As a user finishing the program, I want proof (CGM 4 vs CGM 1) that my habits work.

## Scope & Constraints

### In Scope
- Full 16-week graduation program with personalized block ordering
- Intermittent CGM with 4 sensor periods
- Interactive Hunger Coach with glucose integration
- Weight maintenance band and normalization
- Education library with progressive unlock
- Graduation criteria evaluation
- Self-assessment at 3 checkpoints

### Out of Scope
- Real CGM data integration (currently simulated via `getGlucoseContext()`)
- Real body composition analysis (mock scanner)
- Push notifications
- Server-side persistence (localStorage only)
- Multi-device sync
- Social features
