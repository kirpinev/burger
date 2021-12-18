import { UPDATE_VALUE, RESET_STATE, EMAIL_SENT } from "services/actions/email";

const initialState = {
  value: "",
  emailSent: false,
};

export const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return { ...state, value: action.payload };
    case RESET_STATE:
      return initialState;
    case EMAIL_SENT:
      return { ...state, emailSent: !initialState.emailSent };
    default:
      return state;
  }
};
