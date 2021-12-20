export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const RESET_LOADING_STATE = "RESET_STATE";

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
