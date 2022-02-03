import { useCallback } from "react";

import {
  openWSConnection,
  closeWSConnection,
} from "services/actions/ws-orders";

import { useDispatch } from "hooks/use-dispatch";

export const useWSOrders = () => {
  const dispatch = useDispatch();

  const openWsOrdersConnection = useCallback(
    () => dispatch(openWSConnection()),
    [dispatch]
  );

  const closeWsOrdersConnection = useCallback(
    () => dispatch(closeWSConnection()),
    [dispatch]
  );

  return {
    openWsOrdersConnection,
    closeWsOrdersConnection,
  };
};
