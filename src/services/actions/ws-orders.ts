import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_GET_MESSAGE,
  WS_ORDERS_SEND_MESSAGE,
} from "services/constants/ws-orders";

import { IOrderItem } from "types/order-item";
import { IWSOrderList } from "types/ws-order-list";

export interface IOnStart {
  readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IOnSuccess {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IMessageSend {
  readonly type: typeof WS_ORDERS_SEND_MESSAGE;
  readonly payload: IOrderItem;
}

export interface IGetMessage {
  readonly type: typeof WS_ORDERS_GET_MESSAGE;
  readonly payload: IWSOrderList;
}

export interface IConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IConnectionError {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}

export type TWSOrderActions =
  | IOnStart
  | IOnSuccess
  | IGetMessage
  | IConnectionClosed
  | IConnectionError
  | IMessageSend;

export const openWSConnection = (): IOnStart => ({
  type: WS_ORDERS_CONNECTION_START,
});

export const closeWSConnection = (): IConnectionClosed => ({
  type: WS_ORDERS_CONNECTION_CLOSED,
});
