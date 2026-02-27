import { chromium } from 'playwright';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = '.protoflow-screens';
const MANIFEST_PATH = 'protoflow-manifest.json';
const HTML_PATH = 'ios/App/App/public/index.html';
const VIEWPORT = { width: 393, height: 852 };

if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR, { recursive: true });

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));

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
  hungerEntries: {},
  bodyScanEntries: {},
  completedModules: { 'cgm_what_is': Date.now(), 'protein_anchor': Date.now(), 'walking_glucose': Date.now() },
  completedGames: {},
  weeklyCheckIns: {},
  weeklyScoreHistory: [],
  coachSessions: [],
  strategyLog: [],
  focusAreas: [],
  doseEvents: [],
  preferences: {},
  dismissedBanners: {},
  maintenanceBandPct: 5,
  weightAnchor: 165
};

function seedHungerEntries(state) {
  const today = new Date();
  for (let i = 0; i < 7; i++) {
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

const SCREENS = [
  {
    id: 'OnboardingView',
    setup: async (page) => {
      await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('signos-glp1') || '{}');
        s.onboardingComplete = false;
        localStorage.setItem('signos-glp1', JSON.stringify(s));
        location.reload();
      });
      await page.waitForTimeout(1500);
    }
  },
  {
    id: 'HomeView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'home';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'ToolkitView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'dailies';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'LogView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'log';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'InsightsView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'insights';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'SettingsView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'settings';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'WeekDetailView',
    setup: async (page) => {
      await page.evaluate(() => {
        openWeekNumber = 1;
        currentScreen = 'week_detail';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'Post8CheckInView',
    setup: async (page) => {
      await page.evaluate(() => {
        checkinWeek = 1;
        post8Step = 0;
        post8Answers = {};
        currentScreen = 'post8_checkin';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'HungerCoachView',
    setup: async (page) => {
      await page.evaluate(() => {
        if (typeof resetCoachState === 'function') resetCoachState();
        currentScreen = 'hunger_coach';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'HungerQuestionnaireView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'hunger_questionnaire';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'EducationModuleView',
    setup: async (page) => {
      await page.evaluate(() => {
        openEducationModuleId = 'cgm_what_is';
        currentScreen = 'education_module';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'EducationGameView',
    setup: async (page) => {
      await page.evaluate(() => {
        openEducationGameType = 'protein_guess';
        openEducationGameTitle = 'Protein Guess';
        eduGameIndex = 0;
        eduGameAnswered = false;
        currentScreen = 'education_game';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'BodyScannerView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'body_scanner';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'ProgramView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentScreen = 'program';
        render();
      });
      await page.waitForTimeout(800);
    }
  },
  {
    id: 'ToolkitModuleView',
    setup: async (page) => {
      await page.evaluate(() => {
        currentToolkitModule = 0;
        currentToolkitStep = 0;
        currentScreen = 'toolkit_module';
        render();
      });
      await page.waitForTimeout(800);
    }
  }
];

async function main() {
  console.log('ProtoFlow Screenshot Capture');
  console.log('============================\n');
  console.log(`Manifest: ${manifest.screens.length} screens`);
  console.log(`Capturing: ${SCREENS.length} screens\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2
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

      const htmlUrl = `file://${process.cwd()}/${HTML_PATH}`;
      await page.goto(htmlUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1000);

      if (screen.id === 'OnboardingView') {
        await page.evaluate(() => {
          const s = JSON.parse(localStorage.getItem('signos-glp1') || '{}');
          s.onboardingComplete = false;
          localStorage.setItem('signos-glp1', JSON.stringify(s));
        });
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1500);
      } else {
        await screen.setup(page);
      }

      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`  ✓ ${screen.id}`);
      captured++;
    } catch (err) {
      console.log(`  ✗ ${screen.id} — ${err.message}`);
      failed++;
    }

    await page.close();
  }

  await browser.close();

  console.log(`\nDone: ${captured} captured, ${failed} failed`);
  console.log(`Screenshots saved to ${SCREENSHOT_DIR}/`);

  if (captured === 0) {
    console.error('\nERROR: No screenshots captured. Check the HTML file path.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
