import {
  SAVE_ORDER,
  RESET_ORDER,
  TOGGLE_ORDER_POSTING,
} from "services/actions/order";

const initialState = {
  name: "",
  number: null,
  isOrderPosting: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return {
        ...state,
        name: action.payload.name,
        number: action.payload.number,
      };
    case TOGGLE_ORDER_POSTING:
      return { ...state, isOrderPosting: action.payload };
    case RESET_ORDER:
      return initialState;
    default:
      return state;
  }
};
