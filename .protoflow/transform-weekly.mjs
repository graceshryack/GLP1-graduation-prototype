import { readFileSync, writeFileSync } from 'fs';
const FILE = 'ios/App/App/public/index.html';
let src = readFileSync(FILE, 'utf8');

function replaceSection(startMarker, endMarker, replacement, inclusive = true) {
  const si = src.indexOf(startMarker);
  const ei = src.indexOf(endMarker, si);
  if (si < 0 || ei < 0) { console.error('NOT FOUND:', startMarker.slice(0,60), '...'); return; }
  const end = inclusive ? ei + endMarker.length : ei;
  src = src.slice(0, si) + replacement + src.slice(end);
  console.log('Replaced:', startMarker.slice(0,50).trim());
}

// ===== 1. Replace block data structures =====
replaceSection(
  'var TOTAL_BLOCKS = 8;',
  "var DEFAULT_WEEK_ORDER = DEFAULT_BLOCK_ORDER;",
  `var TOTAL_WEEKS = 16;
      var CHECK_IN_WEEKS = [4, 8, 12, 16];
      function weekToBlock(w) { return Math.ceil(w / 4); }
      function blockToWeeks(b) { var s = (b-1)*4+1; return [s, s+1, s+2, s+3]; }
      var TOTAL_BLOCKS = 4;

      var CGM_WEEKS = {1:true, 2:true, 5:true, 8:true, 9:true, 15:true, 16:true};
      var CGM_SCHEDULE = {};
      for (var _w = 1; _w <= 16; _w++) CGM_SCHEDULE[_w] = !!CGM_WEEKS[_w];
      var CGM_BLOCKS = { 1: true, 2: true, 3: true, 4: true };
      var CGM_PERIODS = [
        { id: 1, label: 'CGM 1: Baseline', weeks: [1, 2], purpose: 'Observe glucose patterns before changing anything' },
        { id: 2, label: 'CGM 2: Satiety Check', weeks: [5], purpose: 'See how protein + fiber + fat affect your glucose' },
        { id: 3, label: 'CGM 3: Movement', weeks: [8, 9], purpose: 'Watch how walking changes your glucose curve' },
        { id: 4, label: 'CGM 4: Graduation', weeks: [15, 16], purpose: 'Final proof \u2014 your habits handle your glucose' }
      ];
      function isCGMWeek(wk) { return !!CGM_SCHEDULE[wk]; }
      function isCGMBlock(b) { return blockToWeeks(b).some(function(w) { return CGM_SCHEDULE[w]; }); }
      function getCGMPeriod(wk) { for (var i = 0; i < CGM_PERIODS.length; i++) { if (CGM_PERIODS[i].weeks.indexOf(wk) >= 0) return CGM_PERIODS[i]; } return null; }
      function getNextCGMWeek(wk) { for (var w = wk + 1; w <= 16; w++) { if (CGM_SCHEDULE[w]) return w; } return null; }
      function getNextCGMBlock(b) { for (var i = b + 1; i <= 4; i++) { if (isCGMBlock(i)) return i; } return null; }
      function getLastCGMPeriod(wk) { for (var i = CGM_PERIODS.length - 1; i >= 0; i--) { if (CGM_PERIODS[i].weeks[CGM_PERIODS[i].weeks.length-1] < wk) return CGM_PERIODS[i]; } return null; }

      var WEEKLY_FOCUSES = {
        1:  { title: 'Know Your Baseline', desc: 'Your CGM sensor is on. Don\u2019t change anything yet \u2014 just observe. Watch how different meals, sleep, and activity affect your glucose. Log your hunger levels. By the end of this week, you\u2019ll have a personal baseline.', icon: '\ud83d\udcca', goal: 'Log meals and hunger daily, observe CGM after each meal', cgm: true, category: 'baseline' },
        2:  { title: 'Protein Foundation', desc: 'Pick one meal and anchor it with 30g+ of protein. Eggs at breakfast, chicken at lunch, fish at dinner \u2014 any source works. Protein is the #1 satiety lever when appetite returns.', icon: '\ud83e\udd69', goal: '30g+ protein at your chosen meal every day', cgm: true, category: 'nutrition', choicePrompt: 'Which meal will you anchor with protein?', choices: ['Breakfast', 'Lunch', 'Dinner'] },
        3:  { title: 'Add Fiber', desc: 'Add a fiber source to the meal you\u2019re already anchoring with protein. Vegetables, beans, whole grains \u2014 pick what you like. Fiber + protein together create lasting fullness.', icon: '\ud83e\udd66', goal: 'Protein + fiber at your anchor meal daily', cgm: false, category: 'nutrition', choicePrompt: 'How will you add fiber this week?', choices: ['Extra vegetables', 'Beans or legumes', 'Whole grains'] },
        4:  { title: 'Second Meal', desc: 'You\u2019ve proven you can build one strong meal. Now expand \u2014 apply protein + fiber to a second meal. Two anchored meals means most of your day is covered.', icon: '\ud83c\udf7d\ufe0f', goal: 'Two meals with protein + fiber daily', cgm: false, category: 'nutrition', choicePrompt: 'Which second meal will you anchor?', choices: ['Breakfast', 'Lunch', 'Dinner'] },
        5:  { title: 'Complete the Satiety Plate', desc: 'Add healthy fats to round out your meals. Avocado, olive oil, nuts, fatty fish \u2014 fat is the third pillar of fullness. With protein + fiber + fat, your meals keep you satisfied 3\u20134 hours.', icon: '\ud83e\udd51', goal: 'All meals include protein + fiber + healthy fat', cgm: true, category: 'nutrition', choicePrompt: 'Your go-to healthy fat source?', choices: ['Avocado / olive oil', 'Nuts / seeds', 'Fatty fish / cheese'] },
        6:  { title: 'Meal Timing', desc: 'Establish a consistent 3\u20134 meal rhythm. No skipping, even when not hungry. Regular timing trains your hunger hormones and prevents crash-binge cycles common post-GLP-1.', icon: '\u23f0', goal: 'Eat at consistent times, 3\u20134 meals, no skipping', cgm: false, category: 'structure' },
        7:  { title: 'Hydration', desc: 'Learn to distinguish thirst from hunger. Drink water before meals \u2014 it helps calibrate how much food you actually need.', icon: '\ud83d\udca7', goal: 'Water before every meal, 8+ glasses daily', cgm: false, category: 'structure' },
        8:  { title: 'Post-Meal Walking', desc: 'Add a 10\u201315 minute walk after your largest meal. Your CGM is back on \u2014 watch how walking blunts your glucose spike by 20\u201330 mg/dL.', icon: '\ud83d\udeb6', goal: '10\u201315 min walk after at least 1 meal daily', cgm: true, category: 'movement' },
        9:  { title: 'Glucose Patterns', desc: 'You have 8 weeks of data. Time to read it. Identify your top spike triggers, your best meals, and your daily pattern.', icon: '\ud83d\udcc8', goal: 'Identify top 3 spike triggers and 3 best meals', cgm: true, category: 'glucose' },
        10: { title: 'Portion Intuition', desc: 'Practice the hunger scale (1\u20135) before and after every meal. The goal: eat at a 2\u20133, stop at \u201csatisfied.\u201d This is the hardest skill.', icon: '\ud83c\udfaf', goal: 'Rate hunger before every meal, stop at satisfied', cgm: false, category: 'hunger' },
        11: { title: 'Daily Movement', desc: 'Set and hit a daily step target. Movement supports glucose regulation, appetite normalization, and mood.', icon: '\ud83d\udc5f', goal: '7,000+ steps daily', cgm: false, category: 'movement' },
        12: { title: 'Resistance Training', desc: 'Start 2x/week strength training. Muscle mass drives resting metabolic rate and is critical for long-term weight maintenance after GLP-1.', icon: '\ud83d\udcaa', goal: '2 strength sessions this week', cgm: false, category: 'movement' },
        13: { title: 'Your Focus', desc: 'Based on your Week 12 check-in, you\u2019ve selected your personalized focus area. Spend this week going deeper on what you need most.', icon: '\ud83c\udfaf', goal: 'Deep-dive your chosen focus area', cgm: false, category: 'personalized', personalized: true },
        14: { title: 'Your Focus', desc: 'Continue building consistency in your personalized focus. Your habits from Weeks 1\u201312 keep running \u2014 this is about strengthening your weakest link.', icon: '\ud83d\udd27', goal: 'Build consistency in your focus area', cgm: false, category: 'personalized', personalized: true },
        15: { title: 'Full Integration', desc: 'Your final CGM sensor goes on. Run your full system \u2014 all habits together. Handle a disruption (travel, social meal, busy day) and see how your habits hold.', icon: '\ud83d\udd04', goal: 'All habits running, navigate 1+ disruption with CGM', cgm: true, category: 'integration' },
        16: { title: 'Graduation', desc: 'Your final week. Compare your glucose data to Week 1. The difference is the proof that your habits work. If you\u2019ve met your graduation criteria \u2014 congratulations.', icon: '\ud83c\udf93', goal: 'All criteria met \u2014 graduate', cgm: true, category: 'graduation' }
      };

      var WEEKLY_RESOURCES = {
        2: { title: 'Protein Sources', sections: [
          { name: 'Animal Protein (per 4oz)', items: ['Chicken breast \u2014 31g', 'Ground turkey \u2014 22g', 'Salmon \u2014 25g', 'Eggs \u2014 6g each (12g for 2)', 'Greek yogurt \u2014 15\u201320g/cup', 'Cottage cheese \u2014 14g/\u00bd cup'] },
          { name: 'Plant Protein', items: ['Lentils \u2014 18g/cup', 'Black beans \u2014 15g/cup', 'Tofu firm \u2014 20g/\u00bd block', 'Edamame \u2014 17g/cup', 'Tempeh \u2014 21g/\u00bd cup'] },
          { name: 'Quick 30g Combos', items: ['2 eggs + Greek yogurt = 32g', '4oz chicken + salad = 33g', 'Salmon fillet + rice = 30g', 'Lentil soup + bread = 28g'] }
        ]},
        3: { title: 'Fiber Sources', sections: [
          { name: 'Vegetables', items: ['Broccoli \u2014 5g/cup', 'Brussels sprouts \u2014 4g/cup', 'Artichoke \u2014 7g each', 'Sweet potato \u2014 4g each', 'Spinach \u2014 4g/cup cooked'] },
          { name: 'Legumes & Grains', items: ['Lentils \u2014 16g/cup', 'Black beans \u2014 15g/cup', 'Chickpeas \u2014 12g/cup', 'Quinoa \u2014 5g/cup', 'Oats \u2014 4g/cup'] },
          { name: 'Fruits & Seeds', items: ['Raspberries \u2014 8g/cup', 'Chia seeds \u2014 10g/2tbsp', 'Avocado \u2014 10g each', 'Flax seeds \u2014 8g/2tbsp'] }
        ]},
        4: { title: 'Satiety Meal Ideas', sections: [
          { name: 'Breakfast', items: ['Greek yogurt + berries + chia + walnuts', 'Veggie egg scramble: 2 eggs + spinach + peppers + feta', 'Overnight oats + protein powder + banana + almond butter'] },
          { name: 'Lunch', items: ['Power bowl: chicken + quinoa + roasted veggies + tahini', 'Big salad: greens + salmon + avocado + chickpeas', 'Lentil soup + grilled chicken + whole grain bread'] },
          { name: 'Dinner', items: ['Sheet pan: salmon + broccoli + sweet potato', 'Stir-fry: chicken + peppers + snap peas over cauliflower rice', 'Taco bowl: turkey + black beans + greens + salsa + avocado'] }
        ]},
        5: { title: 'Healthy Fat Sources', sections: [
          { name: 'Cooking Fats', items: ['Extra virgin olive oil', 'Avocado oil', 'Coconut oil (moderate)'] },
          { name: 'Whole Food Fats', items: ['Avocado \u2014 15g fat/half', 'Almonds \u2014 14g/\u00bc cup', 'Walnuts \u2014 18g/\u00bc cup', 'Salmon, sardines, mackerel', 'Chia seeds \u2014 9g/2tbsp'] },
          { name: 'Condiment Fats', items: ['Nut butter \u2014 8g/tbsp', 'Tahini \u2014 8g/tbsp', 'Pesto \u2014 5g/tbsp'] }
        ]},
        7: { title: 'Hydration Guide', sections: [
          { name: 'Daily Routine', items: ['Glass when you wake up', 'Water 15 min before each meal', 'Water during and after exercise', 'Glass before bed'] },
          { name: 'If Plain Water Is Boring', items: ['Lemon, lime, or cucumber slices', 'Herbal tea counts', 'Sparkling water with fruit'] }
        ]},
        8: { title: 'Walking Guide', sections: [
          { name: 'Timing', items: ['Start within 15\u201330 min after eating', 'Best after your largest meal', '10\u201315 min is the sweet spot', 'Even 5 min helps'] },
          { name: 'Making It Easy', items: ['Keep shoes by the door', 'Walk around your block or office', 'Call a friend while walking'] }
        ]},
        12: { title: 'Strength Training Basics', sections: [
          { name: 'No-Gym Exercises', items: ['Squats \u2014 3 sets of 10', 'Push-ups (wall or floor) \u2014 3x8', 'Lunges \u2014 3x8 each leg', 'Plank \u2014 3x 20\u201330 sec'] },
          { name: 'Weekly Plan', items: ['Day 1: Upper (push-ups, rows, planks)', 'Day 2: Rest', 'Day 3: Lower (squats, lunges, bridges)', 'Keep sessions 20\u201330 min'] }
        ]},
        13: { title: 'Personalized Resources', sections: [
          { name: 'Sleep Hygiene', items: ['Same bedtime \u00b130 min, even weekends', 'Dim lights 1 hr before bed', 'Room: cool 65\u201368\u00b0F, dark, quiet', 'No screens 30 min before sleep'] },
          { name: 'Stress Management', items: ['Box breathing: inhale 4, hold 4, exhale 4, hold 4', '5 min daily beats weekly meditation', 'Short walk when stressed', 'Name the emotion out loud'] },
          { name: 'Snack Strategy', items: ['Protein-forward: yogurt, cheese + apple, nuts', 'Plan snacks, don\u2019t graze', 'Craving? Wait 10 min then decide'] },
          { name: 'Emotional Eating', items: ['HALT: Hungry, Angry, Lonely, Tired?', 'Not physical hunger? Address emotion first', '15-min rule: wait, then eat mindfully'] }
        ]}
      };

      var WEEK_EDUCATION_MAP = {
        1: ['cgm_basics', 'glp1_basics', 'patterns_101'],
        2: ['protein_anchor_p1', 'protein_muscle', 'meal_structure'],
        3: ['fiber_intro', 'gi_comfort'],
        4: ['satiety_playbook', 'satiety_skill'],
        5: ['pairing_glucose', 'carb_strategy'],
        6: ['meal_structure', 'appetite_return', 'hunger_basics'],
        7: ['hydration_p1', 'hunger_signals', 'understanding_fullness'],
        8: ['post_meal_move', 'post_meal_walk', 'cgm_transition'],
        9: ['patterns_101', 'cgm_transition', 'weight_after_glp1'],
        10: ['hunger_signals', 'fullness_signals', 'hunger_medication', 'emotional_hunger'],
        11: ['post_meal_maintenance', 'recovery_p1'],
        12: ['resistance_first', 'strength_taper', 'long_term_strength'],
        13: [], 14: [],
        15: ['drift_prevention', 'cgm_maintenance', 'quick_reset'],
        16: ['maintenance_playbook', 'scale_during_transition', 'maintenance_band_education']
      };

      var BLOCK_MILESTONES = {
        1: 'Build Your Satiety Foundation',
        2: 'Structure & Habits',
        3: 'Deepen Your Skills',
        4: 'Personalize & Graduate'
      };
      var GRADUATION_MILESTONES = {};
      for (var _mb = 1; _mb <= TOTAL_BLOCKS; _mb++) { var _mw = blockToWeeks(_mb); _mw.forEach(function(w) { GRADUATION_MILESTONES[w] = BLOCK_MILESTONES[_mb]; }); }

      var BLOCK_GOALS = {};
      for (var _bg = 1; _bg <= 16; _bg++) BLOCK_GOALS[_bg] = WEEKLY_FOCUSES[_bg];
      var WEEKLY_GOALS = BLOCK_GOALS;

      var BLOCK_EDUCATION = {};
      for (var _be = 1; _be <= 16; _be++) BLOCK_EDUCATION[_be] = { modules: WEEK_EDUCATION_MAP[_be] || [] };
      var WEEKLY_EDUCATION = BLOCK_EDUCATION;

      function getWeeklyFocus(wk) { return WEEKLY_FOCUSES[wk] || WEEKLY_FOCUSES[1]; }
      function getBlockTopic(b) { return null; }
      function getWeekTopic(wk) { return null; }
      function pBlockGoal(b) { return getWeeklyFocus(blockToWeeks(b)[0]); }
      function pWeekGoal(wk) { return getWeeklyFocus(wk); }
      function pBlockEdu(b) { return { modules: WEEK_EDUCATION_MAP[blockToWeeks(b)[0]] || [] }; }
      function pWeekEdu(wk) { return { modules: WEEK_EDUCATION_MAP[wk] || [] }; }
      function pBlockMilestone(b) { return BLOCK_MILESTONES[b] || ''; }
      function pWeekMilestone(wk) { return pBlockMilestone(weekToBlock(wk)); }

      var BLOCK_TOPICS = {};
      var WEEK_TOPICS = BLOCK_TOPICS;
      var DEFAULT_BLOCK_ORDER = ['baseline', 'structure', 'skills', 'personalized'];
      var DEFAULT_WEEK_ORDER = DEFAULT_BLOCK_ORDER;`
);

// ===== 2. Remove STRUGGLE_TO_TOPIC and buildPersonalizedWeekOrder =====
replaceSection(
  'var STRUGGLE_TO_TOPIC = {',
  "return ['baseline_cgm', sorted[0], 'movement_cgm', sorted[1]];\n      }",
  `function buildPersonalizedWeekOrder() { return DEFAULT_BLOCK_ORDER.slice(); }`
);

// ===== 3. Update onboarding (simplified + baseline assessment) =====
replaceSection(
  'var OB_TOTAL_STEPS = 18;',
  "container.appendChild(div);\n      }\n\n      function renderHome",
  `var OB_TOTAL_STEPS = 12;

      function obProgressBar(step) {
        var pct = Math.round((step / (OB_TOTAL_STEPS - 1)) * 100);
        return '<div style="padding:0 20px 12px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:0.625rem;color:var(--text-muted)">Step ' + (step + 1) + ' of ' + OB_TOTAL_STEPS + '</span><span style="font-size:0.625rem;color:var(--phase-accent);font-weight:600">' + pct + '%</span></div><div style="height:4px;background:#e2e8f0;border-radius:2px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:var(--phase-accent);border-radius:2px;transition:width 0.3s"></div></div></div>';
      }

      function obMultiSelect(items, selectedArr, dataAttr, cssClass) {
        return items.map(function(item) {
          var sel = selectedArr.indexOf(item.id) >= 0;
          return '<button type="button" class="' + cssClass + '" data-' + dataAttr + '="' + item.id + '" style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;border:2px solid ' + (sel ? 'var(--phase-accent)' : '#e2e8f0') + ';background:' + (sel ? 'var(--phase-accent-light)' : '#fff') + ';text-align:left;cursor:pointer;transition:all 0.15s;width:100%"><span style="font-size:1.25rem;flex-shrink:0">' + item.icon + '</span><div style="flex:1"><div style="font-size:0.8125rem;font-weight:' + (sel ? '700' : '600') + ';color:' + (sel ? 'var(--phase-accent)' : 'var(--text)') + '">' + item.label + '</div>' + (item.desc ? '<div style="font-size:0.6875rem;color:var(--text-muted);margin-top:2px">' + item.desc + '</div>' : '') + '</div><div style="width:22px;height:22px;border-radius:50%;border:2px solid ' + (sel ? 'var(--phase-accent)' : '#cbd5e1') + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + (sel ? 'var(--phase-accent)' : '#fff') + ';color:#fff;font-size:0.6875rem">' + (sel ? '&#10003;' : '') + '</div></button>';
        }).join('');
      }
      function obBindMultiSelect(div, cssClass, dataAttr, profileKey) {
        div.querySelectorAll('.' + cssClass).forEach(function(btn) {
          btn.onclick = function() {
            var id = btn.getAttribute('data-' + dataAttr);
            var arr = onboardProfile[profileKey] || [];
            var idx = arr.indexOf(id);
            if (idx >= 0) arr.splice(idx, 1); else arr.push(id);
            onboardProfile[profileKey] = arr;
            render();
          };
        });
      }

      function renderOnboarding(container) {
        var div = document.createElement('div');
        div.className = 'screen active onboarding';
        var p = onboardProfile;

        if (onboardStep === 0) {
          div.innerHTML = '<div style="padding:28px 20px;text-align:center">' +
            '<div style="font-size:3rem;margin-bottom:16px">\ud83c\udf93</div>' +
            '<h1 style="font-size:1.5rem;margin:0 0 8px">GLP-1 Graduation</h1>' +
            '<p style="font-size:0.9375rem;color:var(--text-muted);margin:0 0 24px;line-height:1.5">A 16-week program to build the habits and confidence you need to thrive after GLP-1.</p>' +
            '<div style="text-align:left;background:var(--phase-accent-light);border-radius:14px;padding:16px;margin:0 0 24px">' +
            '<p style="margin:0 0 8px;font-size:0.875rem;font-weight:700;color:var(--phase-accent)">One goal per week</p>' +
            '<ul style="margin:0;padding:0 0 0 18px;font-size:0.8125rem;color:var(--text);line-height:1.6">' +
            '<li>Weeks 1\u20134: Build your satiety foundation</li>' +
            '<li>Weeks 5\u20138: Structure & habits</li>' +
            '<li>Weeks 9\u201312: Deepen your skills</li>' +
            '<li>Weeks 13\u201316: Personalized to YOU</li></ul></div>' +
            '<button type="button" class="btn btn-primary" id="onboard-next" style="font-size:1.0625rem;padding:14px 20px;width:100%">Get started \u2192</button>' +
            '<p style="font-size:0.75rem;color:var(--text-muted);margin:16px 0 0">We do not provide medication advice. Work with your clinician for dosing decisions.</p></div>';
          div.querySelector('#onboard-next').onclick = function() { onboardStep = 1; render(); };

        } else if (onboardStep === 1) {
          var meds = ['Semaglutide (Ozempic/Wegovy)', 'Tirzepatide (Mounjaro/Zepbound)', 'Liraglutide (Saxenda)', 'Other GLP-1'];
          var statuses = ['Currently tapering', 'Planning to taper soon', 'Recently stopped (< 1 month)', 'Stopped 1\u20133 months ago', 'Stopped 3+ months ago'];
          div.innerHTML = obProgressBar(1) +
            '<div style="padding:0 20px"><h2 style="margin:0 0 6px;font-size:1.25rem">About you</h2>' +
            '<p style="font-size:0.8125rem;color:var(--text-muted);margin:0 0 16px;line-height:1.5">This helps us tailor your experience.</p>' +
            '<div class="card" style="padding:16px">' +
            '<label style="display:block;margin-bottom:14px"><span style="font-size:0.8125rem;font-weight:600;color:var(--text);display:block;margin-bottom:4px">First name</span><input type="text" id="ob-name" value="' + (p.name || '') + '" placeholder="Your first name" style="width:100%;padding:10px 12px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.9375rem;box-sizing:border-box" /></label>' +
            '<span style="font-size:0.8125rem;font-weight:600;color:var(--text);display:block;margin-bottom:8px">Which GLP-1?</span><div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">' +
            meds.map(function(m) { var sel = p.medication === m; return '<button type="button" class="ob-med-btn" data-med="' + m + '" style="padding:10px 12px;border-radius:10px;border:2px solid ' + (sel ? 'var(--phase-accent)' : '#e2e8f0') + ';background:' + (sel ? 'var(--phase-accent-light)' : '#fff') + ';text-align:left;font-size:0.8125rem;color:' + (sel ? 'var(--phase-accent)' : 'var(--text)') + ';font-weight:' + (sel ? '700' : '400') + ';cursor:pointer">' + m + '</button>'; }).join('') +
            '</div><span style="font-size:0.8125rem;font-weight:600;color:var(--text);display:block;margin-bottom:8px">Where are you now?</span><div style="display:flex;flex-direction:column;gap:6px">' +
            statuses.map(function(s) { var sel = p.medStatus === s; return '<button type="button" class="ob-stat-btn" data-stat="' + s + '" style="padding:10px 12px;border-radius:10px;border:2px solid ' + (sel ? 'var(--phase-accent)' : '#e2e8f0') + ';background:' + (sel ? 'var(--phase-accent-light)' : '#fff') + ';text-align:left;font-size:0.8125rem;color:' + (sel ? 'var(--phase-accent)' : 'var(--text)') + ';font-weight:' + (sel ? '700' : '400') + ';cursor:pointer">' + s + '</button>'; }).join('') +
            '</div></div>' +
            '<button type="button" class="btn btn-primary" id="ob-next1" style="width:100%;margin-top:16px;' + (p.name && p.medication && p.medStatus ? '' : 'opacity:0.5') + '">Continue \u2192</button></div>';
          div.querySelector('#ob-name').oninput = function() { onboardProfile.name = this.value.trim(); div.querySelector('#ob-next1').style.opacity = this.value.trim() && p.medication && p.medStatus ? '1' : '0.5'; };
          div.querySelectorAll('.ob-med-btn').forEach(function(b) { b.onclick = function() { onboardProfile.medication = b.getAttribute('data-med'); render(); }; });
          div.querySelectorAll('.ob-stat-btn').forEach(function(b) { b.onclick = function() { onboardProfile.medStatus = b.getAttribute('data-stat'); render(); }; });
          div.querySelector('#ob-next1').onclick = function() { if (!p.name || !p.medication || !p.medStatus) return; onboardStep = 2; render(); };

        } else if (onboardStep === 2) {
          var concerns = [
            { id: 'weight_regain', icon: '&#9878;', label: 'Weight regain', desc: 'I\u2019m worried I\u2019ll gain the weight back' },
            { id: 'appetite_return', icon: '&#129368;', label: 'Appetite coming back', desc: 'I\u2019m scared of feeling hungry again' },
            { id: 'no_habits', icon: '&#127793;', label: 'No lasting habits', desc: 'I don\u2019t have habits to replace the medication' },
            { id: 'glucose', icon: '&#128200;', label: 'Glucose instability', desc: 'My blood sugar might go haywire' },
            { id: 'emotional_eating', icon: '&#128546;', label: 'Emotional eating', desc: 'I eat when stressed, bored, or upset' },
            { id: 'dont_know', icon: '&#10067;', label: 'Don\u2019t know where to start', desc: 'I feel overwhelmed by the whole process' }
          ];
          var selected = p.concerns || [];
          div.innerHTML = obProgressBar(2) +
            '<div style="padding:0 20px"><h2 style="margin:0 0 6px;font-size:1.25rem">What worries you most?</h2>' +
            '<p style="font-size:0.8125rem;color:var(--text-muted);margin:0 0 16px;line-height:1.5">Select all that apply. This helps your Hunger Coach.</p>' +
            '<div style="display:flex;flex-direction:column;gap:8px">' + obMultiSelect(concerns, selected, 'concern', 'ob-concern-btn') + '</div>' +
            '<button type="button" class="btn btn-primary" id="ob-next2" style="width:100%;margin-top:16px;' + (selected.length > 0 ? '' : 'opacity:0.5') + '">Continue \u2192</button></div>';
          obBindMultiSelect(div, 'ob-concern-btn', 'concern', 'concerns');
          div.querySelector('#ob-next2').onclick = function() { if (!(p.concerns && p.concerns.length > 0)) return; onboardStep = 3; render(); };

        } else if (onboardStep === 3) {
          div.innerHTML = obProgressBar(3) +
            '<div style="padding:0 20px"><h2 style="margin:0 0 6px;font-size:1.25rem">Your weight</h2>' +
            '<p style="font-size:0.8125rem;color:var(--text-muted);margin:0 0 16px;line-height:1.5">This helps us set the right targets for you.</p>' +
            '<div class="card" style="padding:16px">' +
            '<label style="display:block;margin-bottom:14px"><span style="font-size:0.8125rem;font-weight:600;color:var(--text);display:block;margin-bottom:4px">Current weight (lbs)</span><input type="number" id="ob-wt" value="' + (p.weight || '') + '" placeholder="e.g. 185" min="80" max="500" style="width:100%;padding:10px 12px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.9375rem;box-sizing:border-box" /></label>' +
            '<label style="display:block;margin-bottom:14px"><span style="font-size:0.8125rem;font-weight:600;color:var(--text);display:block;margin-bottom:4px">Goal weight (lbs)</span><input type="number" id="ob-gw" value="' + (p.goalWeight || '') + '" placeholder="e.g. 165" min="80" max="500" style="width:100%;padding:10px 12px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.9375rem;box-sizing:border-box" /></label>' +
            '<div style="font-size:0.8125rem;font-weight:600;color:var(--text);display:block;margin-bottom:8px">Weight goal</div>' +
            '<div style="display:flex;flex-direction:column;gap:6px">' +
            [{ id: 'lose', label: 'Still losing \u2014 I haven\u2019t hit my goal weight yet' }, { id: 'maintain', label: 'Maintaining \u2014 I\u2019m at or near my goal' }].map(function(o) {
              var sel = p.weightMode === o.id;
              return '<button type="button" class="ob-wm-btn" data-wm="' + o.id + '" style="padding:10px 12px;border-radius:10px;border:2px solid ' + (sel ? 'var(--phase-accent)' : '#e2e8f0') + ';background:' + (sel ? 'var(--phase-accent-light)' : '#fff') + ';text-align:left;font-size:0.8125rem;color:' + (sel ? 'var(--phase-accent)' : 'var(--text)') + ';font-weight:' + (sel ? '700' : '400') + ';cursor:pointer">' + o.label + '</button>';
            }).join('') +
            '</div></div>' +
            '<button type="button" class="btn btn-primary" id="ob-next3" style="width:100%;margin-top:16px;' + (p.weight && p.weightMode ? '' : 'opacity:0.5') + '">Continue to baseline assessment \u2192</button></div>';
          div.querySelector('#ob-wt').oninput = function() { onboardProfile.weight = parseInt(this.value) || ''; };
          div.querySelector('#ob-gw').oninput = function() { onboardProfile.goalWeight = parseInt(this.value) || ''; };
          div.querySelectorAll('.ob-wm-btn').forEach(function(b) { b.onclick = function() { onboardProfile.weightMode = b.getAttribute('data-wm'); render(); }; });
          div.querySelector('#ob-next3').onclick = function() { if (!p.weight || !p.weightMode) return; onboardStep = 4; render(); };

        } else if (onboardStep >= 4 && onboardStep <= 11) {
          var qIdx = onboardStep - 4;
          var q = POST8_QUESTIONS[qIdx];
          var val = onboardAnswers[q.id] || 0;
          var labels = ['Not at all', 'A little', 'Sometimes', 'Usually', 'Always'];
          var html = obProgressBar(onboardStep) +
            '<div style="padding:0 20px">' +
            (qIdx === 0 ? '<div style="background:var(--phase-accent-light);border-radius:10px;padding:10px 12px;margin-bottom:16px"><p style="margin:0;font-size:0.8125rem;font-weight:600;color:var(--phase-accent)">Baseline Assessment</p><p style="margin:4px 0 0;font-size:0.75rem;color:var(--text-muted);line-height:1.4">These 8 questions establish your starting point. You\u2019ll answer them again at Weeks 4, 8, 12, and 16 to see your progress.</p></div>' : '') +
            '<p style="font-size:0.6875rem;font-weight:600;color:var(--phase-accent);text-transform:uppercase;letter-spacing:0.04em;margin:0 0 16px">Question ' + (qIdx + 1) + ' of 8</p>' +
            '<div style="text-align:center;margin-bottom:20px"><span style="font-size:2.5rem">' + q.icon + '</span></div>' +
            '<h2 style="margin:0 0 24px;font-size:1.125rem;text-align:center;line-height:1.4">' + q.text + '</h2>' +
            '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">';
          for (var r = 1; r <= 5; r++) {
            var sel = val === r;
            html += '<button type="button" class="ob-q-rating" data-val="' + r + '" style="padding:14px 16px;border-radius:12px;border:2px solid ' + (sel ? 'var(--phase-accent)' : '#e2e8f0') + ';background:' + (sel ? 'var(--phase-accent-light)' : '#fff') + ';text-align:left;cursor:pointer;display:flex;align-items:center;gap:12px;transition:all 0.15s"><div style="width:36px;height:36px;border-radius:50%;background:' + (sel ? 'var(--phase-accent)' : '#f1f5f9') + ';color:' + (sel ? '#fff' : 'var(--text-muted)') + ';display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;flex-shrink:0">' + r + '</div><span style="font-size:0.9375rem;font-weight:' + (sel ? '700' : '400') + ';color:' + (sel ? 'var(--phase-accent)' : 'var(--text)') + '">' + labels[r - 1] + '</span></button>';
          }
          html += '</div>';
          if (val > 0) html += '<button type="button" class="btn btn-primary" id="ob-q-next" style="width:100%">' + (qIdx < 7 ? 'Next question \u2192' : 'See your plan \u2192') + '</button>';
          html += '</div>';
          div.innerHTML = html;
          div.querySelectorAll('.ob-q-rating').forEach(function(btn) { btn.onclick = function() { onboardAnswers[q.id] = parseInt(btn.getAttribute('data-val')); render(); }; });
          if (div.querySelector('#ob-q-next')) {
            div.querySelector('#ob-q-next').onclick = function() {
              if (qIdx < 7) { onboardStep++; render(); }
              else {
                var areaScores = {};
                POST8_QUESTIONS.forEach(function(qq) {
                  if (!areaScores[qq.area]) areaScores[qq.area] = { sum: 0, count: 0 };
                  areaScores[qq.area].sum += (onboardAnswers[qq.id] || 3);
                  areaScores[qq.area].count++;
                });
                var ranked = Object.keys(areaScores).map(function(k) { return { area: k, avg: areaScores[k].sum / areaScores[k].count }; });
                ranked.sort(function(a, b) { return a.avg - b.avg; });
                onboardAnswers._ranked = ranked;
                onboardStep = 12;
                render();
              }
            };
          }

        } else if (onboardStep >= 12) {
          var html = '<div style="padding:0 20px">' +
            '<div style="text-align:center;margin:16px 0"><div style="font-size:2rem;margin-bottom:4px">\ud83d\udcc5</div><h2 style="margin:0 0 6px;font-size:1.125rem">Your 16-Week Plan</h2><p style="font-size:0.8125rem;color:var(--text-muted);margin:0">One focused goal each week, built for GLP-1 graduation.</p></div>';

          html += '<div class="card" style="border-left:4px solid var(--phase-accent);padding:16px">';
          var quarters = [
            { label: 'Satiety Foundation', weeks: [1,2,3,4], color: 'var(--phase-accent)' },
            { label: 'Structure & Habits', weeks: [5,6,7,8], color: '#2563eb' },
            { label: 'Deepen Skills', weeks: [9,10,11,12], color: '#16a34a' },
            { label: 'Personalized', weeks: [13,14,15,16], color: '#d97706' }
          ];
          quarters.forEach(function(q, qi) {
            html += '<div style="margin-bottom:' + (qi < 3 ? '12px;padding-bottom:12px;border-bottom:1px solid #f1f5f9' : '0') + '"><div style="font-size:0.6875rem;font-weight:700;color:' + q.color + ';text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">' + q.label + '</div>';
            q.weeks.forEach(function(wn) {
              var wf = WEEKLY_FOCUSES[wn];
              var hasCgm = CGM_SCHEDULE[wn];
              html += '<div style="display:flex;align-items:center;gap:8px;padding:4px 0"><div style="width:24px;height:24px;border-radius:50%;background:' + (hasCgm ? '#dbeafe' : '#f8fafc') + ';color:' + (hasCgm ? '#2563eb' : 'var(--text-muted)') + ';display:flex;align-items:center;justify-content:center;font-size:0.625rem;font-weight:700;flex-shrink:0">' + wn + '</div><span style="font-size:0.8125rem;color:var(--text)">' + wf.title + '</span>' + (hasCgm ? '<span style="font-size:0.5rem;background:#dbeafe;color:#2563eb;padding:1px 4px;border-radius:3px;font-weight:700">CGM</span>' : '') + '</div>';
            });
            html += '</div>';
          });
          html += '<div style="margin-top:8px;padding:6px 8px;background:#fef9c3;border-radius:6px;font-size:0.6875rem;color:#92400e;text-align:center">Check-ins at Weeks 4, 8, 12, and 16</div></div>';

          var weightMode = onboardProfile.weightMode || 'maintain';
          var wt = onboardProfile.weight || 0;
          var gw = onboardProfile.goalWeight || wt;
          html += '<div class="card" style="border-left:4px solid ' + (weightMode === 'lose' ? '#d97706' : '#16a34a') + ';padding:14px 16px"><h3 style="margin:0 0 6px;font-size:0.9375rem;color:' + (weightMode === 'lose' ? '#92400e' : '#16a34a') + '">' + (weightMode === 'lose' ? '\u2014 Weight Loss Mode' : '\u2014 Maintenance Mode') + '</h3>';
          if (weightMode === 'lose') {
            var diff = wt - gw;
            html += '<p style="font-size:0.8125rem;color:var(--text-muted);margin:0 0 8px;line-height:1.5">You\u2019re ' + diff + ' lbs from your goal of ' + gw + ' lbs. We\u2019ll track your progress toward your goal weight, then switch to maintenance mode once you reach it.</p>' +
              '<div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden"><div style="height:100%;width:' + Math.max(5, Math.round(((wt - diff) / wt) * 100)) + '%;background:#d97706;border-radius:3px"></div></div>' +
              '<div style="display:flex;justify-content:space-between;font-size:0.625rem;color:var(--text-muted);margin-top:4px"><span>' + gw + ' lbs (goal)</span><span>' + wt + ' lbs (current)</span></div>';
          } else {
            html += '<p style="font-size:0.8125rem;color:var(--text-muted);margin:0;line-height:1.5">Your maintenance band is ' + Math.round(wt * 0.97) + '\u2013' + Math.round(wt * 1.03) + ' lbs (\u00b13%). Normal daily fluctuations of 2\u20134 lbs are expected.</p>';
          }
          html += '</div>';

          html += '<button type="button" class="btn btn-primary" id="onboard-finish" style="width:100%;margin:16px 0 24px;font-size:1.0625rem;padding:14px 20px">Start Week 1 \ud83c\udf93</button></div>';
          div.innerHTML = html;
          div.querySelector('#onboard-finish').onclick = function() {
            state.onboardingComplete = true;
            state.program_enrolled_at = new Date().toISOString();
            state.phaseStartAt = new Date().toISOString().slice(0, 10);
            state.profile = JSON.parse(JSON.stringify(onboardProfile));
            state.week1CheckIn = { completedAt: new Date().toISOString(), answers: JSON.parse(JSON.stringify(onboardAnswers)) };
            state.weightMode = onboardProfile.weightMode || 'maintain';
            if (onboardProfile.weight) state.weightAnchor = onboardProfile.weight;
            if (onboardProfile.goalWeight) state.goalWeight = onboardProfile.goalWeight;
            saveState(state);
            analytics('glp1_program_enrolled', { concerns: onboardProfile.concerns, weightMode: onboardProfile.weightMode });
            onboardStep = 0; onboardAnswers = {}; onboardProfile = {};
            currentScreen = 'home'; currentNav = 'home'; render();
          };
        }

        container.appendChild(div);
      }

      function renderHome`,
  false
);

// ===== 4. Update check-in labels =====
src = src.replace(
  "var ciTitle = checkinWeek === 1 ? 'Baseline Check-In' : checkinWeek === 5 ? 'Mid-Program Check-In' : 'Post-Block 4 Check-In';",
  "var ciTitle = checkinWeek <= 4 ? 'Week ' + checkinWeek + ' Check-In' : 'Week ' + checkinWeek + ' Check-In';"
);
src = src.replace(
  "var ciEmoji = checkinWeek === 1 ? '&#128640;' : checkinWeek === 5 ? '&#128200;' : '&#127881;';",
  "var ciEmoji = checkinWeek <= 4 ? '&#128640;' : checkinWeek <= 8 ? '&#128200;' : checkinWeek <= 12 ? '&#127881;' : '&#127942;';"
);
src = src.replace(
  "var ciHeading = checkinWeek === 1 ? 'Your Starting Point' : checkinWeek === 5 ? 'Your Mid-Program Report' : 'Your Foundation Progress Report';",
  "var ciHeading = checkinWeek <= 4 ? 'Week ' + checkinWeek + ' Progress' : checkinWeek <= 8 ? 'Week ' + checkinWeek + ' Progress' : checkinWeek <= 12 ? 'Week ' + checkinWeek + ' Progress' : 'Graduation Report';"
);

// ===== 5. Update home block references =====
src = src.replace(
  "PROGRAM_NAME + ' \\u2014 Block ' + gb + ' (Wk ' + blockToWeeks(gb).join('\\u2013') + ')'",
  "PROGRAM_NAME + ' \\u2014 Week ' + gw + ': ' + getWeeklyFocus(gw).title"
);
if (src.includes("'Block ' + gb + ' of 8")) {
  src = src.replace("'Block ' + gb + ' of 8", "'Week ' + gw + ' of 16");
}
src = src.replace(
  "'Block ' + gb + ' (Wk ' + blockToWeeks(gb).join('\\u2013') + ')'",
  "'Week ' + gw"
);

// Update home focus card
src = src.replace(
  "'Block ' + gb + ' Focus: ' + weeklyGoal.title",
  "'Week ' + gw + ': ' + weeklyGoal.title"
);
src = src.replace("weeklyGoal.metric", "weeklyGoal.goal");
src = src.replace("weeklyGoal.metric", "weeklyGoal.goal");
src = src.replace("'Target: ' + weeklyGoal.goal", "'Goal: ' + weeklyGoal.goal");

// Update locked blocks reference
src = src.replace(
  "gb >= 5 && !isPhase2Unlocked(state)",
  "gw >= 13 && !isPhase2Unlocked(state)"
);
src = src.replace("'&#128274; Blocks 5\\u20138 Locked'", "'&#128274; Weeks 13\\u201316 Locked'");
src = src.replace(
  "'Complete blocks 1\\u20134 and the post-block-4 check-in to unlock your personalized final blocks.'",
  "'Complete weeks 1\\u201312 and the Week 12 check-in to unlock your personalized weeks.'"
);

// ===== 6. Update PROGRAM_TABLE =====
src = src.replace(
  "cgm: '4 sensor periods across 8 blocks: Block 1 (baseline) \\u2192 Block 3 (movement) \\u2192 Block 6 (validation) \\u2192 Block 8 (graduation).',",
  "cgm: '4 sensor periods: Wk 1\\u20132 (baseline) \\u2192 Wk 5 (satiety) \\u2192 Wk 8\\u20139 (movement) \\u2192 Wk 15\\u201316 (graduation).',"
);

// ===== 7. Update isPhase2Unlocked =====
src = src.replace(
  "function isPhase2Unlocked(s) {\n        if (s.postWeek8CheckIn && s.focusAreas && s.focusAreas.length > 0) return true;\n        return false;",
  "function isPhase2Unlocked(s) {\n        if ((s.postWeek8CheckIn || s.week12CheckIn) && s.focusAreas && s.focusAreas.length > 0) return true;\n        return false;"
);

// Write result
writeFileSync(FILE, src);
console.log('Done. File size:', src.length, 'chars');
