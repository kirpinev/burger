import { useCallback } from "react";

import {
  openWSConnection,
  closeWSConnection,
} from "services/actions/ws-user-orders";

import { useDispatch } from "hooks/use-dispatch";

export const useWSUserOrders = () => {
  const dispatch = useDispatch();

  const openWsUserOrdersConnection = useCallback(
    () => dispatch(openWSConnection()),
    [dispatch]
  );

  const closeWsUserOrdersConnection = useCallback(
    () => dispatch(closeWSConnection()),
    [dispatch]
  );

  return {
    openWsUserOrdersConnection,
    closeWsUserOrdersConnection,
  };
};
