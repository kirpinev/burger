import { createSelector } from "reselect";

export const selectModalStatus = createSelector(
  (state) => state.modals,
  (modals) => modals
);
