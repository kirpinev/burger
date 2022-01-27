import {
  getJSON,
  isResponseOk,
  registerUserRequest,
  authorizeUserRequest,
  getUserInfoRequest,
  logoutUserRequest,
  resetPasswordRequest,
  updateUserInfoRequest,
  sendNewPasswordRequest,
} from "api/api";

import { toggleErrorModal } from "services/actions/modals";
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

import { saveTokenToStorage } from "utils/local-storage";
import { isAccessTokenValid } from "utils/validate-token";
import { refreshTokens } from "utils/refresh-tokens";
import { resetStorage } from "utils/local-storage";

import { Token } from "enums/token-names";

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

export const registerUserThunk = () => async (dispatch, getState) => {
  try {
    const { name, email, password } = getState().user;

    const response = await registerUserRequest({ name, email, password });

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const data = await getJSON(response);

    saveTokenToStorage(Token.Access, data[Token.Access]);
    saveTokenToStorage(Token.Refresh, data[Token.Refresh]);

    dispatch(logInUser());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};

export const authorizeUserThunk = () => async (dispatch, getState) => {
  try {
    const { email, password } = getState().user;

    const response = await authorizeUserRequest(email, password);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const data = await getJSON(response);

    saveTokenToStorage(Token.Access, data[Token.Access]);
    saveTokenToStorage(Token.Refresh, data[Token.Refresh]);

    dispatch(logInUser());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};

export const getUserInfoThunk = () => async (dispatch) => {
  try {
    if (isAccessTokenValid()) {
      const response = await getUserInfoRequest();

      if (!isResponseOk(response)) {
        throw new Error();
      }

      const {
        user: { name, email },
      } = await getJSON(response);

      dispatch(logInUser());
      dispatch(updateUserName(name));
      dispatch(updateUserEmail(email));
    } else {
      const isRefreshed = await refreshTokens();

      if (isRefreshed) {
        return dispatch(getUserInfoThunk());
      } else {
        resetStorage();
        dispatch(logOutUser());
      }
    }
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};

export const updateUserInfoThunk = () => async (dispatch, getState) => {
  try {
    const { name, email, password } = getState().user;

    if (isAccessTokenValid()) {
      const response = await updateUserInfoRequest({
        name,
        email,
        password,
      });

      if (!isResponseOk(response)) {
        throw new Error();
      }

      const data = await getJSON(response);

      dispatch(updateUserName(data.user.name));
      dispatch(updateUserEmail(data.user.email));
    } else {
      const isRefreshed = await refreshTokens();

      if (isRefreshed) {
        return dispatch(updateUserInfoThunk());
      } else {
        resetStorage();
        dispatch(logOutUser());
      }
    }
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  try {
    const response = await logoutUserRequest();

    if (!isResponseOk(response)) {
      throw new Error();
    }

    resetStorage();
    dispatch(logOutUser());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};

export const sendResetEmailThunk = () => async (dispatch, getState) => {
  try {
    const { email } = getState().user;

    const response = await resetPasswordRequest(email);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    dispatch(emailSent());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};

export const sendPasswordAndTokenThunk = () => async (dispatch, getState) => {
  try {
    const { password, token } = getState().user;

    const response = await sendNewPasswordRequest(password, token);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    dispatch(passwordSent());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};
