import { Middleware, MiddlewareAPI } from "redux";

import { TApplicationActions } from "services/types/actions";
import { TStoreState, TApplicationDispatch } from "services/types/store";
import { IWSOrdersActions } from "services/constants/ws-orders";
import { IWSUserOrdersActions } from "services/constants/ws-user-orders";

import { getAccessToken } from "utils/token";

export const socketMiddleware = (
  WSUrl: string,
  WSActions: IWSOrdersActions | IWSUserOrdersActions,
  token?: boolean
): Middleware =>
  ((store: MiddlewareAPI<TApplicationDispatch, TStoreState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;

      if (action.type === WSActions.WSStart && token) {
        const accessToken = getAccessToken().split(" ")[1];

        socket = new WebSocket(WSUrl + `?token=${accessToken}`);
      } else if (action.type === WSActions.WSStart && !token) {
        socket = new WebSocket(WSUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: WSActions.WSSuccess });
        };

        socket.onerror = () => {
          dispatch({ type: WSActions.WSError });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          dispatch({
            type: WSActions.WSGetMessage,
            payload: JSON.parse(data),
          });
        };

        socket.onclose = () => {
          dispatch({ type: WSActions.WSClosed });
        };

        if (action.type === WSActions.WSSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (action.type === WSActions.WSClosed) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
