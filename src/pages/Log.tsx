import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Log.css'

const todayKey = new Date().toISOString().slice(0, 10)

export default function Log() {
  const app = useApp()
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState<'food' | 'workout' | 'weight'>('workout')

  const handleLogWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const type = (form.querySelector('[name="workoutType"]') as HTMLSelectElement)?.value || 'Workout'
    const duration = (form.querySelector('[name="duration"]') as HTMLInputElement)?.value
    app.addWorkout({
      date: todayKey,
      type,
      durationMinutes: duration ? parseInt(duration, 10) : undefined,
    })
    nav('/dailies')
  }

  const handleLogWeight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const value = parseFloat((form.querySelector('[name="weight"]') as HTMLInputElement)?.value || '0')
    if (value > 0) {
      app.addWeight({ date: todayKey, valueKg: value })
      nav('/dailies')
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Log</h1>
      </header>

      <div className="app-content">
        <div className="log-tabs">
          <button
            type="button"
            className={`log-tab ${activeTab === 'food' ? 'active' : ''}`}
            onClick={() => setActiveTab('food')}
          >
            Meal
          </button>
          <button
            type="button"
            className={`log-tab ${activeTab === 'workout' ? 'active' : ''}`}
            onClick={() => setActiveTab('workout')}
          >
            Workout
          </button>
          <button
            type="button"
            className={`log-tab ${activeTab === 'weight' ? 'active' : ''}`}
            onClick={() => setActiveTab('weight')}
          >
            Weight
          </button>
        </div>

        {activeTab === 'food' && (
          <section className="card log-card">
            <p className="log-placeholder">Log a meal to track protein and impact on glucose. Connect your tracker or log manually from Dailies.</p>
            <button type="button" className="btn-secondary" onClick={() => nav('/dailies')}>
              Go to Dailies
            </button>
          </section>
        )}

        {activeTab === 'workout' && (
          <section className="card log-card">
            <h2>Log workout</h2>
            <p className="log-hint">Resistance training and structured activity are core to your maintenance plan.</p>
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
              <button type="submit" className="btn-primary">Save</button>
            </form>
          </section>
        )}

        {activeTab === 'weight' && (
          <section className="card log-card">
            <h2>Log weight</h2>
            <p className="log-hint">We use trends, not single readings. During taper, focus on habits; scale is one signal.</p>
            <form onSubmit={handleLogWeight}>
              <label>
                Weight (kg)
                <input type="number" name="weight" step="0.1" min="20" max="300" required />
              </label>
              <button type="submit" className="btn-primary">Save</button>
            </form>
          </section>
        )}
      </div>
    </>
  )
}
