import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-item.module.css";

export const BurgerItem = ({ name, price, image }) => (
  <div className={`${styles.ingredientContainer} mr-1`}>
    <DragIcon type="primary" />
    <ConstructorElement text={name} price={price} thumbnail={image} />
  </div>
);

BurgerItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
