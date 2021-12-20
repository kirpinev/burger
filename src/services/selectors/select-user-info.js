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

export const selectEmailStatus = createSelector(
  (state) => state.user.isEmailSent,
  (isEmailSent) => isEmailSent
);

export const selectToken = createSelector(
  (state) => state.user.token,
  (token) => token
);

export const selectPasswordStatus = createSelector(
  (state) => state.user.isPasswordSent,
  (isPasswordSent) => isPasswordSent
);

export const selectUserInfo = createSelector(
  selectUserName,
  selectUserEmail,
  selectUserPassword,
  selectUserAuthStatus,
  selectEmailStatus,
  selectToken,
  selectPasswordStatus,
  (name, email, password, isLoggedIn, isEmailSent, token, isPasswordSent) => ({
    name,
    email,
    password,
    isLoggedIn,
    isEmailSent,
    token,
    isPasswordSent,
  })
);
