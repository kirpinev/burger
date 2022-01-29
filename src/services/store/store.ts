import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { ingredientsReducer } from "services/reducers/ingredients-reducer";
import { loadingReducer } from "services/reducers/loading-reducer";
import { orderReducer } from "services/reducers/order-reducer";
import { modalsReducer } from "services/reducers/modals-reducer";
import { userReducer } from "services/reducers/user-reducer";

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  loading: loadingReducer,
  order: orderReducer,
  modals: modalsReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, enhancer);
