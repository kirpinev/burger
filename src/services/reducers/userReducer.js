import {
  LOG_IN_USER,
  LOG_OUT_USER,
  UPDATE_USER_NAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
} from "services/actions/user";

const initialState = {
  name: "",
  email: "",
  password: "",
  isLoggedIn: false,
  forceLogOut: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_NAME:
      return { ...state, name: action.payload };
    case UPDATE_USER_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_USER_PASSWORD:
      return { ...state, password: action.payload };
    case LOG_IN_USER:
      return { ...state, isLoggedIn: true };
    case LOG_OUT_USER:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
