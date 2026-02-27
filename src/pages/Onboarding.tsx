import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PHASE_LABELS, type Phase } from '../types'
import './Onboarding.css'

export default function Onboarding() {
  const { setPhase, setExpectedTimeline, completeOnboarding, state } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedPhase, setSelectedPhase] = useState<Phase>(state.phase)
  const [timeline, setTimeline] = useState(state.expectedPhaseTimeline ?? '')

  const handleFinish = () => {
    setPhase(selectedPhase)
    if (timeline.trim()) setExpectedTimeline(timeline.trim())
    completeOnboarding()
    navigate('/')
  }

  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <header className="onboarding-header">
          <h1>GLP-1 Transition</h1>
          <p>Same program, different emphasis. We’ll adapt your plan to your phase.</p>
        </header>

        {step === 1 && (
          <section className="onboarding-step">
            <h2>Where are you in your journey?</h2>
            <p className="onboarding-hint">This sets your weekly plan and insights.</p>
            <div className="phase-cards">
              {([1, 2, 3] as Phase[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`phase-card ${selectedPhase === p ? 'selected' : ''}`}
                  onClick={() => setSelectedPhase(p)}
                >
                  <span className="phase-num">Phase {p}</span>
                  <span className="phase-title">{PHASE_LABELS[p]}</span>
                </button>
              ))}
            </div>
            <button type="button" className="btn-primary onboarding-next" onClick={() => setStep(2)}>
              Next
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="onboarding-step">
            <h2>Expected timeline (optional)</h2>
            <p className="onboarding-hint">e.g. “Reduce dose in 2 months” or “Planning to stop in 3 months”</p>
            <input
              type="text"
              className="onboarding-input"
              placeholder="Rough timeline or leave blank"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            />
            <div className="onboarding-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn-primary" onClick={handleFinish}>
                Get started
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
