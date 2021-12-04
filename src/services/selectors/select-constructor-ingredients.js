import { createSelector } from "reselect";

export const selectConstructorIngredients = createSelector(
  (state) => state.ingredients,
  (ingredients) => ingredients
);
