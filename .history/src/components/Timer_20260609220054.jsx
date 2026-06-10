import { useEffect, useState } from 'react'
import './Timer.css'

export function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

function Timer({ drinkImage, drinkName, drinkOffsetX = '0', drinkGlowX, drinkGlowY }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    document.title = `${formatTime(elapsedSeconds)} at Cafe Toast`

    return () => {
      document.title = 'Cafe Toast'
    }
  }, [elapsedSeconds])

  const handlePlayPause = () => {
    setIsRunning((running) => !running)
  }

  const handleStop = () => {
    setIsRunning(false)
    setElapsedSeconds(0)
  }

  return (
    <div className="timer">
      <p className="timer__display" aria-live="polite">
        {formatTime(elapsedSeconds)}
      </p>

      <div
        className="timer__drink"
        style={{
          '--drink-offset-x': drinkOffsetX,
          ...(drinkGlowX && { '--glow-x': drinkGlowX }),
          ...(drinkGlowY && { '--glow-y': drinkGlowY }),
        }}
      >
        <div className="timer__drink-visual">
          <span className="timer__drink-glow" aria-hidden="true" />
          <img src={drinkImage} alt={drinkName} className="timer__drink-image" />
        </div>
      </div>

      <div className="timer__controls">
        <button
          type="button"
          className="timer__control"
          onClick={handlePlayPause}
          aria-label={isRunning ? 'Pause timer' : 'Play timer'}
        >
          {isRunning ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="timer__control"
          onClick={handleStop}
          aria-label="Stop timer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Timer
