import { FC, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "components/modal-overlay/modal-overlay";

import styles from "./modal.module.css";

interface IModal {
  readonly handleModalCloseClick: () => void;
}

export const Modal: FC<IModal> = ({
  handleModalCloseClick,
  children,
}): JSX.Element | null => {
  const modalId = "modal";
  const modalContainer: Element | null = useMemo(
    () => document.getElementById(modalId),
    [modalId]
  );

  const isTargetValid = useCallback(
    (e) =>
      e.target.id === "overlay" ||
      e.target.id === "close-button" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path",
    []
  );

  const isKeyValid = useCallback((e) => e.key === "Escape", []);

  const closeModal = useCallback(
    (e) => {
      e.stopPropagation();

      if (isTargetValid(e) || isKeyValid(e)) {
        handleModalCloseClick();
      }
    },
    [handleModalCloseClick, isTargetValid, isKeyValid]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    };
  });

  return modalContainer
    ? createPortal(
        <ModalOverlay closeModal={closeModal}>
          <div className={styles.modal}>
            <div
              className={styles.button}
              id="close-button"
              onClick={closeModal}
            >
              <CloseIcon type="primary" />
            </div>
            {children}
          </div>
        </ModalOverlay>,
        modalContainer
      )
    : null;
};
