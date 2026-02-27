import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Dailies from './pages/Dailies'
import Insights from './pages/Insights'
import Learn from './pages/Learn'
import Log from './pages/Log'
import Profile from './pages/Profile'

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const { state } = useApp()
  if (!state.onboardingComplete) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/"
        element={
          <RequireOnboarding>
            <Layout />
          </RequireOnboarding>
        }
      >
        <Route index element={<Home />} />
        <Route path="dailies" element={<Dailies />} />
        <Route path="insights" element={<Insights />} />
        <Route path="learn" element={<Learn />} />
        <Route path="log" element={<Log />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
