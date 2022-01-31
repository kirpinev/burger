import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { ingredientsReducer } from "services/reducers/ingredients-reducer";
import { loadingReducer } from "services/reducers/loading-reducer";
import { orderReducer } from "services/reducers/order-reducer";
import { modalsReducer } from "services/reducers/modals-reducer";
import { userReducer } from "services/reducers/user-reducer";
import { wsPublicFeedReducer } from "services/reducers/ws-public-feed-reducer";
import { socketMiddleware } from "services/middleware/socket-middleware";
import { wsPublicFeedAction } from "services/constants/ws-public-feed";

import { wsPublicFeedUrl } from "constants/ws-public-feed-url";

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, socketMiddleware(wsPublicFeedUrl, wsPublicFeedAction))
);

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  loading: loadingReducer,
  order: orderReducer,
  modals: modalsReducer,
  user: userReducer,
  wsPublicFeed: wsPublicFeedReducer,
});

export const store = createStore(rootReducer, enhancer);
