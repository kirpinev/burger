import {
  ERROR,
  LOADING,
  SUCCESS,
  RESET_LOADING_STATE,
} from "services/constants/loading";

import { TLoadingActions } from "services/actions/loading";

type TLoadingState = {
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isSuccess: boolean;
};

const initialState: TLoadingState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const loadingReducer = (
  state = initialState,
  action: TLoadingActions
): TLoadingState => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isError: false,
        isLoading: false,
      };
    case ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };
    case RESET_LOADING_STATE:
      return { ...initialState };
    default:
      return state;
  }
};
