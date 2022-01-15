import { FC, MouseEventHandler } from "react";

import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  closeModal: MouseEventHandler<HTMLDivElement>;
}

export const ModalOverlay: FC<IModalOverlay> = ({
  closeModal,
  children,
}): JSX.Element => (
  <div className={styles.overlay} onClickCapture={closeModal} id="overlay">
    {children}
  </div>
);
