import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PHASE_LABELS, PHASE_SHORT, PHASE_TABLE, type Phase } from '../types'
import './Profile.css'

const DOSE_CHANGE_LABELS: Record<string, string> = {
  decreased: 'Dose decreased',
  switching_formulation: 'Switching formulation',
  stopping: 'Stopping',
}

export default function Profile() {
  const { state, setPhase, addDoseChange } = useApp()
  const navigate = useNavigate()
  const [newPhase, setNewPhase] = useState<Phase>(state.phase)
  const [showDoseModal, setShowDoseModal] = useState(false)
  const t = PHASE_TABLE[state.phase]

  const handlePhaseSave = () => {
    setPhase(newPhase)
  }

  const handleDoseChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const type = (form.querySelector('[name="doseType"]') as HTMLSelectElement)?.value as 'decreased' | 'switching_formulation' | 'stopping'
    const note = (form.querySelector('[name="note"]') as HTMLInputElement)?.value?.trim()
    addDoseChange({
      date: new Date().toISOString().slice(0, 10),
      type,
      note: note || undefined,
    })
    setShowDoseModal(false)
  }

  return (
    <>
      <header className="page-header profile-header">
        <button type="button" className="icon-btn" onClick={() => navigate('/')} aria-label="Back">←</button>
        <h1>Settings</h1>
        <span />
      </header>

      <div className="app-content">
        <section className="card profile-card">
          <h2>Medication phase</h2>
          <p className="profile-phase-desc">Toggle to change what the app emphasizes. Requirements and focus update for each phase.</p>
          <div className="phase-toggle">
            {([1, 2, 3] as Phase[]).map((p) => (
              <button
                key={p}
                type="button"
                className={`phase-opt ${newPhase === p ? 'selected' : ''}`}
                onClick={() => setNewPhase(p)}
              >
                <strong>{PHASE_SHORT[p]}</strong>
                <span>{PHASE_LABELS[p]}</span>
              </button>
            ))}
          </div>
          <button type="button" className="btn-primary profile-btn" onClick={handlePhaseSave}>
            Save phase
          </button>
        </section>

        <section className="card profile-card phase-table-card">
          <h2>Current phase: {PHASE_LABELS[state.phase]}</h2>
          <div className="phase-table">
            <h4>Who it&apos;s for</h4>
            <p>{t.who}</p>
            <h4>Primary goal</h4>
            <p>{t.goal}</p>
            <h4>What stays the same</h4>
            <p>{t.same}</p>
            <h4>What changes</h4>
            <p>{t.changes}</p>
            <h4>Do</h4>
            <p>{t.do}</p>
            <h4>Don&apos;t</h4>
            <p>{t.dont}</p>
            <h4>CGM role</h4>
            <p>{t.cgm}</p>
            <h4>Focus</h4>
            <p>{t.optimize}</p>
          </div>
        </section>

        <section className="card profile-card">
          <h3 className="phase-similar-title">How phases are different but similar</h3>
          <p className="phase-similar-p">
            Same app scaffold (CGM + logging + weekly plan + education), same core actions (protein, structure, resistance training), same supportive tone. What you optimize shifts: learning + consistency → adaptation + reassurance → maintenance + autonomy.
          </p>
        </section>

        <section className="card profile-card">
          <h2>Dose changes</h2>
          <p className="profile-phase-desc">Log when you reduce dose, switch formulation, or stop.</p>
          {state.doseChangeEvents.length === 0 ? (
            <p className="profile-empty">No dose changes logged yet.</p>
          ) : (
            <ul className="dose-list">
              {state.doseChangeEvents.map((e) => (
                <li key={e.id}>
                  <span className="dose-type">{DOSE_CHANGE_LABELS[e.type]}</span>
                  <span className="dose-date">{e.date}</span>
                  {e.note && <span className="dose-note">{e.note}</span>}
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="btn-secondary profile-btn" onClick={() => setShowDoseModal(true)}>
            Log dose change
          </button>
        </section>

        <section className="card profile-card">
          <h2>Expected timeline</h2>
          <p className="profile-timeline">
            {state.expectedPhaseTimeline || 'Not set. Add a rough timeline in onboarding or here.'}
          </p>
        </section>
      </div>

      {showDoseModal && (
        <div className="modal-backdrop" onClick={() => setShowDoseModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log dose change</h3>
            <form onSubmit={handleDoseChangeSubmit}>
              <label>
                Type
                <select name="doseType">
                  <option value="decreased">Dose decreased</option>
                  <option value="switching_formulation">Switching formulation</option>
                  <option value="stopping">Stopping</option>
                </select>
              </label>
              <label>
                Note (optional)
                <input type="text" name="note" placeholder="e.g. Reduced from 1.0 to 0.5 mg" />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowDoseModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
