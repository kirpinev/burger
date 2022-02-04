import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectModalStatus = createSelector(
  (state: TStoreState) => state.modals,
  (modals) => modals
);
