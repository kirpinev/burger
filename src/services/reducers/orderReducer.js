import { SAVE_ORDER_NUMBER } from "services/actions/order";

const initialState = {
  name: "",
  number: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER_NUMBER:
      return {
        ...state,
        name: action.payload.name,
        number: action.payload.number,
      };
    default:
      return state;
  }
};
