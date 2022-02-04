import {
  LOG_IN_USER,
  LOG_OUT_USER,
  UPDATE_USER_NAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_TOKEN,
  EMAIL_SENT,
  PASSWORD_SENT,
  UPDATE_USER_EDIT_STATUS,
  RESET_USER_EDIT_STATUS,
  RESET_USER_PASSWORD,
} from "services/constants/user";

import { TUserActions } from "services/actions/user";

export type TUserState<T, K> = {
  readonly name: T;
  readonly email: T;
  readonly password: T;
  readonly token: T;
  readonly isPasswordSent: K;
  readonly isEmailSent: K;
  readonly isLoggedIn: K;
  readonly isUserInfoEdit: K;
};

const initialState: TUserState<string, boolean> = {
  name: "",
  email: "",
  password: "",
  token: "",
  isPasswordSent: false,
  isEmailSent: false,
  isLoggedIn: false,
  isUserInfoEdit: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState<string, boolean> => {
  switch (action.type) {
    case UPDATE_USER_NAME:
      return { ...state, name: action.payload };
    case UPDATE_USER_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_USER_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_USER_TOKEN:
      return { ...state, token: action.payload };
    case UPDATE_USER_EDIT_STATUS:
      return { ...state, isUserInfoEdit: true };
    case RESET_USER_EDIT_STATUS:
      return { ...state, isUserInfoEdit: false };
    case RESET_USER_PASSWORD:
      return { ...state, password: "" };
    case LOG_IN_USER:
      return { ...state, isLoggedIn: true };
    case LOG_OUT_USER:
      return { ...initialState };
    case EMAIL_SENT:
      return { ...state, isEmailSent: true };
    case PASSWORD_SENT:
      return { ...state, isPasswordSent: true };
    default:
      return state;
  }
};
