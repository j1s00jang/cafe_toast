import { motion } from 'framer-motion'
import './DrinkCarousel.css'

function getOffset(index, activeIndex, total) {
  let offset = index - activeIndex

  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total

  return offset
}

function DrinkCarousel({ drinks, activeIndex, onSelect }) {
  const goToPrevious = () => {
    onSelect((activeIndex - 1 + drinks.length) % drinks.length)
  }

  const goToNext = () => {
    onSelect((activeIndex + 1) % drinks.length)
  }

  return (
    <div className="drink-carousel" aria-label="Choose a drink">
      <div className="drink-carousel__stage">
        <button
          type="button"
          className="drink-carousel__nav drink-carousel__nav--left"
          onClick={goToPrevious}
          aria-label="Previous drink"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15.5 4.5 8.5 12l7 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="drink-carousel__nav drink-carousel__nav--right"
          onClick={goToNext}
          aria-label="Next drink"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M8.5 4.5 15.5 12l-7 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {drinks.map((drink, index) => {
          const offset = getOffset(index, activeIndex, drinks.length)

          if (Math.abs(offset) > 1) return null

          const isCenter = offset === 0

          return (
            <motion.button
              key={drink.id}
              type="button"
              className={`drink-carousel__item${isCenter ? ' drink-carousel__item--center' : ''}`}
              aria-label={drink.name}
              aria-current={isCenter ? 'true' : undefined}
              onClick={() => {
                if (!isCenter) onSelect(index)
              }}
              initial={false}
              animate={{
                x: `calc(-50% + ${offset * 34}vw)`,
                scale: isCenter ? 1 : 0.58,
                opacity: isCenter ? 1 : 0.88,
                zIndex: isCenter ? 3 : 1,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <img src={drink.image} alt="" className="drink-carousel__image" />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default DrinkCarousel
