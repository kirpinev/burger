import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectWSUserOrders = createSelector(
  (state: TStoreState) => state.WSUserOrders.orders,
  (messages) => messages
);

export const selectWSUserConnectionErrorStatus = createSelector(
  (state: TStoreState) => state.WSUserOrders.isWSConnectionError,
  (isWSConnectionError) => isWSConnectionError
);

export const selectWSUserConnectedStatus = createSelector(
  (state: TStoreState) => state.WSUserOrders.WSConnected,
  (WSConnected) => WSConnected
);
