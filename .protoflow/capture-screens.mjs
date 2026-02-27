import { chromium } from 'playwright';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const SCREENSHOT_DIR = '.protoflow-screens';
const HTML_PATH = 'ios/App/App/public/index.html';
const VIEWPORT = { width: 393, height: 852 };

if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

const MOCK_STATE = {
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
    { timestamp: Date.now() - 86400000, scenario: 'still_hungry', path: ['< 30 min', 'Mostly carbs'], followUp: 'ate_intentional' },
    { timestamp: Date.now() - 172800000, scenario: 'craving', path: ['Sweet'], followUp: 'paused' },
    { timestamp: Date.now() - 259200000, scenario: 'still_hungry', path: ['< 30 min', 'Balanced'], followUp: 'satisfied' }
  ],
  strategyLog: [
    { timestamp: Date.now() - 86400000, scenario: 'still_hungry', strategy: 'Drink a full glass of water first', helped: true },
    { timestamp: Date.now() - 172800000, scenario: 'craving', strategy: 'Wait 10 minutes', helped: true },
    { timestamp: Date.now() - 259200000, scenario: 'still_hungry', strategy: 'Eat protein first', helped: false }
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

seedHungerEntries(MOCK_STATE);

const PF = 'window.__protoflow';

const SCREENS = [
  // ─── ONBOARDING FLOW ───
  {
    id: 'Onboarding_Welcome',
    setup: `
      const s = JSON.parse(localStorage.getItem('signos-glp1') || '{}');
      s.onboardingComplete = false;
      localStorage.setItem('signos-glp1', JSON.stringify(s));
    `,
    reload: true
  },
  {
    id: 'Onboarding_NameAge',
    setup: `${PF}.setOnboardStep(1); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_Medication',
    setup: `${PF}.setOnboardStep(2); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_WhyOffGLP1',
    setup: `${PF}.setOnboardStep(3); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_BodyActivity',
    setup: `${PF}.setOnboardStep(4); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_Goals',
    setup: `${PF}.setOnboardStep(5); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_PreStruggles',
    setup: `${PF}.setOnboardStep(6); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_CurrentStruggles',
    setup: `${PF}.setOnboardStep(7); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_StrengthTraining',
    setup: `${PF}.setOnboardStep(8); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_AssessmentQ1',
    setup: `${PF}.setOnboardStep(9); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_AssessmentQ5',
    setup: `${PF}.setOnboardStep(13); ${PF}.navigate('onboarding');`
  },
  {
    id: 'Onboarding_PersonalizedProgram',
    setup: `${PF}.setOnboardStep(17); ${PF}.navigate('onboarding');`
  },

  // ─── HOME SCREEN STATES ───
  {
    id: 'Home_CGM_Active',
    setup: `${PF}.setCGM(true); ${PF}.navigate('home');`
  },
  {
    id: 'Home_CGM_Off',
    setup: `${PF}.setCGM(false); ${PF}.navigate('home');`
  },

  // ─── TOOLKIT ───
  {
    id: 'Toolkit_Main',
    setup: `${PF}.navigate('dailies');`
  },

  // ─── WEEK DETAIL VIEWS ───
  {
    id: 'WeekDetail_Block1_Baseline',
    setup: `${PF}.setWeek(1); ${PF}.navigate('week_detail');`
  },
  {
    id: 'WeekDetail_Block2_Nutrition',
    setup: `${PF}.setWeek(2); ${PF}.navigate('week_detail');`
  },
  {
    id: 'WeekDetail_Block3_Movement',
    setup: `${PF}.setWeek(3); ${PF}.navigate('week_detail');`
  },
  {
    id: 'WeekDetail_Block4_FullSystem',
    setup: `${PF}.setWeek(4); ${PF}.navigate('week_detail');`
  },
  {
    id: 'WeekDetail_Block5_Locked',
    setup: `${PF}.setWeek(5); ${PF}.navigate('week_detail');`
  },

  // ─── SELF-ASSESSMENT FLOW ───
  {
    id: 'Assessment_Baseline_Intro',
    setup: `${PF}.setCheckin(1); ${PF}.navigate('post8_checkin');`
  },
  {
    id: 'Assessment_MidProgram_Intro',
    setup: `${PF}.setCheckin(5); ${PF}.navigate('post8_checkin');`
  },
  {
    id: 'Assessment_Post8_Intro',
    setup: `${PF}.setCheckin(9); ${PF}.navigate('post8_checkin');`
  },

  // ─── LOG SCREEN ───
  {
    id: 'Log_Main',
    setup: `${PF}.navigate('log');`
  },

  // ─── HUNGER QUESTIONNAIRE ───
  {
    id: 'HungerQuestionnaire',
    setup: `${PF}.navigate('hunger_questionnaire');`
  },

  // ─── HUNGER COACH FLOW ───
  {
    id: 'HungerCoach_Landing',
    setup: `${PF}.resetCoach(); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_StillHungry',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('still_hungry'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_Starving',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('starving'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_Craving',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('craving'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_NotHungry',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('not_hungry'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_Unsure',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('unsure'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_UnusualTime',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('unusual_time'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_AboutToEat',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('about_to_eat'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_PostMeal',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('post_meal'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_HungerChanging',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('hunger_changing'); ${PF}.navigate('hunger_coach');`
  },
  {
    id: 'HungerCoach_Scenario_TeachMe',
    setup: `${PF}.resetCoach(); ${PF}.setCoachScenario('teach_me'); ${PF}.navigate('hunger_coach');`
  },

  // ─── INSIGHTS TABS ───
  {
    id: 'Insights_Lifestyle',
    setup: `${PF}.setInsightsTab('lifestyle'); ${PF}.navigate('insights');`
  },
  {
    id: 'Insights_Glucose',
    setup: `${PF}.setInsightsTab('glucose'); ${PF}.navigate('insights');`
  },
  {
    id: 'Insights_Graduation',
    setup: `${PF}.setInsightsTab('graduation'); ${PF}.navigate('insights');`
  },

  // ─── EDUCATION ───
  {
    id: 'Education_CGM_Basics',
    setup: `${PF}.setEducationModule('cgm_basics'); ${PF}.navigate('education_module');`
  },
  {
    id: 'Education_Protein_Anchor',
    setup: `${PF}.setEducationModule('protein_anchor'); ${PF}.navigate('education_module');`
  },
  {
    id: 'Education_Walking_Glucose',
    setup: `${PF}.setEducationModule('walking_glucose'); ${PF}.navigate('education_module');`
  },

  // ─── EDUCATION GAMES ───
  {
    id: 'Game_ProteinGuess',
    setup: `${PF}.setEducationGame('protein_guess', 'Protein Guess'); ${PF}.navigate('education_game');`
  },
  {
    id: 'Game_BuildBalancedPlate',
    setup: `${PF}.setEducationGame('build_plate', 'Build a Balanced Plate'); ${PF}.navigate('education_game');`
  },

  // ─── SETTINGS ───
  {
    id: 'Settings',
    setup: `${PF}.navigate('settings');`
  },

  // ─── PROGRAM DETAILS ───
  {
    id: 'Program_Details',
    setup: `${PF}.navigate('program');`
  },

  // ─── BODY SCANNER ───
  {
    id: 'BodyScanner',
    setup: `${PF}.navigate('body_scanner');`
  },
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

    try {
      await page.addInitScript((mockState) => {
        localStorage.setItem('signos-glp1', JSON.stringify(mockState));
      }, MOCK_STATE);

      await page.goto(htmlUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1000);

      if (screen.reload) {
        await page.evaluate(screen.setup);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1500);
      } else {
        await page.evaluate(screen.setup);
        await page.waitForTimeout(600);
      }

      await page.screenshot({ path: filePath, fullPage: false });
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
