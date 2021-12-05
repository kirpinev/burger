import { createSelector } from "reselect";
import _ from "lodash";

const changeIngredientsOrder = (ingredients) => {
  const [bunIngredients, mainIngredients, sauceIngredients] = Object.entries(
    _.groupBy(ingredients, "type")
  );

  return [bunIngredients, sauceIngredients, mainIngredients];
};

export const selectBurgerIngredients = createSelector(
  (state) => state.ingredients.burgerIngredients,
  changeIngredientsOrder
);
