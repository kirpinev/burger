import { createSelector } from "reselect";

export const selectLoadingStatus = createSelector(
  (state) => state.loading,
  (loading) => loading
);
