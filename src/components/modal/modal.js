import React, { useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

export const Modal = ({ handleModalCloseClick, children }) => {
  const modalId = "modal";
  const modalContainer = useMemo(
    () => document.getElementById(modalId),
    [modalId]
  );

  const closeModal = useCallback(
    (e) => {
      if (
        e.target.id === "overlay" ||
        e.target.id === "close-button" ||
        e.target.tagName === "svg" ||
        e.target.tagName === "path"
      ) {
        handleModalCloseClick();
      }
    },
    [handleModalCloseClick]
  );

  const closeModalOnEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleModalCloseClick();
      }
    },
    [handleModalCloseClick]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeModalOnEsc);

    return () => {
      document.removeEventListener("keydown", closeModalOnEsc);
    };
  });

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={styles.modal}>
        <div className={styles.button} id="close-button" onClick={closeModal}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalContainer
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  handleModalCloseClick: PropTypes.func.isRequired,
};
