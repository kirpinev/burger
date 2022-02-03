import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { ingredientsReducer } from "services/reducers/ingredients-reducer";
import { loadingReducer } from "services/reducers/loading-reducer";
import { orderReducer } from "services/reducers/order-reducer";
import { modalsReducer } from "services/reducers/modals-reducer";
import { userReducer } from "services/reducers/user-reducer";
import { WSOrdersReducer } from "services/reducers/ws-orders-reducer";
import { WSUserOrdersReducer } from "services/reducers/ws-user-orders-reducer";

import { WSOrdersActions } from "services/constants/ws-orders";
import { WSUserOrdersActions } from "services/constants/ws-user-orders";

import { socketMiddleware } from "services/middleware/socket-middleware";

import { WSUrls } from "constants/ws-urls";

const enhancer = composeWithDevTools(
  applyMiddleware(
    thunk,
    socketMiddleware(WSUrls.orders, WSOrdersActions, false),
    socketMiddleware(WSUrls.userOrders, WSUserOrdersActions, true)
  )
);

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  loading: loadingReducer,
  order: orderReducer,
  modals: modalsReducer,
  user: userReducer,
  WSOrders: WSOrdersReducer,
  WSUserOrders: WSUserOrdersReducer,
});

export const store = createStore(rootReducer, enhancer);
