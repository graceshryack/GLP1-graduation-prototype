import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Dailies.css'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getWeekDates(center: Date) {
  const start = new Date(center)
  const day = start.getDay()
  start.setDate(start.getDate() - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function formatDateKey(d: Date) {
  return d.toISOString().slice(0, 10)
}

function formatDisplayDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function Dailies() {
  const { state, addWorkout, addWeight, setSleep } = useApp()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [showSleepModal, setShowSleepModal] = useState(false)

  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate])
  const dateKey = formatDateKey(selectedDate)
  const dayLog = state.logs[dateKey]
  const hasWorkout = dayLog?.workouts?.length ? dayLog.workouts.length > 0 : false
  const hasWeight = !!dayLog?.weight
  const hasSleep = dayLog?.sleepHours != null

  const handleLogWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const type = (form.querySelector('[name="workoutType"]') as HTMLSelectElement)?.value || 'Workout'
    const duration = (form.querySelector('[name="duration"]') as HTMLInputElement)?.value
    addWorkout({
      date: dateKey,
      type,
      durationMinutes: duration ? parseInt(duration, 10) : undefined,
    })
    setShowWorkoutModal(false)
  }

  const handleLogWeight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const value = parseFloat((form.querySelector('[name="weight"]') as HTMLInputElement)?.value || '0')
    if (value > 0) {
      addWeight({ date: dateKey, valueKg: value })
      setShowWeightModal(false)
    }
  }

  const handleLogSleep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const hours = parseFloat((form.querySelector('[name="sleepHours"]') as HTMLInputElement)?.value || '0')
    if (hours >= 0) {
      setSleep(dateKey, hours)
      setShowSleepModal(false)
    }
  }

  return (
    <>
      <header className="page-header dailies-header">
        <button type="button" className="icon-btn" aria-label="Search">🔍</button>
        <h1 className="dailies-title">{formatDisplayDate(selectedDate)}</h1>
        <button type="button" className="icon-btn" aria-label="Calendar">📅</button>
      </header>

      <div className="app-content">
        <div className="week-strip">
          {weekDates.map((d) => {
            const isSelected = formatDateKey(d) === dateKey
            return (
              <button
                key={d.getTime()}
                type="button"
                className={`week-day ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(d)}
              >
                <span className="week-day-name">{WEEK_DAYS[d.getDay()]}</span>
                <span className="week-day-num">{d.getDate()}</span>
                {state.logs[formatDateKey(d)]?.workouts?.length ? (
                  <span className="week-day-dot" />
                ) : (
                  <span className="week-day-placeholder">--</span>
                )}
              </button>
            )
          })}
        </div>

        <section className="card dailies-card">
          <div className="dailies-icon">🏃</div>
          <p className="dailies-status">
            {hasWorkout
              ? `Logged: ${dayLog!.workouts.map((w) => w.type).join(', ')}`
              : "You haven't logged any workout yet"}
          </p>
          <button
            type="button"
            className="btn-primary dailies-action"
            onClick={() => setShowWorkoutModal(true)}
          >
            <span className="btn-plus">+</span>
            Log workout
          </button>
        </section>

        <section className="card dailies-card">
          <h2 className="dailies-section-title">Body Measurements</h2>
          <div className="dailies-icon">⚖️</div>
          <p className="dailies-status">
            {hasWeight ? `Weight: ${dayLog!.weight!.valueKg} kg` : "You haven't logged any weight yet"}
          </p>
          <button
            type="button"
            className="btn-primary dailies-action"
            onClick={() => setShowWeightModal(true)}
          >
            <span className="btn-plus">+</span>
            Log weight
          </button>
        </section>

        <section className="card dailies-card">
          <h2 className="dailies-section-title">Sleep</h2>
          <div className="dailies-icon">🌙</div>
          <p className="dailies-status">
            {hasSleep ? `${dayLog!.sleepHours} hours logged` : "You haven't logged sleep yet"}
          </p>
          <button
            type="button"
            className="btn-primary dailies-action"
            onClick={() => setShowSleepModal(true)}
          >
            <span className="btn-plus">+</span>
            Log sleep
          </button>
        </section>
      </div>

      {showWorkoutModal && (
        <div className="modal-backdrop" onClick={() => setShowWorkoutModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log workout</h3>
            <form onSubmit={handleLogWorkout}>
              <label>
                Type
                <select name="workoutType">
                  <option value="Resistance">Resistance training</option>
                  <option value="Walking">Walking</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Duration (minutes)
                <input type="number" name="duration" min="1" max="300" placeholder="Optional" />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowWorkoutModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showWeightModal && (
        <div className="modal-backdrop" onClick={() => setShowWeightModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log weight</h3>
            <form onSubmit={handleLogWeight}>
              <label>
                Weight (kg)
                <input type="number" name="weight" step="0.1" min="20" max="300" required />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowWeightModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSleepModal && (
        <div className="modal-backdrop" onClick={() => setShowSleepModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log sleep</h3>
            <form onSubmit={handleLogSleep}>
              <label>
                Hours
                <input type="number" name="sleepHours" step="0.5" min="0" max="24" placeholder="e.g. 7" />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowSleepModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
