import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { TStoreState } from "services/types/store";
import { TApplicationActions } from "services/types/actions";

export type TApplicationThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TStoreState, TApplicationActions>
>;
