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

  if (screen === 'timer') {
    return (
      <TimerPage
        drink={selectedDrink}
        modeId={cafeMode.id}
        background={cafeMode.selectBackground}
        soundsRef={soundsRef}
        onBack={handleLeaveTimer}
      />
    )
  }

  if (screen === 'drink-select') {
    return (
      <DrinkSelect
        modeId={cafeMode.id}
        background={cafeMode.selectBackground}
        onOrderComplete={handleOrderComplete}
        onBack={() => setScreen('enter')}
      />
    )
  }

  return (
    <CafeToast
      modeIndex={cafeModeIndex}
      onModeChange={setCafeModeIndex}
      onEnter={() => setScreen('drink-select')}
    />
  )
}

export default App
