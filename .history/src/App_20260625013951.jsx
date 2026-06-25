import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { CAFE_MODES } from './data/cafeModes'
import { DEFAULT_DRINK_INDEX, DRINKS } from './data/drinks'
import { createTimerSounds } from './hooks/useTimerSounds'
import CafeToast from './pages/CafeToast'
import DrinkSelect from './pages/DrinkSelect'
import TimerPage from './pages/TimerPage'

function App() {
  const [screen, setScreen] = useState('enter')
  const [cafeModeIndex, setCafeModeIndex] = useState(0)
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(DEFAULT_DRINK_INDEX)
  const soundsRef = useRef(null)
  const cafeMode = CAFE_MODES[cafeModeIndex]
  const selectedDrink = DRINKS[selectedDrinkIndex]

  const screenTransition = {
    initial: { opacity: 0, y: 12, scale: 0.998 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 1.002 },
  }

  const handleOrderComplete = (drinkIndex) => {
    setSelectedDrinkIndex(drinkIndex)

    if (!soundsRef.current) {
      soundsRef.current = createTimerSounds()
    }

    soundsRef.current.start()
    setScreen('timer')
  }

  const handleLeaveTimer = () => {
    setScreen('enter')
  }

  let currentScreen = (
    <CafeToast
      modeIndex={cafeModeIndex}
      onModeChange={setCafeModeIndex}
      onEnter={() => setScreen('drink-select')}
    />
  )

  if (screen === 'drink-select') {
    currentScreen = (
      <DrinkSelect
        modeId={cafeMode.id}
        background={cafeMode.selectBackground}
        onOrderComplete={handleOrderComplete}
        onBack={() => setScreen('enter')}
      />
    )
  }

  if (screen === 'timer') {
    currentScreen = (
      <TimerPage
        drink={selectedDrink}
        modeId={cafeMode.id}
        background={cafeMode.selectBackground}
        soundsRef={soundsRef}
        onBack={handleLeaveTimer}
      />
    )
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={screen}
          variants={screenTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {currentScreen}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
