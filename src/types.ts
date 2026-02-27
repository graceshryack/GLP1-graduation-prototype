export type Phase = 1 | 2 | 3

export const PHASE_LABELS: Record<Phase, string> = {
  1: 'On GLP-1 (Foundation)',
  2: 'Dose Reduction / Transition',
  3: 'Off GLP-1 (Maintenance)',
}

export const PHASE_SHORT: Record<Phase, string> = {
  1: 'On GLP-1',
  2: 'Transiting off',
  3: 'Totally off',
}

export const PHASE_TABLE: Record<Phase, { who: string; goal: string; same: string; changes: string; do: string; dont: string; cgm: string; optimize: string }> = {
  1: {
    who: 'Starting or stabilized dose',
    goal: 'Learn + build habits while friction is low',
    same: 'Same app surfaces: CGM insights, food/exercise tracking, education, weekly check-ins',
    changes: 'Education-heavy; small changes; reduced "precision pressure"',
    do: 'Consistent protein, meal structure, start resistance training.',
    dont: 'Aggressive restriction or "perfect glucose" chasing.',
    cgm: 'Teach patterns: personal spike triggers, meal composition basics, routine building.',
    optimize: 'Phase 1 optimizes learning + consistency',
  },
  2: {
    who: 'Tapering dose or switching formulations',
    goal: 'Transfer control from med → habits while appetite returns',
    same: 'Same surfaces; weekly structure; same "core actions"',
    changes: 'Normalize appetite return + expected regain; add moderate precision tools (timing/pairing/activity)',
    do: 'Keep structure even when hungry; maintain lifting; trend-based thinking.',
    dont: 'Reactive dieting due to scale movement.',
    cgm: 'Explain variability changes; show "what changed vs last dose" insights; guide carb timing/pairing.',
    optimize: 'Phase 2 optimizes adaptation + emotional reassurance',
  },
  3: {
    who: 'Discontinued meds',
    goal: 'Stability + confidence without medication',
    same: 'Same habits, same dashboards, same cadence',
    changes: 'Most education shifts from "learning" to "refinement"; prevention of drift',
    do: 'Flexible structure, routines, maintenance mindset.',
    dont: 'All-or-nothing resets.',
    cgm: 'Early drift detection (trends), reinforce routines, prevent slow regression.',
    optimize: 'Phase 3 optimizes maintenance + autonomy',
  },
}

export interface DoseChangeEvent {
  id: string
  date: string
  type: 'decreased' | 'switching_formulation' | 'stopping'
  note?: string
}

export interface UserState {
  phase: Phase
  doseChangeEvents: DoseChangeEvent[]
  expectedPhaseTimeline?: string
  onboardingComplete: boolean
}

export interface CGMReading {
  time: string
  value: number
}

export interface Habit {
  id: string
  label: string
  icon: 'protein' | 'water' | 'steps' | 'workout'
  target: string
  current: number
  total: number
  unit?: string
  progressPct?: number
}

export interface LoggedWorkout {
  id: string
  date: string
  type: string
  durationMinutes?: number
  note?: string
}

export interface LoggedWeight {
  id: string
  date: string
  valueKg: number
  note?: string
}

export interface DailyLog {
  date: string
  workouts: LoggedWorkout[]
  weight?: LoggedWeight
  sleepHours?: number
}
