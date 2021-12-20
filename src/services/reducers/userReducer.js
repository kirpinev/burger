import {
  LOG_IN_USER,
  LOG_OUT_USER,
  UPDATE_USER_NAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_TOKEN,
  EMAIL_SENT,
  PASSWORD_SENT,
} from "services/actions/user";

const initialState = {
  name: "",
  email: "",
  password: "",
  token: "",
  isPasswordSent: false,
  isEmailSent: false,
  isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_NAME:
      return { ...state, name: action.payload };
    case UPDATE_USER_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_USER_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_USER_TOKEN:
      return { ...state, token: action.payload };
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
