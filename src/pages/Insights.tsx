import { useApp } from '../context/AppContext'
import { PHASE_LABELS, PHASE_SHORT, PHASE_TABLE } from '../types'
import './Insights.css'

export default function Insights() {
  const { state } = useApp()
  const phase = state.phase
  const t = PHASE_TABLE[phase]

  return (
    <>
      <header className="page-header">
        <h1>Insights</h1>
      </header>

      <div className="app-content">
        <div className="card phase-badge-card">
          <span className="phase-badge">{PHASE_SHORT[phase]}</span>
          <p>{PHASE_LABELS[phase]}</p>
        </div>

        <section className="card insights-card">
          <h2>What changes (phase emphasis)</h2>
          <p>{t.changes}</p>
        </section>

        <section className="card insights-card">
          <h2>CGM role</h2>
          <p>{t.cgm}</p>
        </section>

        <section className="card insights-card">
          <h2>Focus</h2>
          <p>{t.optimize}</p>
        </section>

        {phase === 2 && (
          <section className="card insight-cta">
            <h3>Transition: Full dose → reduced dose</h3>
            <p>Appetite return is expected; some regain may occur. Focus on structure, carb timing/pairing, and keep up walking and strength.</p>
          </section>
        )}

        {phase === 3 && (
          <section className="card insight-cta">
            <h3>Transition: Off GLP-1 — you&apos;re here</h3>
            <p>The goal is stability. Your habits have been training for this. We&apos;ll watch trends and help you stay in your maintenance band.</p>
          </section>
        )}

        <p className="insights-note">Insights use 7–14 day moving averages to avoid overreaction, especially during taper.</p>
      </div>
    </>
  )
}
