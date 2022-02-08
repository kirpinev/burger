import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_GET_MESSAGE,
} from "services/constants/ws-orders";
import { TWSOrderActions } from "services/actions/ws-orders";

import { IOrderItem } from "types/order-item";

export type WSState = {
  readonly WSConnected: boolean;
  readonly isWSConnectionError: boolean;
  readonly orders: ReadonlyArray<IOrderItem>;
  readonly total: number;
  readonly totalToday: number;
};

export const initialState: WSState = {
  WSConnected: false,
  isWSConnectionError: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const WSOrdersReducer = (
  state = initialState,
  action: TWSOrderActions
) => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        isWSConnectionError: false,
        WSConnected: true,
      };
    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        isWSConnectionError: true,
      };
    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        WSConnected: false,
      };
    case WS_ORDERS_GET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
