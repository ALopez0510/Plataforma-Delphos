import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import Screen1Register from './screens/Screen1Register'
import Screen2Onboarding from './screens/Screen2Onboarding'
import Screen2bCareerSelect from './screens/Screen2bCareerSelect'
import Screen3Dashboard from './screens/Screen3Dashboard'
import Screen4Missions from './screens/Screen4Missions'
import Screen5Workspace from './screens/Screen5Workspace'
import Screen6Victory from './screens/Screen6Victory'
import Screen7Community from './screens/Screen7Community'
import Screen8Profile from './screens/Screen8Profile'
import {
  LayoutDashboard, Target, Briefcase, Users, User2,
} from 'lucide-react'

// ── Nav items (only visible after login) ─────────────────────────────────────
const NAV_ITEMS = [
  { id: 3, label: 'Dashboard', Icon: LayoutDashboard },
  { id: 4, label: 'Misiones', Icon: Target },
  { id: 5, label: 'Workspace', Icon: Briefcase },
  { id: 7, label: 'Comunidad', Icon: Users },
  { id: 8, label: 'Perfil', Icon: User2 },
]

// screens that should NOT show the nav bar
const PRE_LOGIN_SCREENS = new Set([1, 2, 9])

// ── Bottom dock nav ───────────────────────────────────────────────────────────
function BottomNav({ current, onNavigate }) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 22, stiffness: 260, delay: 0.1 }}
      style={{
        position: 'fixed', bottom: '18px', left: 0, right: 0,
        zIndex: 1000,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        background: 'rgba(20,20,20,0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '6px 10px',
        display: 'flex', gap: '2px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
        pointerEvents: 'auto',
      }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = current === id
          return (
            <motion.button
              key={id}
              onClick={() => onNavigate(id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                padding: '8px 18px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                background: active ? 'rgba(255,69,0,0.15)' : 'transparent',
                position: 'relative', transition: 'background 0.2s',
              }}
            >
              {/* Active glow dot */}
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  style={{
                    position: 'absolute', top: '5px',
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: '#FF4500',
                    boxShadow: '0 0 6px rgba(255,69,0,0.8)',
                  }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={active ? 2.5 : 1.8}
                color={active ? '#FF4500' : '#555'}
                style={{ transition: 'color 0.2s' }}
              />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: active ? 700 : 500,
                color: active ? '#FF4500' : '#555', letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}>
                {label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
function App() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [activeMission, setActiveMission] = useState(null)
  const [oracleAnswers, setOracleAnswers] = useState([])

  const navigate = (screenId) => setCurrentScreen(screenId)

  const handleLogout = () => {
    setActiveMission(null)
    setOracleAnswers([])
    setCurrentScreen(1)
  }

  const handleStartMission = (mission) => {
    setActiveMission(mission)
    navigate(5)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 1: return <Screen1Register onNext={() => navigate(2)} />
      case 2: return (
        <Screen2Onboarding
          onNext={(answers) => { setOracleAnswers(answers); navigate(9) }}
        />
      )
      case 9: return (
        <Screen2bCareerSelect
          oracleAnswers={oracleAnswers}
          onConfirm={(_picks) => navigate(3)}
          onBackToOracle={() => { setOracleAnswers([]); navigate(2) }}
        />
      )
      case 3: return <Screen3Dashboard onNavigate={navigate} activeMission={activeMission} />
      case 4: return <Screen4Missions onStartMission={handleStartMission} onNavigate={navigate} />
      case 5: return <Screen5Workspace onNext={() => navigate(6)} onNavigate={navigate} activeMission={activeMission} />
      case 6: return <Screen6Victory onNext={() => { setActiveMission(null); navigate(3) }} />
      case 7: return <Screen7Community onNavigate={navigate} />
      case 8: return <Screen8Profile onNavigate={navigate} onLogout={handleLogout} />
      default: return <Screen1Register onNext={() => navigate(2)} />
    }
  }

  const showNav = !PRE_LOGIN_SCREENS.has(currentScreen)

  return (
    <div style={{ minHeight: '100vh', background: '#111111', position: 'relative', paddingBottom: showNav ? '88px' : '0' }}>
      {renderScreen()}
      <AnimatePresence>
        {showNav && (
          <BottomNav current={currentScreen} onNavigate={navigate} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App