import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { ingredientsReducer } from "services/reducers/ingredientsReducer";
import { loadingReducer } from "services/reducers/loadingReducer";
import { orderReducer } from "services/reducers/orderReducer";
import { modalsReducer } from "services/reducers/modalsReducer";
import { emailReducer } from "services/reducers/emailReducer";
import { passwordReducer } from "services/reducers/passwordReducer";
import { userReducer } from "services/reducers/userReducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  loading: loadingReducer,
  order: orderReducer,
  modals: modalsReducer,
  email: emailReducer,
  password: passwordReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, enhancer);
