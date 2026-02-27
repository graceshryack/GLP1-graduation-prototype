import { useApp } from '../context/AppContext'
import { PHASE_LABELS, type Phase } from '../types'
import './Learn.css'

const PHASE_MODULES: Record<Phase, { title: string; description: string }[]> = {
  1: [
    { title: 'GLP-1 basics', description: 'How your medication supports weight and metabolic health, and why building habits now matters.' },
    { title: 'Protein & muscle', description: 'Why protein and resistance training are anchors for long-term maintenance.' },
    { title: 'Meal structure', description: 'Simple meal structure that supports stable glucose and satiety.' },
    { title: 'How to use CGM', description: 'CGM as a coach: patterns over single numbers, no perfection chasing.' },
  ],
  2: [
    { title: 'Appetite return', description: 'What to expect as your dose changes and how to respond with structure, not restriction.' },
    { title: 'Weight regain normalization', description: 'Why some regain is common and how we focus on trends and behaviors, not the scale alone.' },
    { title: 'Carb strategy', description: 'Timing and pairing carbs to keep glucose and energy stable.' },
    { title: 'Maintenance mindset', description: 'Shifting from loss to stability and confidence without medication.' },
  ],
  3: [
    { title: 'Maintenance playbook', description: 'Your long-term habits: structure, protein, strength, and CGM trends.' },
    { title: 'Handling holidays & travel', description: 'Flexible structure and if-then plans so you don’t drift.' },
    { title: 'Stress, sleep & glucose', description: 'How sleep and stress affect glucose and what to prioritize.' },
    { title: 'Long-term strength plan', description: 'Resistance training as your maintenance replacement strategy.' },
  ],
}

export default function Learn() {
  const { state } = useApp()
  const phase = state.phase
  const modules = PHASE_MODULES[phase]

  return (
    <>
      <header className="page-header">
        <h1>Learn</h1>
      </header>

      <div className="app-content">
        <div className="card learn-intro">
          <p>Education tailored to your phase. Same topics, different emphasis.</p>
          <span className="phase-tag">Phase {phase}: {PHASE_LABELS[phase]}</span>
        </div>

        <ul className="modules-list">
          {modules.map((mod, i) => (
            <li key={i} className="card module-card">
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
              <button type="button" className="module-btn">Read</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
