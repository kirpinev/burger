import { createSelector } from "reselect";

export const selectSelectedIngredient = createSelector(
  (state) => state.ingredients.selectedIngredient,
  (selectedIngredient) => selectedIngredient
);
