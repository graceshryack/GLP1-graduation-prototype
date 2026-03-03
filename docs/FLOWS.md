# User Flows

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->
<!-- 21 flows (57 subflows), 97 screens — ALL screens in at least one flow -->
<!-- FORMAT: Each flow uses ## N. Flow Name heading with numbered steps and screen IDs. Flows with subflows show common steps first, then ### N.a Subflow Name for divergent paths. -->

## 1. First-Time User Onboarding
**Description**: New user completes 18-step onboarding: profile, health history, goals, baseline self-assessment quiz, and personalized 16-week roadmap generation.
**Personas**: New User
**Phase**: 1

1. **Onboarding_Welcome** → Taps Get Started
2. **Onboarding_NameAge** → Enters name and age
3. **Onboarding_Medication** → Selects medication, duration, status
4. **Onboarding_WhyOffGLP1** → Multi-selects reasons for coming off GLP-1
5. **Onboarding_BodyActivity** → Enters weight, goal weight, height, activity level
6. **Onboarding_Goals** → Multi-selects program goals
7. **Onboarding_PreStruggles** → Multi-selects pre-GLP-1 struggles
8. **Onboarding_CurrentStruggles** → Ranked multi-select current struggles (Directly shapes personalized block order)
9. **Onboarding_StrengthTraining** → Selects strength training experience level
10. **Onboarding_AssessmentQ1** → Begins 8-question baseline self-assessment (rated 1-5) — Step 9 of 18
11. **Onboarding_AssessmentQ5** → Continues assessment — midway through quiz — Step 13 of 18
12. **Onboarding_PersonalizedProgram** → Reviews personalized 16-week roadmap and per-question feedback, taps Start — Step 17 of 18
13. **Home_CGM_Active** → Arrives at dashboard

## 2. Daily Hunger Check-In
**Description**: User logs daily hunger/fullness (1-5) from the Log tab or Home screen. Gets glucose-aware insight card. High hunger or extreme fullness triggers coach escalation.
**Personas**: Active User
**Phase**: 1

1. **Log_Main** → Taps daily hunger check-in banner (Also accessible from Home hunger CTA)
2. **HungerQuestionnaire** → Rates hunger and fullness 1-5, submits
3. **HungerQuestionnaire** → Sees glucose insight card, micro-tip, updated satiety skill score (Coach escalation button if hunger >= 4 or fullness extreme)

### 2.a Coach Escalation (High Hunger)
4. **HungerCoach_Landing** → Taps 'Need help? Talk to your coach' (Triggered when hunger >= 4 or fullness <= 1 or >= 5)

## 3. Hunger Coach — Still Hungry After Eating
**Description**: User ate but is still hungry. Coach assesses timing, drills into meal composition, and differentiates physical vs hedonic hunger through branching questions.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Just ate, still hungry'
2. **HungerCoach_Scenario_StillHungry** → Sees timing question: When did you eat?

### 3.a Under 15 Minutes — Wait for Signals
3. **HungerCoach_StillHungry_Under15** → Taps '<15 min' (Vagus nerve delay + 10-min timer)

### 3.b 15-30 Min → Carb-Heavy Meal
3. **HungerCoach_StillHungry_WhatAte** → Taps '15-30 min' → What did you eat?
4. **HungerCoach_StillHungry_CarbHeavy** → Taps 'Mostly carbs' (Spike-crash cycle explanation)

### 3.c 15-30 Min → Had Protein → Physical Hunger
3. **HungerCoach_StillHungry_WhatAte** → Taps '15-30 min'
4. **HungerCoach_StillHungry_StomachVsMouth** → Taps 'Had protein' → Stomach or mouth?
5. **HungerCoach_StillHungry_Physical** → Taps 'Physical hunger' (Trust the signal)

### 3.d 15-30 Min → Had Protein → Mouth Hunger
3. **HungerCoach_StillHungry_WhatAte** → Taps '15-30 min'
4. **HungerCoach_StillHungry_StomachVsMouth** → Taps 'Had protein'
5. **HungerCoach_StillHungry_MouthHunger** → Taps 'Mouth/brain hunger' (Flavor reset)

### 3.e 15-30 Min → Balanced Meal
3. **HungerCoach_StillHungry_WhatAte** → Taps '15-30 min'
4. **HungerCoach_StillHungry_Balanced** → Taps 'Balanced meal' (May need larger portions)

### 3.f >30 Min → Physical Hunger
3. **HungerCoach_StillHungry_StomachVsMouth** → Taps '>30 min' → Stomach or mouth?
4. **HungerCoach_StillHungry_Physical** → Taps 'Physical hunger'

### 3.g >30 Min → Mouth Hunger
3. **HungerCoach_StillHungry_StomachVsMouth** → Taps '>30 min'
4. **HungerCoach_StillHungry_MouthHunger** → Taps 'Mouth/brain hunger'

## 4. Hunger Coach — Starving
**Description**: User is starving. Coach assesses last meal timing and provides urgency-appropriate guidance.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'I'm starving'
2. **HungerCoach_Scenario_Starving** → When was your last meal?

### 4.a 4+ Hours Ago — Emergency Refuel
3. **HungerCoach_Starving_LongAgo** → Taps '4+ hours' (Eat now, protein first, set alarm for tomorrow)

### 4.b 2-4 Hours Ago — Meal Composition Issue
3. **HungerCoach_Starving_Recent** → Taps '2-4 hours' (Protein bridge snack + CGM check)

### 4.c Just Woke Up — Morning Recovery
3. **HungerCoach_Starving_Morning** → Taps 'Just woke up' (Metabolic recovery — positive sign)

## 5. Hunger Coach — Craving
**Description**: User has a craving. Coach identifies the type (sweet/salty/rich/specific) and provides biochemically-informed strategies.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Having a craving'
2. **HungerCoach_Scenario_Craving** → What are you craving?

### 5.a Sweet — Glucose Dip
3. **HungerCoach_Craving_Sweet** → Taps 'Sweet' (Berries + yogurt, dark chocolate alternatives)

### 5.b Salty — Dehydration/Stress
3. **HungerCoach_Craving_Salty** → Taps 'Salty' (Water first, crunchy alternatives)

### 5.c Rich/Fatty — Fat Deficiency
3. **HungerCoach_Craving_Rich** → Taps 'Rich' (Healthy fat integration)

### 5.d Specific Food — 10-Minute Rule
3. **HungerCoach_Craving_Specific** → Taps 'Specific food' (Timer + flexible restraint)

## 6. Hunger Coach — HALT Check
**Description**: User isn't hungry but wants to eat. HALT grid identifies emotional driver: Hungry, Angry/Anxious, Lonely/Bored, or Tired. Each leads to targeted non-food coping strategies.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Not hungry but want to eat'
2. **HungerCoach_Scenario_NotHungry** → Sees HALT grid

### 6.a H — Actually Hungry
3. **HungerCoach_HALT_Hungry** → Taps H (Low-level hunger hard to detect post-GLP-1)

### 6.b A — Angry/Anxious/Stressed
3. **HungerCoach_HALT_Angry** → Taps A (Box breathing 4-4-4-4 + 10-min timer)

### 6.c L — Lonely/Bored
3. **HungerCoach_HALT_Lonely** → Taps L (Social connection, environment change)

### 6.d T — Tired/Exhausted
3. **HungerCoach_HALT_Tired** → Taps T (20-min nap > eating, sleep debt cycle)

## 7. Hunger Coach — Body Scan (Unsure)
**Description**: User isn't sure if hungry. Coach guides 4-step timed body scan for interoception. After scan, user identifies their state from 4 options, each with targeted advice.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Not sure if I'm hungry'
2. **HungerCoach_Scenario_Unsure** → Starts 4-step body scan
3. **HungerCoach_BodyScan_Results** → Completes scan, sees 4 assessment options

### 7.a Physical Signals — Real Hunger
4. **HungerCoach_BodyScan_Physical** → Taps 'Felt physical signals' (Eat with protein)

### 7.b Boring Food Test — Likely Hungry
4. **HungerCoach_BodyScan_BoringFood** → Taps 'Would eat plain food' (Body needs fuel)

### 7.c Only Indulgent — Craving
4. **HungerCoach_BodyScan_Craving** → Taps 'Only want indulgent' (10-min wait, craving peaks at 5-7 min)

### 7.d Still Unsure — Wait and Check
4. **HungerCoach_BodyScan_StillUnsure** → Taps 'Still not sure' (15-min timer + water)

## 8. Hunger Coach — Unusual Time Hunger
**Description**: User is hungry at an unusual time. Coach identifies the timing pattern and provides circadian/physiological explanations.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Hungry at an unusual time'
2. **HungerCoach_Scenario_UnusualTime** → When is this happening?

### 8.a Late Night — Habit/Fatigue
3. **HungerCoach_UnusualTime_LateNight** → Taps 'Late night' (Kitchen closes at 8pm rule)

### 8.b Afternoon — Circadian Dip
3. **HungerCoach_UnusualTime_Afternoon** → Taps 'Mid-afternoon' (Preventive protein snack at 2:30pm)

### 8.c Early Morning — Metabolic Recovery
3. **HungerCoach_UnusualTime_EarlyMorning** → Taps 'Early morning' (Positive sign, protein-heavy breakfast)

### 8.d Post-Workout — Legitimate Refuel
3. **HungerCoach_UnusualTime_PostWorkout** → Taps 'After exercising' (30-60 min anabolic window)

## 9. Hunger Coach — About to Eat
**Description**: User is about to eat and checks in. Coach assesses hunger level and provides level-specific meal pacing advice with a 20-minute timer.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'About to eat'
2. **HungerCoach_Scenario_AboutToEat** → What's your hunger level?

### 9.a Level 1-2 — Not Really Hungry
3. **HungerCoach_AboutToEat_Low** → Taps '1-2: Not hungry' (Protein-dense smaller meal + 20-min timer)

### 9.b Level 3 — Perfect Hunger
3. **HungerCoach_AboutToEat_SweetSpot** → Taps '3: Comfortably hungry' (Protein first, stop at fullness 3-4 + 20-min timer)

### 9.c Level 4-5 — Very Hungry
3. **HungerCoach_AboutToEat_High** → Taps '4-5: Very hungry' (Water first, protein first, fork-down + 20-min timer)

## 10. Hunger Coach — Post-Meal Reflection
**Description**: After eating, user reflects on fullness. Direct outcomes (just right, too full, can't tell) get targeted advice. 'Still hungry' branches into a deeper meal composition drill-down.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Just finished eating'
2. **HungerCoach_Scenario_PostMeal** → How do you feel after eating?

### 10.a Just Right — Satisfied
3. **HungerCoach_PostMeal_JustRight** → Taps 'Satisfied' (Note the meal, template concept)

### 10.b Too Full — Overshoot
3. **HungerCoach_PostMeal_TooFull** → Taps 'Too full' (Data not failure, don't skip next meal)

### 10.c Can't Tell — Wait for Signals
3. **HungerCoach_PostMeal_NotSure** → Taps 'Can't tell' (15-min timer, vagus nerve delay)

### 10.d Still Hungry → Low Protein
3. **HungerCoach_PostMeal_StillHungry** → Taps 'Still hungry' → What did you eat?
4. **HungerCoach_PostMealHungry_LowProtein** → Taps 'Mostly carbs' (Protein anchor strategy)

### 10.e Still Hungry → Small Portion
3. **HungerCoach_PostMeal_StillHungry** → Taps 'Still hungry'
4. **HungerCoach_PostMealHungry_SmallPortion** → Taps 'Small meal' (Increase without guilt)

### 10.f Still Hungry → Ate Too Fast
3. **HungerCoach_PostMeal_StillHungry** → Taps 'Still hungry'
4. **HungerCoach_PostMealHungry_AteFast** → Taps 'Ate fast' (15-min wait + slower next meal)

### 10.g Still Hungry → Balanced Meal
3. **HungerCoach_PostMeal_StillHungry** → Taps 'Still hungry'
4. **HungerCoach_PostMealHungry_BalancedMeal** → Taps 'Balanced meal' (Body genuinely needs more)

## 11. Hunger Coach — Hunger Changing
**Description**: User's hunger patterns are shifting during GLP-1 transition. Coach identifies the type of change and provides reassurance with timelines for normalization.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'My hunger is changing'
2. **HungerCoach_Scenario_HungerChanging** → What feels different?

### 11.a More Hungry — Ghrelin Rebound
3. **HungerCoach_HungerChanging_MoreHungry** → Taps 'Hungrier' (4-8 week normalization, not losing control)

### 11.b Less Hungry — Protect Muscle
3. **HungerCoach_HungerChanging_LessHungry** → Taps 'Less hungry' (Structured meals, protein shakes)

### 11.c Unpredictable — Waves
3. **HungerCoach_HungerChanging_Unpredictable** → Taps 'Comes and goes' (Consistent schedule anchors rhythm)

### 11.d Different Sensation — Hunger Literacy
3. **HungerCoach_HungerChanging_DifferentType** → Taps 'Feels different' (5 types of hunger framework)

## 12. Hunger Coach — Teach Me About Hunger
**Description**: User wants to learn about hunger science. Coach presents 5 mini-lessons: types of hunger, hunger scale, GLP-1 effects, satiation, glucose-hunger.
**Personas**: Active User, Curious Learner
**Phase**: 1

1. **HungerCoach_Landing** → Selects 'Teach me about hunger'
2. **HungerCoach_Scenario_TeachMe** → Browses 5 mini-lessons

## 13. Coach Follow-Up Outcome
**Description**: After any coach response, user reports what happened. Coach provides positive reinforcement regardless of outcome — building a feedback loop where every action is progress.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_HALT_Angry** → (Any coach response screen) Shows 'What happened?' follow-up buttons

### 13.a Paused — Feeling Passed
2. **HungerCoach_Outcome_Paused** → Taps 'Feeling passed' (Awareness win, neural pathways strengthened)

### 13.b Ate Intentionally
2. **HungerCoach_Outcome_AteIntentional** → Taps 'Ate intentionally' (Deliberate > reactive, great outcome)

### 13.c Satisfied
2. **HungerCoach_Outcome_Satisfied** → Taps 'Ate and satisfied' (Perfect landing, reference point)

### 13.d Want to Learn More
2. **HungerCoach_Outcome_LearnMore** → Taps 'Learn more' (Curiosity is progress, shows mini-lessons)

## 14. Explore Program Blocks
**Description**: User explores the 16-week program structure via the Toolkit timeline, browsing each block's goals, education modules, CGM status, and reading articles. Each block detail is a distinct sub-experience.
**Personas**: Active User
**Phase**: 1

1. **Home_CGM_Active** → Taps graduation card
2. **Toolkit_Main** → Scrolls 16-week timeline, taps a block

### 14.a Block 1 — Baseline & CGM
3. **WeekDetail_Block1_Baseline** → Reviews Block 1 goal, CGM schedule, baseline assessment card
4. **Education_CGM_Basics** → Reads 'What is a CGM?' article (Block 1 education: Glucose/CGM + Hunger)

### 14.b Block 2 — Nutrition Focus
3. **WeekDetail_Block2_Nutrition** → Reviews protein + fiber goals, off-CGM status
4. **Education_Protein_Anchor** → Reads 'Protein as your anchor' article (Block 2 education: Nutrition + Hunger)

### 14.c Block 3 — Movement & CGM
3. **WeekDetail_Block3_Movement** → Reviews walking + resistance goals, CGM comparison to Block 1
4. **Education_Walking_Glucose** → Reads 'Walking & glucose' article (Block 3 education: Exercise + Glucose/CGM)

### 14.d Block 4 — Full System
3. **WeekDetail_Block4_FullSystem** → Reviews satiating meals + sleep/stress goals, off-CGM status (Block 4 education: Nutrition + Sleep + Stress + Hunger)

### 14.e Block 5+ — Locked (Awaiting Check-In)
3. **WeekDetail_Block5_Locked** → Sees locked state with unlock requirements and 'Start your check-in' button (Requires blocks 1-4 completion + post-block-4 check-in)

## 15. Self-Assessment Check-In
**Description**: Periodic check-ins at 3 program checkpoints: Block 1 baseline, Block 3 mid-program, and Block 5 post-foundation. Each uses the same 4-step flow (insights → quiz → feedback → focus selection) with stage-customized copy. The Block 5 version unlocks Blocks 5-8.
**Personas**: Active User, Progressing User
**Phase**: 1

1. **CheckIn_SelfAssessment** → Rates 8 questions 1-5 (hunger, nutrition, exercise, sleep, glucose, stress, fullness, weight) — Same quiz format at all 3 checkpoints
2. **CheckIn_Feedback** → Reviews per-question feedback with progress bars and area rankings — Color-coded red/yellow/green, delta from baseline at later checkpoints

### 15.a Baseline Assessment (Block 1)
1. **Assessment_Baseline_Intro** → Reviews starting numbers and Signos-noticed insights (Establishes baseline scores — completed during onboarding)
2. **CheckIn_SelfAssessment** → Rates 8 questions 1-5
3. **CheckIn_Feedback** → Reviews baseline feedback

### 15.b Mid-Program Assessment (Block 3)
1. **Assessment_MidProgram_Intro** → Reviews progress numbers compared to Block 1 (Delta indicators vs baseline)
2. **CheckIn_SelfAssessment** → Re-rates 8 questions 1-5
3. **CheckIn_Feedback** → Reviews progress feedback with comparisons

### 15.c Post-Foundation Assessment (Block 5) — Unlock Blocks 5-8
1. **WeekDetail_Block5_Locked** → Taps 'Start your check-in'
2. **Assessment_Post8_Intro** → Reviews full progress numbers and Signos insights
3. **CheckIn_SelfAssessment** → Final self-assessment quiz
4. **CheckIn_Feedback** → Reviews comprehensive feedback with full progress comparison
5. **CheckIn_FocusSelection** → Selects 1-2 focus areas to personalize Blocks 5-8 (Unlocks weeks 9-16)

## 16. CGM Toggle
**Description**: User toggles between CGM-active (blue, live graph) and CGM-off (amber, average-day graph with elevated Hunger Coach) dashboard states.
**Personas**: Active User
**Phase**: 1

1. **Home_CGM_Active** → Views live glucose graph (Blue border, LIVE badge)
2. **Home_CGM_Off** → Taps to toggle CGM Off (Amber border, elevated hunger coach, average-day graph)

## 17. Explore Insights
**Description**: User navigates the three Insights tabs to review GPAs, sensor comparisons, hunger correlations, and graduation trends.
**Personas**: Active User, Data-Driven User
**Phase**: 1

1. **Insights_Lifestyle** → Views Lifestyle GPA, Transition Readiness, hunger correlations
2. **Insights_Glucose** → Taps Glucose tab — views Glucose GPA, sensor-by-sensor comparison, glucose correlations
3. **Insights_Graduation** → Taps Graduation tab — views trend graph, score deltas, program progress

## 18. Log & Body Scanner
**Description**: User accesses the central logging hub and launches the camera-based body composition scan.
**Personas**: Active User
**Phase**: 1

1. **Log_Main** → Views logging hub (hunger, food, exercise, water, sleep, glucose, body scanner)
2. **BodyScanner** → Taps Body Scanner, starts scan, views results (body fat %, visceral fat %, lifestyle bonus)

## 19. Weekly Check-In
**Description**: Each week the app auto-prompts a check-in modal on the home screen: mood (5-emoji), confidence (1-5), biggest challenge, and education progress.
**Personas**: Active User
**Phase**: 1

1. **Home_CGM_Active** → Auto-prompted after 4 seconds (Once per week)
2. **WeeklyCheckin** → Rates mood and confidence, enters challenge text, reviews education progress
3. **Home_CGM_Active** → Submits and returns to dashboard

## 20. Settings & Program Management
**Description**: User views profile and program details, or resets the program to start fresh.
**Personas**: Active User, Tester
**Phase**: 1

1. **Settings** → Views user profile, program link, maintenance band, preferences

### 20.a View Program Details
2. **Program_Details** → Reviews detailed metrics, dose history, graduation readiness score

### 20.b Reset Program
2. **Settings** → Taps Reset program, confirms in modal (Clears all localStorage)
3. **Onboarding_Welcome** → Returns to step 0

## 21. Education Games
**Description**: User plays interactive education games from the Toolkit: Protein Guess comparison quiz and Build a Balanced Plate meal builder.
**Personas**: Active User
**Phase**: 1

1. **Toolkit_Main** → Scrolls to education games section

### 21.a Protein Guess Quiz
2. **Game_ProteinGuess** → Plays multi-round quiz: compare two foods, guess which has more protein

### 21.b Build a Balanced Plate
2. **Game_BuildBalancedPlate** → Selects protein, carb, veggie to build a meal and get scored
