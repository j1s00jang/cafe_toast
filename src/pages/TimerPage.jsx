import { useEffect, useState } from 'react'
import AudioControls from '../components/AudioControls'
import ConfirmModal from '../components/ConfirmModal'
import Timer from '../components/Timer'
import { createTimerSounds } from '../hooks/useTimerSounds'
import '../components/AudioControls.css'
import './TimerPage.css'

function TimerPage({ drink, modeId, background, soundsRef, onBack }) {
  const [musicMuted, setMusicMuted] = useState(false)
  const [ambientMuted, setAmbientMuted] = useState(false)
  const [musicVolume, setMusicVolume] = useState(1)
  const [ambientVolume, setAmbientVolume] = useState(1)
  const [showLeaveModal, setShowLeaveModal] = useState(false)

  useEffect(() => {
    if (!soundsRef.current) {
      soundsRef.current = createTimerSounds()
      soundsRef.current.start()
    }

    return () => {
      soundsRef.current?.destroy()
      soundsRef.current = null
    }
  }, [soundsRef])

  const handleToggleMusic = () => {
    setMusicMuted((muted) => {
      const nextMuted = !muted
      soundsRef.current?.setMusicMuted(nextMuted)
      return nextMuted
    })
  }

  const handleToggleAmbient = () => {
    setAmbientMuted((muted) => {
      const nextMuted = !muted
      soundsRef.current?.setAmbientMuted(nextMuted)
      return nextMuted
    })
  }

  const handleMusicVolumeChange = (volume) => {
    setMusicVolume(volume)
    soundsRef.current?.setMusicVolume(volume)

    if (volume > 0 && musicMuted) {
      setMusicMuted(false)
      soundsRef.current?.setMusicMuted(false)
    }
  }

  const handleAmbientVolumeChange = (volume) => {
    setAmbientVolume(volume)
    soundsRef.current?.setAmbientVolume(volume)

    if (volume > 0 && ambientMuted) {
      setAmbientMuted(false)
      soundsRef.current?.setAmbientMuted(false)
    }
  }

  const handleBackClick = () => {
    setShowLeaveModal(true)
  }

  const handleConfirmLeave = () => {
    setShowLeaveModal(false)
    onBack()
  }

  const handleCancelLeave = () => {
    setShowLeaveModal(false)
  }

  return (
    <section className={`timer-page timer-page--${modeId}`} aria-label="Study timer">
      <div
        className="timer-page__background"
        style={{ backgroundImage: `url(${background})` }}
        aria-hidden="true"
      />

      <button
        type="button"
        className="timer-page__back"
        onClick={handleBackClick}
        aria-label="Back to entrance"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 14 4 9l5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 9h11a7 7 0 0 1 0 14H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AudioControls
        musicMuted={musicMuted}
        ambientMuted={ambientMuted}
        musicVolume={musicVolume}
        ambientVolume={ambientVolume}
        onToggleMusic={handleToggleMusic}
        onToggleAmbient={handleToggleAmbient}
        onMusicVolumeChange={handleMusicVolumeChange}
        onAmbientVolumeChange={handleAmbientVolumeChange}
      />

      <div className="timer-page__content">
        <Timer
          drinkImage={drink.image}
          drinkName={drink.name}
          drinkOffsetX={drink.timerOffsetX ?? '0'}
          drinkGlowX={drink.timerGlowX}
          drinkGlowY={drink.timerGlowY}
        />
      </div>

      {showLeaveModal && (
        <ConfirmModal
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      )}
    </section>
  )
}

export default TimerPage
