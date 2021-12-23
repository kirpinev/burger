import { createSelector } from "reselect";
import _ from "lodash";

const changeIngredientsOrder = (ingredients) => {
  const [bunIngredients, mainIngredients, sauceIngredients] = Object.entries(
    _.groupBy(ingredients, "type")
  );

  return [bunIngredients, sauceIngredients, mainIngredients];
};

export const selectGroupedBurgerIngredients = createSelector(
  (state) => state.ingredients.burgerIngredients,
  changeIngredientsOrder
);

export const selectBurgerIngredients = createSelector(
  (state) => state.ingredients.burgerIngredients,
  (burgerIngredients) => burgerIngredients
);
