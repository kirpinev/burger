import { resetPassword, isResponseOk } from "api/api";
import { toggleErrorModal } from "./modals";

export const UPDATE_VALUE = "UPDATE_VALUE";
export const RESET_STATE = "RESET_STATE";
export const EMAIL_SENT = "EMAIL_SENT";

export const updateEmail = (value) => ({
  type: UPDATE_VALUE,
  payload: value,
});

export const emailSent = () => ({
  type: EMAIL_SENT,
});

export const resetEmailState = () => ({
  type: RESET_STATE,
});

export const sendResetEmail = () => async (dispatch, getState) => {
  try {
    const email = getState().email.value;

    const response = await resetPassword(email);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    dispatch(emailSent());
  } catch (e) {
    dispatch(toggleErrorModal());
  }
};
