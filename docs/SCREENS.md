# Screen Registry (97 screens)

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->
<!-- FORMAT: Each screen uses ## ScreenId heading with **bold key**: value fields. -->
<!-- ProtoFlow parses this format to generate Figma UX flows. -->

## Onboarding

### Onboarding_Welcome
- **Name**: Onboarding — Welcome
- **Purpose**: Program overview and start button
- **Annotations**: First screen for new users, Step 0 of 18

### Onboarding_NameAge
- **Name**: Onboarding — Name & Age
- **Purpose**: Collect user name and age
- **Annotations**: Step 1 of 18

### Onboarding_Medication
- **Name**: Onboarding — Medication History
- **Purpose**: Medication type, duration, and current status
- **Annotations**: Step 2 of 18

### Onboarding_WhyOffGLP1
- **Name**: Onboarding — Why Coming Off GLP-1
- **Purpose**: Multi-select reasons for discontinuing medication
- **Annotations**: Step 3 of 18

### Onboarding_BodyActivity
- **Name**: Onboarding — Body & Activity
- **Purpose**: Weight, goal weight, height, activity level
- **Annotations**: Step 4 of 18

### Onboarding_Goals
- **Name**: Onboarding — Goals
- **Purpose**: Multi-select goals for the program
- **Annotations**: Step 5 of 18

### Onboarding_PreStruggles
- **Name**: Onboarding — Pre-GLP-1 Struggles
- **Purpose**: Multi-select struggles before medication
- **Annotations**: Step 6 of 18

### Onboarding_CurrentStruggles
- **Name**: Onboarding — Current Struggles
- **Purpose**: Ranked multi-select struggles that shape block order
- **Annotations**: Step 7 of 18, Directly determines personalized block ordering

### Onboarding_StrengthTraining
- **Name**: Onboarding — Strength Training
- **Purpose**: Strength training experience level (6 options)
- **Annotations**: Step 8 of 18

### Onboarding_AssessmentQ1
- **Name**: Onboarding — Assessment Question 1
- **Purpose**: Baseline self-assessment quiz (rated 1-5)
- **Annotations**: Step 9 of 18, Same questions used in mid-program and post-program check-ins

### Onboarding_AssessmentQ5
- **Name**: Onboarding — Assessment Question 5
- **Purpose**: Mid-point of baseline assessment quiz
- **Annotations**: Step 13 of 18

### Onboarding_PersonalizedProgram
- **Name**: Onboarding — Your Personalized Program
- **Purpose**: Shows personalized 16-week roadmap and per-question feedback
- **Annotations**: Step 17 of 18, Start your graduation button

## Home

### Home_CGM_Active
- **Name**: Home — CGM Active
- **Purpose**: Dashboard with live CGM graph, graduation card, hunger coach, GPA strip
- **Annotations**: Blue border, LIVE badge, Primary dashboard state during CGM blocks

### Home_CGM_Off
- **Name**: Home — CGM Off
- **Purpose**: Dashboard with average daily glucose graph, elevated hunger coach
- **Annotations**: Amber border, OFF badge, Hunger coach elevated as primary signal, Next sensor countdown shown

## Toolkit & Blocks

### Toolkit_Main
- **Name**: Graduation Toolkit
- **Purpose**: Education hub with scrollable timeline, core principles, block goal, education sections
- **Annotations**: 16 week dots in 8 block containers, CGM indicators on sensor blocks, Blocks 5-8 locked until check-in

### WeekDetail_Block1_Baseline
- **Name**: Block 1 Detail — Baseline
- **Purpose**: Block 1 goal: Observe food responses, activity, sleep, hunger with CGM
- **Annotations**: Fixed block (not reordered), Includes baseline assessment card

### WeekDetail_Block2_Nutrition
- **Name**: Block 2 Detail — Nutrition
- **Purpose**: Nutrition-focused block: protein and fiber goals
- **Annotations**: Personalized order based on struggles, Off-CGM block

### WeekDetail_Block3_Movement
- **Name**: Block 3 Detail — Movement
- **Purpose**: Movement block: walking, steps, resistance training with CGM
- **Annotations**: Fixed block (not reordered), Includes mid-program assessment card, CGM validates movement impact on glucose

### WeekDetail_Block4_FullSystem
- **Name**: Block 4 Detail — Full System
- **Purpose**: Satiating meals, sleep, and stress with all habits maintained
- **Annotations**: Personalized order based on struggles, Off-CGM block

### WeekDetail_Block5_Locked
- **Name**: Block 5 Detail — Locked
- **Purpose**: Locked state showing check-in prompt for Blocks 5-8
- **Annotations**: Start your check-in button, Unlocks after post-Block-4 assessment

## Check-In Flow

### Assessment_Baseline_Intro
- **Name**: Assessment — Baseline (Block 1)
- **Purpose**: Baseline self-assessment establishing starting point with numbers and insights
- **Annotations**: Integrated into onboarding, Same 4-step flow as mid and post

### Assessment_MidProgram_Intro
- **Name**: Assessment — Mid-Program (Block 3)
- **Purpose**: Mid-program check-in measuring progress against baseline
- **Annotations**: Compares to Block 1 scores

### Assessment_Post8_Intro
- **Name**: Assessment — Post-Foundation (Block 5)
- **Purpose**: Full check-in with progress insights unlocking Blocks 5-8
- **Annotations**: Step 1 of 4: Your Numbers + What Signos Noticed

### CheckIn_SelfAssessment
- **Name**: Check-In — Self-Assessment Quiz
- **Purpose**: 8-question self-assessment rated 1-5 across hunger, nutrition, exercise, sleep, glucose, weight, stress, muscle
- **Annotations**: Step 2 of 4, Same questions across all check-in points

### CheckIn_Feedback
- **Name**: Check-In — Personalized Feedback
- **Purpose**: Per-question feedback with progress bars, ranked area summary, and weak-area identification
- **Annotations**: Step 3 of 4, Color-coded progress bars (red/yellow/green), Shows personalized text based on score tier

### CheckIn_FocusSelection
- **Name**: Check-In — Choose Your Focus
- **Purpose**: User selects 1-2 focus areas for Blocks 5-8 based on assessment results
- **Annotations**: Step 4 of 4, Signos recommends lowest-scoring areas, Unlocks weeks 9-16

## Log & Hunger Questionnaire

### Log_Main
- **Name**: Log
- **Purpose**: Central logging hub: hunger, body scanner, food, exercise, water, sleep, glucose
- **Annotations**: Hunger check-in is primary CTA

### HungerQuestionnaire
- **Name**: Hunger Check-In
- **Purpose**: Daily hunger/fullness rating (1-5) with glucose-aware feedback
- **Annotations**: Post-submit glucose insight card, Links to Hunger Coach on high hunger

## Hunger Coach Landing

### HungerCoach_Landing
- **Name**: Hunger Coach — Landing
- **Purpose**: Personalized greeting, glucose card, stats, strategy card, scenario selection
- **Annotations**: Adapts greeting based on hunger trends, Surfaces best strategy from history

## Still Hungry Branch

### HungerCoach_Scenario_StillHungry
- **Name**: Hunger Coach — Still Hungry
- **Purpose**: Post-meal hunger scenario: When did you last eat?
- **Annotations**: Reactive scenario, 3 options: <15 min, 15-30 min, >30 min

### HungerCoach_StillHungry_Under15
- **Name**: Still Hungry — Give Your Brain Time
- **Purpose**: Advice for users who ate less than 15 minutes ago — fullness signals haven't arrived
- **Annotations**: 10-minute wait timer, Vagus nerve explanation

### HungerCoach_StillHungry_WhatAte
- **Name**: Still Hungry — What Did You Eat?
- **Purpose**: Follow-up branching: meal composition assessment for 15-30 min post-meal hunger
- **Annotations**: 3 options: carb heavy, had protein, balanced

### HungerCoach_StillHungry_CarbHeavy
- **Name**: Still Hungry — Glucose Spike-Crash
- **Purpose**: Explains reactive hypoglycemia from carb-heavy meals and recommends protein snack
- **Annotations**: CGM correlation insight, Protein-first strategy

### HungerCoach_StillHungry_Balanced
- **Name**: Still Hungry — Portion Adjustment
- **Purpose**: Balanced meal but still hungry — may need larger portions as appetite returns post-GLP-1
- **Annotations**: Under-eating risk awareness

### HungerCoach_StillHungry_StomachVsMouth
- **Name**: Still Hungry — Stomach or Mouth?
- **Purpose**: Physical hunger vs hedonic hunger differentiation for >30 min post-meal hunger
- **Annotations**: 2 options: physical hunger vs mouth/brain hunger

### HungerCoach_StillHungry_Physical
- **Name**: Still Hungry — Real Hunger
- **Purpose**: Confirms physical hunger — advises protein-forward snack and portion tracking
- **Annotations**: Trust the signal messaging

### HungerCoach_StillHungry_MouthHunger
- **Name**: Still Hungry — Hedonic Hunger
- **Purpose**: Identifies mouth/brain hunger — suggests flavor reset and environment change
- **Annotations**: 10-minute timer, Nucleus accumbens vs hypothalamus explanation

## Starving Branch

### HungerCoach_Scenario_Starving
- **Name**: Hunger Coach — Starving
- **Purpose**: Intense hunger scenario: When was your last meal?
- **Annotations**: Reactive scenario, 3 options: 4+ hrs, 2-4 hrs, just woke up

### HungerCoach_Starving_LongAgo
- **Name**: Starving — Waited Too Long
- **Purpose**: Urgent refuel guidance for 4+ hour gap — eat now, lead with protein
- **Annotations**: 20-minute meal timer, Set meal alarm for tomorrow

### HungerCoach_Starving_Recent
- **Name**: Starving — Recent Meal Issue
- **Purpose**: Intense hunger 2-4 hrs after eating — likely meal composition issue
- **Annotations**: Protein-rich bridge snack, CGM verification suggestion

### HungerCoach_Starving_Morning
- **Name**: Starving — Morning Hunger
- **Purpose**: Morning hunger as a positive sign of metabolic recovery post-GLP-1
- **Annotations**: Positive framing, Protein-forward breakfast advice

## Craving Branch

### HungerCoach_Scenario_Craving
- **Name**: Hunger Coach — Craving
- **Purpose**: Craving scenario: What are you craving?
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
- **Name**: Craving — Specific Food Fixation
- **Purpose**: Hedonic reward-driven fixation — 10-minute rule with timer
- **Annotations**: 10-minute timer, Flexible restraint 80/20 approach

## HALT Branch

### HungerCoach_Scenario_NotHungry
- **Name**: Hunger Coach — HALT Check
- **Purpose**: Not hungry but want to eat — HALT grid for emotional driver identification
- **Annotations**: 2x2 HALT grid: H-A-L-T

### HungerCoach_HALT_Hungry
- **Name**: HALT — Actually Hungry (H)
- **Purpose**: User thought they weren't hungry but may have low-level physical hunger post-GLP-1
- **Annotations**: Hunger scale check, Trust recalibrating signals

### HungerCoach_HALT_Angry
- **Name**: HALT — Angry/Anxious/Stressed (A)
- **Purpose**: Cortisol-driven stress eating — box breathing and 10-minute timer
- **Annotations**: Box breathing 4-4-4-4, 10-minute timer, Parasympathetic activation

### HungerCoach_HALT_Lonely
- **Name**: HALT — Lonely/Bored (L)
- **Purpose**: Dopamine-seeking boredom eating — social connection and environment change
- **Annotations**: 10-minute timer, 35% of non-hunger eating stat

### HungerCoach_HALT_Tired
- **Name**: HALT — Tired/Exhausted (T)
- **Purpose**: Fatigue-mimicked hunger — ghrelin/leptin disruption from sleep debt
- **Annotations**: 20-min nap recommendation, 300 calorie snacking stat

## Body Scan Branch

### HungerCoach_Scenario_Unsure
- **Name**: Hunger Coach — Body Scan Start
- **Purpose**: Guided body scan initiation for users unsure if physically hungry
- **Annotations**: 4-step timed body scan, Interoception exercise

### HungerCoach_BodyScan_Results
- **Name**: Body Scan — How Do You Feel?
- **Purpose**: Post-scan assessment: 4 options based on body awareness during scan
- **Annotations**: Physical yes / boring food / only indulgent / still unsure

### HungerCoach_BodyScan_Physical
- **Name**: Body Scan — Real Hunger Confirmed
- **Purpose**: Physical signals confirmed — eat with protein, eat mindfully
- **Annotations**: Gut and hypothalamus signal explanation

### HungerCoach_BodyScan_BoringFood
- **Name**: Body Scan — Likely Real Hunger
- **Purpose**: Boring food test passed, body needs fuel
- **Annotations**: Hedonic vs physical distinction

### HungerCoach_BodyScan_StillUnsure
- **Name**: Body Scan — Still Unsure
- **Purpose**: Uncertainty persists, wait 15 min then eat if still thinking about food
- **Annotations**: 15-minute timer, Interoception skill building

### HungerCoach_BodyScan_Craving
- **Name**: Body Scan — Craving Identified
- **Purpose**: Indulgent-only desire identified as hedonic — 10-15 min wait strategy
- **Annotations**: 10-minute timer, Craving peak at 5-7 min stat

## Unusual Time Branch

### HungerCoach_Scenario_UnusualTime
- **Name**: Hunger Coach — Unusual Time
- **Purpose**: Off-schedule hunger: When is this happening?
- **Annotations**: 4 options: late night, afternoon, early morning, post-workout

### HungerCoach_UnusualTime_LateNight
- **Name**: Unusual Time — Late Night
- **Purpose**: Nighttime eating is usually habit/fatigue/wind-down — brush teeth, herbal tea
- **Annotations**: Kitchen closes at 8pm rule, Overnight glucose impact

### HungerCoach_UnusualTime_Afternoon
- **Name**: Unusual Time — Afternoon Slump
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

## About to Eat Branch

### HungerCoach_Scenario_AboutToEat
- **Name**: Hunger Coach — About to Eat
- **Purpose**: Pre-meal coaching: What's your hunger level?
- **Annotations**: Proactive scenario, 3 hunger levels: 1-2, 3, 4-5

### HungerCoach_AboutToEat_Low
- **Name**: About to Eat — Not Really Hungry (1-2)
- **Purpose**: Eating by schedule/socially — protein-dense smaller meal, don't skip
- **Annotations**: 20-minute meal timer, Lean mass protection messaging

### HungerCoach_AboutToEat_SweetSpot
- **Name**: About to Eat — Perfect Level (3)
- **Purpose**: Ideal hunger for mindful eating — protein first, 20-min pace, stop at 3-4 fullness
- **Annotations**: 20-minute meal timer, Executive control messaging

### HungerCoach_AboutToEat_High
- **Name**: About to Eat — Very Hungry (4-5)
- **Purpose**: High hunger management — water first, protein first, fork-down technique
- **Annotations**: 20-minute meal timer, Ghrelin surge override explanation

## Post-Meal Branch

### HungerCoach_Scenario_PostMeal
- **Name**: Hunger Coach — Post-Meal Check
- **Purpose**: Post-meal reflection: How do you feel after eating?
- **Annotations**: Proactive scenario, 4 options: still hungry, just right, too full, can't tell

### HungerCoach_PostMeal_JustRight
- **Name**: Post-Meal — Satisfied
- **Purpose**: Celebrates landing at satisfied — note the meal composition, track the win
- **Annotations**: Strategy tracking, Template meal concept

### HungerCoach_PostMeal_TooFull
- **Name**: Post-Meal — Too Full
- **Purpose**: Overshoot as data not failure — don't skip next meal, gentle walk
- **Annotations**: Anti-restrict-binge cycle messaging

### HungerCoach_PostMeal_NotSure
- **Name**: Post-Meal — Can't Tell Yet
- **Purpose**: Vagus nerve fullness delay — 15-minute wait timer
- **Annotations**: 15-minute timer, Vagus nerve slow communicator

### HungerCoach_PostMeal_StillHungry
- **Name**: Post-Meal — Still Hungry → What Did You Eat?
- **Purpose**: Follow-up branching to post_meal_hungry: meal composition assessment
- **Annotations**: 4 options: low protein, small portion, ate fast, balanced

## Post-Meal Hungry Sub-Branch

### HungerCoach_PostMealHungry_LowProtein
- **Name**: Post-Meal Hungry — Missing Protein
- **Purpose**: Carb-heavy meal missing satiety anchor — protein-first strategy for next meal
- **Annotations**: CCK/PYY/GLP-1 hormone explanation, Strategy tracking

### HungerCoach_PostMealHungry_SmallPortion
- **Name**: Post-Meal Hungry — Under-Eating
- **Purpose**: Portions may be too small during GLP-1 transition — increase without guilt
- **Annotations**: Metabolic rate protection, Strategy tracking

### HungerCoach_PostMealHungry_AteFast
- **Name**: Post-Meal Hungry — Ate Too Fast
- **Purpose**: Brain didn't have time to catch up — 15-min wait, 20-min meal timer for next meal
- **Annotations**: 15-minute timer, Fullness hormone 25-30% increase at slower pace

### HungerCoach_PostMealHungry_BalancedMeal
- **Name**: Post-Meal Hungry — Body Needs More
- **Purpose**: Genuine hunger after balanced meal — trust the signal, may need larger portions
- **Annotations**: Intuitive eating foundation, Strategy tracking

## Hunger Changing Branch

### HungerCoach_Scenario_HungerChanging
- **Name**: Hunger Coach — Hunger Changing
- **Purpose**: Medication transition: What feels different about your hunger?
- **Annotations**: Learn scenario, 4 options: more, less, unpredictable, different type

### HungerCoach_HungerChanging_MoreHungry
- **Name**: Hunger Changing — Increasing Appetite
- **Purpose**: Ghrelin rebound explanation — temporary overshoot, protein + fiber + structure defense
- **Annotations**: 4-8 week normalization timeline, Compassion messaging

### HungerCoach_HungerChanging_LessHungry
- **Name**: Hunger Changing — Very Low Appetite
- **Purpose**: Low appetite during transition — protect muscle with structured protein meals
- **Annotations**: 1.2-1.6g/kg protein recommendation, Lean mass loss warning

### HungerCoach_HungerChanging_Unpredictable
- **Name**: Hunger Changing — Waves
- **Purpose**: Fluctuating hunger as hypothalamus recalibration — consistent meal timing anchors rhythm
- **Annotations**: Circadian eating explanation, 3-6 week smoothing timeline

### HungerCoach_HungerChanging_DifferentType
- **Name**: Hunger Changing — Different Sensation
- **Purpose**: Developing hunger literacy — 5 types of hunger framework
- **Annotations**: Stomach/mouth/eye/heart/habit hunger, Interoception skill

## Teach Me

### HungerCoach_Scenario_TeachMe
- **Name**: Hunger Coach — Teach Me About Hunger
- **Purpose**: Educational entry point to mini-lesson library
- **Annotations**: Learn scenario, 5 mini-lessons accessible

## Coach Outcomes

### HungerCoach_Outcome_Paused
- **Name**: Coach Outcome — Paused Successfully
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

## Weekly Check-In

### WeeklyCheckin
- **Name**: Weekly Check-In
- **Purpose**: Weekly mood, confidence rating, challenge journal, and education progress modal
- **Annotations**: 5-emoji mood scale, 1-5 confidence rating, Free-text challenge input

## Insights

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

## Education

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

## Games

### Game_ProteinGuess
- **Name**: Game — Protein Guess
- **Purpose**: Quiz: Compare two foods, which has more protein?
- **Annotations**: Multi-round with immediate feedback

### Game_BuildBalancedPlate
- **Name**: Game — Build a Balanced Plate
- **Purpose**: Builder: Select protein, carb, and veggie to construct a meal
- **Annotations**: Three-step selection with scoring

## Settings & Program

### Settings
- **Name**: Settings
- **Purpose**: User profile display, program details, reset program
- **Annotations**: Reset button clears all data, Shows onboarding profile data

### Program_Details
- **Name**: Program Details
- **Purpose**: Detailed program metrics, dose history, graduation readiness
- **Annotations**: Accessed from Settings

## Body Scanner

### BodyScanner
- **Name**: Body Scanner
- **Purpose**: Camera-based body composition scan (mock)
- **Annotations**: Results: body fat %, visceral fat %, lifestyle bonus
