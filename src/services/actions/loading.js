import {
  LOADING,
  ERROR,
  SUCCESS,
  RESET_LOADING_STATE,
} from "services/constants/loading";

export const setLoading = () => ({
  type: LOADING,
});

export const setError = () => ({
  type: ERROR,
});

export const setSuccess = () => ({
  type: SUCCESS,
});

export const resetLoadingState = () => ({
  type: RESET_LOADING_STATE,
});
