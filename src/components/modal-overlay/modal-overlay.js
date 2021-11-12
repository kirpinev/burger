import React from "react";
import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ closeModal, children }) => (
  <div className={styles.overlay} onClickCapture={closeModal} id="overlay">
    {children}
  </div>
);

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};
