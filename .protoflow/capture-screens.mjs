import { chromium } from 'playwright';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const SCREENSHOT_DIR = '.protoflow-screens';
const HTML_PATH = 'ios/App/App/public/index.html';
const VIEWPORT = { width: 393, height: 852 };

if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

const MOCK_STATE_BASE = {
  onboardingComplete: true,
  phaseStartAt: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
  program_enrolled_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  profile: {
    name: 'Sarah', age: 34, medication: 'Ozempic', duration: '8 months',
    medStatus: 'recently_stopped', weight: 165, goalWeight: 155,
    heightFt: 5, heightIn: 6, activityLevel: 'moderate',
    strengthTraining: 'beginner',
    goals: ['maintain', 'habits', 'hunger'],
    preGlp1Struggles: ['portion_control', 'low_activity', 'poor_sleep'],
    currentStruggles: ['portion_control', 'low_activity', 'poor_sleep'],
    reasonOffGlp1: ['reached_goal', 'cost']
  },
  weekOrder: ['baseline_cgm', 'nutrition', 'movement_cgm', 'full_system'],
  week1CheckIn: { answers: { q1: 3, q2: 2, q3: 3, q4: 2, q5: 3, q6: 2, q7: 3, q8: 2 }, completedAt: new Date().toISOString() },
  week5CheckIn: { answers: { q1: 4, q2: 3, q3: 4, q4: 3, q5: 4, q6: 3, q7: 4, q8: 3 }, completedAt: new Date().toISOString() },
  hungerEntries: {},
  bodyScanEntries: {},
  completedModules: { 'cgm_basics': Date.now(), 'cgm_what_is': Date.now(), 'protein_anchor': Date.now(), 'walking_glucose': Date.now(), 'glp1_basics': Date.now() },
  completedGames: { 'protein_guess': Date.now() },
  weeklyCheckIns: {},
  weeklyScoreHistory: [],
  coachSessions: [
    { timestamp: Date.now() - 86400000, scenario: 'ate_still_hungry', path: ['< 30 min', 'Mostly carbs'], followUp: 'ate_intentional' },
    { timestamp: Date.now() - 172800000, scenario: 'craving', path: ['Sweet'], followUp: 'paused' },
    { timestamp: Date.now() - 259200000, scenario: 'ate_still_hungry', path: ['< 30 min', 'Balanced'], followUp: 'satisfied' }
  ],
  strategyLog: [
    { timestamp: Date.now() - 86400000, scenario: 'ate_still_hungry', strategy: 'Drink a full glass of water first', helped: true },
    { timestamp: Date.now() - 172800000, scenario: 'craving', strategy: 'Wait 10 minutes', helped: true },
    { timestamp: Date.now() - 259200000, scenario: 'ate_still_hungry', strategy: 'Eat protein first', helped: false }
  ],
  focusAreas: [],
  doseEvents: [],
  preferences: {},
  dismissedBanners: {},
  maintenanceBandPct: 5,
  weightAnchor: 165,
  cgmOverride: null
};

function seedHungerEntries(state) {
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    state.hungerEntries[key] = {
      overallHunger: 2 + Math.round(Math.random() * 2),
      postMealFullness: 2 + Math.round(Math.random() * 2),
      completedAt: d.toISOString()
    };
  }
}

seedHungerEntries(MOCK_STATE_BASE);

const ONBOARDING_STATE = { ...MOCK_STATE_BASE, onboardingComplete: false };

const CHECKIN_STATE = {
  ...MOCK_STATE_BASE,
  postWeek8CheckIn: null,
  focusAreas: [],
};

const PF = 'window.__protoflow';

function coachNav(scenario) {
  return `${PF}.resetCoach(); ${PF}.setCoachScenario('${scenario}'); ${PF}.navigate('hunger_coach');`;
}
function coachAdvance(scenario, optId) {
  return { navigate: coachNav(scenario), postNavigate: `${PF}.advanceCoach('${optId}');` };
}
function coachChain(scenario, opts) {
  const steps = opts.map(o => `${PF}.advanceCoach('${o}');`).join(' ');
  return { navigate: coachNav(scenario), postNavigate: steps };
}

const SCREENS = [
  // ─── ONBOARDING FLOW ───
  { id: 'Onboarding_Welcome', state: ONBOARDING_STATE, navigate: null },
  { id: 'Onboarding_NameAge', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(1); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_Medication', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(2); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_WhyOffGLP1', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(3); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_BodyActivity', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(4); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_Goals', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(5); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_PreStruggles', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(6); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_CurrentStruggles', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(7); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_StrengthTraining', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(8); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_AssessmentQ1', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(9); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_AssessmentQ5', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(13); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_PersonalizedProgram', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(17); ${PF}.navigate('onboarding');` },

  // ─── HOME SCREEN STATES ───
  { id: 'Home_CGM_Active', navigate: `${PF}.setCGM(true); ${PF}.navigate('home');` },
  { id: 'Home_CGM_Off', navigate: `${PF}.setCGM(false); ${PF}.navigate('home');` },

  // ─── TOOLKIT ───
  { id: 'Toolkit_Main', navigate: `${PF}.navigate('dailies');` },

  // ─── WEEK DETAIL VIEWS ───
  { id: 'WeekDetail_Block1_Baseline', navigate: `${PF}.setWeek(1); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Block2_Nutrition', navigate: `${PF}.setWeek(3); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Block3_Movement', navigate: `${PF}.setWeek(5); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Block4_FullSystem', navigate: `${PF}.setWeek(7); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Block5_Locked', navigate: `${PF}.setWeek(9); ${PF}.navigate('week_detail');` },

  // ─── SELF-ASSESSMENT FLOW (4 steps) ───
  { id: 'Assessment_Baseline_Intro', navigate: `${PF}.setCheckin(1); ${PF}.navigate('post8_checkin');` },
  { id: 'Assessment_MidProgram_Intro', navigate: `${PF}.setCheckin(5); ${PF}.navigate('post8_checkin');` },
  { id: 'Assessment_Post8_Intro', navigate: `${PF}.setCheckin(9); ${PF}.navigate('post8_checkin');` },
  { id: 'CheckIn_SelfAssessment', fullPage: true, navigate: `${PF}.setCheckin(9); ${PF}.setCheckinStep(1); ${PF}.navigate('post8_checkin');` },
  {
    id: 'CheckIn_Feedback',
    fullPage: true,
    navigate: `${PF}.setCheckin(9); ${PF}.setCheckinAnswers({q_hunger:4,q_nutrition:3,q_exercise:4,q_sleep:3,q_glucose:4,q_weight:3,q_stress:2,q_muscle:3,_ranked:[{area:'sleep_stress',avg:2.5},{area:'nutrition',avg:3},{area:'hunger',avg:4},{area:'exercise',avg:4}]}); ${PF}.setCheckinStep(2); ${PF}.navigate('post8_checkin');`
  },
  {
    id: 'CheckIn_FocusSelection',
    state: CHECKIN_STATE,
    navigate: `${PF}.setCheckin(9); ${PF}.setCheckinAnswers({q_hunger:4,q_nutrition:3,q_exercise:4,q_sleep:3,q_glucose:4,q_weight:3,q_stress:2,q_muscle:3,_ranked:[{area:'sleep_stress',avg:2.5},{area:'nutrition',avg:3},{area:'hunger',avg:4},{area:'exercise',avg:4}]}); ${PF}.setCheckinStep(3); ${PF}.navigate('post8_checkin');`
  },

  // ─── LOG SCREEN ───
  { id: 'Log_Main', navigate: `${PF}.navigate('log');` },

  // ─── HUNGER QUESTIONNAIRE ───
  { id: 'HungerQuestionnaire', navigate: `${PF}.navigate('hunger_questionnaire');` },

  // ─── HUNGER COACH LANDING ───
  { id: 'HungerCoach_Landing', navigate: `${PF}.resetCoach(); ${PF}.navigate('hunger_coach');` },

  // ─── HUNGER COACH: STILL HUNGRY (ate_still_hungry) ───
  { id: 'HungerCoach_Scenario_StillHungry', navigate: coachNav('ate_still_hungry') },
  { id: 'HungerCoach_StillHungry_Under15', ...coachAdvance('ate_still_hungry', 'lt15') },
  { id: 'HungerCoach_StillHungry_WhatAte', navigate: coachNav('ate_still_hungry'), postNavigate: `${PF}.advanceCoach('15to30');` },
  { id: 'HungerCoach_StillHungry_CarbHeavy', ...coachChain('ate_still_hungry', ['15to30', 'carb_heavy']) },
  { id: 'HungerCoach_StillHungry_Balanced', ...coachChain('ate_still_hungry', ['15to30', 'balanced']) },
  { id: 'HungerCoach_StillHungry_StomachVsMouth', navigate: coachNav('ate_still_hungry'), postNavigate: `${PF}.advanceCoach('gt30');` },
  { id: 'HungerCoach_StillHungry_Physical', ...coachChain('ate_still_hungry', ['gt30', 'stomach']) },
  { id: 'HungerCoach_StillHungry_MouthHunger', ...coachChain('ate_still_hungry', ['gt30', 'mouth']) },

  // ─── HUNGER COACH: STARVING ───
  { id: 'HungerCoach_Scenario_Starving', navigate: coachNav('starving') },
  { id: 'HungerCoach_Starving_LongAgo', ...coachAdvance('starving', 'long_ago') },
  { id: 'HungerCoach_Starving_Recent', ...coachAdvance('starving', 'recent') },
  { id: 'HungerCoach_Starving_Morning', ...coachAdvance('starving', 'just_woke') },

  // ─── HUNGER COACH: CRAVING ───
  { id: 'HungerCoach_Scenario_Craving', navigate: coachNav('craving') },
  { id: 'HungerCoach_Craving_Sweet', ...coachAdvance('craving', 'sweet') },
  { id: 'HungerCoach_Craving_Salty', ...coachAdvance('craving', 'salty') },
  { id: 'HungerCoach_Craving_Rich', ...coachAdvance('craving', 'rich') },
  { id: 'HungerCoach_Craving_Specific', ...coachAdvance('craving', 'specific') },

  // ─── HUNGER COACH: HALT (not_hungry_want_eat) ───
  { id: 'HungerCoach_Scenario_NotHungry', navigate: coachNav('not_hungry_want_eat') },
  { id: 'HungerCoach_HALT_Hungry', ...coachAdvance('not_hungry_want_eat', 'hungry_actual') },
  { id: 'HungerCoach_HALT_Angry', ...coachAdvance('not_hungry_want_eat', 'angry') },
  { id: 'HungerCoach_HALT_Lonely', ...coachAdvance('not_hungry_want_eat', 'lonely') },
  { id: 'HungerCoach_HALT_Tired', ...coachAdvance('not_hungry_want_eat', 'tired') },

  // ─── HUNGER COACH: BODY SCAN (unsure) ───
  { id: 'HungerCoach_Scenario_Unsure', navigate: coachNav('unsure') },
  {
    id: 'HungerCoach_BodyScan_Results',
    navigate: coachNav('unsure'),
    postNavigate: `${PF}.setCoachScanDone();`
  },
  {
    id: 'HungerCoach_BodyScan_Physical',
    navigate: coachNav('unsure'),
    postNavigate: `${PF}.setCoachScanDone(); ${PF}.advanceCoach('physical_yes');`
  },
  {
    id: 'HungerCoach_BodyScan_BoringFood',
    navigate: coachNav('unsure'),
    postNavigate: `${PF}.setCoachScanDone(); ${PF}.advanceCoach('would_eat_boring');`
  },
  {
    id: 'HungerCoach_BodyScan_Craving',
    navigate: coachNav('unsure'),
    postNavigate: `${PF}.setCoachScanDone(); ${PF}.advanceCoach('only_want_good');`
  },
  {
    id: 'HungerCoach_BodyScan_StillUnsure',
    navigate: coachNav('unsure'),
    postNavigate: `${PF}.setCoachScanDone(); ${PF}.advanceCoach('still_unsure');`
  },

  // ─── HUNGER COACH: UNUSUAL TIME ───
  { id: 'HungerCoach_Scenario_UnusualTime', navigate: coachNav('unusual_time') },
  { id: 'HungerCoach_UnusualTime_LateNight', ...coachAdvance('unusual_time', 'late_night') },
  { id: 'HungerCoach_UnusualTime_Afternoon', ...coachAdvance('unusual_time', 'afternoon') },
  { id: 'HungerCoach_UnusualTime_EarlyMorning', ...coachAdvance('unusual_time', 'early_morning') },
  { id: 'HungerCoach_UnusualTime_PostWorkout', ...coachAdvance('unusual_time', 'right_after') },

  // ─── HUNGER COACH: ABOUT TO EAT ───
  { id: 'HungerCoach_Scenario_AboutToEat', navigate: coachNav('about_to_eat') },
  { id: 'HungerCoach_AboutToEat_Low', ...coachAdvance('about_to_eat', 'low') },
  { id: 'HungerCoach_AboutToEat_SweetSpot', ...coachAdvance('about_to_eat', 'sweet_spot') },
  { id: 'HungerCoach_AboutToEat_High', ...coachAdvance('about_to_eat', 'high') },

  // ─── HUNGER COACH: POST-MEAL ───
  { id: 'HungerCoach_Scenario_PostMeal', navigate: coachNav('post_meal') },
  { id: 'HungerCoach_PostMeal_JustRight', ...coachAdvance('post_meal', 'just_right') },
  { id: 'HungerCoach_PostMeal_TooFull', ...coachAdvance('post_meal', 'too_full') },
  { id: 'HungerCoach_PostMeal_NotSure', ...coachAdvance('post_meal', 'not_sure') },
  { id: 'HungerCoach_PostMeal_StillHungry', navigate: coachNav('post_meal'), postNavigate: `${PF}.advanceCoach('still_hungry');` },
  { id: 'HungerCoach_PostMealHungry_LowProtein', ...coachChain('post_meal', ['still_hungry', 'low_protein']) },
  { id: 'HungerCoach_PostMealHungry_SmallPortion', ...coachChain('post_meal', ['still_hungry', 'small_portion']) },
  { id: 'HungerCoach_PostMealHungry_AteFast', ...coachChain('post_meal', ['still_hungry', 'ate_fast']) },
  { id: 'HungerCoach_PostMealHungry_BalancedMeal', ...coachChain('post_meal', ['still_hungry', 'balanced_meal']) },

  // ─── HUNGER COACH: HUNGER CHANGING ───
  { id: 'HungerCoach_Scenario_HungerChanging', navigate: coachNav('hunger_changing') },
  { id: 'HungerCoach_HungerChanging_MoreHungry', ...coachAdvance('hunger_changing', 'more_hungry') },
  { id: 'HungerCoach_HungerChanging_LessHungry', ...coachAdvance('hunger_changing', 'less_hungry') },
  { id: 'HungerCoach_HungerChanging_Unpredictable', ...coachAdvance('hunger_changing', 'unpredictable') },
  { id: 'HungerCoach_HungerChanging_DifferentType', ...coachAdvance('hunger_changing', 'different_type') },

  // ─── HUNGER COACH: TEACH ME ───
  { id: 'HungerCoach_Scenario_TeachMe', navigate: `${PF}.resetCoach(); ${PF}.setCoachLesson('types'); ${PF}.navigate('hunger_coach');` },

  // ─── HUNGER COACH: OUTCOME (sample follow-up) ───
  {
    id: 'HungerCoach_Outcome_Paused',
    navigate: coachNav('not_hungry_want_eat'),
    postNavigate: `${PF}.advanceCoach('angry'); ${PF}.setCoachFollowUp('paused');`
  },
  {
    id: 'HungerCoach_Outcome_AteIntentional',
    navigate: coachNav('craving'),
    postNavigate: `${PF}.advanceCoach('sweet'); ${PF}.setCoachFollowUp('ate_intentional');`
  },
  {
    id: 'HungerCoach_Outcome_Satisfied',
    navigate: coachNav('post_meal'),
    postNavigate: `${PF}.advanceCoach('just_right'); ${PF}.setCoachFollowUp('satisfied');`
  },
  {
    id: 'HungerCoach_Outcome_LearnMore',
    navigate: coachNav('not_hungry_want_eat'),
    postNavigate: `${PF}.advanceCoach('angry'); ${PF}.setCoachFollowUp('learn_more');`
  },

  // ─── WEEKLY CHECK-IN (modal overlay) ───
  {
    id: 'WeeklyCheckin',
    navigate: `${PF}.setCGM(true); ${PF}.navigate('home');`,
    postNavigate: `${PF}.setWeeklyCheckin(true); ${PF}.render();`
  },

  // ─── INSIGHTS TABS ───
  { id: 'Insights_Lifestyle', navigate: `${PF}.setInsightsTab('lifestyle'); ${PF}.navigate('insights');` },
  { id: 'Insights_Glucose', navigate: `${PF}.setInsightsTab('glucose'); ${PF}.navigate('insights');` },
  { id: 'Insights_Graduation', navigate: `${PF}.setInsightsTab('graduation'); ${PF}.navigate('insights');` },

  // ─── EDUCATION ───
  { id: 'Education_CGM_Basics', navigate: `${PF}.setEducationModule('cgm_basics'); ${PF}.navigate('education_module');` },
  { id: 'Education_Protein_Anchor', navigate: `${PF}.setEducationModule('protein_anchor'); ${PF}.navigate('education_module');` },
  { id: 'Education_Walking_Glucose', navigate: `${PF}.setEducationModule('walking_glucose'); ${PF}.navigate('education_module');` },

  // ─── EDUCATION GAMES ───
  { id: 'Game_ProteinGuess', navigate: `${PF}.setEducationGame('protein_guess', 'Protein Guess'); ${PF}.navigate('education_game');` },
  { id: 'Game_BuildBalancedPlate', navigate: `${PF}.setEducationGame('build_meal', 'Build a Balanced Plate'); ${PF}.navigate('education_game');` },

  // ─── SETTINGS ───
  { id: 'Settings', navigate: `${PF}.navigate('settings');` },

  // ─── PROGRAM DETAILS ───
  { id: 'Program_Details', navigate: `${PF}.navigate('program');` },

  // ─── BODY SCANNER ───
  { id: 'BodyScanner', navigate: `${PF}.navigate('body_scanner');` },
];

async function main() {
  console.log('ProtoFlow Screenshot Capture');
  console.log('============================\n');
  console.log(`Capturing ${SCREENS.length} screens\n`);

  const htmlFile = resolve(HTML_PATH);
  const htmlUrl = `file://${htmlFile}`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    permissions: [],
  });

  let captured = 0;
  let failed = 0;

  for (const screen of SCREENS) {
    const page = await context.newPage();
    const filePath = join(SCREENSHOT_DIR, `${screen.id}.png`);
    const mockState = screen.state || MOCK_STATE_BASE;

    try {
      await page.goto(htmlUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(500);

      await page.evaluate((stateJson) => {
        localStorage.setItem('signos-glp1', stateJson);
      }, JSON.stringify(mockState));

      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1200);

      if (screen.navigate) {
        await page.evaluate(screen.navigate);
        await page.waitForTimeout(800);
      }

      if (screen.postNavigate) {
        await page.evaluate(screen.postNavigate);
        await page.waitForTimeout(800);
      }

      await page.screenshot({ path: filePath, fullPage: !!screen.fullPage });
      console.log(`  ✓ ${screen.id}`);
      captured++;
    } catch (err) {
      console.log(`  ✗ ${screen.id} — ${err.message.split('\n')[0]}`);
      failed++;
    }

    await page.close();
  }

  await browser.close();

  console.log(`\nDone: ${captured} captured, ${failed} failed`);
  console.log(`Screenshots in ${SCREENSHOT_DIR}/`);

  if (captured === 0) {
    console.error('\nERROR: No screenshots captured.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
