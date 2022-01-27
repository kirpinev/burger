import {
  UPDATE_USER_NAME,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_EMAIL,
  UPDATE_USER_TOKEN,
  UPDATE_USER_EDIT_STATUS,
  RESET_USER_EDIT_STATUS,
  RESET_USER_PASSWORD,
  LOG_IN_USER,
  LOG_OUT_USER,
  EMAIL_SENT,
  PASSWORD_SENT,
} from "services/constants/user";

export const updateUserName = (name) => ({
  type: UPDATE_USER_NAME,
  payload: name,
});

export const updateUserPassword = (password) => ({
  type: UPDATE_USER_PASSWORD,
  payload: password,
});

export const updateUserEmail = (email) => ({
  type: UPDATE_USER_EMAIL,
  payload: email,
});

export const updateUserToken = (token) => ({
  type: UPDATE_USER_TOKEN,
  payload: token,
});

export const updateUserEditStatus = () => ({
  type: UPDATE_USER_EDIT_STATUS,
});

export const resetUserEditStatus = () => ({
  type: RESET_USER_EDIT_STATUS,
});

export const resetUserPassword = () => ({
  type: RESET_USER_PASSWORD,
});

export const logInUser = () => ({
  type: LOG_IN_USER,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const emailSent = () => ({
  type: EMAIL_SENT,
});

export const passwordSent = () => ({
  type: PASSWORD_SENT,
});
