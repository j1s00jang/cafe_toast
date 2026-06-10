import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DrinkCarousel from "../components/DrinkCarousel";
import { DEFAULT_DRINK_INDEX, DRINKS } from "../data/drinks";
import "./DrinkSelect.css";

function DrinkSelect({ modeId, background, onOrderComplete }) {
    const [activeIndex, setActiveIndex] = useState(DEFAULT_DRINK_INDEX);
    const selectedDrink = DRINKS[activeIndex];

    const handleOrderComplete = () => {
        onOrderComplete(activeIndex);
    };

    return (
        <section
            className={`drink-select drink-select--${modeId}`}
            aria-label="Select a drink"
        >
            <div
                className="drink-select__background"
                style={{ backgroundImage: `url(${background})` }}
                aria-hidden="true"
            />

            <div className="drink-select__content">
                <DrinkCarousel
                    drinks={DRINKS}
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                />

                <p className="drink-select__prompt">
                    Hi, could I please get {selectedDrink.article}{" "}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={selectedDrink.id}
                            className="drink-select__drink-name"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                        >
                            {selectedDrink.name}
                        </motion.span>
                    </AnimatePresence>
                    ?
                </p>

                <button
                    type="button"
                    className="drink-select__button"
                    onClick={handleOrderComplete}
                >
                    $$$
                </button>
            </div>
        </section>
    );
}

export default DrinkSelect;
