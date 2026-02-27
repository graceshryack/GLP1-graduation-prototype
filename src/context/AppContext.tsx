import React, { createContext, useContext, useReducer, useCallback } from 'react'
import type { Phase, UserState, DoseChangeEvent, Habit, LoggedWorkout, LoggedWeight, DailyLog } from '../types'

type Action =
  | { type: 'SET_PHASE'; payload: Phase }
  | { type: 'SET_EXPECTED_TIMELINE'; payload: string }
  | { type: 'SET_ONBOARDING_COMPLETE'; payload: boolean }
  | { type: 'ADD_DOSE_CHANGE'; payload: DoseChangeEvent }
  | { type: 'SET_HABITS'; payload: Habit[] }
  | { type: 'UPDATE_HABIT'; payload: { id: string; current: number } }
  | { type: 'ADD_WORKOUT'; payload: LoggedWorkout }
  | { type: 'ADD_WEIGHT'; payload: LoggedWeight }
  | { type: 'SET_SLEEP'; payload: { date: string; hours: number } }

const initialState: UserState = {
  phase: 1,
  doseChangeEvents: [],
  onboardingComplete: false,
}

const defaultHabits: Habit[] = [
  { id: 'protein', label: 'Log 30g of protein today', icon: 'protein', target: '30g', current: 1, total: 2, progressPct: 50 },
  { id: 'water', label: 'Drink 8 oz of water with 2 meals', icon: 'water', target: '2 meals', current: 1, total: 2 },
  { id: 'steps', label: 'Walk 7,000 steps today', icon: 'steps', target: '7,000', current: 1, total: 2 },
]

interface AppState extends UserState {
  habits: Habit[]
  logs: Record<string, DailyLog>
}

const stored = (() => {
  try {
    const s = localStorage.getItem('signos-glp1-state')
    if (s) return JSON.parse(s) as Partial<AppState>
  } catch (_) {}
  return {}
})()

const initialAppState: AppState = {
  ...initialState,
  ...stored,
  habits: stored.habits ?? defaultHabits,
  logs: stored.logs ?? {},
  doseChangeEvents: stored.doseChangeEvents ?? [],
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload }
    case 'SET_EXPECTED_TIMELINE':
      return { ...state, expectedPhaseTimeline: action.payload }
    case 'SET_ONBOARDING_COMPLETE':
      return { ...state, onboardingComplete: action.payload }
    case 'ADD_DOSE_CHANGE':
      return { ...state, doseChangeEvents: [...state.doseChangeEvents, action.payload] }
    case 'SET_HABITS':
      return { ...state, habits: action.payload }
    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map((h) =>
          h.id === action.payload.id ? { ...h, current: action.payload.current } : h
        ),
      }
    case 'ADD_WORKOUT': {
      const date = action.payload.date
      const day = state.logs[date] ?? { date, workouts: [], weight: undefined, sleepHours: undefined }
      return {
        ...state,
        logs: {
          ...state.logs,
          [date]: { ...day, workouts: [...day.workouts, action.payload] },
        },
      }
    }
    case 'ADD_WEIGHT': {
      const date = action.payload.date
      const day = state.logs[date] ?? { date, workouts: [], weight: undefined, sleepHours: undefined }
      return {
        ...state,
        logs: { ...state.logs, [date]: { ...day, weight: action.payload } },
      }
    }
    case 'SET_SLEEP': {
      const { date, hours } = action.payload
      const day = state.logs[date] ?? { date, workouts: [], weight: undefined, sleepHours: undefined }
      return {
        ...state,
        logs: { ...state.logs, [date]: { ...day, sleepHours: hours } },
      }
    }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
  setPhase: (p: Phase) => void
  setExpectedTimeline: (t: string) => void
  completeOnboarding: () => void
  addDoseChange: (e: Omit<DoseChangeEvent, 'id'>) => void
  updateHabit: (id: string, current: number) => void
  addWorkout: (w: Omit<LoggedWorkout, 'id'>) => void
  addWeight: (w: Omit<LoggedWeight, 'id'>) => void
  setSleep: (date: string, hours: number) => void
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialAppState)

  React.useEffect(() => {
    const toStore = {
      phase: state.phase,
      onboardingComplete: state.onboardingComplete,
      doseChangeEvents: state.doseChangeEvents,
      expectedPhaseTimeline: state.expectedPhaseTimeline,
      habits: state.habits,
      logs: state.logs,
    }
    localStorage.setItem('signos-glp1-state', JSON.stringify(toStore))
  }, [state])

  const setPhase = useCallback((p: Phase) => dispatch({ type: 'SET_PHASE', payload: p }), [])
  const setExpectedTimeline = useCallback((t: string) => dispatch({ type: 'SET_EXPECTED_TIMELINE', payload: t }), [])
  const completeOnboarding = useCallback(() => dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: true }), [])
  const addDoseChange = useCallback(
    (e: Omit<DoseChangeEvent, 'id'>) =>
      dispatch({
        type: 'ADD_DOSE_CHANGE',
        payload: { ...e, id: crypto.randomUUID() },
      }),
    []
  )
  const updateHabit = useCallback(
    (id: string, current: number) => dispatch({ type: 'UPDATE_HABIT', payload: { id, current } }),
    []
  )
  const addWorkout = useCallback(
    (w: Omit<LoggedWorkout, 'id'>) =>
      dispatch({ type: 'ADD_WORKOUT', payload: { ...w, id: crypto.randomUUID() } }),
    []
  )
  const addWeight = useCallback(
    (w: Omit<LoggedWeight, 'id'>) =>
      dispatch({ type: 'ADD_WEIGHT', payload: { ...w, id: crypto.randomUUID() } }),
    []
  )
  const setSleep = useCallback(
    (date: string, hours: number) => dispatch({ type: 'SET_SLEEP', payload: { date, hours } }),
    []
  )

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
    setPhase,
    setExpectedTimeline,
    completeOnboarding,
        addDoseChange,
        updateHabit,
        addWorkout,
        addWeight,
        setSleep,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
