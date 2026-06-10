import { motion } from 'framer-motion'
import './DrinkCarousel.css'

function getOffset(index, activeIndex, total) {
  let offset = index - activeIndex

  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total

  return offset
}

function DrinkCarousel({ drinks, activeIndex, onSelect }) {
  return (
    <div className="drink-carousel" aria-label="Choose a drink">
      <div className="drink-carousel__stage">
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
                x: `calc(-50% + ${offset * 40}vw)`,
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
