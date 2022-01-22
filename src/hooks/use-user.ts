import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { getUserInfoThunk, logoutUserThunk } from "services/actions/user";

export const useUser = () => {
  const dispatch = useDispatch();

  const getUserInfo = useCallback(
    () => dispatch(getUserInfoThunk()),
    [dispatch]
  );

  const logoutUser = useCallback(() => dispatch(logoutUserThunk()), [dispatch]);

  return {
    getUserInfo,
    logoutUser,
  };
};
