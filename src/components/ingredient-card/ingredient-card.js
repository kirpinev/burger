import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient-card.module.css";

export const IngredientCard = ({ name, imageLink, price }) => (
  <div className={styles.container}>
    <Counter count={1} size="default" />
    <img className={`${styles.image} mb-2`} src={imageLink} alt={name} />
    <div className={`${styles.group} mb-2`}>
      <p className="text text_type_digits-default mr-1">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
    <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
  </div>
);

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
