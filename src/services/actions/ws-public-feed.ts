import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "services/constants/ws-public-feed";

import { IFeedItem } from "types/feed-item";

export interface IOnStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IOnSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
  readonly payload: Event;
}

export interface IMessageSend {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
  readonly payload: any;
}

export interface IGetMessage {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly payload: ReadonlyArray<IFeedItem>;
}

export interface IConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
  readonly payload: any;
}

export interface IConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  readonly payload: any;
}

export type TWSActions =
  | IOnStart
  | IOnSuccess
  | IGetMessage
  | IConnectionClosed
  | IConnectionError
  | IMessageSend;

export const setConnection = (): IOnStart => ({
  type: WS_FEED_CONNECTION_START,
});
