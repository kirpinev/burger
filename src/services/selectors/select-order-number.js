import { createSelector } from "reselect";

export const selectOrderNumber = createSelector(
  (state) => state.order.number,
  (order) => order
);

export const selectOrderPostingStatus = createSelector(
  (state) => state.order.isOrderPosting,
  (isOrderPosting) => isOrderPosting
);
