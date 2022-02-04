import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TApplicationActions } from "services/types/actions";

import { store } from "services/store/store";

export type TApplicationDispatch = typeof store.dispatch;

export type TStoreState = ReturnType<typeof store.getState>;

export type TApplicationThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TStoreState, TApplicationActions>
>;
