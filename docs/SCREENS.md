# Screen Registry

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->
<!-- FORMAT: Each screen uses ## ScreenId heading with **bold key**: value fields. -->
<!-- ProtoFlow parses this format to generate Figma UX flows. -->

## OnboardingView
- **Name**: Onboarding
- **File**: `ios/App/App/public/index.html` (renderOnboarding)
- **Purpose**: 18-step personalized onboarding flow collecting profile data, medication history, struggles, and baseline assessment
- **Key Elements**:
  - Progress bar showing step completion
  - One question per screen with large tappable options
  - Steps 0–8: Profile questions (name, age, medication, body, goals, struggles)
  - Steps 9–16: Baseline self-assessment quiz (8 questions rated 1–5)
  - Step 17: Personalized 16-week program summary with "Start your graduation" button
- **Entry Points**: First launch (if `onboardingComplete` is false), or after program reset from Settings
- **Navigates To**:
  - [completes step 17] → HomeView
- **States**:
  - Default: Sequential step-by-step flow with progress bar
  - Reset: Returns to step 0 when triggered from Settings

## HomeView
- **Name**: Home Dashboard
- **File**: `ios/App/App/public/index.html` (renderHome)
- **Purpose**: Primary dashboard showing program progress, glucose data, hunger coach access, GPA scores, weight graph, and daily habits
- **Key Elements**:
  - Program badge ("GLP-1 Graduation — Block X (Wk Y–Z)")
  - Graduation progress card (milestone, progress %, criteria met, next sensor countdown)
  - CGM-aware glucose display (live graph when CGM ON, average graph when CGM OFF — clickable toggle)
  - Hunger Coach card (always visible, elevated during off-CGM blocks)
  - GPA strip (Glucose, Lifestyle, Consistency — tappable)
  - Weight & maintenance band graph (±3–5% band from day 1)
  - Block focus card (current block's single goal)
  - Today's habits checklist (6 items with progress)
  - Appetite return normalization card (contextual, dismissible)
- **Entry Points**: Bottom nav "Home" tab, default screen after onboarding
- **Navigates To**:
  - [taps graduation card] → ToolkitView
  - [taps GPA strip] → InsightsView
  - [taps "Talk to your coach"] → HungerCoachView
  - [taps hunger check-in CTA] → HungerQuestionnaireView
  - [taps settings icon] → SettingsView
- **States**:
  - CGM ON (Blocks 1, 3, 6, 8): Live glucose graph with blue border, "LIVE" badge
  - CGM OFF (Blocks 2, 4, 5, 7): Average daily graph with amber border, "OFF" badge, elevated hunger coach card
  - Weekly check-in modal: Auto-appears after 4 seconds (once per week)

## ToolkitView
- **Name**: Graduation Toolkit
- **File**: `ios/App/App/public/index.html` (renderTransitionToolkit)
- **Purpose**: Education hub with graduation timeline, core principles, weekly goal, education sections, and readiness score
- **Key Elements**:
  - Scrollable graduation timeline (16 week dots grouped in 8 block containers, CGM badges, lock icons)
  - Core principles card (4 static principles in a grid)
  - Block focus card (current block's goal)
  - Primary goal widget (program-level goal with do/avoid/focus guidance)
  - CGM sensor schedule card
  - Graduation readiness score (composite with component breakdown)
  - Education sections (6 collapsible categories with progress tracking)
  - Block education goal indicator (80% completion target)
- **Entry Points**: Bottom nav "Toolkit" tab, Home graduation card tap
- **Navigates To**:
  - [taps week dot on timeline] → WeekDetailView
  - [taps education module] → EducationModuleView
  - [taps education game] → EducationGameView
  - [taps toolkit module] → ToolkitModuleView
- **States**:
  - Blocks 5–8 locked: Lock icons on timeline, locked state in week detail until post-block-4 check-in

## LogView
- **Name**: Log
- **File**: `ios/App/App/public/index.html` (renderLog)
- **Purpose**: Central logging hub for daily health data entry
- **Key Elements**:
  - Daily hunger check-in banner (prominent, visible until completed)
  - Body scanner button (camera-based composition scan)
  - Food log (placeholder)
  - Exercise log (placeholder)
  - Water log (placeholder)
  - Sleep log (placeholder)
  - Glucose notes (placeholder)
- **Entry Points**: Bottom nav "+" button
- **Navigates To**:
  - [taps hunger check-in] → HungerQuestionnaireView
  - [taps body scanner] → BodyScannerView
- **States**:
  - Hunger completed: Banner changes to show completion status
  - Default: All log items visible with status indicators

## InsightsView
- **Name**: Insights
- **File**: `ios/App/App/public/index.html` (renderInsights)
- **Purpose**: Detailed health scores with drill-down, sensor comparisons, and graduation trend
- **Key Elements**:
  - Three tabs: Lifestyle, Glucose, Graduation
  - Lifestyle tab: Lifestyle GPA gauge + component breakdown, hunger-lifestyle correlations
  - Glucose tab: Glucose GPA gauge, sensor comparison graph (buildSensorComparisonSVG), glucose-hunger correlations, CGM status note
  - Graduation tab: Graduation trend graph (3-line SVG over 16 weeks), graduation criteria checklist
  - GPA detail modals (tappable cards → bottom-sheet with 7-day trend, best/worst, component list)
  - Component detail views (5 improvement tips per component)
- **Entry Points**: Bottom nav "Insights" tab, Home GPA strip tap
- **Navigates To**:
  - [taps GPA card] → GPA detail modal (overlay)
  - [taps component in modal] → Component detail view (overlay)
- **States**:
  - CGM ON: Live data in Glucose tab
  - CGM OFF: "CGM Off" note, shows last sensor data, "Next CGM: Block X"
  - Modal open: Bottom-sheet overlay with score details

## SettingsView
- **Name**: Settings
- **File**: `ios/App/App/public/index.html` (renderSettings)
- **Purpose**: User profile display, program details, maintenance band settings, and program reset
- **Key Elements**:
  - User profile card (name, age, medication, status, weight, activity, strength training)
  - Program details link (→ ProgramView)
  - Maintenance band percentage setting
  - Preferences toggles
  - Reset program button (red-bordered, with confirmation modal)
- **Entry Points**: Bottom nav "Settings" tab, Home settings icon
- **Navigates To**:
  - [taps program details] → ProgramView
  - [taps reset → confirms] → OnboardingView (step 0, all data cleared)
- **States**:
  - Reset confirmation modal: Overlay warning with confirm/cancel

## WeekDetailView
- **Name**: Block Detail
- **File**: `ios/App/App/public/index.html` (renderWeekDetail)
- **Purpose**: Full-screen view of a single block's goal, education modules, and status
- **Key Elements**:
  - Block number, milestone name (personalized), status (Completed/Current/Upcoming)
  - CGM status banner (if CGM block)
  - Structural goal with description and target metric
  - Education modules assigned to this block (organized by section)
  - Assessment card (Block 1: baseline, Block 3: mid-program)
  - Prev/next block navigation buttons
- **Entry Points**: Toolkit → tap any week dot on graduation timeline
- **Navigates To**:
  - [taps education module] → EducationModuleView
  - [taps assessment card] → Post8CheckInView
  - [taps prev/next block] → WeekDetailView (adjacent block)
- **States**:
  - Completed: Green checkmark, completion summary
  - Current: Purple highlight, active goal
  - Upcoming: Gray, preview of upcoming goal
  - Locked (Blocks 5–8): Lock icon, "Complete your Block 4 check-in to unlock" + start button

## Post8CheckInView
- **Name**: Self-Assessment Check-In
- **File**: `ios/App/App/public/index.html` (renderPost8CheckIn)
- **Purpose**: Parameterized 4-step self-assessment flow used at 3 checkpoints in the program
- **Key Elements**:
  - Step 1: Signos Insights (mock data showing user patterns)
  - Step 2: Self-Assessment Quiz (8 questions rated 1–5)
  - Step 3: Personalized Feedback (per-question feedback with baseline comparison)
  - Step 4: Choose Your Focus (Block 5 only — select 1–2 focus areas for Blocks 5–8)
- **Entry Points**: WeekDetailView Block 1 assessment card, Block 3 assessment card, Block 5 locked "Start check-in" button. Also embedded in onboarding (steps 9–16).
- **Navigates To**:
  - [completes flow] → WeekDetailView (or OnboardingView step 17 if from onboarding)
- **States**:
  - checkinWeek=1: "Your Baseline Assessment" — establishes starting point
  - checkinWeek=5: "Mid-Program Check-In" — measures progress
  - checkinWeek=9: "Your Block 4 Progress Report" — full check-in with focus selection, unlocks Blocks 5–8

## HungerCoachView
- **Name**: Hunger Coach
- **File**: `ios/App/App/public/index.html` (renderHungerCoach)
- **Purpose**: Interactive conversational coaching tool for hunger understanding and management
- **Key Elements**:
  - Landing page: personalized greeting, stats bar, glucose status card, best strategy card, pattern detection, scenario selection
  - 10 coaching scenarios in 3 categories: Practice a skill (2), I'm feeling something (6), Learn & explore (2)
  - Branching conversation flows with contextual advice
  - Glucose integration cards (live during CGM ON, historical during CGM OFF)
  - Strategy commit buttons + outcome tracking
  - Follow-up options (paused/ate intentionally/satisfied/learn more)
  - Mini-lesson viewer (5 deep-dive lessons)
  - Body scan flow (4 timed steps)
  - HALT check (2×2 grid)
  - 20-minute meal timer
- **Entry Points**: Home → "Talk to your coach" button, Hunger questionnaire → "Need help?" link, Log screen
- **Navigates To**:
  - [taps "learn more" follow-up] → Mini-lesson view (within coach)
  - [back button] → Previous screen
- **States**:
  - Landing: Scenario selection with personalized stats
  - In-scenario: Branching conversation with question/response flow
  - Response: Coach advice with glucose card + strategy buttons
  - Follow-up: Outcome selection with positive reframing
  - Lesson: Full-content mini-lesson with key takeaway
  - Timer: 20-minute countdown for meal pacing

## HungerQuestionnaireView
- **Name**: Hunger Check-In
- **File**: `ios/App/App/public/index.html` (renderHungerQuestionnaire)
- **Purpose**: Daily hunger/fullness rating with glucose-aware feedback
- **Key Elements**:
  - Hunger rating slider (1–5 with named anchors and color coding)
  - Fullness rating slider (1–5 with named anchors and color coding)
  - Post-submit feedback: educational tip, glucose insight card, rotating micro-tip
  - "Need help? Talk to your coach" link (on high hunger or extreme fullness)
- **Entry Points**: Home → hunger CTA, Log → hunger banner
- **Navigates To**:
  - [taps "Talk to your coach"] → HungerCoachView
  - [back button] → Previous screen
- **States**:
  - Input: Slider adjustment for hunger and fullness
  - Submitted: Feedback view with glucose insight card

## EducationModuleView
- **Name**: Education Article
- **File**: `ios/App/App/public/index.html` (renderEducationModuleDetail)
- **Purpose**: Long-form education article reading view (1–3 minute reads)
- **Key Elements**:
  - Module title and section badge
  - Tier indicator (Foundation/Intermediate/Advanced)
  - Full article content (4 paragraphs)
  - "Mark as complete" button
- **Entry Points**: Toolkit → education section → module card, WeekDetailView → module card
- **Navigates To**:
  - [back button] → Previous screen
- **States**:
  - Unread: Default view with content
  - Completed: Checkmark indicator, stored in `state.completedModules`

## EducationGameView
- **Name**: Interactive Game
- **File**: `ios/App/App/public/index.html` (renderEducationGame)
- **Purpose**: Hands-on learning activities (quizzes, builders, camera exercises, meditation timer)
- **Key Elements**:
  - Game-specific UI (quiz comparisons, plate builder, workout selector, form recorder, meditation timer)
  - Score/feedback display
  - Progress through rounds/steps
- **Entry Points**: Toolkit → education section → game card
- **Navigates To**:
  - [back button] → Previous screen
- **States**:
  - Active: Game in progress
  - Complete: Score/feedback shown, stored in `state.completedGames`

## BodyScannerView
- **Name**: Body Scanner
- **File**: `ios/App/App/public/index.html` (renderBodyScanner)
- **Purpose**: Camera-based body composition measurement (mock analysis)
- **Key Elements**:
  - Camera viewfinder (via `navigator.mediaDevices.getUserMedia`)
  - 5-second scan countdown
  - Results: body fat %, visceral fat %, lifestyle bonus (0–3 points)
  - Color-coded result indicators
- **Entry Points**: Log → body scanner button
- **Navigates To**:
  - [back button] → LogView
- **States**:
  - Ready: Camera active, "Start Scan" button
  - Scanning: 5-second countdown with visual indicator
  - Results: Body composition display with lifestyle bonus

## ProgramView
- **Name**: Program Details
- **File**: `ios/App/App/public/index.html` (renderProgram)
- **Purpose**: Detailed program metrics, dose event history, and graduation readiness
- **Key Elements**:
  - Program information card
  - Dose event history list
  - Program metrics (habit score, glucose stability, readiness)
  - Readiness score with progress bar
- **Entry Points**: Settings → "Program details" link
- **Navigates To**:
  - [back button] → SettingsView
- **States**:
  - Default: Full program detail view

## ToolkitModuleView
- **Name**: Toolkit Module
- **File**: `ios/App/App/public/index.html` (renderToolkitModule)
- **Purpose**: Step-by-step toolkit module with reading and activities
- **Key Elements**:
  - Multi-step content progression
  - Step indicator
  - Content blocks with reading and activities
- **Entry Points**: Toolkit → toolkit module card
- **Navigates To**:
  - [back button] → ToolkitView
- **States**:
  - In-progress: Step-by-step content
  - Complete: All steps finished
