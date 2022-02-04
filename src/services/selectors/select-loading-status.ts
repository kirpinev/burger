import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectLoadingStatus = createSelector(
  (state: TStoreState) => state.loading,
  (loading) => loading
);
