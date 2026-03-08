# Screen Registry (96 screens)

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->
<!-- FORMAT: Each screen uses ## ScreenId heading with **bold key**: value fields. -->
<!-- ProtoFlow parses this format to generate Figma UX flows. -->

## Onboarding (6)

### Onboarding_Welcome
- **Name**: Onboarding — Welcome
- **Purpose**: Program overview and value proposition for new users
- **Annotations**: First screen for new users, Step 1 of 6

### Onboarding_AboutYou
- **Name**: Onboarding — About You
- **Purpose**: Collect name, age, medication history, and activity level
- **Annotations**: Step 2 of 6, Combines profile and medication into one screen

### Onboarding_Concerns
- **Name**: Onboarding — Concerns
- **Purpose**: Identify user struggles and reasons for coming off GLP-1
- **Annotations**: Step 3 of 6, Ranked struggles shape personalized weeks

### Onboarding_Weight
- **Name**: Onboarding — Weight & Goals
- **Purpose**: Collect current weight, goal weight, and body metrics
- **Annotations**: Step 4 of 6, Sets weight anchor and maintenance band

### Onboarding_BaselineAssessment
- **Name**: Onboarding — Baseline Assessment
- **Purpose**: All 8 baseline self-assessment questions on a single scrollable page (rated 1–5 each)
- **Annotations**: Step 5 of 6, Same questions used in check-ins for progress tracking

### Onboarding_PlanOverview
- **Name**: Onboarding — Your Personalized Plan
- **Purpose**: Show personalized 16-week roadmap and per-question feedback
- **Annotations**: Step 6 of 6, Start your graduation button

## Home (4)

### Home_CGM_Active
- **Name**: Home — CGM Active
- **Purpose**: Dashboard with live CGM graph, graduation card, hunger coach, GPA strip
- **Annotations**: Blue border, LIVE badge, Primary dashboard state during CGM weeks

### Home_CGM_Off
- **Name**: Home — CGM Off
- **Purpose**: Dashboard with average daily glucose graph, elevated hunger coach
- **Annotations**: Amber border, OFF badge, Hunger coach elevated as primary signal, Next sensor countdown shown

### Home_WeightLoss
- **Name**: Home — Weight Loss
- **Purpose**: Home state during active weight-loss phase with progress bar toward goal
- **Annotations**: "Still Losing" mode, Progress bar toward goal weight

### Home_Maintenance
- **Name**: Home — Maintenance
- **Purpose**: Home state during maintenance phase with ±3% band tracking
- **Annotations**: "Maintenance" mode, ±3% band with graph

## Toolkit (1)

### Toolkit_Main
- **Name**: Graduation Toolkit
- **Purpose**: Current week's focus prominent, resources (recipes, food lists, exercise guides) tied to focus, CGM sensor schedule, weight progress/band, scrollable 16-week list
- **Annotations**: Resources change with each week's focus, CGM schedule visible

## Week Details (8)

### WeekDetail_Week1_Baseline
- **Name**: Week 1 — Baseline
- **Purpose**: Know your baseline: observe glucose patterns, log meals and hunger with CGM
- **Annotations**: CGM active, Don't change anything yet

### WeekDetail_Week2_Protein
- **Name**: Week 2 — Protein Foundation
- **Purpose**: Protein-at-every-meal introduction with meal choice (Breakfast/Lunch/Dinner)
- **Annotations**: CGM active, Weekly choice mechanism

### WeekDetail_Week3_Fiber
- **Name**: Week 3 — Add Fiber
- **Purpose**: Add fiber foundation alongside protein with method choice
- **Annotations**: Weekly choice mechanism

### WeekDetail_Week5_SatietyPlate
- **Name**: Week 5 — Satiety Plate
- **Purpose**: Complete the satiating plate with CGM validation
- **Annotations**: CGM active, Balanced meal building

### WeekDetail_Week8_Walking
- **Name**: Week 8 — Post-Meal Walking
- **Purpose**: Post-meal walking and movement habits with CGM
- **Annotations**: CGM active, Check-in week

### WeekDetail_Week10_Portions
- **Name**: Week 10 — Portion Intuition
- **Purpose**: Personalized focus on portion awareness
- **Annotations**: Off-CGM week

### WeekDetail_Week13_Locked
- **Name**: Week 13 — Locked
- **Purpose**: Locked state until Week 12 check-in complete (unlocks personalized weeks)
- **Annotations**: Start your check-in button, Unlocks after Week 12 focus selection

### WeekDetail_Week16_Graduation
- **Name**: Week 16 — Graduation
- **Purpose**: Final CGM comparison and graduation criteria check
- **Annotations**: CGM active, Final check-in

## Check-Ins (6)

### CheckIn_Week4_Intro
- **Name**: Check-In — Week 4 Intro
- **Purpose**: Introduction to first post-foundation self-assessment
- **Annotations**: First check-in after Weeks 1–3

### CheckIn_Week8_Intro
- **Name**: Check-In — Week 8 Intro
- **Purpose**: Introduction to mid-program self-assessment
- **Annotations**: Second check-in after Weeks 5–7

### CheckIn_Week12_Intro
- **Name**: Check-In — Week 12 Intro
- **Purpose**: Introduction to post-foundation check-in with focus selection
- **Annotations**: Unlocks personalized Weeks 13–14

### CheckIn_SelfAssessment
- **Name**: Check-In — Self-Assessment
- **Purpose**: 8-question self-assessment (rated 1–5) matching baseline format
- **Annotations**: Same questions across all check-in points for progress tracking

### CheckIn_Feedback
- **Name**: Check-In — Feedback
- **Purpose**: Personalized feedback comparing scores to baseline
- **Annotations**: Color-coded progress bars, per-question feedback

### CheckIn_FocusSelection
- **Name**: Check-In — Focus Selection
- **Purpose**: Choose 1–2 focus areas for personalized Weeks 13–14
- **Annotations**: Unlocks weeks 13–16, Signos recommends lowest-scoring areas

## Log (1)

### Log_Main
- **Name**: Daily Log
- **Purpose**: Central logging hub: hunger, body scanner, food, exercise, water, sleep, glucose
- **Annotations**: Hunger check-in is primary CTA

## Hunger Questionnaire (1)

### HungerQuestionnaire
- **Name**: Hunger Check-In
- **Purpose**: Daily hunger/fullness rating (1-5) with glucose-aware feedback
- **Annotations**: Post-submit glucose insight card, Links to Hunger Coach on high hunger

## Hunger Coach (57)

### HungerCoach_Landing
- **Name**: Hunger Coach — Landing
- **Purpose**: Personalized greeting, glucose card, stats, strategy card, scenario selection
- **Annotations**: Adapts greeting based on hunger trends, Surfaces best strategy from history

### HungerCoach_Scenario_StillHungry
- **Name**: Hunger Coach — Still Hungry After Eating
- **Purpose**: Scenario entry: user ate but still feels hungry
- **Annotations**: Reactive scenario, When did you last eat?

### HungerCoach_StillHungry_Under15
- **Name**: Still Hungry — Under 15 Min
- **Purpose**: Ate less than 15 minutes ago — wait for satiety signals
- **Annotations**: 10-minute wait timer, Vagus nerve explanation

### HungerCoach_StillHungry_WhatAte
- **Name**: Still Hungry — What You Ate
- **Purpose**: Follow-up branching: meal composition assessment
- **Annotations**: 3 options: carb heavy, had protein, balanced

### HungerCoach_StillHungry_CarbHeavy
- **Name**: Still Hungry — Carb Heavy
- **Purpose**: Explains reactive hypoglycemia from carb-heavy meals
- **Annotations**: CGM correlation insight, Protein-first strategy

### HungerCoach_StillHungry_Balanced
- **Name**: Still Hungry — Balanced Meal
- **Purpose**: Balanced meal but still hungry — may need larger portions
- **Annotations**: Under-eating risk awareness

### HungerCoach_StillHungry_StomachVsMouth
- **Name**: Still Hungry — Stomach vs Mouth
- **Purpose**: Physical hunger vs hedonic hunger differentiation
- **Annotations**: 2 options: physical hunger vs mouth/brain hunger

### HungerCoach_StillHungry_Physical
- **Name**: Still Hungry — Physical
- **Purpose**: Confirms physical hunger — advises protein-forward snack
- **Annotations**: Trust the signal messaging

### HungerCoach_StillHungry_MouthHunger
- **Name**: Still Hungry — Mouth Hunger
- **Purpose**: Identifies mouth/brain hunger — suggests flavor reset
- **Annotations**: 10-minute timer, Hedonic hunger explanation

### HungerCoach_Scenario_Starving
- **Name**: Hunger Coach — Starving
- **Purpose**: Scenario entry: user feels extremely hungry
- **Annotations**: Reactive scenario, 3 options: 4+ hrs, 2-4 hrs, just woke up

### HungerCoach_Starving_LongAgo
- **Name**: Starving — Ate Long Ago
- **Purpose**: Urgent refuel guidance for 4+ hour gap — eat now, lead with protein
- **Annotations**: 20-minute meal timer, Set meal alarm for tomorrow

### HungerCoach_Starving_Recent
- **Name**: Starving — Ate Recently
- **Purpose**: Intense hunger 2-4 hrs after eating — likely meal composition issue
- **Annotations**: Protein-rich bridge snack, CGM verification suggestion

### HungerCoach_Starving_Morning
- **Name**: Starving — Morning Hunger
- **Purpose**: Morning hunger as positive sign of metabolic recovery post-GLP-1
- **Annotations**: Positive framing, Protein-forward breakfast advice

### HungerCoach_Scenario_Craving
- **Name**: Hunger Coach — Craving
- **Purpose**: Scenario entry: user is experiencing a specific food craving
- **Annotations**: Reactive scenario, 4 options: sweet, salty, rich, specific food

### HungerCoach_Craving_Sweet
- **Name**: Craving — Sweet
- **Purpose**: Sweet craving as glucose dip signal — berries + yogurt, dark chocolate alternatives
- **Annotations**: CGM correlation, Protein-pairing strategy

### HungerCoach_Craving_Salty
- **Name**: Craving — Salty
- **Purpose**: Salt craving as dehydration/stress signal — water first, crunchy alternatives
- **Annotations**: Jaw tension stress-relief explanation

### HungerCoach_Craving_Rich
- **Name**: Craving — Rich/Fatty
- **Purpose**: Rich food craving as dietary fat deficiency — healthy fat integration
- **Annotations**: Gastric emptying explanation

### HungerCoach_Craving_Specific
- **Name**: Craving — Specific Food
- **Purpose**: Hedonic reward-driven fixation — 10-minute rule with timer
- **Annotations**: 10-minute timer, Flexible restraint 80/20 approach

### HungerCoach_Scenario_NotHungry
- **Name**: Hunger Coach — HALT Check
- **Purpose**: Not hungry but want to eat — HALT grid for emotional driver identification
- **Annotations**: 2x2 HALT grid: H-A-L-T

### HungerCoach_HALT_Hungry
- **Name**: HALT — Actually Hungry
- **Purpose**: User thought they weren't hungry but may have low-level physical hunger
- **Annotations**: Hunger scale check, Trust recalibrating signals

### HungerCoach_HALT_Angry
- **Name**: HALT — Angry/Stressed
- **Purpose**: Cortisol-driven stress eating — box breathing and 10-minute timer
- **Annotations**: Box breathing 4-4-4-4, 10-minute timer

### HungerCoach_HALT_Lonely
- **Name**: HALT — Lonely
- **Purpose**: Dopamine-seeking boredom eating — social connection and environment change
- **Annotations**: 10-minute timer, 35% of non-hunger eating stat

### HungerCoach_HALT_Tired
- **Name**: HALT — Tired
- **Purpose**: Fatigue-mimicked hunger — ghrelin/leptin disruption from sleep debt
- **Annotations**: 20-min nap recommendation, 300 calorie snacking stat

### HungerCoach_Scenario_Unsure
- **Name**: Hunger Coach — Body Scan Start
- **Purpose**: Guided body scan initiation for users unsure if physically hungry
- **Annotations**: 4-step timed body scan, Interoception exercise

### HungerCoach_BodyScan_Results
- **Name**: Body Scan — Results
- **Purpose**: Post-scan assessment: 4 options based on body awareness during scan
- **Annotations**: Physical yes / boring food / only indulgent / still unsure

### HungerCoach_BodyScan_Physical
- **Name**: Body Scan — Physical Hunger
- **Purpose**: Physical signals confirmed — eat with protein, eat mindfully
- **Annotations**: Gut and hypothalamus signal explanation

### HungerCoach_BodyScan_BoringFood
- **Name**: Body Scan — Boring Food Test
- **Purpose**: Boring food test passed, body needs fuel
- **Annotations**: Hedonic vs physical distinction

### HungerCoach_BodyScan_Craving
- **Name**: Body Scan — Craving Detected
- **Purpose**: Indulgent-only desire identified as hedonic — 10-15 min wait strategy
- **Annotations**: 10-minute timer, Craving peak at 5-7 min stat

### HungerCoach_BodyScan_StillUnsure
- **Name**: Body Scan — Still Unsure
- **Purpose**: Uncertainty persists, wait 15 min then eat if still thinking about food
- **Annotations**: 15-minute timer, Interoception skill building

### HungerCoach_Scenario_UnusualTime
- **Name**: Hunger Coach — Unusual Time
- **Purpose**: Off-schedule hunger: When is this happening?
- **Annotations**: 4 options: late night, afternoon, early morning, post-workout

### HungerCoach_UnusualTime_LateNight
- **Name**: Unusual Time — Late Night
- **Purpose**: Nighttime eating is usually habit/fatigue/wind-down — brush teeth, herbal tea
- **Annotations**: Kitchen closes at 8pm rule, Overnight glucose impact

### HungerCoach_UnusualTime_Afternoon
- **Name**: Unusual Time — Afternoon
- **Purpose**: Circadian 2-4pm dip — preventive protein snack and light exposure
- **Annotations**: Suprachiasmatic nucleus explanation, Lunch protein check

### HungerCoach_UnusualTime_EarlyMorning
- **Name**: Unusual Time — Early Morning
- **Purpose**: Early hunger as metabolic recovery sign — eat when hungry, protein-heavy
- **Annotations**: Positive framing, Ghrelin cycling explanation

### HungerCoach_UnusualTime_PostWorkout
- **Name**: Unusual Time — Post-Workout
- **Purpose**: Post-exercise hunger is legitimate — eat within 30-60 min recovery window
- **Annotations**: Anabolic window, 20-30g protein recommendation

### HungerCoach_Scenario_AboutToEat
- **Name**: Hunger Coach — About to Eat
- **Purpose**: Pre-meal coaching: What's your hunger level?
- **Annotations**: Proactive scenario, 3 hunger levels: 1-2, 3, 4-5

### HungerCoach_AboutToEat_Low
- **Name**: About to Eat — Low Hunger
- **Purpose**: Eating by schedule/socially — protein-dense smaller meal, don't skip
- **Annotations**: 20-minute meal timer, Lean mass protection messaging

### HungerCoach_AboutToEat_SweetSpot
- **Name**: About to Eat — Sweet Spot
- **Purpose**: Ideal hunger for mindful eating — protein first, 20-min pace, stop at 3-4 fullness
- **Annotations**: 20-minute meal timer, Executive control messaging

### HungerCoach_AboutToEat_High
- **Name**: About to Eat — Very Hungry
- **Purpose**: High hunger management — water first, protein first, fork-down technique
- **Annotations**: 20-minute meal timer, Ghrelin surge override explanation

### HungerCoach_Scenario_PostMeal
- **Name**: Hunger Coach — Post-Meal Check
- **Purpose**: Post-meal reflection: How do you feel after eating?
- **Annotations**: Proactive scenario, 4 options: still hungry, just right, too full, can't tell

### HungerCoach_PostMeal_JustRight
- **Name**: Post-Meal — Just Right
- **Purpose**: Celebrates landing at satisfied — note the meal composition, track the win
- **Annotations**: Strategy tracking, Template meal concept

### HungerCoach_PostMeal_TooFull
- **Name**: Post-Meal — Too Full
- **Purpose**: Overshoot as data not failure — don't skip next meal, gentle walk
- **Annotations**: Anti-restrict-binge cycle messaging

### HungerCoach_PostMeal_NotSure
- **Name**: Post-Meal — Not Sure
- **Purpose**: Vagus nerve fullness delay — 15-minute wait timer
- **Annotations**: 15-minute timer, Vagus nerve slow communicator

### HungerCoach_PostMeal_StillHungry
- **Name**: Post-Meal — Still Hungry
- **Purpose**: Follow-up branching to meal composition assessment
- **Annotations**: 4 options: low protein, small portion, ate fast, balanced

### HungerCoach_PostMealHungry_LowProtein
- **Name**: Post-Meal Hungry — Low Protein
- **Purpose**: Carb-heavy meal missing satiety anchor — protein-first strategy for next meal
- **Annotations**: CCK/PYY/GLP-1 hormone explanation, Strategy tracking

### HungerCoach_PostMealHungry_SmallPortion
- **Name**: Post-Meal Hungry — Small Portion
- **Purpose**: Portions may be too small during GLP-1 transition — increase without guilt
- **Annotations**: Metabolic rate protection, Strategy tracking

### HungerCoach_PostMealHungry_AteFast
- **Name**: Post-Meal Hungry — Ate Fast
- **Purpose**: Brain didn't have time to catch up — 15-min wait, 20-min meal timer for next meal
- **Annotations**: 15-minute timer, Fullness hormone 25-30% increase at slower pace

### HungerCoach_PostMealHungry_BalancedMeal
- **Name**: Post-Meal Hungry — Balanced Meal
- **Purpose**: Genuine hunger after balanced meal — trust the signal, may need larger portions
- **Annotations**: Intuitive eating foundation, Strategy tracking

### HungerCoach_Scenario_HungerChanging
- **Name**: Hunger Coach — Hunger Changing
- **Purpose**: Medication transition: What feels different about your hunger?
- **Annotations**: Learn scenario, 4 options: more, less, unpredictable, different type

### HungerCoach_HungerChanging_MoreHungry
- **Name**: Hunger Changing — More Hungry
- **Purpose**: Ghrelin rebound explanation — temporary overshoot, protein + fiber + structure defense
- **Annotations**: 4-8 week normalization timeline, Compassion messaging

### HungerCoach_HungerChanging_LessHungry
- **Name**: Hunger Changing — Less Hungry
- **Purpose**: Low appetite during transition — protect muscle with structured protein meals
- **Annotations**: 1.2-1.6g/kg protein recommendation, Lean mass loss warning

### HungerCoach_HungerChanging_Unpredictable
- **Name**: Hunger Changing — Unpredictable
- **Purpose**: Fluctuating hunger as hypothalamus recalibration — consistent meal timing anchors rhythm
- **Annotations**: Circadian eating explanation, 3-6 week smoothing timeline

### HungerCoach_HungerChanging_DifferentType
- **Name**: Hunger Changing — Different Type
- **Purpose**: Developing hunger literacy — 5 types of hunger framework
- **Annotations**: Stomach/mouth/eye/heart/habit hunger, Interoception skill

### HungerCoach_Scenario_TeachMe
- **Name**: Hunger Coach — Teach Me About Hunger
- **Purpose**: Educational entry point to mini-lesson library
- **Annotations**: Learn scenario, 5 mini-lessons accessible

### HungerCoach_Outcome_Paused
- **Name**: Coach Outcome — Paused
- **Purpose**: Follow-up after user reports the urge passed — reinforces awareness skill
- **Annotations**: Green success card, Neural pathway strengthening message

### HungerCoach_Outcome_AteIntentional
- **Name**: Coach Outcome — Ate Intentionally
- **Purpose**: Follow-up after user ate deliberately — celebrates conscious decision-making
- **Annotations**: Green success card, Deliberate vs reactive eating distinction

### HungerCoach_Outcome_Satisfied
- **Name**: Coach Outcome — Satisfied
- **Purpose**: Ate and feels satisfied, perfect hunger-response cycle
- **Annotations**: Green success card, Reference point

### HungerCoach_Outcome_LearnMore
- **Name**: Coach Outcome — Learn More
- **Purpose**: Curiosity outcome, surfaces mini-lesson library for deeper learning
- **Annotations**: Accent card, Mini-lesson buttons

## Weekly Check-In (1)

### WeeklyCheckin
- **Name**: Weekly Check-In
- **Purpose**: Weekly mood, confidence rating, challenge journal, and education progress modal
- **Annotations**: 5-emoji mood scale, 1-5 confidence rating, Free-text challenge input

## Insights (3)

### Insights_Lifestyle
- **Name**: Insights — Lifestyle Tab
- **Purpose**: Lifestyle GPA, Transition Readiness, hunger-lifestyle correlations
- **Annotations**: GPA detail modals with component drill-down

### Insights_Glucose
- **Name**: Insights — Glucose Tab
- **Purpose**: Glucose GPA, sensor comparison graph, hunger-glucose correlations
- **Annotations**: Overlaid glucose curves across sensor periods, CGM Off note during non-sensor weeks

### Insights_Graduation
- **Name**: Insights — Graduation Tab
- **Purpose**: Graduation trend graph, score summary, hunger-progress correlations
- **Annotations**: Week-by-week GPA scores with delta tracking

## Education (3)

### Education_CGM_Basics
- **Name**: Education — CGM Basics
- **Purpose**: Foundation module: What is a CGM?
- **Annotations**: Glucose & CGM section, 1-3 minute read

### Education_Protein_Anchor
- **Name**: Education — Protein Anchor
- **Purpose**: Foundation module: Protein as your anchor
- **Annotations**: Nutrition section, 1-3 minute read

### Education_Walking_Glucose
- **Name**: Education — Walking & Glucose
- **Purpose**: Foundation module: Post-meal walking for glucose management
- **Annotations**: Exercise section, 1-3 minute read

## Games (2)

### Game_ProteinGuess
- **Name**: Game — Protein Guess
- **Purpose**: Quiz: Compare two foods, which has more protein?
- **Annotations**: Multi-round with immediate feedback

### Game_BuildBalancedPlate
- **Name**: Game — Build Balanced Plate
- **Purpose**: Builder: Select protein, carb, and veggie to construct a meal
- **Annotations**: Three-step selection with scoring

## Settings (1)

### Settings
- **Name**: Settings
- **Purpose**: User profile display, program details, reset program
- **Annotations**: Reset button clears all data, Shows onboarding profile data

## Program Details (1)

### Program_Details
- **Name**: Program Details
- **Purpose**: Detailed program metrics, dose history, graduation readiness
- **Annotations**: Accessed from Settings

## Body Scanner (1)

### BodyScanner
- **Name**: Body Scanner
- **Purpose**: Camera-based body composition scan (mock)
- **Annotations**: Results: body fat %, visceral fat %, lifestyle bonus
