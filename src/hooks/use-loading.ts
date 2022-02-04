import { useCallback } from "react";
import { useDispatch } from "hooks/use-dispatch";

import { resetLoadingState } from "services/actions/loading";

export const useLoading = () => {
  const dispatch = useDispatch();

  const resetLoading = useCallback(
    () => dispatch(resetLoadingState()),
    [dispatch]
  );

  return {
    resetLoading,
  };
};
