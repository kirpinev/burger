import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectWSOrders = createSelector(
  (state: TStoreState) => state.WSOrders.orders,
  (messages) => messages
);

export const selectWSPublicDoneFeed = createSelector(
  (state: TStoreState) => state.WSOrders.orders,
  (messages) => messages.filter((message) => message.status === "done")
);

export const selectWSPublicNotDoneFeed = createSelector(
  (state: TStoreState) => state.WSOrders.orders,
  (messages) => messages.filter((message) => message.status === "pending")
);

export const selectWSPublicFeedTotal = createSelector(
  (state: TStoreState) => state.WSOrders.total,
  (total) => total
);

export const selectWSPublicFeedTotalToday = createSelector(
  (state: TStoreState) => state.WSOrders.totalToday,
  (totalToday) => totalToday
);

export const selectWSConnectionErrorStatus = createSelector(
  (state: TStoreState) => state.WSOrders.isWSConnectionError,
  (isWSConnectionError) => isWSConnectionError
);

export const selectWSConnectedStatus = createSelector(
  (state: TStoreState) => state.WSOrders.WSConnected,
  (WSConnected) => WSConnected
);
