export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export const setLoading = () => ({
  type: LOADING,
});

export const setError = () => ({
  type: ERROR,
});

export const setSuccess = () => ({
  type: SUCCESS,
});
