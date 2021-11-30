import React from "react";
import PropTypes from "prop-types";

import styles from "./empty-constructor.module.css";

export const EmptyConstructor = ({ dropRef, isHover }) => (
  <div
    ref={dropRef}
    className={`${styles.emptyContainer} mt-25`}
    style={{
      borderColor: isHover && "#8585ad",
      color: isHover && "#8585ad",
    }}
  >
    <p className={`${styles.text} text text_type_main-medium mb-8`}>
      Перенесите сюда вашу любимую булочку и ингредиенты
    </p>
  </div>
);

EmptyConstructor.propTypes = {
  dropRef: PropTypes.func.isRequired,
  isHover: PropTypes.bool.isRequired,
};
