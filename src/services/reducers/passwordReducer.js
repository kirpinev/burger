import {
  UPDATE_PASSWORD,
  UPDATE_TOKEN,
  RESET_STATE,
  PASSWORD_SENT,
} from "services/actions/password";

const initialState = {
  password: "",
  token: "",
  passwordSent: false,
};

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_TOKEN:
      return { ...state, token: action.payload };
    case RESET_STATE:
      return initialState;
    case PASSWORD_SENT:
      return { ...state, passwordSent: !initialState.passwordSent };
    default:
      return state;
  }
};
