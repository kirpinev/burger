import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectConstructorIngredients = createSelector(
  (state: TStoreState) => state.ingredients,
  (ingredients) => ingredients
);
