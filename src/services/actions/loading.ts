import {
  LOADING,
  ERROR,
  SUCCESS,
  RESET_LOADING_STATE,
} from "services/constants/loading";

export interface ISetLoading {
  readonly type: typeof LOADING;
}

export interface ISetError {
  readonly type: typeof ERROR;
}

export interface ISetSuccess {
  readonly type: typeof SUCCESS;
}

export interface IResetLoadingState {
  readonly type: typeof RESET_LOADING_STATE;
}

export type TLoadingActions =
  | ISetLoading
  | ISetError
  | ISetSuccess
  | IResetLoadingState;

export const setLoading = (): ISetLoading => ({
  type: LOADING,
});

export const setError = (): ISetError => ({
  type: ERROR,
});

export const setSuccess = (): ISetSuccess => ({
  type: SUCCESS,
});

export const resetLoadingState = (): IResetLoadingState => ({
  type: RESET_LOADING_STATE,
});
