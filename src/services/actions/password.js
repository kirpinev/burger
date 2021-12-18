import { sendNewPassword, isResponseOk } from "api/api";
import { toggleErrorModal } from "./modals";

export const UPDATE_PASSWORD = "UPDATE_VALUE";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const RESET_STATE = "RESET_STATE";
export const PASSWORD_SENT = "PASSWORD_SENT";

export const updatePassword = (value) => ({
  type: UPDATE_PASSWORD,
  payload: value,
});

export const updateToken = (value) => ({
  type: UPDATE_TOKEN,
  payload: value,
});

export const passwordSent = () => ({
  type: PASSWORD_SENT,
});

export const resetPasswordState = () => ({
  type: RESET_STATE,
});

export const sendPasswordAndToken = () => async (dispatch, getState) => {
  try {
    const { password, token } = getState().password;

    const response = await sendNewPassword(password, token);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    dispatch(passwordSent());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};
