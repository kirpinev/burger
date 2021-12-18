import { createSelector } from "reselect";

export const selectPassword = createSelector(
  (state) => state.password.password,
  (password) => password
);

export const selectToken = createSelector(
  (state) => state.password.token,
  (token) => token
);

export const selectPasswordSentStatus = createSelector(
  (state) => state.password.passwordSent,
  (passwordSent) => passwordSent
);

export const selectPasswordState = createSelector(
  selectPassword,
  selectToken,
  selectPasswordSentStatus,
  (password, token, passwordSent) => ({ password, token, passwordSent })
);
