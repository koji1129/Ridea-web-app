import type { ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
};

function Modal({
  isOpen,
  title,
  children,
  onClose,
  actions,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modalOverlay"
      onClick={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="modal__title"
        >
          {title}
        </h2>

        {children && (
          <div className="modal__content">
            {children}
          </div>
        )}

        {actions && (
          <div className="modal__actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;