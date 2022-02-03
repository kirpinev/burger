import {
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_GET_MESSAGE,
} from "services/constants/ws-user-orders";
import { TWSUserOrdersActions } from "services/actions/ws-user-orders";

import { IOrderItem } from "types/order-item";

export type WSState = {
  readonly WSConnected: boolean;
  readonly isWSConnectionError: boolean;
  orders: Array<IOrderItem>;
};

const initialState: WSState = {
  WSConnected: false,
  isWSConnectionError: false,
  orders: [],
};

export const WSUserOrdersReducer = (
  state = initialState,
  action: TWSUserOrdersActions
) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        isWSConnectionError: false,
        WSConnected: true,
      };
    case WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        isWSConnectionError: true,
      };
    case WS_USER_ORDERS_CONNECTION_CLOSED:
      return { ...state, WSConnected: false };
    case WS_USER_ORDERS_GET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
