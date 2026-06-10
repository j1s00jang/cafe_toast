import { AnimatePresence, motion } from 'framer-motion'
import { CAFE_MODES } from '../data/cafeModes'
import './CafeToast.css'

function CafeToast({ modeIndex, onModeChange, onEnter }) {
  const currentMode = CAFE_MODES[modeIndex]

  const goToPreviousMode = () => {
    const nextIndex = (modeIndex - 1 + CAFE_MODES.length) % CAFE_MODES.length
    onModeChange(nextIndex)
  }

  const goToNextMode = () => {
    const nextIndex = (modeIndex + 1) % CAFE_MODES.length
    onModeChange(nextIndex)
  }

  return (
    <section
      className={`enter-screen enter-screen--${currentMode.id}`}
      aria-label={`Cafe Toast — ${currentMode.label}`}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={currentMode.id}
          className="enter-screen__background"
          style={{ backgroundImage: `url(${currentMode.background})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <button
        type="button"
        className="enter-screen__arrow enter-screen__arrow--left"
        onClick={goToPreviousMode}
        aria-label="Previous cafe atmosphere"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M16 3l-10 9 10 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="enter-screen__content">
        <header className="enter-screen__header">
          <h1 className="enter-screen__title">
            <img
              src={currentMode.titleImage}
              alt="cafe toast"
              className="enter-screen__title-image"
            />
          </h1>
          <p className="enter-screen__subtitle">choose a drink. settle in.</p>
        </header>

        <div className="enter-screen__body">
          <button type="button" className="enter-screen__button" onClick={onEnter}>
            click to enter
          </button>
        </div>
      </div>

      <button
        type="button"
        className="enter-screen__arrow enter-screen__arrow--right"
        onClick={goToNextMode}
        aria-label="Next cafe atmosphere"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8 3l10 9-10 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  )
}

export default CafeToast
