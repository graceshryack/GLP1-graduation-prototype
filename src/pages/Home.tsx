import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getMockCgmReadings, MOCK_CURRENT_GLUCOSE, MOCK_TIR, MOCK_SPD, MOCK_LST } from '../data/mockCgm'
import { PHASE_LABELS, PHASE_TABLE } from '../types'
import './Home.css'

export default function Home() {
  const { state } = useApp()
  const navigate = useNavigate()
  const readings = useMemo(() => getMockCgmReadings(), [])
  const min = Math.min(...readings.map((r) => r.value))
  const max = Math.max(...readings.map((r) => r.value))
  const range = max - min || 1
  const yBase = 70
  const yCeil = 250

  return (
    <>
      <header className="page-header home-header">
        <span className="header-title">Home</span>
        <button type="button" className="icon-btn" onClick={() => navigate('/profile')} aria-label="Profile">
          <ProfileIcon />
        </button>
      </header>

      <div className="app-content">
        {/* Current glucose */}
        <section className="card glucose-card">
          <h2 className="section-label">Current glucose</h2>
          <div className="glucose-value">
            <span className="glucose-num">{MOCK_CURRENT_GLUCOSE}</span>
            <span className="glucose-unit">mg/dL</span>
            <span className="glucose-trend" aria-hidden>→</span>
          </div>
          <div className="metrics-row">
            <span className="metric-badge tir">TIR {MOCK_TIR}%</span>
            <span className="metric-badge spd">SPD {MOCK_SPD}</span>
            <span className="metric-badge lst">
              LST {MOCK_LST}
              <button type="button" className="info-icon" aria-label="Info">i</button>
            </span>
          </div>
        </section>

        {/* Glucose graph */}
        <section className="card graph-card">
          <div className="graph-wrap">
            <svg className="glucose-graph" viewBox="0 0 320 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spikeGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#fef2f2" />
                  <stop offset="100%" stopColor="#fecaca" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              {/* 110 line */}
              <line
                x1="0"
                y1={((110 - yBase) / (yCeil - yBase)) * 120 + 10}
                x2="320"
                y2={((110 - yBase) / (yCeil - yBase)) * 120 + 10}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              {/* Fill under curve */}
              <path
                d={readings
                  .map((r, i) => {
                    const x = (i / (readings.length - 1)) * 300 + 10
                    const y = 130 - ((r.value - yBase) / (yCeil - yBase)) * 110
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                  })
                  .join(' ') + ` L 310 130 L 10 130 Z`}
                fill="url(#spikeGrad)"
                opacity={0.4}
              />
              {/* Line */}
              <polyline
                points={readings
                  .map((r, i) => {
                    const x = (i / (readings.length - 1)) * 300 + 10
                    const y = 130 - ((r.value - yBase) / (yCeil - yBase)) * 110
                    return `${x},${y}`
                  })
                  .join(' ')}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Current point */}
              <circle
                cx={300}
                cy={130 - ((MOCK_CURRENT_GLUCOSE - yBase) / (yCeil - yBase)) * 110}
                r="6"
                fill="#7c3aed"
                opacity={0.9}
              />
            </svg>
          </div>
          <div className="graph-axis">
            <span>70</span>
            <span>110</span>
            <span>250</span>
          </div>
          <div className="graph-time">
            <span>3:45p</span>
            <span>7:30p</span>
          </div>
          <div className="graph-events">
            <button type="button" className="event-btn" aria-label="Previous">←</button>
            <span className="event-icon" title="Meals">🍴 2</span>
            <span className="event-icon q">?</span>
            <span className="event-icon" title="Activity">🏃</span>
            <button type="button" className="event-btn add" onClick={() => navigate('/log')} aria-label="Add">+</button>
          </div>
          <p className="graph-source">Glucose by Stelo · updated just now</p>
        </section>

        {/* Today's habits */}
        <section className="card habits-card">
          <div className="habits-header">
            <h2>Today</h2>
            <span className="pinned-badge">PINNED</span>
          </div>
          <p className="focus-text">This week: {PHASE_TABLE[state.phase].optimize}</p>
          <p className="habits-summary">0/3 Completed</p>
          <ul className="habits-list">
            {state.habits.map((h) => (
              <li key={h.id} className="habit-item">
                <HabitIcon icon={h.icon} />
                <div className="habit-content">
                  <span className="habit-label">{h.label}</span>
                  {h.progressPct != null && (
                    <div className="habit-bar-wrap">
                      <div className="habit-bar" style={{ width: `${h.progressPct}%` }} />
                    </div>
                  )}
                </div>
                <span className="habit-fraction">{h.current}/{h.total}</span>
                <button type="button" className="habit-more" aria-label="More">⋯</button>
              </li>
            ))}
          </ul>
          <p className="habits-refresh">Habits refresh in 13 hr, 3 min</p>
          <button type="button" className="link-btn" onClick={() => navigate('/dailies')}>
            See all habits
          </button>
        </section>

        <div className="phase-pill">
          Phase {state.phase}: {PHASE_LABELS[state.phase]}
        </div>
      </div>
    </>
  )
}

function HabitIcon({ icon }: { icon: string }) {
  if (icon === 'protein') return <span className="habit-icon">🍴</span>
  if (icon === 'water') return <span className="habit-icon">💧</span>
  if (icon === 'steps') return <span className="habit-icon">🏃</span>
  return <span className="habit-icon">🏋️</span>
}

function ProfileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}
