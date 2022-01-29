import { createSelector } from "reselect";
import _ from "lodash";

import { TStoreState } from "services/types/store";

import { IBurgerIngredient } from "types/burger-ingredient";
import { TIngredientType } from "types/ingredient-type";

const changeIngredientsOrder = (
  ingredients: ReadonlyArray<IBurgerIngredient>
): ReadonlyArray<[TIngredientType, IBurgerIngredient[]]> => {
  const [bunIngredients, mainIngredients, sauceIngredients] = Object.entries(
    _.groupBy(ingredients, "type")
  ) as ReadonlyArray<[TIngredientType, IBurgerIngredient[]]>;

  return [bunIngredients, sauceIngredients, mainIngredients];
};

export const selectGroupedBurgerIngredients = createSelector(
  (state: TStoreState) => state.ingredients.burgerIngredients,
  changeIngredientsOrder
);

export const selectBurgerIngredients = createSelector(
  (state: TStoreState) => state.ingredients.burgerIngredients,
  (burgerIngredients) => burgerIngredients
);
