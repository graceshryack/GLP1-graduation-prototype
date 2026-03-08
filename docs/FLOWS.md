# User Flows

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->
<!-- 19 flows, 96 screens — ALL screens in at least one flow -->
<!-- FORMAT: Each flow uses ## N. Flow Name heading with numbered steps and screen IDs. -->

## 1. Onboarding Flow
**Description**: New user completes 6-step onboarding: 4 info screens (welcome, about you, concerns, weight) + 1 baseline assessment page (8 questions scrollable), then reviews personalized 16-week roadmap.
**Personas**: New User
**Phase**: 1

1. **Onboarding_Welcome** → Read program overview (Introduces the 16-week GLP-1 Graduation concept)
2. **Onboarding_AboutYou** → Enter name, age, medication history (Collects profile data and activity level)
3. **Onboarding_Concerns** → Select struggles and reasons off GLP-1 (Ranked struggles shape personalized block order)
4. **Onboarding_Weight** → Enter weight and goal weight (Sets weight anchor and maintenance band)
5. **Onboarding_BaselineAssessment** → Complete all 8 baseline questions on single scrollable page (Same questions used in check-ins for progress tracking)
6. **Onboarding_PlanOverview** → Review personalized plan and tap Start (Shows 16-week roadmap with per-question feedback)

## 2. Home Screen States
**Description**: User views home in one of four states: CGM active (live glucose), CGM off (average-day graph), weight loss (progress bar), or maintenance (±3% band).
**Personas**: Active User
**Phase**: 1

1. **Home_CGM_Active** → View live glucose graph and habits (On-sensor weeks: live data, blue-bordered card)
2. **Home_CGM_Off** → View average-day glucose and hunger coach (Off-sensor weeks: average graph, elevated coach card)
3. **Home_WeightLoss** → Monitor weight trend during active loss phase (Weight graph with progress bar toward goal)
4. **Home_Maintenance** → Track weight within maintenance band (±3% band shown, maintenance-focused UI)

## 3. Toolkit & Weekly Walkthrough
**Description**: User explores the 16-week program via the Toolkit timeline, browsing each week's focus, education, CGM status, and resources.
**Personas**: Active User
**Phase**: 1

1. **Toolkit_Main** → Browse graduation timeline and education (Scrollable timeline with week goals and CGM schedule)
2. **WeekDetail_Week1_Baseline** → Tap week 1 dot (Week 1: observe and log, don't change anything)
3. **WeekDetail_Week2_Protein** → Tap week 2 dot (Protein introduction with meal choice)
4. **WeekDetail_Week3_Fiber** → Tap week 3 dot (Fiber foundation alongside protein)
5. **WeekDetail_Week5_SatietyPlate** → Tap week 5 dot (Balanced satiating meals with CGM proof)
6. **WeekDetail_Week8_Walking** → Tap week 8 dot (Post-meal walking and movement)
7. **WeekDetail_Week10_Portions** → Tap week 10 dot (Personalized focus on portions)
8. **WeekDetail_Week13_Locked** → Tap week 13 dot (locked) (Locked until Week 12 check-in complete)
9. **WeekDetail_Week16_Graduation** → Tap week 16 dot (Final assessment and graduation)

## 4. Check-In Flow (Every 4 Weeks)
**Description**: Periodic check-ins at Weeks 4, 8, 12, and 16. Each uses the same 8-question format as baseline for progress tracking. Week 12 check-in includes focus selection to unlock personalized Weeks 13–14.
**Personas**: Active User, Progressing User
**Phase**: 1

1. **CheckIn_Week4_Intro** → Begin week 4 check-in (First check-in after foundation weeks 1–3)
2. **CheckIn_SelfAssessment** → Answer 8 self-assessment questions (Same format as baseline for comparison)
3. **CheckIn_Feedback** → Review score comparison to baseline (Personalized feedback on progress areas)
4. **CheckIn_Week8_Intro** → Begin week 8 check-in (Mid-program assessment after weeks 5–7)
5. **CheckIn_Week12_Intro** → Begin week 12 check-in (Post-foundation check-in with focus selection)
6. **CheckIn_FocusSelection** → Choose 1–2 focus areas for weeks 13–14 (Personalizes remaining program based on weak spots)

## 5. Hunger Coach: Still Hungry
**Description**: User ate but is still hungry. Coach assesses timing, drills into meal composition, and differentiates physical vs hedonic hunger.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_StillHungry** → Select 'Still hungry after eating' (Scenario entry point)
3. **HungerCoach_StillHungry_Under15** → Answer: ate less than 15 min ago (Wait for satiety signals to register)
4. **HungerCoach_StillHungry_WhatAte** → Answer: ate more than 15 min ago (Review what was in the meal)
5. **HungerCoach_StillHungry_CarbHeavy** → Report carb-heavy meal (Advice to add protein and fat for satiety)
6. **HungerCoach_StillHungry_Balanced** → Report balanced meal (Explore portion size or timing factors)
7. **HungerCoach_StillHungry_StomachVsMouth** → Distinguish stomach vs mouth hunger (Physical vs psychological hunger differentiation)
8. **HungerCoach_StillHungry_Physical** → Identify physical hunger (Green light to eat more with guidance)
9. **HungerCoach_StillHungry_MouthHunger** → Identify mouth hunger (Distraction and awareness techniques)

## 6. Hunger Coach: Starving
**Description**: User is starving. Coach assesses last meal timing and provides urgency-appropriate guidance.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_Starving** → Select 'I'm starving' (Scenario for extreme hunger)
3. **HungerCoach_Starving_LongAgo** → Report last meal was 4+ hours ago (Genuine hunger — eat now with protein-first guidance)
4. **HungerCoach_Starving_Recent** → Report eating recently (Check glucose dip and meal composition)
5. **HungerCoach_Starving_Morning** → Report intense morning hunger (Normalize post-GLP-1 appetite return)

## 7. Hunger Coach: Craving
**Description**: User has a craving. Coach identifies the type (sweet/salty/rich/specific) and provides biochemically-informed strategies.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_Craving** → Select 'I'm having a craving' (Scenario for specific food cravings)
3. **HungerCoach_Craving_Sweet** → Select sweet craving (Explore blood sugar dips and healthier alternatives)
4. **HungerCoach_Craving_Salty** → Select salty craving (Check hydration and electrolyte balance)
5. **HungerCoach_Craving_Rich** → Select rich/fatty craving (Assess caloric and fat intake adequacy)
6. **HungerCoach_Craving_Specific** → Select specific food craving (Mindful indulgence approach)

## 8. Hunger Coach: HALT (Not Hungry)
**Description**: User isn't hungry but wants to eat. HALT grid identifies emotional driver: Hungry, Angry/Anxious, Lonely/Bored, or Tired.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_NotHungry** → Select 'Not hungry but want to eat' (HALT check for emotional eating triggers)
3. **HungerCoach_HALT_Hungry** → HALT reveals actual hunger (Genuine hunger confirmed, eat with guidance)
4. **HungerCoach_HALT_Angry** → HALT reveals anger/stress (Stress management tools and alternatives)
5. **HungerCoach_HALT_Lonely** → HALT reveals loneliness (Connection strategies and distraction ideas)
6. **HungerCoach_HALT_Tired** → HALT reveals tiredness (Rest-first guidance and energy tips)

## 9. Hunger Coach: Body Scan (Unsure)
**Description**: User isn't sure if hungry. Coach guides 4-step timed body scan for interoception. After scan, user identifies their state from 4 options.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_Unsure** → Select 'Not sure what I'm feeling' (Guided body scan for hunger signal identification)
3. **HungerCoach_BodyScan_Results** → Complete body scan (Summary of scan findings and recommended next step)
4. **HungerCoach_BodyScan_Physical** → Scan detects physical hunger (Physical hunger signals identified)
5. **HungerCoach_BodyScan_BoringFood** → Apply boring food test (Would you eat plain rice? Confirms true hunger)
6. **HungerCoach_BodyScan_Craving** → Scan detects craving (Craving identified rather than hunger)
7. **HungerCoach_BodyScan_StillUnsure** → Still uncertain after scan (Gentle default guidance when signals are unclear)

## 10. Hunger Coach: Unusual Time
**Description**: User is hungry at an unusual time. Coach identifies the timing pattern and provides circadian/physiological explanations.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_UnusualTime** → Select 'Hungry at an unusual time' (Scenario for unexpected hunger timing)
3. **HungerCoach_UnusualTime_LateNight** → Select late night (Assess sleep routine and evening habits)
4. **HungerCoach_UnusualTime_Afternoon** → Select afternoon slump (Check lunch composition and blood sugar)
5. **HungerCoach_UnusualTime_EarlyMorning** → Select early morning (Review dinner timing and overnight fast length)
6. **HungerCoach_UnusualTime_PostWorkout** → Select post-workout (Normalize exercise-induced hunger, refuel tips)

## 11. Hunger Coach: About To Eat
**Description**: User is about to eat and checks in. Coach assesses hunger level and provides level-specific meal pacing advice.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_AboutToEat** → Select 'About to eat — check in' (Pre-meal hunger level assessment)
3. **HungerCoach_AboutToEat_Low** → Rate hunger as low (Consider waiting or smaller portion)
4. **HungerCoach_AboutToEat_SweetSpot** → Rate hunger at sweet spot (Ideal hunger level, eat mindfully)
5. **HungerCoach_AboutToEat_High** → Rate hunger as very high (Slow-eating strategies to prevent overeating)

## 12. Hunger Coach: Post-Meal
**Description**: After eating, user reflects on fullness. Direct outcomes (just right, too full, can't tell) get targeted advice. 'Still hungry' branches into meal composition drill-down.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_PostMeal** → Select 'Just finished eating' (Post-meal fullness and satisfaction check)
3. **HungerCoach_PostMeal_JustRight** → Report feeling just right (Positive reinforcement, log the win)
4. **HungerCoach_PostMeal_TooFull** → Report feeling too full (Reflect without judgment, plan smaller next meal)
5. **HungerCoach_PostMeal_NotSure** → Report not sure about fullness (Set 20-min timer to reassess)
6. **HungerCoach_PostMeal_StillHungry** → Report still hungry after meal (Explore meal composition for gaps)
7. **HungerCoach_PostMealHungry_LowProtein** → Identify low protein in meal (Add 25g+ protein per meal next time)
8. **HungerCoach_PostMealHungry_SmallPortion** → Identify too-small portion (Adjust serving sizes for GLP-1 transition)
9. **HungerCoach_PostMealHungry_AteFast** → Identify eating too fast (Try 20-minute meal pacing technique)
10. **HungerCoach_PostMealHungry_BalancedMeal** → Report balanced but still hungry (May need larger portions during transition period)

## 13. Hunger Coach: Hunger Changing
**Description**: User's hunger patterns are shifting during GLP-1 transition. Coach identifies the type of change and provides reassurance with timelines.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_HungerChanging** → Select 'My hunger is changing' (Scenario for shifting hunger patterns during tapering)
3. **HungerCoach_HungerChanging_MoreHungry** → Report increasing appetite (Normalize post-GLP-1 appetite return, build habits)
4. **HungerCoach_HungerChanging_LessHungry** → Report still-suppressed appetite (Ensure adequate nutrition and caloric intake)
5. **HungerCoach_HungerChanging_Unpredictable** → Report erratic hunger signals (Tracking strategies and pattern-finding)
6. **HungerCoach_HungerChanging_DifferentType** → Report hunger feels different (Relearn hunger signals post-medication)

## 14. Hunger Coach: Teach Me
**Description**: User wants to learn about hunger science. Coach presents mini-lesson library.
**Personas**: Active User, Curious Learner
**Phase**: 1

1. **HungerCoach_Landing** → Open Hunger Coach (Personalized landing with stats and glucose context)
2. **HungerCoach_Scenario_TeachMe** → Select 'Teach me about hunger' (Mini-lesson library with 5 deep-dive hunger science topics)

## 15. Coach Follow-Up Outcomes
**Description**: After any coach response, user reports what happened. Coach provides positive reinforcement regardless of outcome.
**Personas**: Active User
**Phase**: 1

1. **HungerCoach_Outcome_Paused** → Report: I paused before eating (Reinforces the pause-and-check habit)
2. **HungerCoach_Outcome_AteIntentional** → Report: I ate intentionally (Positive reinforcement for mindful eating)
3. **HungerCoach_Outcome_Satisfied** → Report: I feel satisfied (Session completed successfully)
4. **HungerCoach_Outcome_LearnMore** → Request deeper education (Links to relevant education modules)

## 16. Insights
**Description**: User navigates the three Insights tabs to review GPAs, sensor comparisons, and graduation trends.
**Personas**: Active User, Data-Driven User
**Phase**: 1

1. **Insights_Lifestyle** → View Lifestyle tab (Habit scores, streaks, and trend graphs)
2. **Insights_Glucose** → View Glucose tab (Sensor comparisons, time-in-range, glucose GPA)
3. **Insights_Graduation** → View Graduation tab (Criteria tracking dashboard and readiness score)

## 17. Education & Games
**Description**: User reads education articles and plays interactive games from the Toolkit.
**Personas**: Active User
**Phase**: 1

1. **Education_CGM_Basics** → Read CGM Basics article (Foundational education on continuous glucose monitoring)
2. **Education_Protein_Anchor** → Read Protein Anchor article (Protein's role in satiety and muscle during GLP-1 transition)
3. **Education_Walking_Glucose** → Read Walking & Glucose article (Evidence for post-meal walking on glucose response)
4. **Game_ProteinGuess** → Play Protein Guess game (Interactive quiz on protein content in meals)
5. **Game_BuildBalancedPlate** → Play Build Balanced Plate game (Assemble a satiating plate with correct macros)

## 18. Daily Log
**Description**: User accesses the central logging hub, completes hunger check-in, runs body scan, and weekly review.
**Personas**: Active User
**Phase**: 1

1. **Log_Main** → Open daily log (Central logging hub for all daily tracking)
2. **HungerQuestionnaire** → Complete hunger check-in (Rate hunger/fullness with glucose-aware feedback)
3. **BodyScanner** → Run body composition scan (Camera-based body scan for progress photos)
4. **WeeklyCheckin** → Complete weekly review (End-of-week habit reflection and summary)

## 19. Settings & Program Details
**Description**: User views profile and program details, or resets the program to start fresh.
**Personas**: Active User, Tester
**Phase**: 1

1. **Settings** → Open settings (Profile, preferences, and program management)
2. **Program_Details** → View program details (Dose history, metrics, and graduation readiness)
