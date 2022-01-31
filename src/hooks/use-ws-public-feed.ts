import { useCallback } from "react";

import { useDispatch } from "hooks/use-dispatch";
import { setConnection } from "services/actions/ws-public-feed";

export const useWsPublicFeed = () => {
  const dispatch = useDispatch();

  const startWsPublicFeedConnection = useCallback(
    () => dispatch(setConnection()),
    [dispatch]
  );

  return {
    startWsPublicFeedConnection,
  };
};
