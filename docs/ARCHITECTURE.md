# Architecture

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| iOS Shell | SwiftUI + WKWebView | Minimal wrapper that loads `public/index.html` |
| App Logic | Vanilla JavaScript | Single `index.html` file with all screens, state, and rendering |
| UI Rendering | DOM manipulation via innerHTML | String concatenation for dynamic HTML generation |
| Styling | Inline CSS + `<style>` block | Purple (#7c3aed) unified theme |
| State | localStorage | Persisted under key `signos-glp1` with migration logic |
| Graphs | SVG generation | Dynamic SVG for glucose, weight, graduation trend, sensor comparison |
| Packaging | Capacitor | iOS app wrapping the web content |
| Build Tool | Vite | For the React layer (not used by iOS app directly) |

## Key Services / Modules

| Service | Purpose | File(s) | Status |
|---------|---------|---------|--------|
| Screen Router | In-memory routing with history stack | `index.html` (`navigateTo`, `navigateBack`, `renderCurrentScreen`) | Active |
| State Manager | localStorage persistence with migration | `index.html` (`state`, `saveState`, `migrateToProgramState`) | Active |
| Glucose Engine | Simulated CGM readings based on time/profile/hunger | `index.html` (`getGlucoseContext`) | Active |
| Hunger-Glucose Engine | Cross-references glucose state with hunger ratings | `index.html` (`getGlucoseHungerInsight`) | Active |
| Week System | 16-week program with one focus per week, choice prompts | `index.html` (`WEEK_GOALS`, `WEEK_TOPICS`, weekly choice mechanism) | Active |
| CGM Scheduler | Intermittent CGM: Weeks 1–2 (baseline), 5–6 (satiety check), 9–10 (movement), 15–16 (graduation) | `index.html` (`CGM_SCHEDULE`, `isCGMWeek`) | Active |
| Graduation Evaluator | Checks 4 graduation criteria against state | `index.html` (`checkGraduationCriteria`) | Active |
| Scoring System | GPA calculations for glucose, lifestyle, consistency | `index.html` (`getGlucoseGPA`, `getLifestyleGPA`, `getConsistencyScore`) | Active |
| Coach Engine | Branching conversation logic with strategy tracking | `index.html` (`COACH_SCENARIOS`, `COACH_BRANCHES`, `renderHungerCoach`) | Active |

## Data Flow

1. User interacts with UI → event handlers update `state` object
2. `saveState()` persists to localStorage
3. Screen render functions read from `state` to generate HTML
4. `getGlucoseContext()` generates simulated glucose based on time + profile + hunger data
5. `getGlucoseHungerInsight()` combines glucose state with hunger ratings for coach/check-in feedback
6. `checkGraduationCriteria()` evaluates state against 4 graduation thresholds
7. Navigation via `navigateTo(screen)` pushes to `navHistory` stack; `navigateBack()` pops

## External Dependencies

| Dependency | Purpose | Auth Required |
|-----------|---------|---------------|
| Capacitor | iOS app shell | No |
| React (bundled) | Available but not used by main app | No |
| Babel (bundled) | Available but not used by main app | No |
| navigator.mediaDevices | Body scanner camera access | User permission |
