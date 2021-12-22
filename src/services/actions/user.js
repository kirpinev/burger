import { getJSON, isResponseOk, registerUserRequest } from "api/api";
import { saveTokenToStorage } from "utils/local-storage";
import { accessToken, refreshToken } from "constants/token-names";
import { authorizeUserRequest, getUserInfoRequest } from "api/api";
import { getTokenFromStorage } from "utils/local-storage";
import { isAccessTokenValid } from "utils/validate-token";
import { refreshTokens } from "utils/refresh-tokens";
import { resetStorage } from "utils/local-storage";
import {
  logoutUserRequest,
  resetPasswordRequest,
  updateUserInfoRequest,
  sendNewPasswordRequest,
} from "api/api";
import { toggleErrorModal } from "./modals";

export const UPDATE_USER_NAME = "UPDATE_USER_NAME";
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";
export const UPDATE_USER_TOKEN = "UPDATE_USER_TOKEN";
export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const EMAIL_SENT = "EMAIL_SENT";
export const PASSWORD_SENT = "PASSWORD_SENT";
export const UPDATE_USER_EDIT_STATUS = "UPDATE_USER_EDIT_STATUS";
export const RESET_USER_EDIT_STATUS = "RESET_USER_EDIT_STATUS";
export const RESET_USER_PASSWORD = "RESET_USER_PASSWORD";

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

    saveTokenToStorage(accessToken, data[accessToken]);
    saveTokenToStorage(refreshToken, data[refreshToken]);

    dispatch(logInUser());
  } catch (e) {}
};

export const authorizeUserThunk = () => async (dispatch, getState) => {
  try {
    const { email, password } = getState().user;

    const response = await authorizeUserRequest(email, password);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const data = await getJSON(response);

    saveTokenToStorage(accessToken, data[accessToken]);
    saveTokenToStorage(refreshToken, data[refreshToken]);

    dispatch(logInUser());
  } catch (e) {}
};

export const getUserInfoThunk = () => async (dispatch) => {
  try {
    if (isAccessTokenValid(getTokenFromStorage(accessToken))) {
      const response = await getUserInfoRequest(
        getTokenFromStorage(accessToken)
      );

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
      const isRefreshed = await refreshTokens(
        getTokenFromStorage(refreshToken)
      );

      if (isRefreshed) {
        const response = await getUserInfoRequest(
          getTokenFromStorage(accessToken)
        );

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
        resetStorage();
        dispatch(logOutUser());
      }
    }
  } catch (e) {}
};

export const updateUserInfoThunk = () => async (dispatch, getState) => {
  try {
    const { name, email, password } = getState().user;

    const token = getTokenFromStorage(accessToken);

    if (isAccessTokenValid(token)) {
      const response = await updateUserInfoRequest({
        token,
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
      const isRefreshed = await refreshTokens(
        getTokenFromStorage(refreshToken)
      );

      if (isRefreshed) {
        const response = await updateUserInfoRequest({
          token,
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
        resetStorage();
        dispatch(logOutUser());
      }
    }
  } catch (e) {}
};

export const logoutUserThunk = () => async (dispatch) => {
  try {
    const token = getTokenFromStorage(refreshToken);

    const response = await logoutUserRequest(token);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    resetStorage();
    dispatch(logOutUser());
  } catch (e) {}
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
