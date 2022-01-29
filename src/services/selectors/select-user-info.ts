import { createSelector } from "reselect";

import { TStoreState } from "services/types/store";

export const selectUserName = createSelector(
  (state: TStoreState) => state.user.name,
  (name) => name
);

export const selectUserEmail = createSelector(
  (state: TStoreState) => state.user.email,
  (email) => email
);

export const selectUserPassword = createSelector(
  (state: TStoreState) => state.user.password,
  (password) => password
);

export const selectUserAuthStatus = createSelector(
  (state: TStoreState) => state.user.isLoggedIn,
  (isLoggedIn) => isLoggedIn
);

export const selectEmailStatus = createSelector(
  (state: TStoreState) => state.user.isEmailSent,
  (isEmailSent) => isEmailSent
);

export const selectToken = createSelector(
  (state: TStoreState) => state.user.token,
  (token) => token
);

export const selectPasswordStatus = createSelector(
  (state: TStoreState) => state.user.isPasswordSent,
  (isPasswordSent) => isPasswordSent
);

export const selectUserEditStatus = createSelector(
  (state: TStoreState) => state.user.isUserInfoEdit,
  (isUserInfoEdit) => isUserInfoEdit
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
