import { Middleware, MiddlewareAPI } from "redux";

import { TApplicationActions } from "services/types/actions";
import { TApplicationDispatch } from "services/types/dispatch";
import { TStoreState } from "services/types/store";
import { IWSPublicFeedAction } from "services/constants/ws-public-feed";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWSPublicFeedAction
): Middleware =>
  ((store: MiddlewareAPI<TApplicationDispatch, TStoreState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.wsStart) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsActions.wsSuccess, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.wsError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          dispatch({
            type: wsActions.wsGetMessage,
            payload: JSON.parse(data),
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: wsActions.wsClosed, payload: event });
        };

        if (action.type === wsActions.wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }
      }

      next(action);
    };
  }) as Middleware;
