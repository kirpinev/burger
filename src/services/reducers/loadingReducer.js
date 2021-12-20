import {
  ERROR,
  LOADING,
  SUCCESS,
  RESET_LOADING_STATE,
} from "services/actions/loading";

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
};

export const loadingReducer = (state = initialState, action) => {
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
