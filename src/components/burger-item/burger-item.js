import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredient } from "prop-types/ingredient";

import styles from "./burger-item.module.css";
import PropTypes from "prop-types";

export const BurgerItem = ({ ingredient, deleteIngredient }) => (
  <div className={`${styles.ingredientContainer} mr-1`}>
    <DragIcon type="primary" />
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={deleteIngredient}
    />
  </div>
);

BurgerItem.propTypes = {
  ingredient: ingredient.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};
