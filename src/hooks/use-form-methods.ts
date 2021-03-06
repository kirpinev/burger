import { useDispatch } from "hooks/use-dispatch";
import { ChangeEvent, useCallback } from "react";

import {
  updateUserEmail,
  updateUserName,
  updateUserPassword,
  updateUserToken,
  updateUserEditStatus,
  resetUserEditStatus,
  resetUserPassword,
} from "services/actions/user";
import {
  updateUserInfoThunk,
  authorizeUserThunk,
  registerUserThunk,
} from "services/thunks/user";

export const getInputValue = (e: ChangeEvent<HTMLInputElement>): string =>
  e.target.value;

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

  const updateToken = useCallback(
    (e) => {
      dispatch(updateUserToken(getInputValue(e)));
    },
    [dispatch]
  );

  const updateUser = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(updateUserInfoThunk());
    },
    [dispatch]
  );

  const authorize = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(authorizeUserThunk());
    },
    [dispatch]
  );

  const register = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(registerUserThunk());
    },
    [dispatch]
  );

  const updateEditStatus = useCallback(
    () => dispatch(updateUserEditStatus()),
    [dispatch]
  );

  const resetEditStatus = useCallback(() => {
    dispatch(resetUserEditStatus());
  }, [dispatch]);

  const resetPassword = useCallback(
    () => dispatch(resetUserPassword()),
    [dispatch]
  );

  return {
    updateName,
    updatePassword,
    updateEmail,
    updateToken,
    updateUser,
    authorize,
    register,
    updateEditStatus,
    resetEditStatus,
    resetPassword,
  };
};
