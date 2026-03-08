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
    name: 'Sarah', medication: 'Semaglutide (Ozempic/Wegovy)',
    medStatus: 'Currently tapering', weight: 175, goalWeight: 155,
    weightMode: 'lose',
    concerns: ['weight_regain', 'appetite_return', 'no_habits']
  },
  weightMode: 'lose',
  weightAnchor: 175,
  goalWeight: 155,
  week1CheckIn: { answers: { q_protein: 2, q_walking: 2, q_hunger: 2, q_sleep: 3, q_glucose: 2, q_stress: 2, q_satiety: 2, q_weight: 2 }, completedAt: new Date().toISOString() },
  week4CheckIn: { answers: { q_protein: 3, q_walking: 3, q_hunger: 3, q_sleep: 3, q_glucose: 3, q_stress: 2, q_satiety: 3, q_weight: 3 }, completedAt: new Date().toISOString() },
  weekChoices: { 2: 'Breakfast', 3: 'Extra vegetables', 4: 'Lunch', 5: 'Avocado / olive oil' },
  hungerEntries: {},
  bodyScanEntries: {},
  completedModules: { 'cgm_basics': Date.now(), 'glp1_basics': Date.now(), 'patterns_101': Date.now(), 'protein_anchor_p1': Date.now(), 'protein_muscle': Date.now() },
  completedGames: { 'protein_guess': Date.now() },
  weeklyCheckIns: {},
  weeklyScoreHistory: [],
  coachSessions: [
    { timestamp: Date.now() - 86400000, scenario: 'ate_still_hungry', path: ['< 30 min', 'Mostly carbs'], followUp: 'ate_intentional' },
    { timestamp: Date.now() - 172800000, scenario: 'craving', path: ['Sweet'], followUp: 'paused' }
  ],
  strategyLog: [
    { timestamp: Date.now() - 86400000, scenario: 'ate_still_hungry', strategy: 'Drink a full glass of water first', helped: true }
  ],
  focusAreas: [],
  doseEvents: [],
  preferences: {},
  dismissedBanners: {},
  maintenanceBandPct: 3,
  cgmOverride: null
};

const MAINTAIN_STATE = {
  ...MOCK_STATE_BASE,
  weightMode: 'maintain',
  weightAnchor: 160,
  goalWeight: 160,
  profile: { ...MOCK_STATE_BASE.profile, weight: 160, goalWeight: 160, weightMode: 'maintain' }
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
  // ─── ONBOARDING FLOW (6 steps: 0 welcome, 1 about you, 2 concerns, 3 weight, 4 assessment, 5 plan) ───
  { id: 'Onboarding_Welcome', state: ONBOARDING_STATE, navigate: null },
  { id: 'Onboarding_AboutYou', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(1); ${PF}.setOnboardProfile({name:'Sarah',medication:'Semaglutide (Ozempic/Wegovy)',medStatus:'Currently tapering'}); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_Concerns', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(2); ${PF}.setOnboardProfile({name:'Sarah',medication:'Semaglutide (Ozempic/Wegovy)',medStatus:'Currently tapering',concerns:['weight_regain','appetite_return']}); ${PF}.navigate('onboarding');` },
  { id: 'Onboarding_Weight', state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(3); ${PF}.setOnboardProfile({name:'Sarah',medication:'Semaglutide (Ozempic/Wegovy)',medStatus:'Currently tapering',concerns:['weight_regain','appetite_return'],weight:175,weightMode:'lose',goalWeight:155}); ${PF}.navigate('onboarding');` },
  {
    id: 'Onboarding_BaselineAssessment',
    fullPage: true,
    state: ONBOARDING_STATE,
    navigate: `${PF}.setOnboardStep(4); ${PF}.setOnboardProfile({name:'Sarah',medication:'Semaglutide (Ozempic/Wegovy)',medStatus:'Currently tapering',concerns:['weight_regain','appetite_return'],weight:175,weightMode:'lose',goalWeight:155}); ${PF}.setOnboardAnswers({q_protein:3,q_walking:2,q_hunger:2,q_sleep:3,q_glucose:2,q_stress:2,q_satiety:3,q_weight:2}); ${PF}.navigate('onboarding');`
  },
  { id: 'Onboarding_PlanOverview', fullPage: true, state: ONBOARDING_STATE, navigate: `${PF}.setOnboardStep(5); ${PF}.setOnboardProfile({name:'Sarah',medication:'Semaglutide (Ozempic/Wegovy)',medStatus:'Currently tapering',concerns:['weight_regain','appetite_return'],weight:175,weightMode:'lose',goalWeight:155}); ${PF}.setOnboardAnswers({q_protein:3,q_walking:2,q_hunger:2,q_sleep:3,q_glucose:2,q_stress:2,q_satiety:2,q_weight:2}); ${PF}.navigate('onboarding');` },

  // ─── HOME SCREEN STATES ───
  { id: 'Home_CGM_Active', navigate: `${PF}.setCGM(true); ${PF}.navigate('home');` },
  { id: 'Home_CGM_Off', navigate: `${PF}.setCGM(false); ${PF}.navigate('home');` },
  { id: 'Home_WeightLoss', navigate: `${PF}.setCGM(false); ${PF}.navigate('home');` },
  { id: 'Home_Maintenance', state: MAINTAIN_STATE, navigate: `${PF}.setCGM(false); ${PF}.navigate('home');` },

  // ─── TOOLKIT ───
  { id: 'Toolkit_Main', fullPage: true, navigate: `${PF}.navigate('dailies');` },

  // ─── WEEK DETAIL VIEWS ───
  { id: 'WeekDetail_Week1_Baseline', navigate: `${PF}.setWeek(1); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week2_Protein', navigate: `${PF}.setWeek(2); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week3_Fiber', navigate: `${PF}.setWeek(3); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week5_SatietyPlate', navigate: `${PF}.setWeek(5); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week8_Walking', navigate: `${PF}.setWeek(8); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week10_Portions', navigate: `${PF}.setWeek(10); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week13_Locked', navigate: `${PF}.setWeek(13); ${PF}.navigate('week_detail');` },
  { id: 'WeekDetail_Week16_Graduation', navigate: `${PF}.setWeek(16); ${PF}.navigate('week_detail');` },

  // ─── CHECK-IN FLOW (every 4 weeks) ───
  { id: 'CheckIn_Week4_Intro', navigate: `${PF}.setCheckin(4); ${PF}.navigate('post8_checkin');` },
  { id: 'CheckIn_Week8_Intro', navigate: `${PF}.setCheckin(8); ${PF}.navigate('post8_checkin');` },
  { id: 'CheckIn_Week12_Intro', navigate: `${PF}.setCheckin(12); ${PF}.navigate('post8_checkin');` },
  { id: 'CheckIn_SelfAssessment', fullPage: true, navigate: `${PF}.setCheckin(8); ${PF}.setCheckinStep(1); ${PF}.navigate('post8_checkin');` },
  {
    id: 'CheckIn_Feedback',
    fullPage: true,
    navigate: `${PF}.setCheckin(8); ${PF}.setCheckinAnswers({q_protein:4,q_walking:3,q_hunger:4,q_sleep:3,q_glucose:4,q_stress:2,q_satiety:3,q_weight:3,_ranked:[{area:'sleep_stress',avg:2.5},{area:'nutrition',avg:3.5},{area:'hunger',avg:4},{area:'exercise',avg:3}]}); ${PF}.setCheckinStep(2); ${PF}.navigate('post8_checkin');`
  },
  {
    id: 'CheckIn_FocusSelection',
    state: CHECKIN_STATE,
    navigate: `${PF}.setCheckin(12); ${PF}.setCheckinAnswers({q_protein:4,q_walking:3,q_hunger:4,q_sleep:3,q_glucose:4,q_stress:2,q_satiety:3,q_weight:3,_ranked:[{area:'sleep_stress',avg:2.5},{area:'nutrition',avg:3.5},{area:'hunger',avg:4},{area:'exercise',avg:3}]}); ${PF}.setCheckinStep(3); ${PF}.navigate('post8_checkin');`
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
