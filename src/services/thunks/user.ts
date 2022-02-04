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
  emailSent,
  logInUser,
  logOutUser,
  passwordSent,
  updateUserEmail,
  updateUserName,
} from "services/actions/user";
import {
  TStoreState,
  TApplicationDispatch,
  TApplicationThunk,
} from "services/types/store";

import { saveTokenToStorage } from "utils/local-storage";
import { isAccessTokenValid } from "utils/validate-token";
import { refreshTokens } from "utils/refresh-tokens";
import { resetStorage } from "utils/local-storage";

import { Token } from "enums/token-names";
import { ITokenTypes } from "types/token-types";
import { IUserInfo } from "types/user-info";

const updateTokensAndLogin = async (
  response: Response,
  dispatch: TApplicationDispatch
) => {
  if (!isResponseOk(response)) {
    throw new Error();
  }

  const data = (await getJSON(response)) as ITokenTypes;

  saveTokenToStorage(Token.Access, data[Token.Access]);
  saveTokenToStorage(Token.Refresh, data[Token.Refresh]);

  dispatch(logInUser());
};

export const registerUserThunk: TApplicationThunk =
  () => async (dispatch, getState) => {
    try {
      const state = getState() as unknown as TStoreState;
      const { name, email, password } = state.user;

      const response = await registerUserRequest({ name, email, password });

      await updateTokensAndLogin(response, dispatch);
    } catch (e) {
      dispatch(toggleErrorModal());
    }
  };

export const authorizeUserThunk: TApplicationThunk =
  () => async (dispatch, getState) => {
    try {
      const state = getState() as unknown as TStoreState;
      const { email, password } = state.user;

      const response = await authorizeUserRequest(email, password);

      await updateTokensAndLogin(response, dispatch);
    } catch (e) {
      dispatch(toggleErrorModal());
    }
  };

export const getUserInfoThunk: TApplicationThunk = () => async (dispatch) => {
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

export const updateUserInfoThunk: TApplicationThunk =
  () => async (dispatch, getState) => {
    try {
      const state = getState() as unknown as TStoreState;
      const { name, email, password } = state.user;

      if (isAccessTokenValid()) {
        const response = await updateUserInfoRequest({
          name,
          email,
          password,
        });

        if (!isResponseOk(response)) {
          throw new Error();
        }

        const data = (await getJSON(response)) as {
          user: IUserInfo;
        };

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

export const logoutUserThunk: TApplicationThunk = () => async (dispatch) => {
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

export const sendResetEmailThunk: TApplicationThunk =
  () => async (dispatch, getState) => {
    try {
      const state = getState() as unknown as TStoreState;
      const { email } = state.user;

      const response = await resetPasswordRequest(email);

      if (!isResponseOk(response)) {
        throw new Error();
      }

      dispatch(emailSent());
    } catch (e) {
      dispatch(toggleErrorModal());
    }
  };

export const sendPasswordAndTokenThunk: TApplicationThunk =
  () => async (dispatch, getState) => {
    try {
      const state = getState() as unknown as TStoreState;
      const { password, token } = state.user;

      const response = await sendNewPasswordRequest(password, token);

      if (!isResponseOk(response)) {
        throw new Error();
      }

      dispatch(passwordSent());
    } catch (e) {
      dispatch(toggleErrorModal());
    }
  };
