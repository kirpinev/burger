import { createSelector } from "reselect";

const selectConstructorIngredientsPrice = createSelector(
  (state) => state.ingredients.constructorIngredients,
  (ingredients) => ingredients.reduce((acc, curr) => acc + curr.price, 0)
);

const selectBunPrice = createSelector(
  (state) => state.ingredients.selectedBun,
  (bun) => (bun ? bun.price * 2 : 0)
);

const culculateBurgerPrice = (ingredients, bun) => ingredients + bun;

export const selectBurgerPrice = createSelector(
  selectConstructorIngredientsPrice,
  selectBunPrice,
  culculateBurgerPrice
);
