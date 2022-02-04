import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectOrderNumber = createSelector(
  (state: TStoreState) => state.order.number,
  (order) => order
);

export const selectOrderPostingStatus = createSelector(
  (state: TStoreState) => state.order.isOrderPosting,
  (isOrderPosting) => isOrderPosting
);
