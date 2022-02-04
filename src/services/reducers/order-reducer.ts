import {
  SAVE_ORDER,
  RESET_ORDER,
  TOGGLE_ORDER_POSTING,
} from "services/constants/order";

import { TOrderActions } from "services/actions/order";

export type TOrderState = {
  readonly name: string;
  readonly number: null | number;
  readonly isOrderPosting: boolean;
};

const initialState: TOrderState = {
  name: "",
  number: null,
  isOrderPosting: false,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
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
