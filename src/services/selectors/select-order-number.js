import { createSelector } from "reselect";

export const selectOrderNumber = createSelector(
  (state) => state.order.number,
  (order) => order
);
