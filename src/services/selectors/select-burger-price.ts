import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

const selectConstructorIngredientsPrice = createSelector(
  (state: TStoreState) => state.ingredients.constructorIngredients,
  (ingredients) => ingredients.reduce((acc, curr) => acc + curr.price, 0)
);

const selectBunPrice = createSelector(
  (state: TStoreState) => state.ingredients.selectedBun,
  (bun) => (bun ? bun.price * 2 : 0)
);

const calculateBurgerPrice = (ingredients: number, bun: number): number =>
  ingredients + bun;

export const selectBurgerPrice = createSelector(
  selectConstructorIngredientsPrice,
  selectBunPrice,
  calculateBurgerPrice
);
