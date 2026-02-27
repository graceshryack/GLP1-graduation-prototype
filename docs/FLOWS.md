# User Flows

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->
<!-- FORMAT: Each flow uses ## Flow: Name heading with numbered steps and arrows. -->
<!-- ProtoFlow parses this format to generate Figma UX flows. -->

## Flow: First-Time User Onboarding
**Trigger**: User opens the app for the first time (onboardingComplete is false)
1. **OnboardingView** → [completes 18 steps: profile, medication, struggles, baseline assessment] → **HomeView**
**Success Outcome**: User has a personalized 16-week program with block ordering based on their struggles

## Flow: Daily Hunger Check-In
**Trigger**: User taps hunger CTA on Home or Log screen
1. **HomeView** → [taps "Start a hunger check-in"] → **HungerQuestionnaireView**
2. **HungerQuestionnaireView** → [rates hunger 1–5, rates fullness 1–5, submits] → **HungerQuestionnaireView** (feedback state)
3. **HungerQuestionnaireView** → [sees glucose insight card + educational feedback] — _End of flow._
**Success Outcome**: Hunger and fullness logged for the day; user receives glucose-aware feedback

## Flow: Hunger Coach Session
**Trigger**: User taps "Talk to your coach" from Home, Log, or Hunger Questionnaire
1. **HomeView** → [taps "Talk to your coach"] → **HungerCoachView** (landing)
2. **HungerCoachView** → [selects a scenario, e.g., "I'm craving something specific"] → **HungerCoachView** (scenario questions)
3. **HungerCoachView** → [answers branching questions] → **HungerCoachView** (response with advice + glucose card)
4. **HungerCoachView** → [commits to a strategy] → **HungerCoachView** (follow-up options)
5. **HungerCoachView** → [selects outcome: "I paused and the feeling passed"] — _End of flow._
**Success Outcome**: User received personalized coaching, committed to a strategy, and logged the outcome

## Flow: Explore Graduation Timeline
**Trigger**: User taps graduation card on Home or navigates to Toolkit
1. **HomeView** → [taps graduation progress card] → **ToolkitView**
2. **ToolkitView** → [scrolls timeline, taps a week dot] → **WeekDetailView**
3. **WeekDetailView** → [reviews block goal and education modules] → **WeekDetailView**
4. **WeekDetailView** → [taps an education module] → **EducationModuleView**
5. **EducationModuleView** → [reads article, marks complete] → **WeekDetailView**
**Success Outcome**: User explored their program structure and completed an education module

## Flow: Post-Block-4 Check-In & Unlock
**Trigger**: User navigates to Block 5 on the timeline (locked state)
1. **ToolkitView** → [taps locked Block 5 week dot] → **WeekDetailView** (locked state)
2. **WeekDetailView** → [taps "Start your check-in"] → **Post8CheckInView**
3. **Post8CheckInView** → [Step 1: reviews Signos insights] → **Post8CheckInView** (step 2)
4. **Post8CheckInView** → [Step 2: answers 8 self-assessment questions] → **Post8CheckInView** (step 3)
5. **Post8CheckInView** → [Step 3: reviews personalized feedback] → **Post8CheckInView** (step 4)
6. **Post8CheckInView** → [Step 4: selects 1–2 focus areas] → **WeekDetailView** (unlocked)
**Success Outcome**: Blocks 5–8 unlocked with personalized focus areas; user has compared progress to baseline

## Flow: CGM Toggle on Home Screen
**Trigger**: User taps the CGM status badge on the glucose display
1. **HomeView** → [taps CGM badge ("LIVE" or "OFF")] → **HomeView** (toggled state)
**Success Outcome**: User sees the alternate glucose view (live ↔ average daily graph)

## Flow: View Sensor Comparison in Insights
**Trigger**: User wants to compare glucose data across sensor periods
1. **HomeView** → [taps GPA strip] → **InsightsView**
2. **InsightsView** → [taps "Glucose" tab] → **InsightsView** (Glucose tab)
3. **InsightsView** → [views sensor comparison graph with overlaid curves] — _End of flow._
**Success Outcome**: User sees their glucose improvement across completed sensor periods

## Flow: GPA Drill-Down
**Trigger**: User taps a GPA card in Insights
1. **InsightsView** → [taps Glucose GPA card] → **InsightsView** (GPA detail modal)
2. **InsightsView** → [taps a component, e.g., "Spikes per day"] → **InsightsView** (component detail)
3. **InsightsView** → [reads improvement tips] → **InsightsView** (back to GPA modal)
**Success Outcome**: User understands what drives their score and how to improve it

## Flow: Body Scanner
**Trigger**: User taps body scanner on Log screen
1. **LogView** → [taps "Body Scanner"] → **BodyScannerView**
2. **BodyScannerView** → [taps "Start Scan", waits 5 seconds] → **BodyScannerView** (results)
3. **BodyScannerView** → [views body fat %, visceral fat %, lifestyle bonus] — _End of flow._
**Success Outcome**: Body composition measured; lifestyle bonus applied to GPA

## Flow: Program Reset
**Trigger**: User taps "Reset program" in Settings
1. **SettingsView** → [taps "Reset program"] → **SettingsView** (confirmation modal)
2. **SettingsView** → [confirms reset] → **OnboardingView** (step 0)
**Success Outcome**: All data cleared; user starts fresh from onboarding

## Flow: Hunger Coach Mini-Lesson
**Trigger**: User selects "Teach me about hunger" or taps "learn more" follow-up
1. **HungerCoachView** → [selects "Teach me about hunger"] → **HungerCoachView** (lesson list)
2. **HungerCoachView** → [taps a lesson, e.g., "How glucose drives your hunger"] → **HungerCoachView** (lesson view)
3. **HungerCoachView** → [reads lesson content + key takeaway] → **HungerCoachView** (back to landing)
**Success Outcome**: User learned about a hunger topic with actionable takeaways
