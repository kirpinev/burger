import { SAVE_ORDER, RESET_ORDER } from "services/actions/order";

const initialState = {
  name: "",
  number: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return {
        ...state,
        name: action.payload.name,
        number: action.payload.number,
      };
    case RESET_ORDER:
      return initialState;
    default:
      return state;
  }
};
