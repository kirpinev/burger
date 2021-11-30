import { ERROR, LOADING, SUCCESS } from "services/actions/loading";

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
    default:
      return state;
  }
};
