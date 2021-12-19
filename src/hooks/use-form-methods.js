import { useDispatch } from "react-redux";
import { useCallback } from "react";

import {
  updateUserEmail,
  updateUserName,
  updateUserPassword,
  updateUserInfo,
  authorizeUser,
  registerUser,
} from "services/actions/user";
import { getInputValue } from "utils/get-input-value";

export const useFormMethods = () => {
  const dispatch = useDispatch();

  const updateEmail = useCallback(
    (e) => {
      dispatch(updateUserEmail(getInputValue(e)));
    },
    [dispatch]
  );

  const updatePassword = useCallback(
    (e) => {
      dispatch(updateUserPassword(getInputValue(e)));
    },
    [dispatch]
  );

  const updateName = useCallback(
    (e) => {
      dispatch(updateUserName(getInputValue(e)));
    },
    [dispatch]
  );

  const updateUser = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(updateUserInfo());
    },
    [dispatch]
  );

  const authorize = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(authorizeUser());
    },
    [dispatch]
  );

  const register = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(registerUser());
    },
    [dispatch]
  );

  return {
    updateName,
    updatePassword,
    updateEmail,
    updateUser,
    authorize,
    register,
  };
};
