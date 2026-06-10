import "./ConfirmModal.css";

function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <div
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
        >
            <div className="confirm-modal__panel">
                <h2
                    id="confirm-modal-title"
                    className="confirm-modal__title"
                >
                    Leaving Already?
                </h2>
                <p className="confirm-modal__message">
                    The timer will be reset. Still leaving?
                </p>

                <div className="confirm-modal__actions">
                    <button
                        type="button"
                        className="confirm-modal__button"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className="confirm-modal__button"
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
