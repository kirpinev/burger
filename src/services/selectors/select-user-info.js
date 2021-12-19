import { createSelector } from "reselect";

export const selectUserName = createSelector(
  (state) => state.user.name,
  (name) => name
);

export const selectUserEmail = createSelector(
  (state) => state.user.email,
  (email) => email
);

export const selectUserPassword = createSelector(
  (state) => state.user.password,
  (password) => password
);

export const selectUserAuthStatus = createSelector(
  (state) => state.user.isLoggedIn,
  (isLoggedIn) => isLoggedIn
);

export const selectUserInfo = createSelector(
  selectUserName,
  selectUserEmail,
  selectUserPassword,
  selectUserAuthStatus,
  (name, email, password, isLoggedIn) => ({ name, email, password, isLoggedIn })
);
