import React from "react";
import PropTypes from "prop-types";

import { IngredientCard } from "../ingredient-card/ingredient-card";

import { ingredientTypes } from "../../constants/ingredient-type";
import { ingredient } from "../../prop-types/ingredient";

import styles from "./ingredient-list.module.css";

export const IngredientList = ({
  setRefForIngredientType,
  type,
  ingredients,
  selectIngredientAndOpenModal,
}) => (
  <>
    <h2
      ref={setRefForIngredientType(type)}
      className="text text_type_main-medium mb-6"
    >
      {ingredientTypes[type]}
    </h2>
    <ul className={`${styles.ingredientsListByType}`}>
      {ingredients.map((ingredient) => (
        <li
          key={ingredient._id}
          onClick={() => selectIngredientAndOpenModal(ingredient)}
        >
          <IngredientCard
            name={ingredient.name}
            imageLink={ingredient.image}
            price={ingredient.price}
            handleModalOpen={selectIngredientAndOpenModal}
          />
        </li>
      ))}
    </ul>
  </>
);

IngredientList.propTypes = {
  setRefForIngredientType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
  selectIngredientAndOpenModal: PropTypes.func.isRequired,
};
