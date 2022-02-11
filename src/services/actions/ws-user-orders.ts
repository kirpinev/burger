import {
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_GET_MESSAGE,
  WS_USER_ORDERS_SEND_MESSAGE,
} from "services/constants/ws-user-orders";

import { IOrderItem } from "types/order-item";
import { IWSOrderList } from "types/ws-order-list";

export interface IOnStart {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}

export interface IOnSuccess {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

export interface IMessageSend {
  readonly type: typeof WS_USER_ORDERS_SEND_MESSAGE;
  readonly payload: IOrderItem;
}

export interface IGetMessage {
  readonly type: typeof WS_USER_ORDERS_GET_MESSAGE;
  readonly payload: Pick<IWSOrderList, "orders">;
}

export interface IConnectionClosed {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

export interface IConnectionError {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
}

export type TWSUserOrdersActions =
  | IOnStart
  | IOnSuccess
  | IGetMessage
  | IConnectionClosed
  | IConnectionError
  | IMessageSend;

export const openWSConnection = (): IOnStart => ({
  type: WS_USER_ORDERS_CONNECTION_START,
});

export const closeWSConnection = (): IConnectionClosed => ({
  type: WS_USER_ORDERS_CONNECTION_CLOSED,
});
