import type { CGMReading } from '../types'

// Mock CGM readings for ~3:45p to 7:30p with a couple of spikes
const baseTime = new Date()
baseTime.setHours(15, 45, 0, 0)

function addMinutes(d: Date, m: number) {
  const out = new Date(d)
  out.setMinutes(out.getMinutes() + m)
  return out
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function getMockCgmReadings(): CGMReading[] {
  const readings: CGMReading[] = []
  let t = new Date(baseTime)
  let value = 95
  const end = addMinutes(baseTime, 225) // ~3h 45m

  while (t <= end) {
    const mins = (t.getTime() - baseTime.getTime()) / 60000
    // Spike around 5:00p (mins ~75), smaller around 4:15 (mins ~30)
    let spike = 0
    if (mins >= 25 && mins <= 45) spike = 60 * Math.exp(-((mins - 32) ** 2) / 80)
    if (mins >= 60 && mins <= 95) spike = 220 * Math.exp(-((mins - 78) ** 2) / 120)
    if (mins > 180) value = 105 + (Math.random() - 0.5) * 15
    else value = Math.round(95 + spike + (Math.random() - 0.5) * 8)
    value = Math.max(70, Math.min(260, value))
    readings.push({ time: formatTime(t), value })
    t = addMinutes(t, 5)
  }
  return readings
}

export const MOCK_CURRENT_GLUCOSE = 110
export const MOCK_TIR = 85
export const MOCK_SPD = 5
export const MOCK_LST = '5:30p'
