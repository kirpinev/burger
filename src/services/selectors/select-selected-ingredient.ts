import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectSelectedIngredient = createSelector(
  (state: TStoreState) => state.ingredients.selectedIngredient,
  (selectedIngredient) => selectedIngredient
);
