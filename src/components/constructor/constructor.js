import React from "react";
import PropTypes from "prop-types";

import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

import { ingredient } from "../../prop-types/ingredient";

export const Constructor = ({ ingredients }) => (
  <>
    <BurgerIngredients ingredients={ingredients} />
    <BurgerConstructor ingredients={ingredients} />
  </>
);

Constructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
};
