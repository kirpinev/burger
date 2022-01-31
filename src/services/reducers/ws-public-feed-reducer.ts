import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
} from "services/constants/ws-public-feed";
import { TWSActions } from "services/actions/ws-public-feed";

import { IFeedItem } from "types/feed-item";

export type WSState = {
  readonly wsConnected: boolean;
  readonly success: boolean;
  readonly orders: ReadonlyArray<IFeedItem>;
  readonly total: number;
  readonly totalToday: number;
};

const initialState: WSState = {
  wsConnected: false,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsPublicFeedReducer = (
  state = initialState,
  action: TWSActions
) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
