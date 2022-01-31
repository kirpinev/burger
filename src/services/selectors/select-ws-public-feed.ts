import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectWsPublicFeedStatus = createSelector(
  (state: TStoreState) => state.wsPublicFeed.wsConnected,
  (wsConnected) => wsConnected
);

export const selectWsPublicFeedList = createSelector(
  (state: TStoreState) => state.wsPublicFeed.orders,
  (messages) => messages
);

export const selectWsPublicDoneFeed = createSelector(
  (state: TStoreState) => state.wsPublicFeed.orders,
  (messages) => messages.filter((message) => message.status === "done")
);

export const selectWsPublicNotDoneFeed = createSelector(
  (state: TStoreState) => state.wsPublicFeed.orders,
  (messages) => messages.filter((message) => message.status !== "done")
);

export const selectWsPublicFeedTotal = createSelector(
  (state: TStoreState) => state.wsPublicFeed.total,
  (total) => total
);

export const selectWsPublicFeedTotalToday = createSelector(
  (state: TStoreState) => state.wsPublicFeed.totalToday,
  (totalToday) => totalToday
);
