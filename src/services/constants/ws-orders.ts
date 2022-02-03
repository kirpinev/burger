export const WS_ORDERS_CONNECTION_START: "WS_ORDERS_CONNECTION_START" =
  "WS_ORDERS_CONNECTION_START";
export const WS_ORDERS_CONNECTION_SUCCESS: "WS_ORDERS_CONNECTION_SUCCESS" =
  "WS_ORDERS_CONNECTION_SUCCESS";
export const WS_ORDERS_CONNECTION_ERROR: "WS_ORDERS_CONNECTION_ERROR" =
  "WS_ORDERS_CONNECTION_ERROR";
export const WS_ORDERS_CONNECTION_CLOSED: "WS_ORDERS_CONNECTION_CLOSED" =
  "WS_ORDERS_CONNECTION_CLOSED";
export const WS_ORDERS_GET_MESSAGE: "WS_ORDERS_GET_MESSAGE" =
  "WS_ORDERS_GET_MESSAGE";
export const WS_ORDERS_SEND_MESSAGE: "WS_ORDERS_SEND_MESSAGE" =
  "WS_ORDERS_SEND_MESSAGE";

export interface IWSOrdersActions {
  WSStart: typeof WS_ORDERS_CONNECTION_START;
  WSSuccess: typeof WS_ORDERS_CONNECTION_SUCCESS;
  WSError: typeof WS_ORDERS_CONNECTION_ERROR;
  WSClosed: typeof WS_ORDERS_CONNECTION_CLOSED;
  WSGetMessage: typeof WS_ORDERS_GET_MESSAGE;
  WSSendMessage: typeof WS_ORDERS_SEND_MESSAGE;
}

export const WSOrdersActions: IWSOrdersActions = {
  WSStart: WS_ORDERS_CONNECTION_START,
  WSSuccess: WS_ORDERS_CONNECTION_SUCCESS,
  WSError: WS_ORDERS_CONNECTION_ERROR,
  WSClosed: WS_ORDERS_CONNECTION_CLOSED,
  WSGetMessage: WS_ORDERS_GET_MESSAGE,
  WSSendMessage: WS_ORDERS_SEND_MESSAGE,
};